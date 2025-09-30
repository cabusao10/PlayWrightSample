// Vite-React-Login.jsx
// Single-file React component (JSX) for a clean, accessible login page.
// Tailwind CSS is used for styling (no imports here). To use:
// 1) Create a Vite + React app (e.g. `npm create vite@latest my-app -- --template react`).
// 2) Install Tailwind and configure according to Tailwind docs.
// 3) Place this file in src/components/Login.jsx and import into your App.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
export default function Login({ onLogin, }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  function validate() {
    if (!email) return "Email is required.";
    // simple email regex — fine for client-side quick check
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(email)) return "Please enter a valid email.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      // replace this with your real API endpoint
      const res = await fakeLoginApi({ email, password, remember });
      setLoading(false);
      if (res.ok) {
        // call parent callback if provided
        // if (onLogin) onLogin(res.user);
        navigate("/profile");
      } else {
        setError(res.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Network error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your account</p>

        {error && (
          <div role="alert" className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} aria-describedby={error ? "login-error" : undefined}>
          <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />


            <br />
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <br />
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot?</a>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account? <a href="#" className="text-indigo-600 hover:underline">Create one</a>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">or continue with</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <button className="py-2 px-3 rounded-lg border text-sm">Google</button>
            <button className="py-2 px-3 rounded-lg border text-sm">GitHub</button>
            <button className="py-2 px-3 rounded-lg border text-sm">Microsoft</button>
          </div>
        </div>
      </div>
    </div>

  );
}

// ----------------------
// Fake API helper for demo purposes only.
// Replace with real network call (fetch/axios) to your auth endpoint.
async function fakeLoginApi({ email, password, remember }) {
  await new Promise((r) => setTimeout(r, 700)); // simulate latency
  // quick fake auth: accept any password 'password123'
  if (password === "password123") {
    return {
      ok: true,
      user: { id: 1, email },
      token: "fake-jwt-token",
    };
  }
  return { ok: false, message: "Invalid credentials" };
}
