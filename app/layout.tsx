import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import SharedLayout from "@/components/shared-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cat Adoption Center",
  description: "Find your perfect feline companion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SharedLayout>{children}</SharedLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
