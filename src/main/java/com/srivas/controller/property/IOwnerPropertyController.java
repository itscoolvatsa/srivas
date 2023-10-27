package com.srivas.controller.property;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.srivas.dto.address.AddressDto;
import com.srivas.dto.property.AddPropertyDto;
import com.srivas.dto.property.PropertyDto;
import com.srivas.util.JsonResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

public interface IOwnerPropertyController {
    ResponseEntity<JsonResponse<Object>> createPropertyByOwnerId(@PathVariable String id,
                                                                 @Valid @RequestParam String addPropertyDtoString,
                                                                 @RequestParam("images") MultipartFile[] images) throws JsonProcessingException;

    public ResponseEntity<JsonResponse<Object>> getPropertiesByOwnerId(@PathVariable String id);
}
