package com.mylap.backend.config;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.mylap.backend.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
        // ✅ Fix 1: Properly link the custom corsConfigurationSource bean
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth

            .requestMatchers(
                "/auth/**",
                "/swagger-ui/**",
                "/v3/api-docs/**"
            ).permitAll()

            // ✅ Fix 2: Allow anyone to view products without logging in
            .requestMatchers(org.springframework.http.HttpMethod.GET, "/laptops/**").permitAll()

            // Keep modifications locked down to ADMINs
            .requestMatchers(org.springframework.http.HttpMethod.POST, "/laptops/**").hasRole("ADMIN")
            .requestMatchers(org.springframework.http.HttpMethod.PUT, "/laptops/**").hasRole("ADMIN")
            .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/laptops/**").hasRole("ADMIN")

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

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                java.util.List.of("http://localhost:5173")
        );
        configuration.setAllowedMethods(
                java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );
        configuration.setAllowedHeaders(
                java.util.List.of("*")
        );
        // Required if you plan to send tokens or cookies over cross-origin setups later
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
} 