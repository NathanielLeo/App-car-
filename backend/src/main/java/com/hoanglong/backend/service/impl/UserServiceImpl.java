package com.hoanglong.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoanglong.backend.config.AppConstants;
import com.hoanglong.backend.entity.Address;
import com.hoanglong.backend.entity.Cart;
import com.hoanglong.backend.entity.Role;
import com.hoanglong.backend.entity.User;
import com.hoanglong.backend.exceptions.APIException;
import com.hoanglong.backend.exceptions.ResourceNotFoundException;
import com.hoanglong.backend.payloads.AddressDTO;
import com.hoanglong.backend.payloads.UserDTO;
import com.hoanglong.backend.payloads.ProductDTO;
import com.hoanglong.backend.payloads.CartDTO;
import com.hoanglong.backend.payloads.UserResponse;
import com.hoanglong.backend.repository.AddressRepo;
import com.hoanglong.backend.repository.RoleRepo;
import com.hoanglong.backend.repository.UserRepo;
import com.hoanglong.backend.service.CartService;
import com.hoanglong.backend.service.UserService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private CartService cartService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Long getNextUserId() {
        User user = userRepo.findFirstByOrderByUserIdDesc();
        return user != null ? user.getUserId() + 1 : 1;
    }

@Override
    public UserDTO registerUser(UserDTO userDTO) {
        try {
            User user = modelMapper.map(userDTO, User.class);
            // user.setUserId(getNextUserId()); // Generate a unique userid

            Cart cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);

            Role role = roleRepo.findById(AppConstants.USER_ID).get();
            user.getRoles().add(role);

            String country = userDTO.getAddress().getCountry();
            String state = userDTO.getAddress().getState();
            String city = userDTO.getAddress().getCity();
            String pincode = userDTO.getAddress().getPincode();
            String street = userDTO.getAddress().getStreet();
            String buildingName = userDTO.getAddress().getBuildingName();

            Address address = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(country, state,
                    city, pincode, street, buildingName);
                    if (address == null) {
                address = new Address(country, state, city, pincode, street, buildingName);
                address = addressRepo.save(address);
            }
            user.setAddresses(List.of(address));
            User registeredUser = userRepo.save(user);
            cart.setUser(registeredUser);
            userDTO = modelMapper.map(registeredUser, UserDTO.class);

            userDTO.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));
            return userDTO;
        } catch (DataIntegrityViolationException e) {
            throw new APIException("User already exists with emailId or mobileNumber: " + userDTO.getEmail()
                    + userDTO.getMobileNumber());
            // throw new APIException("Error " + e);
        }
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);

        if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
            userDTO.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));
        }
        if (user.getCart() != null) {
            CartDTO cart = modelMapper.map(user.getCart(), CartDTO.class);

            List<ProductDTO> products = user.getCart().getCartItems().stream()
                    .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
                    .collect(Collectors.toList());

            cart.setProducts(products);
            userDTO.setCart(cart);
        }
        return userDTO;

    }

    @Override
    public UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<User> pageUsers = userRepo.findAll(pageDetails);

        List<User> users = pageUsers.getContent();

        if (users.size() == 0) {
            throw new APIException("No User exists !!!");
        }

        List<UserDTO> userDTOs = users.stream().map(user -> {
            UserDTO dto = modelMapper.map(user, UserDTO.class);
            if (user.getAddresses().size() != 0) {
                dto.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));
            }
            // Uncomment and adjust as needed
            // if (user.getCart() != null) {
            // CartDTO cart = modelMapper.map(user.getCart(), CartDTO.class);
            // List<ProductDTO> products = user.getCart().getCartItems().stream()
            // .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
            // .collect(Collectors.toList());
            // cart.setProducts(products);
            // dto.setCart(cart);
            // }

            return dto;
        }).collect(Collectors.toList());

        UserResponse userResponse = new UserResponse();
        userResponse.setContent(userDTOs);
        userResponse.setPageNumber(pageUsers.getNumber());
        userResponse.setPageSize(pageUsers.getSize());
        userResponse.setTotalElements(pageUsers.getTotalElements());
        userResponse.setTotalPages(pageUsers.getTotalPages());
        userResponse.setLastPage(pageUsers.isLast());

        return userResponse;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        if (user.getAddresses().size() != 0) {
            userDTO.setAddress(modelMapper.map(user.getAddresses().stream().findFirst().get(), AddressDTO.class));
        }

        // Uncomment and adjust as needed
        // if (user.getCart() != null) {
        // CartDTO cart = modelMapper.map(user.getCart(), CartDTO.class);
        // List<ProductDTO> products = user.getCart().getCartItems().stream()
        // .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
        // .collect(Collectors.toList());
        // cart.setProducts(products);
        // userDTO.setCart(cart);
        // }

        return userDTO;
    }

@Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));

        String encodedPass = passwordEncoder.encode(userDTO.getPassword());

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setMobileNumber(userDTO.getMobileNumber());
        user.setEmail(userDTO.getEmail());
        user.setPassword(encodedPass);

        if (userDTO.getAddress() != null) {
            Address address = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(
                    userDTO.getAddress().getCountry(),
                    userDTO.getAddress().getState(),
                    userDTO.getAddress().getCity(),
                    userDTO.getAddress().getPincode(),
                    userDTO.getAddress().getStreet(),
                    userDTO.getAddress().getBuildingName());

            if (address == null) {
                address = new Address(
                        userDTO.getAddress().getCountry(),
                        userDTO.getAddress().getState(),
                        userDTO.getAddress().getCity(),
                        userDTO.getAddress().getPincode(),
                        userDTO.getAddress().getStreet(),
                        userDTO.getAddress().getBuildingName());
                address = addressRepo.save(address);
                }

            user.setAddresses(List.of(address));
        }

        User updatedUser = userRepo.save(user);
        UserDTO updatedUserDTO = modelMapper.map(updatedUser, UserDTO.class);
        updatedUserDTO
                .setAddress(modelMapper.map(updatedUser.getAddresses().stream().findFirst().get(), AddressDTO.class));

        // Uncomment and adjust as needed
        // if (updatedUser.getCart() != null) {
        // CartDTO cart = modelMapper.map(updatedUser.getCart(), CartDTO.class);
        // List<ProductDTO> products = updatedUser.getCart().getCartItems().stream()
        // .map(item -> modelMapper.map(item.getProduct(), ProductDTO.class))
        // .collect(Collectors.toList());
        // cart.setProducts(products);
        // updatedUserDTO.setCart(cart);
        // }

        return updatedUserDTO;
    }

    @Override
    public String deleteUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        // Uncomment and adjust as needed
        // List<CartItem> cartItems = user.getCart().getCartItems();
        // Long cartId = user.getCart().getCartId();
        // cartItems.forEach(item -> {
        // Long productId = item.getProduct().getProductId();
        // cartService.deleteProductFromCart(cartId, productId);
        // });

        userRepo.delete(user);
        return "User with userId " + userId + " deleted successfully !!!";
    }
}