package com.srivas.controller.customer;

import com.srivas.dto.customer.CustomerDto;
import com.srivas.dto.customer.CustomerSignInDto;
import com.srivas.model.CustomerModel;
import com.srivas.util.JsonResponse;
import org.springframework.http.ResponseEntity;

public interface ICustomerController {
    public ResponseEntity<JsonResponse<Object>> signUpCustomer(CustomerDto customerDto);
    public ResponseEntity<JsonResponse<Object>> signInCustomer(CustomerSignInDto customerSignInDto);
}
