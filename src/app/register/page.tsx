"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    nip: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { registerUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.email || !formData.password || !formData.name || !formData.nip) {
      setError("Semua field harus diisi");
      return;
    }

    const result = await registerUser(formData.email, formData.password, formData.name, formData.nip);
    
    if (result) {
      setSuccess(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      setError("Registrasi gagal. Email mungkin sudah terdaftar.");
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="bg-white p-10 rounded shadow w-96">
          <h2 className="text-xl font-bold mb-3">User Registration</h2>
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p className="font-bold">Registrasi Berhasil!</p>
              <p className="text-sm">Akun Anda menunggu persetujuan admin. Anda akan diarahkan ke halaman login.</p>
            </div>
          )}

          {error && <p className="text-red-500 mb-3">{error}</p>}

          {!success && (
            <form onSubmit={handleSubmit}>
              <input
                className="border p-2 mb-2 w-full"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                className="border p-2 mb-2 w-full"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <input
                className="border p-2 mb-2 w-full"
                placeholder="Nama Lengkap"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                className="border p-2 mb-2 w-full"
                placeholder="NIP/NIK"
                type="text"
                value={formData.nip}
                onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                required
              />

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                <p className="text-yellow-800 text-sm">
                  ⚠️ <strong>Penting:</strong> Pastikan email dan nama sama dengan ketika mengisi form pendaftaran
                </p>
              </div>

              <button className="bg-primary text-white px-4 py-2 w-full rounded">
                Register
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a href="/login" className="text-pink-500 hover:underline">
                Login disini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
