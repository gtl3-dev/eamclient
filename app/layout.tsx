import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SideBar } from "@/app/components/SideBar";
import NavBar from "@/app/components/NavBar";
import AuthProvider from "./auth/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EAM Lite App",
  description: "Enterprise Asset Management Lite App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NavBar />
          <div className="grid grid-cols-6 gap-4">
            <div className="col-start-1 col-end-2">
              <SideBar />
            </div>
            <div className="col-start-2 col-end-7">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
