package com.srivas.repository;

import com.srivas.model.PackageModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IPackageRepo extends MongoRepository<PackageModel, String> {
}
