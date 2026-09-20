import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Brandify - AI Brand Intelligence + Website Generation",
  description: "Transform your brand idea into a complete website with AI-powered art direction",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
