package com.hoanglong.backend.service;

import java.util.List;

import com.hoanglong.backend.entity.Address;
import com.hoanglong.backend.payloads.AddressDTO;

public interface AddressService {

    AddressDTO createAddress(AddressDTO addressDTO);

    List<AddressDTO> getAddresses();

    AddressDTO getAddress(Long addressId);

    AddressDTO updateAddress(Long addressId, Address address);

    String deleteAddress(Long addressId);
}