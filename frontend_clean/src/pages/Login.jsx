// src/pages/Login.jsx
import React, { useState } from "react";
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
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100 rounded-full blur-3xl opacity-60 animate-pulse transition-all duration-3000"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-indigo-200/50 rounded-3xl border border-white p-8 md:p-10">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-200 mb-4 transform -rotate-6 transition-transform hover:rotate-0">
              <span className="text-3xl text-white font-bold">E</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
              Eduneptech
            </h1>
            <p className="text-slate-500 text-sm">
              Your gateway to professional coding mastery
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8 relative">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out z-0 ${!isLogin ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}
            ></div>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-semibold transition-colors relative z-10 ${isLogin ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-semibold transition-colors relative z-10 ${!isLogin ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
            >
              Register
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
              <span className="shrink-0">⚠️</span>
              <p>{error}</p>
            </div>
          )}
          {message && (
            <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3 text-emerald-600 text-sm animate-in fade-in slide-in-from-top-2">
              <span className="shrink-0">✅</span>
              <p>{message}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300/50 transition-all active:scale-[0.98]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-bold">Secure Social Access</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 bg-slate-50 border border-slate-200 py-3 rounded-xl hover:bg-slate-100 transition-colors group">
            <img
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="Google"
              className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all"
            />
            <span className="text-sm font-bold text-slate-600">Continue with Google</span>
          </button>
        </div>

        <p className="mt-8 text-center text-slate-400 text-xs">
          &copy; 2026 Eduneptech. Built for the next generation of developers.
        </p>
      </div>
    </div>
  );
};

export default Login;
