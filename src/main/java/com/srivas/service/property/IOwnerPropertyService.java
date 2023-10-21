package com.srivas.service.property;

import com.srivas.dto.property.AddPropertyDto;
import com.srivas.model.PropertyModel;

public interface IOwnerPropertyService {
    public PropertyModel addPropertyByOwnerId(String id, AddPropertyDto addPropertyDto);
}
