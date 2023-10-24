package com.srivas.service.customer;

import com.srivas.dto.customer.CustomerDto;
import com.srivas.dto.owner.OwnerSignUpDto;

public interface ICustomerService {
    String createCustomer(CustomerDto customerDto);
}
