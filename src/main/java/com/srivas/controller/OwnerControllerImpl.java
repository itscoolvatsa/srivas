package com.srivas.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.srivas.dto.address.AddressDto;
import com.srivas.dto.owner.OwnerResponseDto;
import com.srivas.dto.owner.OwnerSignInDto;
import com.srivas.dto.owner.OwnerSignUpDto;
import com.srivas.exception.ErrorsEnum;
import com.srivas.model.AddressModel;
import com.srivas.model.OwnerModel;
import com.srivas.service.OwnerServiceImpl;
import com.srivas.util.JsonResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

@RestController
@RequestMapping("/owner")
@CrossOrigin(origins = "http://localhost:3000")
public class OwnerControllerImpl implements IOwnerController {
    @Autowired
    private OwnerServiceImpl ownerService;

    @Override
    @PostMapping("/signup")
    public ResponseEntity<JsonResponse<Object>> createOwner(@Valid @RequestBody OwnerSignUpDto ownerSignUpDto) {
        String id = ownerService.createOwner(ownerSignUpDto);
        HashMap<String, Object> hashMap = new HashMap<>();

        if (id == null) {
            hashMap.put("error", "user already exists");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.USER_ALREADY_EXISTS, hashMap, false), HttpStatus.BAD_REQUEST);
        }

        hashMap.put("user", ownerSignUpDto.toString());
        return new ResponseEntity<>(new JsonResponse<>("owner created", hashMap, true), HttpStatus.CREATED);
    }


    @Override
    @PostMapping("/signin")
    public ResponseEntity<JsonResponse<Object>> signInOwner(@Valid @RequestBody OwnerSignInDto ownerSignInDto) throws JsonProcessingException {
        OwnerModel ownerModel = ownerService.signInOwner(ownerSignInDto.getEmail());
        HashMap<String, Object> hashMap = new HashMap<>();

        if (ownerModel == null) {
            hashMap.put("error", "user doesn't exists");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.USER_DOES_NOT_EXISTS, hashMap, false), HttpStatus.BAD_REQUEST);
        }

        if (!Objects.equals(ownerModel.getPassword(), ownerSignInDto.getPassword())) {
            hashMap.put("error", "invalid credentials");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.INVALID_CREDENTIALS, hashMap, false), HttpStatus.BAD_REQUEST);
        }

        OwnerResponseDto ownerResponseDto = OwnerResponseDto
                .builder()
                .id(ownerModel.getId())
                .name(ownerModel.getName())
                .email(ownerModel.getEmail())
                .build();

        hashMap.put("owner", ownerResponseDto);
        return new ResponseEntity<>(new JsonResponse<>("Signed In Successfully", hashMap, true), HttpStatus.OK);
    }

    @Override
    @PostMapping("/address/update/{id}")
    public ResponseEntity<JsonResponse<Object>> updateOwnerAddress(@PathVariable String id, @Valid @RequestBody AddressDto addressDto) {
        HashMap<String, Object> hashMap = new HashMap<>();
        AddressModel addressModel = ownerService.updateOwnerAddress(id, addressDto);

        if (addressModel == null) {
            return new ResponseEntity<>(new JsonResponse<>("address not updated", hashMap, true), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        AddressDto responseAddress = AddressDto
                .builder()
                .name(addressModel.getName())
                .houseNumber(addressModel.getHouseNumber())
                .street(addressModel.getStreet())
                .landmark(addressModel.getLandmark())
                .locality(addressDto.getLocality())
                .city(addressDto.getCity())
                .state(addressModel.getState())
                .pincode(addressModel.getPincode())
                .build();

        hashMap.put("address", responseAddress);
        return new ResponseEntity<>(new JsonResponse<>("address updated", hashMap, true), HttpStatus.ACCEPTED);
    }

    @Override
    @PostMapping("/{id}")
    public ResponseEntity<JsonResponse<Object>> addNewProperty(@PathVariable String id) {
        HashMap<String, Object> hashMap = new HashMap<>();
        AddressModel addressModel = ownerService.getOwnerAddressById(id);

        if (addressModel.getState() == null) {

        }

        AddressDto addressDto = AddressDto
                .builder()
                .name(addressModel.getName())
                .houseNumber(addressModel.getHouseNumber())
                .street(addressModel.getStreet())
                .locality(addressModel.getLocality())
                .landmark(addressModel.getLandmark())
                .city(addressModel.getCity())
                .state(addressModel.getState())
                .pincode(addressModel.getPincode())
                .build();

        hashMap.put("address", addressDto);
        return new ResponseEntity<>(new JsonResponse<>("", hashMap, true), HttpStatus.OK);
    }
}
