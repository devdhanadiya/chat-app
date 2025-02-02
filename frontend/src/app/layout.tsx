import type { Metadata } from "next";
import "@/styles/main.css"
import { ChildrenProps } from "@/types";

export const metadata: Metadata = {
  title: "Chatify",
  description: "Full stack chat application",
};

export default function RootLayout({ children }: Readonly<ChildrenProps>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
