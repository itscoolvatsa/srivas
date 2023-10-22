package com.srivas.repository;

import com.srivas.model.AddressModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface IAddressRepo extends MongoRepository<AddressModel, String> {
    @Query("{id:'?0'}")
    AddressModel findAddressByOwnerReferenceID(String id);
}
