package com.mylap.backend.service;

import com.mylap.backend.security.JwtUtil;
import com.mylap.backend.model.LoginResponse;
import com.mylap.backend.model.User;
import com.mylap.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

@Autowired
private UserRepository userRepository;

@Autowired
private JwtUtil jwtUtil;

public User registerUser(User user) {

    User existingUser = userRepository.findByEmail(user.getEmail());

    if (existingUser != null) {
        return null;
    }

    return userRepository.save(user);
}

public LoginResponse loginUser(String email, String password) {

    User user = userRepository.findByEmail(email);

    System.out.println("========== LOGIN DEBUG ==========");
    System.out.println("Input Email = " + email);
    System.out.println("Input Password = " + password);

    if (user != null) {
        System.out.println("DB Email = " + user.getEmail());
        System.out.println("DB Password = " + user.getPassword());
    } else {
        System.out.println("User Not Found");
    }

    if (user != null
            && user.getPassword() != null
            && user.getPassword().equals(password)) {

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse("Login Successful", token);
    }

    return new LoginResponse("Invalid Email or Password", "");
}

}
