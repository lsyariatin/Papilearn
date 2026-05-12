"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import SessionCard from "@/components/SessionCard";
import { supabase } from "@/lib/supabase";
import { sessions as defaultSessions } from "@/data/mock";
import { useAuth } from "@/contexts/AuthContext";

export default function Detail() {
  const [sessions, setSessions] = useState(defaultSessions);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const loadSessions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setSessions(data);
      } else {
        // Fallback to default sessions
        setSessions(defaultSessions);
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
      // Fallback to localStorage or default
      const stored = localStorage.getItem("sessions");
      if (stored) {
        setSessions(JSON.parse(stored));
      } else {
        setSessions(defaultSessions);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirect to login if not logged in
    if (!user && !isAdmin) {
      router.push("/login");
    }
  }, [user, isAdmin, router]);

  useEffect(() => {
    loadSessions();
  }, []);

  // Redirect to login if not logged in
  if (!user && !isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-pink-50 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          PAPI-LEARN WEBINAR SERIES
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
