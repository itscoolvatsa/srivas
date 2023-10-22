package com.srivas.controller.property;

import com.srivas.dto.property.AddPropertyDto;
import com.srivas.exception.ErrorsEnum;
import com.srivas.model.PropertyModel;
import com.srivas.service.property.OwnerPropertyService;
import com.srivas.util.JsonResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/owner")
@CrossOrigin(origins = "http://localhost:3000")
public class OwnerPropertyController implements IOwnerPropertyController {
    @Autowired
    private OwnerPropertyService ownerPropertyService;

    @Override
    @PostMapping("/property/add/{id}")
    public ResponseEntity<JsonResponse<Object>> createPropertyByOwnerId(@PathVariable String id,
                                                                        @Valid @RequestBody AddPropertyDto addPropertyDto) {

        HashMap<String, Object> hashMap = new HashMap<>();
        PropertyModel propertyModel = ownerPropertyService.addPropertyByOwnerId(id, addPropertyDto);

        if(propertyModel == null) {
            hashMap.put("error", "owner doesn't exists");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.USER_DOES_NOT_EXISTS, hashMap, false), HttpStatus.BAD_REQUEST);
        }
        hashMap.put("property", propertyModel);
        return new ResponseEntity<>(new JsonResponse<>("Property Added Successfully", hashMap, true), HttpStatus.OK);
    }

    @Override
    @GetMapping("/property/get/{id}")
    public ResponseEntity<JsonResponse<Object>> getPropertiesByOwnerId(@PathVariable String id) {
        ArrayList<PropertyModel> properties = ownerPropertyService.getPropertiesByOwnerId(id);
        HashMap<String, Object> hashMap = new HashMap<>();
        if(properties == null) {
            hashMap.put("error", "owner doesn't have any property listed");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.NO_PROPERTIES, hashMap, false),
                    HttpStatus.BAD_REQUEST);
        }
        hashMap.put("properties", properties);
        return new ResponseEntity<>(new JsonResponse<>("", hashMap, true),
                HttpStatus.BAD_REQUEST);
    }
}
