package com.srivas.controller.customer;

import com.srivas.dto.customer.CustomerDto;
import com.srivas.exception.ErrorsEnum;
import com.srivas.model.CustomerModel;
import com.srivas.service.customer.CustomerServiceImpl;
import com.srivas.util.JsonResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerControllerImpl implements ICustomerController{
    @Autowired
    private CustomerServiceImpl customerService;
    @Override
    @PostMapping("/add")
    public ResponseEntity<JsonResponse<Object>> signUpCustomer(@Valid @RequestBody CustomerDto customerDto) {
        String id = customerService.createCustomer(customerDto);
        HashMap<String, Object> hashMap = new HashMap<>();

        if (id == null) {
            hashMap.put("error", "user already exists");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.USER_ALREADY_EXISTS, hashMap, false), HttpStatus.BAD_REQUEST);
        }

        hashMap.put("user", customerDto);
        return new ResponseEntity<>(new JsonResponse<>("customer created", hashMap, true), HttpStatus.CREATED);
    }
}
