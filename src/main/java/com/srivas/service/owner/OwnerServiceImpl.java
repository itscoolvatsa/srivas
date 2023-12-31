package com.srivas.service.owner;

import com.srivas.dto.owner.OwnerSignUpDto;
import com.srivas.model.AddressModel;
import com.srivas.model.OwnerModel;
import com.srivas.repository.IAddressRepo;
import com.srivas.repository.IOwnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerServiceImpl implements IOwnerService {
    @Autowired
    private IOwnerRepo ownerRepo;
    @Autowired
    private IAddressRepo addressRepo;

    @Override
    public OwnerModel createOwner(OwnerSignUpDto ownerSignUpDto) {
        OwnerModel ownerModel = ownerSignUpDto.createOwner();
        OwnerModel count = ownerRepo.findOwnerByEmail(ownerModel.getEmail());
        if (count != null) {
            return null;
        }

        AddressModel addressModel = addressRepo.save(new AddressModel());
        ownerModel.setAddress(addressModel);

        return ownerRepo
                .save(ownerModel);
    }

    @Override
    public OwnerModel signInOwner(String email) {
        return ownerRepo.findOwnerByEmail(email);
    }

    @Override
    public OwnerModel findOwnerByPropertyId(String id) {
        return ownerRepo.findByPropertiesId(id);
    }
}
