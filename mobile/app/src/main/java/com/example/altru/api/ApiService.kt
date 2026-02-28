package com.example.altru.api

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface ApiService {
    @POST("api/auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>

    @POST("api/auth/login")
    suspend fun login(@Body request: AuthRequest): Response<AuthResponse>

    @GET("api/user/me")
    suspend fun getCurrentUser(@Header("Authorization") token: String): Response<User>

    @POST("api/auth/logout")
    suspend fun logout(): Response<Unit>
}
