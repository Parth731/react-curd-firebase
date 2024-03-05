"use client";
import { AuthContext, AuthContextProvider } from "@/context/AuthContext";
import {
  DarkModeContext,
  DarkModeContextProvider,
} from "@/context/darkModeContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home({ children }: any) {
  const { darkMode } = useContext(DarkModeContext);
  const router = useRouter();
  const { currentUser }: any = useContext(AuthContext);
  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <h1>Home</h1>
    </div>
  );
}
