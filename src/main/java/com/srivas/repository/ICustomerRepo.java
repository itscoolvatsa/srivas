package com.srivas.repository;

import com.srivas.model.CustomerModel;
import com.srivas.model.OwnerModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ICustomerRepo extends MongoRepository<CustomerModel, String> {
    @Query("{email:'?0'}")
    CustomerModel findCustomerByEmail(String email);
}
