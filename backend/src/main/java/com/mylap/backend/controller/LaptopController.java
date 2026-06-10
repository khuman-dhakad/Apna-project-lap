package com.mylap.backend.controller;

import com.mylap.backend.model.Laptop;
// import com.mylap.backend.repository.LaptopRepository;
import com.mylap.backend.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/laptops")
@CrossOrigin(origins = "http://localhost:5173")
public class LaptopController {

    @Autowired
    private LaptopService laptopService; 

    @PostMapping
    public Laptop saveLaptop(@RequestBody Laptop laptop) {
    return laptopService.saveLaptop(laptop);
    }

    @GetMapping
    public List<Laptop> getAllLaptops() {
    return laptopService.getAllLaptops();
    }
   @PutMapping("/{id}")
   public Laptop updateLaptop(@PathVariable String id,
                           @RequestBody Laptop updatedLaptop) {

    return laptopService.updateLaptop(id, updatedLaptop);
    }
    @DeleteMapping("/{id}")
    public String deleteLaptop(@PathVariable String id) {

    laptopService.deleteLaptop(id);

    return "Laptop Deleted Successfully";
    }
}