"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { isAdmin, logout } = useAuth();

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 md:p-5 bg-white shadow gap-4">
      <h1 className="font-bold text-pink-500 text-center md:text-left">
        <Link href="/" className="hover:opacity-80">
          Papilocare Webinar Series
        </Link>
      </h1>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base">
        <Link href="/" className="hover:text-pink-500">Home</Link>
        <Link href="/detail" className="hover:text-pink-500">Schedule</Link>
        <Link href="/company-profile" className="hover:text-pink-500">Company Profile</Link>
        {isAdmin && (
          <>
            <Link href="/admin" className="hover:text-pink-500">Admin</Link>
            <button onClick={logout} className="text-red-500 hover:text-red-700">
              Logout
            </button>
          </>
        )}
        {!isAdmin && (
          <Link href="/login" className="hover:text-pink-500">Login</Link>
        )}
      </div>
    </div>
  );
}
