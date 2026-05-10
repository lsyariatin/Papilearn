"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SessionCard from "@/components/SessionCard";
import { sessions as defaultSessions } from "@/data/mock";

export default function Detail() {
  const [sessions, setSessions] = useState(defaultSessions);

  useEffect(() => {
    const stored = localStorage.getItem("sessions");
    if (stored) {
      setSessions(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Webinar Schedule
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {sessions.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
