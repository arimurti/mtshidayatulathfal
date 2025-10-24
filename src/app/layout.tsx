import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Formulir Online - Sistem Pendaftaran Digital",
  description: "Aplikasi formulir pendaftaran online dengan dashboard admin untuk mengelola data pendaftar",
  keywords: ["formulir online", "pendaftaran", "admin dashboard", "Next.js", "TypeScript"],
  authors: [{ name: "Formulir Online Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Formulir Online - Sistem Pendaftaran Digital",
    description: "Aplikasi formulir pendaftaran online dengan dashboard admin",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
