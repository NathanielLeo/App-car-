package com.hoanglong.backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoanglong.backend.entity.Address;
import com.hoanglong.backend.entity.User;
import com.hoanglong.backend.exceptions.APIException;
import com.hoanglong.backend.exceptions.ResourceNotFoundException;
import com.hoanglong.backend.payloads.AddressDTO;
import com.hoanglong.backend.repository.AddressRepo;
import com.hoanglong.backend.repository.UserRepo;
import com.hoanglong.backend.service.AddressService;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO) {
        String country = addressDTO.getCountry();
        String state = addressDTO.getState();
        String city = addressDTO.getCity();
        String pincode = addressDTO.getPincode();
        String street = addressDTO.getStreet();
        String buildingName = addressDTO.getBuildingName();

        Address addressFromDB = addressRepo.findByCountryAndStateAndCityAndPincodeAndStreetAndBuildingName(
                country, state, city, pincode, street, buildingName);

        if (addressFromDB != null) {
            throw new APIException("Address already exists with addressId: " + addressFromDB.getAddressId());
        }

        Address address = modelMapper.map(addressDTO, Address.class);
        Address savedAddress = addressRepo.save(address);

        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAddresses() {
        List<Address> addresses = addressRepo.findAll();
        return addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AddressDTO getAddress(Long addressId) {
        Address address = addressRepo.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));
        return modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public AddressDTO updateAddress(Long addressId, Address address) {
        Address addressFromDB = addressRepo.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));

        addressFromDB.setCountry(address.getCountry());
        addressFromDB.setState(address.getState());
        addressFromDB.setCity(address.getCity());
        addressFromDB.setPincode(address.getPincode());
        addressFromDB.setStreet(address.getStreet());
        addressFromDB.setBuildingName(address.getBuildingName());

        Address updatedAddress = addressRepo.save(addressFromDB);
        return modelMapper.map(updatedAddress, AddressDTO.class);
    }

    @Override
    public String deleteAddress(Long addressId) {
        Address addressFromDB = addressRepo.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));

        List<User> users = userRepo.findByAddress(addressId);
        users.forEach(user -> {
            user.getAddresses().remove(addressFromDB);
            userRepo.save(user);
        });

        addressRepo.deleteById(addressId);
        return "Address deleted successfully with addressId: " + addressId;
    }
}
