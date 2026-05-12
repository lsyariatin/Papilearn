"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAdmin, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // Login successful
      if (isAdmin) {
        router.push("/admin");
      } else if (user) {
        router.push("/");
      } else {
        router.push("/");
      }
    } else {
      // Login failed
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="bg-white p-10 rounded shadow w-96">
          <h2 className="text-xl font-bold mb-3">Login</h2>
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="off"
              readOnly
              onFocus={(e) => e.currentTarget.removeAttribute('readOnly')}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="off"
              readOnly
              onFocus={(e) => e.currentTarget.removeAttribute('readOnly')}
            />
            <button 
              className="bg-primary text-white px-4 py-2 w-full rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <a href="/register" className="text-pink-500 hover:underline">
                Register disini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
