"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { sessions as defaultSessions } from "@/data/mock";
import Navbar from "@/components/Navbar";

const CLOUDINARY_CLOUD_NAME = "drlopxaai";
const CLOUDINARY_UPLOAD_PRESET = "webinar_upload";

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [sessionList, setSessionList] = useState(defaultSessions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login");
    }
    const stored = localStorage.getItem("sessions");
    if (stored) {
      setSessionList(JSON.parse(stored));
    }
  }, [isAdmin, router]);

  const handleEdit = (session: any) => {
    setEditingId(session.id);
    setEditForm({ ...session });
  };

  const handleSave = () => {
    const updated = sessionList.map((s) =>
      s.id === editingId ? editForm : s
    );
    setSessionList(updated);
    localStorage.setItem("sessions", JSON.stringify(updated));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this session?")) {
      const updated = sessionList.filter((s) => s.id !== id);
      setSessionList(updated);
      localStorage.setItem("sessions", JSON.stringify(updated));
    }
  };

  const handleAddNew = () => {
    const newId = Math.max(...sessionList.map((s) => s.id)) + 1;
    const newSession = {
      id: newId,
      title: "New Session",
      speaker: "",
      description: "",
      date: "",
      time: "",
      zoom: "",
      video: "",
      attendance: "",
      image: "",
      materials: []
    };
    setSessionList([...sessionList, newSession]);
    localStorage.setItem("sessions", JSON.stringify([...sessionList, newSession]));
    handleEdit(newSession);
  };

  const handleAddMaterial = () => {
    setEditForm({
      ...editForm,
      materials: [
        ...(editForm.materials || []),
        { title: "New Material", link: "#" }
      ]
    });
  };

  const handleRemoveMaterial = (index: number) => {
    setEditForm({
      ...editForm,
      materials: editForm.materials.filter((_: any, i: number) => i !== index)
    });
  };

  const convertGoogleDriveLink = (url: string) => {
    if (!url) return url;
    
    // Convert Google Drive share link to direct link
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      const fileId = match[1];
      // Use Google Drive preview format
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
    }
    
    // Already a direct link or other URL, return as is
    return url;
  };

  const handleImageURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalUrl = e.target.value;
    const convertedUrl = convertGoogleDriveLink(originalUrl);
    setEditForm({ ...editForm, image: convertedUrl });
  };

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setEditForm({ ...editForm, image: data.secure_url });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload gagal. Coba lagi.');
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-pink-50 min-h-screen">
      <Navbar />

      <div className="p-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleAddNew}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add New Session
          </button>
        </div>

        <div className="space-y-6">
          {sessionList.map((session) => (
            <div key={session.id} className="bg-white p-6 rounded-lg shadow">
              {editingId === session.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                      className="border p-2 w-full"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Speaker</label>
                    <input
                      className="border p-2 w-full"
                      value={editForm.speaker}
                      onChange={(e) => setEditForm({ ...editForm, speaker: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                      className="border p-2 w-full"
                      rows={3}
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Date</label>
                      <input
                        className="border p-2 w-full"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Time</label>
                      <input
                        className="border p-2 w-full"
                        value={editForm.time}
                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Zoom Link</label>
                    <input
                      className="border p-2 w-full"
                      value={editForm.zoom}
                      onChange={(e) => setEditForm({ ...editForm, zoom: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Image</label>
                    <div className="flex gap-2 mb-2">
                      <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                        Upload to Cloudinary
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCloudinaryUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {editForm.image && (
                      <div className="mt-2">
                        <img
                          src={editForm.image}
                          alt="Preview"
                          className="w-48 h-24 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Video URL</label>
                    <input
                      className="border p-2 w-full"
                      value={editForm.video}
                      onChange={(e) => setEditForm({ ...editForm, video: e.target.value })}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block font-semibold">Materials</label>
                      <button
                        onClick={handleAddMaterial}
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded"
                      >
                        + Add Material
                      </button>
                    </div>
                    {editForm.materials?.map((m: any, i: number) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          className="border p-2 flex-1"
                          placeholder="Title"
                          value={m.title}
                          onChange={(e) => {
                            const newMaterials = [...editForm.materials];
                            newMaterials[i].title = e.target.value;
                            setEditForm({ ...editForm, materials: newMaterials });
                          }}
                        />
                        <input
                          className="border p-2 flex-1"
                          placeholder="Link"
                          value={m.link}
                          onChange={(e) => {
                            const newMaterials = [...editForm.materials];
                            newMaterials[i].link = e.target.value;
                            setEditForm({ ...editForm, materials: newMaterials });
                          }}
                        />
                        <button
                          onClick={() => handleRemoveMaterial(i)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-2">{session.title}</h3>
                  <p className="text-gray-600 mb-2">{session.speaker}</p>
                  <p className="text-sm text-gray-500">{session.date} • {session.time}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(session)}
                      className="bg-primary text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
