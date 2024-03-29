import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  DarkModeContext,
  DarkModeContextProvider,
} from "@/context/darkModeContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DarkModeContextProvider>
          <Toaster position="top-center" />
          <AuthContextProvider>{children}</AuthContextProvider>
        </DarkModeContextProvider>
      </body>
    </html>
  );
}
