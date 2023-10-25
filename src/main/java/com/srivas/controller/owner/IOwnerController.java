package com.srivas.controller.owner;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.srivas.dto.owner.OwnerSignInDto;
import com.srivas.dto.owner.OwnerSignUpDto;
import com.srivas.util.JsonResponse;
import org.springframework.http.ResponseEntity;

public interface IOwnerController {
    ResponseEntity<JsonResponse<Object>> createOwner(OwnerSignUpDto ownerSignUpDto);

    ResponseEntity<JsonResponse<Object>> signInOwner(OwnerSignInDto ownerSignInDto) throws JsonProcessingException;

    ResponseEntity<JsonResponse<Object>> findOwnerByPropertyId(String propertyId) throws JsonProcessingException;
}
