import { User, Session, WeakPassword } from "@supabase/supabase-js";
import { SignInType } from "../schema/auth";

type SignInResult =
  | {
      success: boolean;
      data: { user: User; session: Session; weakPassword?: WeakPassword };
    }
  | { success: boolean; error: string };

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (accountInfo: SignInType) => Promise<SignInResult>;
}
