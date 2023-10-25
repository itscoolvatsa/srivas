package com.srivas.controller.customer;

import com.srivas.dto.address.AddressDto;
import com.srivas.dto.customer.CustomerDto;
import com.srivas.dto.customer.CustomerResponseDto;
import com.srivas.dto.customer.CustomerSignInDto;
import com.srivas.dto.customer.PackageDto;
import com.srivas.exception.ErrorsEnum;
import com.srivas.model.AddressModel;
import com.srivas.model.CustomerModel;
import com.srivas.model.PackageModel;
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

    @Override
    @PostMapping("/add/package/{id}")
    public ResponseEntity<JsonResponse<Object>> addPackageByCustomerId(@PathVariable String id,
                                                                       @Valid @RequestBody PackageDto packageDto) {
        HashMap<String, Object> hashMap = new HashMap<>();
        PackageModel packageModel = customerService.addPackageByCustomerId(id, packageDto);

        if (packageModel == null) {
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.USER_DOES_NOT_EXISTS, hashMap, true),
                    HttpStatus.BAD_REQUEST);
        }

        hashMap.put("package", packageModel);
        return new ResponseEntity<>(new JsonResponse<>("package added", hashMap, true), HttpStatus.ACCEPTED);
    }

    @Override
    @GetMapping("/get/package/{id}")
    public ResponseEntity<JsonResponse<Object>> getPackageByCustomerId(@PathVariable  String id) {
        HashMap<String, Object> hashMap = new HashMap<>();
        PackageModel packageModel = customerService.getPackageByCustomerId(id);

        if (packageModel == null) {
            hashMap.put("error", "customer don't have any package");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.PACKAGE_DOES_NOT_EXISTS, hashMap, true),
                    HttpStatus.NOT_FOUND);
        }
        hashMap.put("package", packageModel);
        return new ResponseEntity<>(new JsonResponse<>("package details", hashMap, true), HttpStatus.OK);
    }

    @Override
    @PostMapping("/update/package/{id}")
    public ResponseEntity<JsonResponse<Object>> updatePackageByCustomerId(@PathVariable String id) {
        HashMap<String, Object> hashMap = new HashMap<>();
        PackageModel packageModel = customerService.updatePackageByCustomerId(id);

        if (packageModel == null) {
            hashMap.put("error", "customer don't have any package");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.PACKAGE_DOES_NOT_EXISTS, hashMap, true),
                    HttpStatus.NOT_FOUND);
        }
        hashMap.put("package", packageModel);
        return new ResponseEntity<>(new JsonResponse<>("package updated", hashMap, true), HttpStatus.ACCEPTED);

    }
}
