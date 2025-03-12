"use client"

import type React from "react"
import "./globals.css"
import { Cairo } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LanguageProvider } from "@/components/LanguageProvider"

const cairo = Cairo({ subsets: ["latin", "arabic"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cairo.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                {children}
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

