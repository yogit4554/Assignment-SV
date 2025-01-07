import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { name, email, password, role });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || error.message));
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
      <form
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        onSubmit={handleRegister}
      >
        <div className="text-center">
          <img
            src="../logo.jpg" // Replace with your library logo path
            alt="Library Logo"
            className="mx-auto mb-4 w-24"
          />
          <h2 className="text-3xl font-bold">Create Your Account</h2>
          <p className="text-gray-400 text-center text-sm">
            Join the Library Management System and manage your collections with ease.
          </p>
        </div>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Register
        </button>
        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
