package com.mylap.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

@Autowired
private BCryptPasswordEncoder passwordEncoder;

public User registerUser(User user) {

    User existingUser = userRepository.findByEmail(user.getEmail());

    if (existingUser != null) {
        return null;
    }

    user.setPassword(
            passwordEncoder.encode(user.getPassword())
    );

    user.setRole("ROLE_USER");

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
        && passwordEncoder.matches(
                password,
                user.getPassword()
        )) {

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse("Login Successful", token);
    }

    return new LoginResponse("Invalid Email or Password", "");
}
    public User getUserByEmail(String email) {

    return userRepository.findByEmail(email);
    }

}
