package com.srivas.repository;

import com.srivas.model.AddressModel;
import com.srivas.model.PropertyModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface IPropertyRepo extends MongoRepository<PropertyModel, String> {
    @Query("{id:'?0'}")
    AddressModel findPropertiesByOwnerReferenceID(String id);
}
