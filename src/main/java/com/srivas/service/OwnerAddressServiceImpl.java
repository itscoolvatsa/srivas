package com.srivas.service;

import com.srivas.dto.address.AddressDto;
import com.srivas.model.AddressModel;
import com.srivas.repository.IAddressRepo;
import com.srivas.repository.IOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OwnerAddressServiceImpl implements IOwnerAddressService{
    @Autowired
    private IOwnerRepo ownerRepo;
    @Autowired
    private IAddressRepo addressRepo;

    @Override
    public AddressModel getOwnerAddressById(String id) {
        String addressId = ownerRepo.findOwnerById(id).getAddress().getId();
        AddressModel addressModel = addressRepo.findAddressByOwnerReferenceID(addressId);
        return addressModel;
    }

    @Override
    public AddressModel updateOwnerAddress(String id, AddressDto addressDto) {
        String addressId = ownerRepo.findOwnerById(id).getAddress().getId();

        if (addressId != null) {
            Optional<AddressModel> existingAddress = addressRepo.findById(addressId);

            AddressModel updatedAddress = existingAddress.get();
            updatedAddress.setName(addressDto.getName());
            updatedAddress.setHouseNumber(addressDto.getHouseNumber());
            updatedAddress.setLocality(addressDto.getLocality());
            updatedAddress.setStreet(addressDto.getStreet());
            updatedAddress.setLandmark(addressDto.getLandmark());
            updatedAddress.setCity(addressDto.getCity());
            updatedAddress.setState(addressDto.getState());
            updatedAddress.setPincode(addressDto.getPincode());

            return addressRepo.save(updatedAddress);
        } else {
            return null;
        }
    }
}
