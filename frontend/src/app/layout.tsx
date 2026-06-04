import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../features/auth/AuthContext";

export const metadata: Metadata = {
  title: "TileVista — 3D Virtual Showroom & Showroom Management System",
  description: "Experience premium virtual tile and bathware customizations, real-time inventory management, and POS tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-indigo-600 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
