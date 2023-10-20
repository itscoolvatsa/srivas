package com.srivas.service;

import com.srivas.dto.address.AddressDto;
import com.srivas.dto.owner.OwnerSignUpDto;
import com.srivas.model.AddressModel;
import com.srivas.model.OwnerModel;
import com.srivas.repository.IAddressRepo;
import com.srivas.repository.IOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OwnerServiceImpl implements IOwnerService {
    @Autowired
    private IOwnerRepo ownerRepo;
    @Autowired
    private IAddressRepo addressRepo;

    @Override
    public String createOwner(OwnerSignUpDto ownerSignUpDto) {
        OwnerModel ownerModel = ownerSignUpDto.createOwner();
        OwnerModel count = ownerRepo.findOwnerByEmail(ownerModel.getEmail());
        if (count != null) {
            System.out.println(count.getEmail());
            return null;
        }

        AddressModel addressModel = addressRepo.save(new AddressModel());
        ownerModel.setAddress(addressModel);

        return ownerRepo
                .save(ownerModel)
                .getId();
    }

    @Override
    public OwnerModel signInOwner(String email) {
        return ownerRepo.findOwnerByEmail(email);
    }

    @Override
    public AddressModel getOwnerAddressById(String id) {
        String addressId = ownerRepo.findOwnerById(id).getId();
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
