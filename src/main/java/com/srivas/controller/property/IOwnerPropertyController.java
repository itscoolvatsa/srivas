package com.srivas.controller.property;

import com.srivas.dto.property.AddPropertyDto;
import com.srivas.util.JsonResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface IOwnerPropertyController {
    ResponseEntity<JsonResponse<Object>> createPropertyByOwnerId(@PathVariable String id,
                                                                 @Valid @RequestBody AddPropertyDto addPropertyDto);
    public ResponseEntity<JsonResponse<Object>> getPropertiesByOwnerId(@PathVariable String id);
    }
