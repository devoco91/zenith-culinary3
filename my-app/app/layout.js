// app/layout.jsx

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nigerian Culinary Courses",
  description: "Explore hands-on local cooking classes and expert instruction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
