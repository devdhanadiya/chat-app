import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "@/styles/main.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Provider from "@/Provider";
import { ChildrenProps } from "@/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatty",
  description: "A chatting application",
};

export default function RootLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}