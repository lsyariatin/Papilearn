"use client";

import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  const { user, isAdmin, isLoading } = useAuth();
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

  if (isLoading) {
    return (
      <div className="bg-pink-50 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
          Papi-Learn & Papi-Advance Webinar Series
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Join Papi-learn & Papi-Advance for a comprehensive learning journey on precancer lesion through 6 exclusive sessions led by expert doctors. Gain deeper insights into prevention, early detection, diagnosis, and the latest treatment approaches to better understand precancer lesion and its management.
        </p>

        <Link
          href={isLoggedIn ? "/detail" : "/login"}
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          {isLoggedIn ? "Webinar Series" : "Login/Register"}
        </Link>
      </div>

      {/* ABOUT */}
      <div className="p-10 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          About Webinar
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <p className="text-gray-700 mb-6 leading-relaxed">
            As part of our commitment to standardizing clinical examination approaches while supporting clinicians in the field of gynecologic oncology and women's cervical health, we proudly introduce this initiative as the first series of our continuous educational program.
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Through this learning series, we aim to provide updated insights, practical guidance, and collaborative discussion to enhance patient care and clinical practice in HPV-related diseases and cervical health management.
          </p>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              In support of this commitment, Team Besins has introduced <span className="font-bold text-pink-600">Papilocare®️</span> as an adjuvant therapy option. <span className="font-bold text-pink-600">Papilocare®️</span> is a vaginal gel designed to help restore and maintain the cervical transformation zone, support re-epithelialization, and promote a healthy vaginal microbiota environment in women with HPV-related cervical lesions.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4"><span className="font-bold text-pink-600">Papilocare®️</span> Active Ingredients:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-pink-100 rounded-lg p-3 text-center">
                <span className="text-pink-700 font-medium text-sm">Hyaluronic acid</span>
              </div>
              <div className="bg-pink-100 rounded-lg p-3 text-center">
                <span className="text-pink-700 font-medium text-sm">Centella asiatica</span>
              </div>
              <div className="bg-pink-100 rounded-lg p-3 text-center">
                <span className="text-pink-700 font-medium text-sm">Coriolus versicolor</span>
              </div>
              <div className="bg-pink-100 rounded-lg p-3 text-center">
                <span className="text-pink-700 font-medium text-sm">Aloe vera</span>
              </div>
              <div className="bg-pink-100 rounded-lg p-3 text-center">
                <span className="text-pink-700 font-medium text-sm">Neem extract</span>
              </div>
              <div className="bg-pink-100 rounded-lg p-3 text-center">
                <span className="text-pink-700 font-medium text-sm">Beta-glucan</span>
              </div>
              <div className="bg-pink-100 rounded-lg p-3 text-center">
                <span className="text-pink-700 font-medium text-sm">Alpha-glucan</span>
              </div>
              <div className="bg-pink-100 rounded-lg p-3 text-center">
                <span className="text-pink-700 font-medium text-sm">Oligosaccharides</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-700 font-medium">
              Click the video below to learn more about <span className="font-bold text-pink-600">Papilocare®️</span>and its role in cervical health management.
            </p>
          </div>
        </div>
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
