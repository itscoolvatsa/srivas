package com.srivas.repository;

import com.srivas.model.OwnerModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

//@Repository
public interface IOwnerRepo extends MongoRepository<OwnerModel, String> {
    @Query("{email:'?0'}")
    OwnerModel findOwnerByEmail(String email);
}
