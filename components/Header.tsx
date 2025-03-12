"use client"

import { MoonIcon, SunIcon, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useLanguage } from "./LanguageProvider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">FC</span>
          </div>
          <span className="font-bold text-lg sm:text-xl">{language === "ar" ? "حاسبة اللياقة" : "FitCalc"}</span>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Select language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 sm:h-9 sm:w-9"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <MoonIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </Button>
        </nav>
      </div>
    </header>
  )
}

