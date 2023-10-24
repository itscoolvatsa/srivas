package com.srivas.service.property;

import com.srivas.model.PropertyModel;
import com.srivas.repository.IPropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyImpl implements IProperty {
    @Autowired
    private IPropertyRepo propertyRepo;

    @Override
    public List<PropertyModel> getProperties() {
        return propertyRepo.findAll();
    }
}
