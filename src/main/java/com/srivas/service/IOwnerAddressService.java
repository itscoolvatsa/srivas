package com.srivas.service;

import com.srivas.dto.address.AddressDto;
import com.srivas.model.AddressModel;

public interface IOwnerAddressService {
    AddressModel getOwnerAddressById(String id);
    AddressModel updateOwnerAddress(String id, AddressDto addressDto);
}
