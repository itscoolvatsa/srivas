package com.srivas.controller.customer;

import com.srivas.dto.customer.CustomerDto;
import com.srivas.dto.customer.CustomerResponseDto;
import com.srivas.dto.customer.CustomerSignInDto;
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
import java.util.Objects;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerControllerImpl implements ICustomerController {
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

        CustomerResponseDto customerResponseDto = CustomerResponseDto
                .builder()
                .id(id)
                .name(customerDto.getName())
                .email(customerDto.getEmail())
                .build();

        hashMap.put("customer", customerResponseDto);
        return new ResponseEntity<>(new JsonResponse<>("customer created", hashMap, true), HttpStatus.CREATED);
    }

    @Override
    @PostMapping("/signin")
    public ResponseEntity<JsonResponse<Object>> signInCustomer(@Valid @RequestBody CustomerSignInDto customerSignInDto) {
        CustomerModel customerModel = customerService.signInCustomer(customerSignInDto.getEmail());

        HashMap<String, Object> hashMap = new HashMap<>();

        if (customerModel == null) {
            hashMap.put("error", "user doesn't exists");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.USER_DOES_NOT_EXISTS, hashMap, false), HttpStatus.BAD_REQUEST);
        }

        if (!Objects.equals(customerModel.getPassword(), customerSignInDto.getPassword())) {
            hashMap.put("error", "invalid credentials");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.INVALID_CREDENTIALS, hashMap, false), HttpStatus.BAD_REQUEST);
        }

        CustomerResponseDto customerResponseDto = CustomerResponseDto
                .builder()
                .id(customerModel.getId())
                .name(customerModel.getName())
                .email(customerModel.getEmail())
                .build();

        hashMap.put("customer", customerResponseDto);
        return new ResponseEntity<>(new JsonResponse<>("Signed In Successfully", hashMap, true), HttpStatus.OK);

    }
}
