"use client";

import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

interface User {
  // Define the structure of the user object if needed
  // For example:
  id: number;
  username: string;
  // Add more properties as needed
}

const storedUser: string | null = localStorage?.getItem("user");
const parsedUser: any = storedUser ? JSON.parse(storedUser) : null;
const INITIAL_STATE = {
  //   currentUser: JSON.parse(localStorage.getItem("user")) || null,
  currentUser: parsedUser,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch]: any = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  let initialValue = { currentUser: state.currentUser, dispatch };

  return (
    <AuthContext.Provider value={initialValue}>{children}</AuthContext.Provider>
  );
};
