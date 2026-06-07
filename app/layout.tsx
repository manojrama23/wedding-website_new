import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BGMPlayer from "@/components/BGMPlayer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Maaya Wedding 2026",
  description: "Join us to celebrate our special day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-800">
        <Navbar />
        <main>{children}</main>
        <footer className="text-center py-8 text-gray-300 text-sm border-t border-gray-100">
          Made with love · {new Date().getFullYear()}
        </footer>
        <BGMPlayer />
      </body>
    </html>
  );
}
