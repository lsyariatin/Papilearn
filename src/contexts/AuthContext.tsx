"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  id: number;
  email: string;
  name: string;
  nip: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
}

interface AuthContextType {
  isAdmin: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  registerUser: (email: string, password: string, name: string, nip: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAdmin");
    const storedUser = localStorage.getItem("user");
    setIsAdmin(storedAuth === "true");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Admin login (hardcoded)
    if (email === "admin@papilocare.com" && password === "@Dopaminemedica123") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return { success: true, message: "" };
    }

    // User login (check Supabase)
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        // Check approval status
        if (data.status !== 'approved') {
          return { success: false, message: "Akun belum disetujui oleh admin" };
        }

        // Update last access
        await supabase
          .from('users')
          .update({ last_access: new Date().toISOString() })
          .eq('id', data.id);

        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        return { success: true, message: "" };
      }

      return { success: false, message: "Email atau password salah" };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: "Email atau password salah" };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setUser(null);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user");
  };

  const registerUser = async (email: string, password: string, name: string, nip: string) => {
    try {
      // Check if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (existingUser) {
        return false; // Email already exists
      }

      // Insert new user with status 'pending'
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            email,
            password,
            name,
            nip,
            role: 'user',
            status: 'pending'
          }
        ]);

      if (insertError) throw insertError;

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
