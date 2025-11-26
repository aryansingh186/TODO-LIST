import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/Login.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      setSuccess("Login successful! Redirecting...");
      
      // Store token if provided
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setEmail("");
      setPassword("");

      // Redirect to home after 1.5 seconds
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError("Error connecting to server");
      console.log("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-300">
      <div className="relative w-full max-w-4xl flex shadow-lg rounded-2xl overflow-hidden">

        {/* Form Card */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center rounded-l-2xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-200 outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <a href="/register" className="font-medium text-orange-400 hover:underline">Sign up</a>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src={loginImg}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;