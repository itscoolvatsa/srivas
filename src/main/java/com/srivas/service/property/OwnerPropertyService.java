package com.srivas.service.property;

import com.srivas.dto.address.AddressDto;
import com.srivas.dto.property.AddPropertyDto;
import com.srivas.dto.property.PropertyDto;
import com.srivas.model.AddressModel;
import com.srivas.model.OwnerModel;
import com.srivas.model.PropertyModel;
import com.srivas.repository.IAddressRepo;
import com.srivas.repository.IOwnerRepo;
import com.srivas.repository.IPropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class OwnerPropertyService implements IOwnerPropertyService {
    @Autowired
    private IAddressRepo addressRepo;
    @Autowired
    private IPropertyRepo propertyRepo;

    @Autowired
    private IOwnerRepo ownerRepo;

    @Override
    public PropertyModel addPropertyByOwnerId(String id, AddPropertyDto addPropertyDto) {
        PropertyDto propertyDto = addPropertyDto.getPropertyDto();
        AddressDto addressDto = addPropertyDto.getAddressDto();

        OwnerModel ownerModel = ownerRepo.findOwnerById(id);
        ArrayList<PropertyModel> properties = ownerModel.getProperties();

        if(properties == null) {
            properties = new ArrayList<>();
        }

        PropertyModel propertyModel = propertyDto.createModel();
        AddressModel addressModel = addressDto.createAddress();

        addressModel = addressRepo.save(addressModel);
        propertyModel.setAddress(addressModel);
        properties.add(propertyModel);
        ownerRepo.save(ownerModel);

        return propertyRepo.save(propertyModel);
    }
}
