"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "text-pink-500 font-bold"
      : "hover:text-pink-500";
  };

  return (
    <div className="flex flex-col md:flex-row justify-between p-4 md:p-5 bg-white shadow gap-4">
      <h1 className="font-bold text-pink-500 text-center md:text-left">
        <Link href="/" className="hover:opacity-80">
          PapiLearn & PapiRise Webinar Series
        </Link>
      </h1>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm md:text-base">
        <Link href="/" className={getLinkClass("/")}>Home</Link>
        <Link href="/detail" className={getLinkClass("/detail")}>Papi-Learn Series</Link>
        <Link href="/company-profile" className={getLinkClass("/company-profile")}>Company Profile</Link>
        {isAdmin && (
          <>
            <Link href="/admin" className={getLinkClass("/admin")}>Admin</Link>
            <button onClick={logout} className="text-red-500 hover:text-red-700">
              Logout
            </button>
          </>
        )}
        {!isAdmin && (
          <Link href="/login" className={getLinkClass("/login")}>Login</Link>
        )}
      </div>
    </div>
  );
}
