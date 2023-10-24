package com.srivas.service.owner;

import com.srivas.dto.owner.OwnerSignUpDto;
import com.srivas.model.OwnerModel;

public interface IOwnerService {
    OwnerModel createOwner(OwnerSignUpDto ownerSignUpDto);
    OwnerModel signInOwner(String email);
}
