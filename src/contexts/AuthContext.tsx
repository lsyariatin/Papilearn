"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  id: number;
  no: string;
  email: string;
  name: string;
  nip: string;
  role: 'user' | 'admin';
  status: 'pending' | 'approved' | 'rejected';
}

interface AuthContextType {
  isAdmin: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  registerUser: (email: string, password: string, name: string, nip: string, no: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const inactivityTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds

  // Check inactivity and logout if timeout exceeded
  useEffect(() => {
    const checkInactivity = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity) {
        const elapsed = Date.now() - parseInt(lastActivity);
        if (elapsed > inactivityTimeout) {
          logout();
        }
      }
    };

    checkInactivity();

    // Update last activity on user interactions
    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    // Listen for user activity
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    // Set activity on login
    if (isAdmin || user) {
      updateActivity();
    }

    // Check inactivity periodically
    const interval = setInterval(checkInactivity, 60000); // Check every minute

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(interval);
    };
  }, [isAdmin, user]);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAdmin");
    const storedUser = localStorage.getItem("user");
    setIsAdmin(storedAuth === "true");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Admin login (hardcoded)
    if (email === "admin@papilocare.com" && password === "@Dopaminemedica123") {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("lastActivity", Date.now().toString());
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
        localStorage.setItem("lastActivity", Date.now().toString());
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
    localStorage.removeItem("lastActivity");
  };

  const registerUser = async (email: string, password: string, name: string, nip: string, no: string) => {
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
            no,
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
    <AuthContext.Provider value={{ isAdmin, user, isLoading, login, logout, registerUser }}>
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
