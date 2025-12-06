import { createContext } from "react";


type AuthContextType = {
  signIn: (accessToken: string) => void;
  signOut: () => void;
  accessToken: string | null;
  isPending: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  accessToken: null,
  isPending: false,
  isAuthenticated: false
});