"use client";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main className="p-6">{children}</main>
          {/* <Footer /> */}
        </SessionProvider>
      </body>
    </html>
  );
}
