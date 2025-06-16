"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) return null 

  return (
    <div className="flex items-center space-x-2">
      <Sun
        className={`w-4 h-4 ${
          theme === "dark" ? "text-gray-400 scale-75 rotate-12" : "text-black scale-100"
        }`}
      />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <Moon
        className={`w-5 h-5 ${
          theme === "light" ? "text-gray-400 scale-75 rotate-12" : "text-white scale-100"
        }`}
      />
    </div>
  )
}
