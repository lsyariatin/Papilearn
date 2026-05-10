"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function BesinsProfile() {
  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <div className="mb-6">
          <Link href="/company-profile" className="text-pink-500 hover:underline">
            ← Back to Company Profile
          </Link>
        </div>

        {/* Besins Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-200">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-8">
            <h1 className="text-4xl font-bold text-white">
              Besins Healthcare Indonesia
            </h1>
          </div>
          
          <div className="p-8">
            {/* Image Placeholder */}
            <div className="mb-6">
              <div className="w-full h-64 bg-pink-100 rounded-lg flex items-center justify-center border-2 border-dashed border-pink-300">
                <div className="text-center">
                  <p className="text-pink-500 font-semibold">Image Placeholder</p>
                  <p className="text-pink-400 text-sm">Upload besins-logo.png to /public</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Besins Healthcare Indonesia adalah perusahaan farmasi global yang berkomitmen
              untuk meningkatkan kesehatan wanita melalui inovasi dalam pengobatan kanker serviks
              dan penyakit kesehatan reproduksi lainnya. Dengan sejarah lebih dari 90 tahun,
              Besins terus menjadi pioneer dalam pengembangan terapi kanker serviks dan HPV.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-bold text-pink-600 mb-2">Visi</h3>
                <p className="text-gray-600 text-sm">
                  Menjadi leader global dalam kesehatan wanita melalui inovasi dan edukasi
                </p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-bold text-pink-600 mb-2">Misi</h3>
                <p className="text-gray-600 text-sm">
                  Memberikan solusi kesehatan berkualitas tinggi untuk meningkatkan kualitas hidup
                </p>
              </div>
            </div>

            <div className="space-y-2 text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-pink-500">✓</span> Berdiri sejak 1929 di Belgia
              </p>
              <p className="flex items-center gap-2">
                <span className="text-pink-500">✓</span> Leader dalam pengobatan kanker serviks dan HPV
              </p>
              <p className="flex items-center gap-2">
                <span className="text-pink-500">✓</span> Hadir di lebih dari 100 negara
              </p>
              <p className="flex items-center gap-2">
                <span className="text-pink-500">✓</span> Fokus pada kesehatan wanita dan reproduksi
              </p>
              <p className="flex items-center gap-2">
                <span className="text-pink-500">✓</span> Riset dan pengembangan berkelanjutan
              </p>
            </div>

            {/* Video Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-pink-600">
                Company Video
              </h3>
              <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <p className="text-gray-500 font-semibold">Video Placeholder</p>
                  <p className="text-gray-400 text-sm">Upload besins-video.mp4 to /public</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
