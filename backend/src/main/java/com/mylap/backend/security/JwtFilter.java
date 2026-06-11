package com.mylap.backend.security;

import com.mylap.backend.model.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.mylap.backend.repository.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

   @Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain)
        throws ServletException, IOException {

    String path = request.getServletPath();

    if (path.startsWith("/auth")) {
        filterChain.doFilter(request, response);
        return;
    }

    String authHeader = request.getHeader("Authorization");

    System.out.println("Authorization Header: " + authHeader);

   if (authHeader != null && authHeader.startsWith("Bearer ")) {

    String token = authHeader.substring(7);

    if (jwtUtil.validateToken(token)) {

    String email = jwtUtil.extractEmail(token);

    System.out.println("Email From Token: " + email);

    User user = userRepository.findByEmail(email);

    System.out.println("Role From DB: " + user.getRole());

    UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                    email,
                    null,
                    java.util.List.of(
                            new org.springframework.security.core.authority.SimpleGrantedAuthority(
                                    user.getRole()
                            )
                    )
            );

    SecurityContextHolder
            .getContext()
            .setAuthentication(authentication);
}
}

    filterChain.doFilter(request, response);
   }
}