import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "PAC Companion - Pokemon Auto Chess Helper",
  description:
    "Your ultimate Pokemon Auto Chess companion tool. Item cheatsheet, synergy guide, and pokemon search to help you climb the ranks.",
  keywords: [
    "Pokemon Auto Chess",
    "PAC",
    "item guide",
    "synergy",
    "cheatsheet",
    "companion",
  ],
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
