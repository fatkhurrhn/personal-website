import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      setError("Email atau password salah.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-10 transition-all duration-300 hover:shadow-2xl">

        <div className="text-center mb-8">
          <Link to="/">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-800 flex items-center justify-center shadow-md">
              <i className="ri-shield-user-line text-white text-xl"></i>
            </div>
            </Link>
          <h2 className="text-3xl font-bold text-gray-800">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition text-sm bg-white"
              />
              <i className="ri-mail-line absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition text-sm bg-white"
              />
              <i className="ri-lock-2-line absolute left-3 top-3 text-gray-400"></i>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition"
              >
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl font-semibold text-white transition-all duration-200 ${loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-900 shadow-md hover:shadow-lg"
              }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-xs text-center text-gray-400">
          © {new Date().getFullYear()} Fatkhurrhn. All rights reserved.
        </p>
      </div>
    </div>
  );
}