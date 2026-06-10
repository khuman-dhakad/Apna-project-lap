package com.mylap.backend.service;

import com.mylap.backend.model.Laptop;
import com.mylap.backend.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaptopService {

    @Autowired
    private LaptopRepository laptopRepository;

    public Laptop saveLaptop(Laptop laptop) {
        return laptopRepository.save(laptop);
    }

    public List<Laptop> getAllLaptops() {
        return laptopRepository.findAll();
    }

    public Laptop updateLaptop(String id, Laptop updatedLaptop) {

        Laptop laptop = laptopRepository.findById(id).orElse(null);

        if (laptop != null) {
            laptop.setBrand(updatedLaptop.getBrand());
            laptop.setPrice(updatedLaptop.getPrice());

            return laptopRepository.save(laptop);
        }

        return null;
    }
    public void deleteLaptop(String id) {
    laptopRepository.deleteById(id);
    }    
}