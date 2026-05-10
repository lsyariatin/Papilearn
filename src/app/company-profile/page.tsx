"use client";

import Navbar from "@/components/Navbar";

export default function CompanyProfile() {
  const besinsVideoUrl = ""; // Add Google Drive link here
  const dopamineVideoUrl = "https://drive.google.com/file/d/1x8xea_LN28IWvmmeV2rmuiRTgvrjfnEs/view?usp=drive_link"; // Add Google Drive link here

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
              <div className="w-full h-64 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-pink-300 mb-6">
                <img
                  src="/besins-logo.png"
                  alt="Besins Healthcare Logo"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="text-center hidden">
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

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-700 mb-3">Company Video</h3>
              </div>

              {besinsVideoUrl ? (
                <div className="w-full h-[500px] rounded-lg overflow-hidden">
                  <iframe
                    src={getGoogleDrivePreviewUrl(besinsVideoUrl)}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
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
              <div className="w-full h-64 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 mb-6">
                <img
                  src="/dopamine-logo.png"
                  alt="Dopamine Medica Logo"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="text-center hidden">
                  <p className="text-purple-500 font-semibold">Image Placeholder</p>
                  <p className="text-purple-400 text-sm">Upload dopamine-logo.png to /public</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Dopamine Medica Indonesia is a company engaged in healthcare, medical education, scientific support, and the distribution of medical and laboratory supplies. We are committed to supporting the advancement of healthcare services through innovation, continuous education, and collaboration with healthcare professionals, medical institutions, laboratories, and various strategic partners.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-600 mb-2">Our Program</h3>
                  <p className="text-gray-600 text-sm">
                    Our programs include medical webinars and workshops, healthcare education platforms, scientific research support, laboratory and medical supply distribution, clinical collaboration projects, and continuous professional development initiatives for healthcare professionals
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-600 mb-2">Collaboration</h3>
                  <p className="text-gray-600 text-sm">
                    We collaborate with industry partners including biopharmaceutical companies, hospitals, healthcare clinics, laboratories, universities, and research organizations in areas such as preclinical and clinical research, laboratory testing services, national and international grant-based research, medical instrument distribution, scientific publications and book publishing, webinars and symposiums, community service programs, as well as professional training and continuous medical education initiatives.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-gray-600 mb-6">
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Medical publishing & scientific content development, including medical books, guideline books, health education materials, scientific journals, SOPs, manuals, and digital healthcare content.
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Organization of medical events & scientific meetings such as webinars, seminars, workshops, conferences, symposiums, exhibitions, medical gatherings, and CME/CPD activities.
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Training & healthcare education programs for healthcare professionals, laboratories, pharmacy, medical devices, genomics, precision medicine, ultrasonography, and wellness therapy.
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Healthcare support & medical scientific services, including preventive health program assistance, laboratory and genomic interpretation guidelines, healthcare consultations, and scientific support services.
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Preclinical and clinical research projects conducted through our dedicated research institution, Dopamine Science Institute, including collaborative research, scientific development, and grant-based national and international research initiatives.
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Distribution of medical & laboratory products, including pharmaceutical products, traditional medicine, laboratory instruments, medical devices, reagents, consumables, and laboratory supplies.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-700 mb-3">Company Video</h3>
              </div>

              {dopamineVideoUrl ? (
                <div className="w-full h-[500px] rounded-lg overflow-hidden">
                  <iframe
                    src={getGoogleDrivePreviewUrl(dopamineVideoUrl)}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
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
