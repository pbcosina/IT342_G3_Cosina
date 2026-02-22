package com.example.cosina.controller;

import com.example.cosina.model.User;
import com.example.cosina.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userService;

    public UserController(UserRepository userService) {
        this.userService = userService;
    } // Using Repo directly or Service

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        Object principal = authentication.getPrincipal(); // This is likely UserDetails from my Config
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername(); // This holds email now
        } else {
            email = principal.toString();
        }

        User user = userService.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // Don't send password
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}
