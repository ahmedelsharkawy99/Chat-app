import { User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../firebase/handlers/auth";

type AuthState = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthState | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserState = async (): Promise<void> => {
      const user: User | null = await getCurrentUser();
      setCurrentUser(user);
    };

    getUserState();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
