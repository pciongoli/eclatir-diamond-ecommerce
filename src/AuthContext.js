// src/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const useAuth = () => {
   return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const signIn = () => {
      setIsAuthenticated(true);
   };

   const signOut = () => {
      setIsAuthenticated(false);
   };

   const value = {
      isAuthenticated,
      signIn,
      signOut,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuth };
