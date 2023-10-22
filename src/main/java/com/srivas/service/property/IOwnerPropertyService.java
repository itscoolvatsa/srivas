package com.srivas.service.property;

import com.srivas.dto.property.AddPropertyDto;
import com.srivas.model.PropertyModel;

import java.util.ArrayList;

public interface IOwnerPropertyService {
    public PropertyModel addPropertyByOwnerId(String id, AddPropertyDto addPropertyDto);
    public ArrayList<PropertyModel> getPropertiesByOwnerId(String id);
}
