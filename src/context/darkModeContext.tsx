"use client";
import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  darkMode: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch]: any = useReducer(DarkModeReducer, INITIAL_STATE);

  let initialValue = { darkMode: state.darkMode, dispatch };

  return (
    <DarkModeContext.Provider value={initialValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
