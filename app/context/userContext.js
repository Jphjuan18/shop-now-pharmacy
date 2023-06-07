"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authContext, setAuthContext] = useState(false);

  // Load user from session storage on mount
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("userContext"));
    const storedAuth = JSON.parse(sessionStorage.getItem("authContext"));
    // console.log("stored user:" + storedUser);
    // console.log("stored Auth:" + storedAuth);
    if (storedUser) {
      setUser(storedUser);
      setAuthContext(storedAuth);
    }
  }, []);

  // Save user to session storage on change
  useEffect(() => {
    sessionStorage.setItem("userContext", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, authContext, setAuthContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
