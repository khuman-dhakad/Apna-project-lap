package com.mylap.backend.controller;

import com.mylap.backend.model.Laptop;
import com.mylap.backend.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/laptops")
@CrossOrigin(origins = "http://localhost:5173")
public class LaptopController {

    @Autowired
    private LaptopRepository laptopRepository;

    @PostMapping
    public Laptop saveLaptop(@RequestBody Laptop laptop) {
        return laptopRepository.save(laptop);
    }

    @GetMapping
    public List<Laptop> getAllLaptops() {
        return laptopRepository.findAll();
    }
}