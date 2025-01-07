import React, { useState } from "react";
import api from "../utils/api"; // Ensure correct import
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      const data = response.data;

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/allbooks");
      }
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        background: "linear-gradient(to right, #1f2937, #4b5563)",
        color: "#f9fafb",
      }}
    >
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <div className="text-center">
          <img
            src="../logo.jpg" // Replace with your library logo path
            alt="Library Logo"
            className="mx-auto mb-4 w-20"
          />
          <h2 className="text-3xl font-bold">Welcome to the Library!</h2>
          <p className="text-gray-400 text-sm">
            Manage your books and records with ease.
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
