import { User, Session, WeakPassword } from "@supabase/supabase-js";
import { SignInType, SignUpType } from "../schema/auth";

type SignInResult =
  | {
      success: boolean;
      data: { user: User; session: Session; weakPassword?: WeakPassword };
      error?: string;
    }
  | { success: boolean; error: string };

type SignUpResult =
  | {
      success: boolean;
      data?: any;
      error?: string;
    }
  | undefined;

type SignOutResult = { success: boolean; error?: string } | undefined;

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (accountInfo: SignInType) => Promise<SignInResult>;
  signUp: (formValues: SignUpType, residentId: string) => Promise<SignUpResult>;
  signOut: () => Promise<SignOutResult>;
}
