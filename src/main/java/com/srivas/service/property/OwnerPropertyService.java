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
import java.util.Date;
import java.util.Optional;

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

        Optional<OwnerModel> existingOwner = ownerRepo.findById(id);
        OwnerModel updatedOwnerModel = existingOwner.get();
        ArrayList<PropertyModel> properties = updatedOwnerModel.getProperties();

        if (properties == null) {
            properties = new ArrayList<>();
        }

        PropertyModel propertyModel = propertyDto.createModel();
        AddressModel addressModel = addressDto.createAddress();
        addressModel = addressRepo.save(addressModel);
        propertyModel.setAddress(addressModel);
        propertyModel.setPostedOn(new Date());

        propertyModel = propertyRepo.save(propertyModel);
        properties.add(propertyModel);
        updatedOwnerModel.setProperties(properties);
        ownerRepo.save(updatedOwnerModel);
        return propertyModel;
    }

    @Override
    public ArrayList<PropertyModel> getPropertiesByOwnerId(String id) {
        OwnerModel ownerModel = ownerRepo.findOwnerById(id);
        ArrayList<PropertyModel> properties = ownerModel.getProperties();
        return properties;
    }

}
