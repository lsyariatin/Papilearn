import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          PapiLearn & PapiRise Webinar Series
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Join Papilearn & Papirise for a comprehensive learning journey on cervical cancer through 6 exclusive sessions led by expert doctors. Gain deeper insights into prevention, early detection, diagnosis, and the latest treatment approaches to better understand cervical cancer and its management.
        </p>

        <Link
          href="/detail"
          className="bg-primary text-white px-6 py-3 rounded-xl"
        >
          Webinar Series
        </Link>
      </div>

      {/* ABOUT */}
      <div className="p-10 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">
          About Webinar
        </h2>

        <p className="text-gray-600">
          Evidence-Based Clinical Webinar Series HPV & Cervical Lesion Management
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
