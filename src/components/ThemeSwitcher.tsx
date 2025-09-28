"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"

const themes = [
  { value: "light", label: "Ocean Blue", color: "#3B82F6" },
  { value: "dark", label: "Dark Pro", color: "#1F2937" },
  { value: "medical", label: "Medical Clean", color: "#10B981" },
  { value: "sunset", label: "Warm Sunset", color: "#F59E0B" },
  { value: "royal", label: "Royal Purple", color: "#8B5CF6" }
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-4 h-4 rounded-full border border-gray-300"
              style={{ backgroundColor: themeOption.color }}
            />
            <span className="flex-1">{themeOption.label}</span>
            {theme === themeOption.value && (
              <span className="text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}