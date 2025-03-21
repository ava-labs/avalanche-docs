"use client"

import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

type ColorTheme = "red" | "blue" | "green" | "purple" | "orange" | "cyan" | "amber" | "emerald" | "indigo" | "pink"

interface ContainerProps {
  title: string
  children: ReactNode
  description?: string
  subDescription?: string
  showConfetti?: boolean
  logoSrc?: string
  logoAlt?: string
  logoColorTheme?: ColorTheme
}

const colorThemeMap: Record<ColorTheme, { bg: string; darkBg: string; hover: string; darkHover: string }> = {
  red: {
    bg: "bg-red-100",
    darkBg: "dark:bg-red-900/30",
    hover: "hover:text-red-600",
    darkHover: "dark:hover:text-red-400",
  },
  blue: {
    bg: "bg-blue-100",
    darkBg: "dark:bg-blue-900/30",
    hover: "hover:text-blue-600",
    darkHover: "dark:hover:text-blue-400",
  },
  green: {
    bg: "bg-green-100",
    darkBg: "dark:bg-green-900/30",
    hover: "hover:text-green-600",
    darkHover: "dark:hover:text-green-400",
  },
  purple: {
    bg: "bg-purple-100",
    darkBg: "dark:bg-purple-900/30",
    hover: "hover:text-purple-600",
    darkHover: "dark:hover:text-purple-400",
  },
  orange: {
    bg: "bg-orange-100",
    darkBg: "dark:bg-orange-900/30",
    hover: "hover:text-orange-600",
    darkHover: "dark:hover:text-orange-400",
  },
  cyan: {
    bg: "bg-cyan-100",
    darkBg: "dark:bg-cyan-900/30",
    hover: "hover:text-cyan-600",
    darkHover: "dark:hover:text-cyan-400",
  },
  amber: {
    bg: "bg-amber-100",
    darkBg: "dark:bg-amber-900/30",
    hover: "hover:text-amber-600",
    darkHover: "dark:hover:text-amber-400",
  },
  emerald: {
    bg: "bg-emerald-100",
    darkBg: "dark:bg-emerald-900/30",
    hover: "hover:text-emerald-600",
    darkHover: "dark:hover:text-emerald-400",
  },
  indigo: {
    bg: "bg-indigo-100",
    darkBg: "dark:bg-indigo-900/30",
    hover: "hover:text-indigo-600",
    darkHover: "dark:hover:text-indigo-400",
  },
  pink: {
    bg: "bg-pink-100",
    darkBg: "dark:bg-pink-900/30",
    hover: "hover:text-pink-600",
    darkHover: "dark:hover:text-pink-400",
  },
}

export function Container({
  title,
  children,
  description,
  subDescription,
  logoSrc = "/small-logo.png",
  logoAlt = "Logo",
  logoColorTheme = "red",
}: ContainerProps) {
  const colorTheme = colorThemeMap[logoColorTheme] || colorThemeMap.red

  return (
    <div
      className={cn(
        "w-full",
        "rounded-xl",
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200 dark:border-zinc-800",
        "shadow-md",
        "overflow-hidden",
        "mx-auto",
        "my-8",
        "relative",
      )}
    >
      {/* Gradient background header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary/60 p-4">
        <div className="flex items-center gap-4">
          <div
            className={`${colorTheme.bg} ${colorTheme.darkBg} rounded-lg p-2.5 h-[60px] w-[60px] flex items-center justify-center flex-shrink-0`}
          >
            <img src={logoSrc || "/small-logo.png"} alt={logoAlt} className="h-8 w-auto" />
          </div>

          <div className="flex flex-col justify-center h-[60px]">
            <h3 className="text-base font-semibold text-zinc-800 dark:text-white">{title}</h3>
            {description && <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>}
            {subDescription && <p className="text-xs text-zinc-500 dark:text-zinc-400">{subDescription}</p>}
          </div>
        </div>
      </div>

      {/* Content area with left padding aligned with logo */}
      <div className="pl-4 pr-6 py-6 space-y-6 text-zinc-900 dark:text-zinc-100">
        <div className="space-y-6">{children}</div>

        <div className="pt-4 mt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Explore more</span>
            <a
              href="https://build.avax.network/tools/l1-toolbox"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1 text-zinc-700 ${colorTheme.hover} dark:text-zinc-300 ${colorTheme.darkHover} font-medium transition-colors`}
            >
              <img src="/small-logo.png" alt="Avalanche" className="h-3 w-auto" />
              <span>Avalanche Builder Tooling</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

