import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/accountApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
