import { AuthContext } from "@/contexts/AuthContext";
import { use } from "react";


export function useAuthContext() {
  const value = use(AuthContext);

  if (!value) {
    throw new Error("useAuthContext must be wrapped in <AuthContextProvider />");
  }

  return value;
}