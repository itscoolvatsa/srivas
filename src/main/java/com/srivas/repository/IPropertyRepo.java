package com.srivas.repository;

import com.srivas.model.PropertyModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IPropertyRepo extends MongoRepository<PropertyModel, String> {
}
