import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProviders } from "@/providers/session-providers";
import { Toaster } from "sonner";
import { Suspense } from "react";
import HeaderBar from "@/components/nav-layout/header-layout/header-layout";
import FooterBar from "@/components/nav-layout/footer-layout/footer-layout";

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

          <div className="flex flex-col justify-between h-dvh w-dvw">
            <Suspense fallback={null}>
              <HeaderBar />
            </Suspense>
            <div className="flex-1 md:px-4">{children}</div>
            <FooterBar />
          </div>
        </SessionProviders>
      </body>
    </html>
  );
}
