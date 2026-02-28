package com.example.altru.api

data class AuthRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String
)

data class AuthResponse(
    val token: String
)

data class User(
    val id: Long? = null,
    val name: String,
    val email: String
)
