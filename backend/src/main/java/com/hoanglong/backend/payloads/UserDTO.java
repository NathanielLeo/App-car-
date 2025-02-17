package com.hoanglong.backend.payloads;

import java.util.HashSet;
import java.util.Set;

import com.hoanglong.backend.entity.Cart;
import com.hoanglong.backend.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long userId;
    private String firstName;
    private String lastName;
    private String mobileNumber;
    private String email;
    private String password;
    private Set<Role> roles = new HashSet<>();
    private AddressDTO address;
    private CartDTO cart;
}
