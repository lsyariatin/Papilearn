"use client";

import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  const { user, isAdmin } = useAuth();
  const isLoggedIn = user || isAdmin;
  const heroVideoUrl = "https://drive.google.com/file/d/1whNgxlxSXHoPLJHtkJ81aGNLp4Pn21eJ/view?usp=sharing";

  const getGoogleDrivePreviewUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 pt-5 pb-20 text-center">
        {/* Organizers Logos */}
        <div className="flex justify-center items-center mb-4 mt-0">
          <img
            src="/Organizers.png"
            alt="Organizers"
            className="h-36 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        <h1 className="text-4xl font-bold mb-4">
          PapiLearn & PapiAdvance Webinar Series
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Join Papilearn & PapiAdvance for a comprehensive learning journey on cervical cancer through 6 exclusive sessions led by expert doctors. Gain deeper insights into prevention, early detection, diagnosis, and the latest treatment approaches to better understand cervical cancer and its management.
        </p>

        <Link
          href={isLoggedIn ? "/detail" : "/login"}
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          {isLoggedIn ? "Webinar Series" : "Login/Register"}
        </Link>
      </div>

      {/* ABOUT */}
      <div className="p-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          About Webinar
        </h2>

        <p className="text-gray-600">
          Evidence-Based Clinical Webinar Series HPV & Cervical Lesion Management
        </p>
      </div>

      {/* VIDEO SECTION */}
      <div className="flex justify-center pb-10 px-4">
        {heroVideoUrl ? (
          <div className="w-full max-w-5xl rounded-xl shadow overflow-hidden">
            <iframe
              src={getGoogleDrivePreviewUrl(heroVideoUrl)}
              className="w-full h-auto aspect-video"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src="/hero.jpeg"
            className="rounded-xl shadow w-full h-auto max-w-5xl"
            alt="About"
          />
        )}
      </div>
    </div>
  );
}
