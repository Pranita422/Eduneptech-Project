// src/pages/Login.jsx
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔐 If already logged in → dashboard
  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const bodyData = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setMessage("Registration successful. Please login.");
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch {
      setError("Server not responding. Try again later.");
    }
  };

  return (
    <div className="bg-linear-to-tr from-violet-100 to-white min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">

        <h1 className="text-2xl font-bold text-center text-violet-600 mb-4">
          Eduneptech
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-md ${
              isLogin ? "bg-violet-500 text-white" : "border text-violet-500"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-md ${
              !isLogin ? "bg-violet-500 text-white" : "border text-violet-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-violet-500 text-white p-2 rounded-md hover:bg-violet-600"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        

        <div className="text-center text-sm text-gray-400 my-4">or</div>

        {/* ✅ Google Button (UNCHANGED) */}
        <button className="w-full flex items-center justify-center gap-3 border p-2 rounded-md hover:bg-gray-100">
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-5 h-5 block animate-none"
          />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

      </div>
    </div>
  );
};

export default Login;
