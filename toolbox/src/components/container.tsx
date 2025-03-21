"use client"

import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface ContainerProps {
  title: string
  children: ReactNode
  description?: string
  subDescription?: string
  showConfetti?: boolean
  logoSrc?: string
  logoAlt?: string
}

export function Container({
  title,
  children,
  description,
  subDescription,
  logoSrc = "/small-logo.png",
  logoAlt = "Logo",
}: ContainerProps) {
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
      {/* Gradient background header with logo and descriptions */}
      <div className="bg-gradient-to-r from-primary/90 to-primary/60 p-4">
        <div className="flex items-center gap-4">
          <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-2.5 h-[60px] w-[60px] flex items-center justify-center flex-shrink-0">
            <img src={logoSrc || "/small-logo.png"} alt={logoAlt} className="h-8 w-auto" />
          </div>

          <div className="flex flex-col justify-center h-[60px]">
            <h3 className="text-base font-semibold text-zinc-800 dark:text-white">{title}</h3>
            {description && <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>}
            {subDescription && <p className="text-xs text-zinc-500 dark:text-zinc-400">{subDescription}</p>}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 text-zinc-900 dark:text-zinc-100">
        <div className="space-y-6">{children}</div>

        <div className="pt-4 mt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Explore more</span>
            <a
              href="https://build.avax.network/tools/l1-toolbox"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-zinc-700 hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400 font-medium transition-colors"
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

