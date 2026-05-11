package com.mylap.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Backend Connected Successfully!";
    }
}