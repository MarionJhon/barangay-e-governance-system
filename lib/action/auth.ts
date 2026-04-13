"use server";
import { SignUpType, SignInType } from "@/lib/schema/auth";
import supabaseAdmin from "../supabase/admin";
import { createClient } from "../supabase/server";

export const signUp = async (formValues: SignUpType, residentId: string) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser();
    const callerRole = user?.app_metadata?.role;

    if (authError || !user || !["admind", "Secretary"].includes(callerRole)){
      return {success: false, error: "Unauthorized User"}
    }

      const { data: residentInfo, error: residentError } = await supabaseAdmin
        .from("resident")
        .select("id,email_address")
        .eq("id", residentId)
        .single();

    if (residentError || !residentInfo) {
      return { success: false, error: "Resident not found" };
    }

    if (!residentInfo?.email_address) {
      return {
        success: false,
        error: "No email found for this resident. Please update their profile.",
      };
    }

    const { data: role } = await supabaseAdmin
      .from("barangay_officials")
      .select("barangay_official,position")
      .eq("barangay_official", residentId)
      .single();

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: residentInfo?.email_address,
      email_confirm: true,
      password: formValues.password,
      app_metadata: {
        role: role?.position || "resident",
      },
      user_metadata: {
        resident_id: residentId,
        username: residentInfo?.email_address,
      },
    });

    if (error) {
      console.error("Supabase sign-up error: ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error: ", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const signIn = async (accountInfo: SignInType) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword(accountInfo);

    if (error) {
      console.error("Supabase sign-in error: ", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error during sign-in: ", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again",
    };
  }
};

export const signOut = async () => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error ", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error signing out", error);
    return { success: false, error: 'An unexpected error occurred' };
  }
};
