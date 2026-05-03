import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAC Companion - Pokemon Auto Chess Reference",
  description: "Pokemon Auto Chess companion app with Pokemon search and item cheatsheet",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[hsl(222,47%,8%)]">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
