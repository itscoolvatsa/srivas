package com.srivas.controller;

import com.srivas.dto.address.AddressDto;
import com.srivas.util.JsonResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface IOwnerAddressController {
    public ResponseEntity<JsonResponse<Object>> updateOwnerAddress(@PathVariable String id,
                                                                   @Valid @RequestBody AddressDto addressDto);
    public ResponseEntity<JsonResponse<Object>> addNewProperty(@PathVariable String id);
    public ResponseEntity<JsonResponse<Object>> getAddressByOwnerId(@PathVariable String id);
}
