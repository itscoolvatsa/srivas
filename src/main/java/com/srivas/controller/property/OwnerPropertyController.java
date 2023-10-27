package com.srivas.controller.property;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.srivas.dto.property.AddPropertyDto;
import com.srivas.exception.ErrorsEnum;
import com.srivas.model.PropertyModel;
import com.srivas.service.property.OwnerPropertyService;
import com.srivas.util.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/owner")
@CrossOrigin(origins = "http://localhost:3000")
public class OwnerPropertyController implements IOwnerPropertyController {
    @Autowired
    private OwnerPropertyService ownerPropertyService;
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    @PostMapping(value = "/property/add/{id}", headers = "content-type=multipart/*", consumes = {
            MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseEntity<JsonResponse<Object>> createPropertyByOwnerId(@PathVariable String id,
                                                                        @RequestPart("addPropertyDtoString") String addPropertyDtoString,
                                                                        @RequestParam("images") MultipartFile[] images) throws JsonProcessingException {

        HashMap<String, Object> hashMap = new HashMap<>();
        AddPropertyDto addPropertyDto = objectMapper.readValue(addPropertyDtoString, AddPropertyDto.class);
        PropertyModel propertyModel = ownerPropertyService.addPropertyByOwnerId(id, addPropertyDto);

        if (propertyModel == null) {
            hashMap.put("error", "owner doesn't exist");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.USER_DOES_NOT_EXISTS, hashMap, false), HttpStatus.BAD_REQUEST);
        }
        hashMap.put("property", propertyModel);

        if (images != null && images.length > 0) {
            String folderPath = "src/main/resources/static/images/" + propertyModel.getId();

            try {
                File folder = new File(folderPath);
                if (!folder.exists()) {
                    folder.mkdirs();
                }

                for (int i = 0; i < images.length; i++) {
                    String fileName = folderPath + File.separator + i + ".jpg";
                    Files.copy(images[i].getInputStream(), Paths.get(fileName));
                }

                System.out.println("Images added successfully to " + folderPath);
            } catch (IOException e) {
                System.out.println("Failed to save images: " + e.getMessage());
            }
        } else {
            System.out.println("No images found");
        }

        return new ResponseEntity<>(new JsonResponse<>("Property Added Successfully", hashMap, true), HttpStatus.CREATED);
    }

    @Override
    @GetMapping("/property/get/{id}")
    public ResponseEntity<JsonResponse<Object>> getPropertiesByOwnerId(@PathVariable String id) {
        ArrayList<PropertyModel> properties = ownerPropertyService.getPropertiesByOwnerId(id);
        HashMap<String, Object> hashMap = new HashMap<>();
        if (properties == null) {
            hashMap.put("error", "owner doesn't have any property listed");
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.NO_PROPERTIES, hashMap, false), HttpStatus.BAD_REQUEST);
        }
        hashMap.put("properties", properties);
        return new ResponseEntity<>(new JsonResponse<>("", hashMap, true), HttpStatus.OK);
    }
}
