package com.srivas.controller.property;

import com.srivas.util.JsonResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

public interface IPropertyController {
    public ResponseEntity<JsonResponse<Object>> getAllProperties();
    public ResponseEntity<JsonResponse<Object>> getPropertyById(@PathVariable String id);
}
