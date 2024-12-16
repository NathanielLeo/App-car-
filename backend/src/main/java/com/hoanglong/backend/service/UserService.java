package com.hoanglong.backend.service;

import com.hoanglong.backend.payloads.UserDTO;
import com.hoanglong.backend.payloads.UserResponse;

public interface UserService {
    UserDTO registerUser(UserDTO userDTO);

    UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    UserDTO getUserById(Long userId);

    UserDTO updateUser(Long userId, UserDTO userDTO);

    String deleteUser(Long userId);

    Long getNextUserId();

    UserDTO getUserByEmail(String email);
}