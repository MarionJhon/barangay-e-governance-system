"use client";
import { SignInType } from "@/lib/schema/auth";
import { createClient } from "@/lib/supabase/client";
import { AuthContextType } from "@/lib/types/auth.type";
import { User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
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

        return () => subscription.unsubscribe;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  const signIn = async (accountInfo: SignInType) => {
    try {
      const { data, error } =
        await supabase.auth.signInWithPassword(accountInfo);

      if (error) {
        console.error("Supabase sign-in error: ", error.message);
        return { success: false, error: error.message };
      }

      console.log("Supabase sign-in success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-in: ", error);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again",
      };
    }
  };

  const signUp = async () => {
    try {
      const {} = supabase.auth.admin.createUser({
        email: 
        password:
        user_metadata: {
          resident_id:
          username:
          role:
        }
      })
    } catch (error) {
      
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn }}>
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
