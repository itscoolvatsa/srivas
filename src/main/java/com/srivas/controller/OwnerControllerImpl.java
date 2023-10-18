package com.srivas.controller;

import com.srivas.dto.OwnerDto;
import com.srivas.exception.ErrorsEnum;
import com.srivas.service.OwnerServiceImpl;
import com.srivas.util.JsonResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/owner")
public class OwnerControllerImpl implements IOwnerController {
    @Autowired
    private OwnerServiceImpl ownerService;

    @Override
    @PostMapping("/create")
    public ResponseEntity<JsonResponse> createOwner(@Valid @RequestBody OwnerDto ownerDto) {
        String id = ownerService.createOwner(ownerDto);
        HashMap<String, Object> hashMap = new HashMap<>();

        if (id == null) {
            hashMap.put("error", "user already exists");
            return new ResponseEntity<>(new JsonResponse(ErrorsEnum.USER_ALREADY_EXISTS, hashMap,
                    false),
                    HttpStatus.BAD_REQUEST);
        }

        hashMap.put("user", ownerDto.toString());

        return new ResponseEntity<>(new JsonResponse("owner created", hashMap, true),
                HttpStatus.CREATED);
    }
}
