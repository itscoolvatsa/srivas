package com.srivas.service.property;

import com.srivas.model.PropertyModel;

import java.util.List;

public interface IProperty {
    public List<PropertyModel> getProperties();
    public PropertyModel getProperty(String id);
}
