import type { Metadata } from "next";
import "@/styles/main.css"

export const metadata: Metadata = {
  title: "Chatify",
  description: "Full stack chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
