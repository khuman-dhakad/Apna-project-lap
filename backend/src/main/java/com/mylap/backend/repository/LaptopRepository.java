package com.mylap.backend.repository;

import com.mylap.backend.model.Laptop;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LaptopRepository extends MongoRepository<Laptop, String> {
}