"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { sessions as defaultSessions } from "@/data/mock";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

const CLOUDINARY_CLOUD_NAME = "drlopxaai";
const CLOUDINARY_UPLOAD_PRESET = "webinar_upload";

export default function AdminDashboard() {
  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const [sessionList, setSessionList] = useState(defaultSessions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [activeTab, setActiveTab] = useState('sessions'); // 'sessions' or 'users'
  const [resetPasswordUserId, setResetPasswordUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!isAdmin && !isLoading) {
      router.push("/login");
    }
    if (!isLoading) {
      loadSessions();
      loadUsers();
    }
  }, [isAdmin, isLoading, router]);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setSessionList(data);
      } else {
        // If no data in Supabase, seed with default sessions
        await seedSessions();
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
      // Fallback to localStorage or default
      const stored = localStorage.getItem("sessions");
      if (stored) {
        setSessionList(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  };

  const seedSessions = async () => {
    try {
      const { error } = await supabase
        .from('sessions')
        .insert(defaultSessions);
      
      if (error) throw error;
      setSessionList(defaultSessions);
    } catch (error) {
      console.error('Error seeding sessions:', error);
      setSessionList(defaultSessions);
    }
  };

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleApproveUser = async (userId: number) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ status: 'approved' })
        .eq('id', userId);
      
      if (error) throw error;
      loadUsers(); // Reload users list
    } catch (error) {
      console.error('Error approving user:', error);
      alert('Gagal menyetujui user. Coba lagi.');
    }
  };

  const handleRejectUser = async (userId: number) => {
    if (confirm("Are you sure you want to reject this user?")) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ status: 'rejected' })
          .eq('id', userId);
        
        if (error) throw error;
        loadUsers(); // Reload users list
      } catch (error) {
        console.error('Error rejecting user:', error);
        alert('Gagal menolak user. Coba lagi.');
      }
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', userId);
        
        if (error) throw error;
        loadUsers(); // Reload users list
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Gagal menghapus user. Coba lagi.');
      }
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !resetPasswordUserId) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', resetPasswordUserId);
      
      if (error) throw error;
      
      alert('Password berhasil direset!');
      setResetPasswordUserId(null);
      setNewPassword("");
      loadUsers();
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Gagal mereset password. Coba lagi.');
    }
  };

  const handleEdit = (session: any) => {
    setEditingId(session.id);
    setEditForm({ ...session });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('sessions')
        .update(editForm)
        .eq('id', editingId);
      
      if (error) throw error;
      
      const updated = sessionList.map((s) =>
        s.id === editingId ? editForm : s
      );
      setSessionList(updated);
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Gagal menyimpan session. Coba lagi.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this session?")) {
      try {
        const { error } = await supabase
          .from('sessions')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        const updated = sessionList.filter((s) => s.id !== id);
        setSessionList(updated);
      } catch (error) {
        console.error('Error deleting session:', error);
        alert('Gagal menghapus session. Coba lagi.');
      }
    }
  };

  const handleAddNew = async () => {
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
    
    try {
      const { error } = await supabase
        .from('sessions')
        .insert(newSession);
      
      if (error) throw error;
      
      setSessionList([...sessionList, newSession]);
      handleEdit(newSession);
    } catch (error) {
      console.error('Error adding session:', error);
      alert('Gagal menambah session. Coba lagi.');
    }
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

      <div className="p-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {activeTab === 'sessions' && (
            <button
              onClick={handleAddNew}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              + Add New Session
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 border-b pb-4">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-4 py-2 rounded ${activeTab === 'sessions' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
          >
            Sessions
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
          >
            User Monitoring
          </button>
        </div>

        {/* User Approval Section - Only show in Users tab */}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">User Approval</h2>
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : users.filter(u => u.status === 'pending').length === 0 ? (
              <p className="text-gray-600">No pending users.</p>
            ) : (
              <div className="space-y-4">
                {users.filter(u => u.status === 'pending').map((user) => (
                  <div key={user.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">No: {user.no || '-'}</p>
                      <p className="text-sm text-gray-500">NIP/NIK: {user.nip}</p>
                      <p className="text-xs text-gray-400">Registered: {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveUser(user.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectUser(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* User Monitoring Section - Only show in Users tab */}
        {activeTab === 'users' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-gray-600">No users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">No.</th>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">NIP/NIK</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Last Access</th>
                      <th className="text-left p-3">Registered</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="p-3">{user.no || '-'}</td>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.nip}</td>
                        <td className="p-3">{user.role}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-sm ${
                            user.status === 'approved' ? 'bg-green-100 text-green-800' :
                            user.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {user.last_access ? new Date(user.last_access).toLocaleString() : 'Never'}
                        </td>
                        <td className="p-3">{new Date(user.created_at).toLocaleDateString()}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setResetPasswordUserId(user.id);
                                setNewPassword("");
                              }}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                              Reset Password
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Sessions Section - Only show in Sessions tab */}
        {activeTab === 'sessions' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Sessions</h2>
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
          </>
        )}
      </div>

      {/* Reset Password Modal */}
      {resetPasswordUserId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow w-96">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>
            <input
              className="border p-2 mb-4 w-full"
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleResetPassword}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  setResetPasswordUserId(null);
                  setNewPassword("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
