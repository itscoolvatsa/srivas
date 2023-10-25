package com.srivas.service.customer;

import com.srivas.dto.customer.CustomerDto;
import com.srivas.dto.customer.CustomerSignInDto;
import com.srivas.dto.customer.PackageDto;
import com.srivas.dto.owner.OwnerSignUpDto;
import com.srivas.model.CustomerModel;
import com.srivas.model.PackageModel;

public interface ICustomerService {
    String createCustomer(CustomerDto customerDto);
    CustomerModel signInCustomer(String email);
    PackageModel addPackageByCustomerId(String id, PackageDto packageDto);
    PackageModel getPackageByCustomerId(String id);
}
