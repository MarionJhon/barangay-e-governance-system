"use client";
import { createClient } from "@/lib/supabase/client";
import { AuthContextType } from "@/lib/types/auth.type";
import { User } from "@supabase/supabase-js";
import { signUp, signIn, signOut } from "@/lib/action/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);
        console.log(session?.user);

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
          setUser(session?.user ?? null);
        });

        return () => subscription?.unsubscribe();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();  
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
