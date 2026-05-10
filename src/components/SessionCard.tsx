"use client";

import { useRouter } from "next/navigation";

export default function SessionCard({ session }: { session: any }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/session/${session.id}`)}
      className="bg-white rounded-xl shadow-lg border border-pink-200 hover:shadow-2xl transition cursor-pointer overflow-hidden"
    >
      <img
        src={session.image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=200&fit=crop"}
        className="w-full h-40 object-cover"
        alt={session.title}
      />

      <div className="p-5">
        <h3 className="font-bold text-lg">{session.title}</h3>
        <p className="text-gray-500 mb-2">{session.speaker}</p>

        <div className="text-sm text-gray-600 mb-3">
          <p>📅 {session.date}</p>
          <p>⏰ {session.time}</p>
        </div>

        <a
          href={session.zoom}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-pink-500 font-semibold text-sm hover:underline"
        >
          Join Zoom →
        </a>
      </div>
    </div>
  );
}
