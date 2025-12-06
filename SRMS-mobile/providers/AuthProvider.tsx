import { AuthContext } from "@/contexts/AuthContext";
import { useStorageState } from "@/hooks/useStorageState";
import { PropsWithChildren } from "react";


export function AuthProvider({ children }: PropsWithChildren) {
  const [storageState, setStorageState] = useStorageState("accessToken");

  return (
    <AuthContext.Provider
      value={{
        signIn: (accessToken) => setStorageState(accessToken),
        signOut: () => setStorageState(null),
        accessToken: storageState.value,
        isPending: storageState.isPending,
        isAuthenticated: (storageState.value === null) ? false : true,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}