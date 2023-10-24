package com.srivas.controller.property;

import com.srivas.model.PropertyModel;
import com.srivas.service.property.PropertyImpl;
import com.srivas.util.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/property")
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyController implements IPropertyController {
    @Autowired
    private PropertyImpl propertyImpl;

    @Override
    @GetMapping("")
    public ResponseEntity<JsonResponse<Object>> getAllProperties() {
        List<PropertyModel> properties = propertyImpl.getProperties();
        HashMap<String, Object> hashMap = new HashMap<>();

        if (properties == null) {
            hashMap.put("error", "zero property listed");
            return new ResponseEntity<>(new JsonResponse<>("", hashMap, false),
                    HttpStatus.NOT_FOUND);
        }

        hashMap.put("properties", properties);
        return new ResponseEntity<>(new JsonResponse<>("", hashMap, true),
                HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<Object>> getPropertyById(@PathVariable String id) {
        PropertyModel propertyModel = propertyImpl.getProperty(id);
        HashMap<String, Object> hashMap = new HashMap<>();

        if (propertyModel == null) {
            hashMap.put("error", "property not found");
            return new ResponseEntity<>(new JsonResponse<>("", hashMap, false),
                    HttpStatus.NOT_FOUND);
        }

        hashMap.put("property", propertyModel);
        return new ResponseEntity<>(new JsonResponse<>("", hashMap, true),
                HttpStatus.OK);
    }
}
