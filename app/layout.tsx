import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProviders } from "@/providers/session-providers";
import { Toaster } from "sonner";
import { Suspense } from "react";
import HeaderBar from "@/components/nav-layout/header-layout/header-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "report staff",
  description: "report staff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviders>
          <Toaster position="top-center" />

          <div className="flex flex-col h-screen w-screen overflow-y-auto px-4">
            <Suspense fallback={null}>
              <HeaderBar />
            </Suspense>
            {children}
          </div>
        </SessionProviders>
      </body>
    </html>
  );
}
