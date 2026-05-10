import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          PAPI-LEARN WEBINAR SERIES
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Pelajari lebih dalam tentang kanker serviks, pencegahan,
          dan pengobatan melalui 6 sesi bersama dokter ahli.
        </p>

        <Link
          href="/detail"
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          PAPI-LEARN-LMS
        </Link>
      </div>

      {/* ABOUT */}
      <div className="p-10 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">
          Tentang Webinar
        </h2>

        <p className="text-gray-600">
          Webinar ini dirancang untuk memberikan edukasi lengkap
          mengenai kanker serviks, mulai dari deteksi dini hingga
          metode pengobatan modern termasuk terapi intravaginal.
        </p>
      </div>

      {/* IMAGE SECTION */}
      <div className="flex justify-center pb-10">
        <img
          src="/hero.jpeg"
          className="rounded-xl shadow w-full h-auto"
          alt="About"
        />
      </div>
    </div>
  );
}
