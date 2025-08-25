"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Globe, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SignedIn,SignedOut, SignInButton,SignOutButton,UserButton,SignUpButton } from "@clerk/nextjs"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
]

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">E</span>
          </div>
          <span className="font-space-grotesk font-bold text-xl">EventHub</span>
        </div>

        <div className="flex items-center space-x-4">
          <SignedOut>
              <SignInButton forceRedirectUrl="./admin" />
              <SignUpButton forceRedirectUrl="./admin">
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {currentLanguage.flag} {currentLanguage.name}
                </span>
                <span className="sm:hidden">{currentLanguage.flag}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setCurrentLanguage(lang)} className="gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className="h-9 w-9 px-0"
            disabled={!mounted}
          >
            {mounted && (
              <>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
