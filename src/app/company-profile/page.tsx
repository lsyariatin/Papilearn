"use client";

import Navbar from "@/components/Navbar";

export default function CompanyProfile() {
  const besinsVideoUrl = ""; // Add Google Drive link here
  const dopamineVideoUrl = ""; // Add Google Drive link here

  const getGoogleDrivePreviewUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  };

  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Company Profile
        </h1>

        <div className="space-y-12">
          {/* Besins Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-200">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-8">
              <h2 className="text-3xl font-bold text-white">
                Besins Healthcare Indonesia
              </h2>
            </div>
            
            <div className="p-8">
              <div className="w-full h-64 bg-pink-100 rounded-lg flex items-center justify-center border-2 border-dashed border-pink-300 mb-6">
                <div className="text-center">
                  <p className="text-pink-500 font-semibold">Image Placeholder</p>
                  <p className="text-pink-400 text-sm">Upload besins-logo.png to /public</p>
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

              <div className="space-y-2 text-gray-600 mb-6">
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

              {besinsVideoUrl ? (
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <iframe
                    src={getGoogleDrivePreviewUrl(besinsVideoUrl)}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <p className="text-gray-500 font-semibold">Video Placeholder</p>
                    <p className="text-gray-400 text-sm">Add Google Drive link in code</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dopamine Medica Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-200">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-8">
              <h2 className="text-3xl font-bold text-white">
                Dopamine Medica
              </h2>
            </div>
            
            <div className="p-8">
              <div className="w-full h-64 bg-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 mb-6">
                <div className="text-center">
                  <p className="text-purple-500 font-semibold">Image Placeholder</p>
                  <p className="text-purple-400 text-sm">Upload dopamine-logo.png to /public</p>
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

              <div className="space-y-2 text-gray-600 mb-6">
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

              {dopamineVideoUrl ? (
                <div className="w-full h-80 rounded-lg overflow-hidden">
                  <iframe
                    src={getGoogleDrivePreviewUrl(dopamineVideoUrl)}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <p className="text-gray-500 font-semibold">Video Placeholder</p>
                    <p className="text-gray-400 text-sm">Add Google Drive link in code</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
