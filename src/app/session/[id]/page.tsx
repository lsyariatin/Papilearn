"use client";

import { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { sessions as defaultSessions } from "@/data/mock";

export default function SessionDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [sessions, setSessions] = useState(defaultSessions);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const session = sessions.find((s) => s.id === Number(resolvedParams.id));

  useEffect(() => {
    loadSessions();
  }, [resolvedParams.id]);

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

  const getGoogleDrivePreviewUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return null;
  };

  const handlePreview = (link: string) => {
    const preview = getGoogleDrivePreviewUrl(link);
    if (preview) {
      setPreviewUrl(preview);
    } else {
      window.open(link, '_blank');
    }
  };

  const closePreview = () => {
    setPreviewUrl(null);
  };

  if (loading) {
    return (
      <div className="bg-pink-50 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) return <div className="p-10">Not found</div>;

  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-2">
          {session.title}
        </h1>

        <p className="text-gray-600 mb-4">
          {session.speaker}
        </p>

        {/* JADWAL */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 border border-pink-200">
          <p>📅 {session.date}</p>
          <p>⏰ {session.time}</p>

          <a
            href={session.zoom}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 font-semibold"
          >
            Join Zoom →
          </a>
        </div>

        {/* DESKRIPSI */}
        <p className="text-gray-700 mb-6">
          {session.description}
        </p>

        {/* VIDEO */}
        {session.video && (
          <div className="mb-6">
            {session.video.includes('youtube.com') || session.video.includes('youtu.be') ? (
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={session.video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="YouTube video player"
                ></iframe>
              </div>
            ) : (
              <iframe
                className="w-full h-[400px] rounded-xl"
                src={session.video}
                allowFullScreen
              ></iframe>
            )}
          </div>
        )}

        {/* MATERIAL */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">
            Materi Pembelajaran
          </h2>

          <div className="space-y-3">
            {session.materials.map((m: any, i: number) => {
              const isGoogleDrive = m.link.includes('drive.google.com');
              return (
                <div
                  key={i}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition"
                >
                  <span>📄 {m.title}</span>
                  <div className="flex gap-2">
                    {isGoogleDrive && (
                      <button
                        onClick={() => handlePreview(m.link)}
                        className="text-blue-500 text-sm font-semibold hover:underline"
                      >
                        Preview
                      </button>
                    )}
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 text-sm font-semibold hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PREVIEW MODAL */}
        {previewUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-bold">Document Preview</h3>
                <button
                  onClick={closePreview}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={previewUrl}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
