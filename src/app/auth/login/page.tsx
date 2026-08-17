"use client";
import { useState } from "react";
import { loginApi } from "@/apis/auth.api";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginApi(form);
      alert("Login successful!");
    } catch {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0C4137] to-[#06D6A0]">
      <div className="bg-[#E6FBF6] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-[#0C4137] mb-6 text-center">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#0C4137] focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-[#0C4137] focus:outline-none focus:ring-2 focus:ring-[#06D6A0]"
          />
          <button
            type="submit"
            className="w-full bg-[#06D6A0] text-white font-semibold py-3 rounded-md hover:bg-[#0C4137] transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#0C4137]">
          Don’t have an account?{" "}
          <a href="/register" className="text-[#06D6A0] font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
