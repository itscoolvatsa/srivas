package com.srivas.controller.owner;

import com.srivas.dto.address.AddressDto;
import com.srivas.model.AddressModel;
import com.srivas.service.address.OwnerAddressServiceImpl;
import com.srivas.util.JsonResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

@RestController
@RequestMapping("/owner")
@CrossOrigin(origins = "http://localhost:3000")
public class OwnerAddressControllerImpl implements IOwnerAddressController {
    @Autowired
    private OwnerAddressServiceImpl ownerAddressService;

    @Override
    @GetMapping("/address/get/{id}")
    public ResponseEntity<JsonResponse<Object>> getAddressByOwnerId(@PathVariable String id) {
        HashMap<String, Object> hashMap = new HashMap<>();
        AddressModel addressModel = ownerAddressService.getOwnerAddressByOwnerId(id);

        if(Objects.isNull(addressModel) || Objects.isNull(addressModel.getHouseNumber())) {
            return new ResponseEntity<>(new JsonResponse<>("address not found", hashMap, true), HttpStatus.NOT_FOUND);
        }

        AddressDto addressDto = AddressDto.createAddress(addressModel);

        hashMap.put("address",addressDto);
        return new ResponseEntity<>(new JsonResponse<>("success", hashMap, true), HttpStatus.OK);
    }

    @Override
    @PostMapping("/address/update/{id}")
    public ResponseEntity<JsonResponse<Object>> updateOwnerAddress(@PathVariable String id, @Valid @RequestBody AddressDto addressDto) {
        HashMap<String, Object> hashMap = new HashMap<>();
        AddressModel addressModel = ownerAddressService.updateOwnerAddress(id, addressDto);

        if (addressModel == null) {
            return new ResponseEntity<>(new JsonResponse<>("address not updated", hashMap, true), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        AddressDto responseAddress = AddressDto.createAddress(addressModel);

        hashMap.put("address", responseAddress);
        return new ResponseEntity<>(new JsonResponse<>("address updated", hashMap, true), HttpStatus.ACCEPTED);
    }

    @Override
    @PostMapping("/address/get")
    public ResponseEntity<JsonResponse<Object>> addNewProperty(@PathVariable String id) {
        HashMap<String, Object> hashMap = new HashMap<>();
        AddressModel addressModel = ownerAddressService.getOwnerAddressByOwnerId(id);

        return null;
    }
}
