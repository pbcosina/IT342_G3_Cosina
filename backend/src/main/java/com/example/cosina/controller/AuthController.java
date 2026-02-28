package com.example.cosina.controller;

import com.example.cosina.dto.AuthRequest;
import com.example.cosina.dto.AuthResponse;
import com.example.cosina.dto.RegisterRequest;
import com.example.cosina.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(
            @RequestBody AuthRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // In JWT stateless auth, logout is primarily handled on the client by deleting the token.
        // This endpoint can be used to perform any server-side cleanup if needed (e.g., token blacklisting).
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
