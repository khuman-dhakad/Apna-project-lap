package com.mylap.backend.controller;

import com.mylap.backend.model.LoginRequest;
import com.mylap.backend.model.User;
import com.mylap.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest loginRequest) {

        return userService.loginUser(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
    }
}