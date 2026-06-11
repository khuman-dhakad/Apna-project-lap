package com.mylap.backend.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.mylap.backend.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       http
        .csrf(csrf -> csrf.disable())
       .authorizeHttpRequests(auth -> auth

        .requestMatchers("/auth/**").permitAll()

        .requestMatchers(org.springframework.http.HttpMethod.GET,
                "/laptops/**")
        .hasAnyRole("USER", "ADMIN")

        .requestMatchers(org.springframework.http.HttpMethod.POST,
                "/laptops/**")
        .hasRole("ADMIN")

        .requestMatchers(org.springframework.http.HttpMethod.PUT,
                "/laptops/**")
        .hasRole("ADMIN")

        .requestMatchers(org.springframework.http.HttpMethod.DELETE,
                "/laptops/**")
        .hasRole("ADMIN")

        .anyRequest().authenticated()
        )
        .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
   }
}