package com.example.altru.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import com.example.altru.R
import com.example.altru.api.RetrofitClient
import com.example.altru.databinding.FragmentDashboardBinding
import com.example.altru.utils.AuthManager
import kotlinx.coroutines.launch

class DashboardFragment : Fragment() {
    private var _binding: FragmentDashboardBinding? = null
    private val binding get() = _binding!!
    private lateinit var authManager: AuthManager

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentDashboardBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        authManager = AuthManager(requireContext())

        if (!authManager.isLoggedIn()) {
            findNavController().navigate(R.id.action_dashboardFragment_to_loginFragment)
            return
        }

        loadUserProfile()

        binding.logoutButton.setOnClickListener {
            logout()
        }
    }

    private fun loadUserProfile() {
        val token = authManager.getToken() ?: return
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.instance.getCurrentUser("Bearer $token")
                if (response.isSuccessful && response.body() != null) {
                    val user = response.body()!!
                    binding.welcomeTextView.text = "Welcome, ${user.name}!"
                    binding.emailTextView.text = user.email
                } else if (response.code() == 401) {
                    logout()
                } else {
                    Toast.makeText(requireContext(), "Failed to load profile", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Toast.makeText(requireContext(), "Error: ${e.message}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun logout() {
        authManager.clearToken()
        findNavController().navigate(R.id.action_dashboardFragment_to_loginFragment)
        Toast.makeText(requireContext(), "Logged out", Toast.LENGTH_SHORT).show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
