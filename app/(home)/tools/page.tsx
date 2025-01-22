'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Cpu, Code, Coins } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'red' | 'blue' | 'green' | 'pink' | 'grey';
  arrowColor: 'white' | 'black';
}

export default function Page() {
  const { resolvedTheme } = useTheme()
  const arrowColor = resolvedTheme === "dark" ? "white" : "black"

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      
      <main className="relative container mx-auto px-4 py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-12">
        <div className="flex justify-center mb-6">
        <Image
          src="/logo-black.png"
          alt="Avalanche Logo"
          width={200}
          height={50}
          className="dark:hidden"
        />
        <Image
          src="/logo-white.png"
          alt="Avalanche Logo"
          width={200}
          height={50}
          className="hidden dark:block"
        />
        </div>
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter">
            Tools
        <span className="block pb-1 text-[#EB4C50]">
            Facilitating L1 interactions
        </span>
        </h1>
      </section>

      
      </main>
    </div>
  )
}

