package com.srivas.controller;

import com.srivas.dto.OwnerDto;
import com.srivas.util.JsonResponse;
import org.springframework.http.ResponseEntity;

public interface IOwnerController {
    ResponseEntity<JsonResponse> createOwner(OwnerDto ownerDto);
}
