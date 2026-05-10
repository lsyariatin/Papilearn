"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { isAdmin, logout } = useAuth();

  return (
    <div className="flex justify-between p-5 bg-white shadow">
      <h1 className="font-bold text-pink-500">
        <Link href="/" className="hover:opacity-80">
          Papilocare Webinar Series
        </Link>
      </h1>

      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/detail">Schedule</Link>
        <Link href="/company-profile">Company Profile</Link>
        {isAdmin && (
          <>
            <Link href="/admin">Admin</Link>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </>
        )}
        {!isAdmin && (
          <Link href="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
