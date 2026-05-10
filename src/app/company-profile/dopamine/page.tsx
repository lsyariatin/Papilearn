"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function DopamineProfile() {
  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <div className="mb-6">
          <Link href="/company-profile" className="text-purple-500 hover:underline">
            ← Back to Company Profile
          </Link>
        </div>

        {/* Dopamine Medica Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-200">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-8">
            <h1 className="text-4xl font-bold text-white">
              Dopamine Medica
            </h1>
          </div>
          
          <div className="p-8">
            {/* Image Placeholder */}
            <div className="mb-6">
              <div className="w-full h-64 bg-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                <div className="text-center">
                  <p className="text-purple-500 font-semibold">Image Placeholder</p>
                  <p className="text-purple-400 text-sm">Upload dopamine-logo.png to /public</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Dopamine Medica adalah perusahaan kesehatan yang berdedikasi untuk menyediakan
              edukasi dan solusi kesehatan berkualitas tinggi untuk masyarakat Indonesia.
              Kami bekerja sama dengan berbagai ahli medis untuk memberikan informasi yang
              akurat dan terpercaya melalui program edukasi berkelanjutan.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-600 mb-2">Program Kami</h3>
                <p className="text-gray-600 text-sm">
                  Webinar, seminar, dan workshop kesehatan untuk edukasi masyarakat
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-600 mb-2">Kolaborasi</h3>
                <p className="text-gray-600 text-sm">
                  Kerjasama dengan dokter spesialis dan institusi kesehatan
                </p>
              </div>
            </div>

            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-purple-500">✓</span> Provider edukasi kesehatan terpercaya
              </p>
              <p className="flex items-center gap-2">
                <span className="text-purple-500">✓</span> Kolaborasi dengan dokter spesialis
              </p>
              <p className="flex items-center gap-2">
                <span className="text-purple-500">✓</span> Program webinar dan seminar kesehatan
              </p>
              <p className="flex items-center gap-2">
                <span className="text-purple-500">✓</span> Komitmen pada peningkatan kualitas hidup pasien
              </p>
              <p className="flex items-center gap-2">
                <span className="text-purple-500">✓</span> Akses informasi kesehatan yang mudah dan gratis
              </p>
            </div>

            {/* Video Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-purple-600">
                Company Video
              </h3>
              <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <p className="text-gray-500 font-semibold">Video Placeholder</p>
                  <p className="text-gray-400 text-sm">Upload dopamine-video.mp4 to /public</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
