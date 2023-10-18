package com.srivas.repository;

import com.srivas.model.AddressModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IAddressRepo extends MongoRepository<AddressModel, String> {
}
