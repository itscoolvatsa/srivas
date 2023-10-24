package com.srivas.controller.owner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.srivas.dto.owner.OwnerResponseDto;
import com.srivas.dto.owner.OwnerSignInDto;
import com.srivas.dto.owner.OwnerSignUpDto;
import com.srivas.exception.ErrorsEnum;
import com.srivas.model.OwnerModel;
import com.srivas.service.owner.OwnerServiceImpl;
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
        OwnerModel ownerModel = ownerService.createOwner(ownerSignUpDto);
        HashMap<String, Object> hashMap = new HashMap<>();

        if (ownerModel == null) {
            hashMap.put("error", "user already exists");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.USER_ALREADY_EXISTS, hashMap, false), HttpStatus.BAD_REQUEST);
        }

        OwnerResponseDto ownerResponseDto = OwnerResponseDto
                .builder()
                .id(ownerModel.getId())
                .name(ownerModel.getName())
                .email(ownerModel.getEmail())
                .build();

        hashMap.put("owner", ownerResponseDto);
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
}
