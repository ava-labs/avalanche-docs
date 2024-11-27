'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Cpu, Code, Coins } from 'lucide-react'
import { useCallback } from 'react'
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"
import { useTheme } from 'next-themes'
import Link from 'next/link'

interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'red' | 'blue' | 'green' | 'pink' | 'grey';
  arrowColor: 'white' | 'black';
}

function ProgramCard({ title, description, icon, color, arrowColor }: ProgramCardProps) {
  const gradients: Record<ProgramCardProps['color'], string> = {
    red: "from-red-500 to-red-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    pink: "from-pink-500 to-pink-500",
    grey: "from-gray-500 to-gray-500",
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-2xl">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      <div className="relative p-6 space-y-4 bg-card border border-border rounded-3xl transition-all duration-300 group-hover:bg-card/50 group-hover:backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradients[color]} flex items-center justify-center text-white`}>
        {icon}
        </div>
        <Button variant="ghost" className="group/button">
        {/* Learn more{" "} */}
        <ArrowRight color={arrowColor} className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
        </Button>
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export default function Page() {
  const { resolvedTheme } = useTheme()
  const opacity = resolvedTheme === "dark" ? .1 : .5
  const arrowColor = resolvedTheme === "dark" ? "white" : "black"
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-0 right-0 h-[32rem] bg-gradient-to-br from-red-500 to-red-500 opacity-20 blur-3xl dark:hidden" />
      
      <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
        color: {
          value: "transparent",
        },
        },
        fpsLimit: 120,
        interactivity: {
        events: {
          onClick: {
          enable: true,
          mode: "repulse",
          },
          resize: true,
        },
        modes: {
          push: {
          quantity: 4,
          },
          repulse: {
          distance: 200,
          duration: 0.4,
          },
        },
        },
        particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 215,
          enable: true,
          opacity: opacity,
          width: 5,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
          default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
          enable: true,
          area: 800,
          },
          value: 80,
        },
        opacity: {
          value: opacity,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 5, max: 18 },
        },
        },
        detectRetina: true,
      }}
      />
      
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
        Grants & Programs
        <span className="block pb-1 text-[#EB4C50]">
          Building the Future
        </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
        Empowering innovators to revolutionize blockchain technology with scalablable and sustainable solutions for real-world challenges.
        </p>
        <Link href="#programs">
            <Button className="mt-6 rounded-full text-lg px-8 py-6 bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-white dark:text-white">
            Apply Now <ArrowRight color="white" className="ml-2 h-5 w-5" />
            </Button>
        </Link>
      </section>

      {/* Prize Pool Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 dark:from-yellow-500/10 dark:to-amber-500/10 rounded-3xl" />
        <div className="relative px-6 py-12 md:py-20 text-center space-y-6 rounded-3xl border border-yellow-500/30 backdrop-blur-sm shadow-2xl transform transition-all duration-300">
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-full border border-yellow-500/50 px-4 py-1.5 text-sm font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-500/10">
          🏆 Total Funding Available
          </div>
        </div>
            <h2 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              $50M+ in Grants
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fueling innovation across all programs based on project impact and potential.
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section id="programs" className="space-y-12">
          <h2 className="text-3xl md:text-5xl font-bold text-center">Our Programs</h2>
          <div className="grid md:grid-cols-2 gap-6">
          <a href="https://retro9000.avax.network/" target="_blank" rel="noopener noreferrer">
            <ProgramCard
            title="Retro9000"
            description="Build innovative projects on Avalanche. Get rewarded for your creativity."
            icon={<Zap className="w-8 h-8" color='white'/>}
            color="red"
            arrowColor={arrowColor}
            />
          </a>
          <a href="https://www.avax.network/infrabuidl-program" target="_blank" rel="noopener noreferrer">
            <ProgramCard
            title="InfraBUIDL()"
            description="Strengthening Avalanche's infrastructure. Build the foundation for next-gen blockchain applications."
            icon={<Cpu className="w-8 h-8" color='white'/>}
            color="grey"
            arrowColor={arrowColor}
            />
          </a>
          <a href="https://codebase.avax.network/" target="_blank" rel="noopener noreferrer">
            <ProgramCard
            title="Codebase"
            description="Empowering developers to create innovative solutions. Turn your blockchain vision into reality."
            icon={<Code className="w-8 h-8" color='white'/>}
            color="blue"
            arrowColor={arrowColor}
            />
          </a>
          <a href="https://www.blizzard.fund/" target="_blank" rel="noopener noreferrer">
            <ProgramCard
            title="Blizzard Fund"
            description="A $200M+ fund investing in promising Avalanche projects. Fuel your growth with institutional support."
            icon={<Coins className="w-8 h-8" color='white'/>}
            color="pink"
            arrowColor={arrowColor}
            />
          </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-red-500/5 dark:to-orange-500/5 rounded-3xl" />
          <div className="relative px-6 py-12 md:py-20 text-center space-y-6 rounded-3xl border border-red-500/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Build the Future?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join Avalanche's ecosystem of innovators and shape the future of blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 py-6 bg-red-500 transition-all duration-300 shadow-lg hover:shadow-xl text-white">
                Apply for Grants <ArrowRight className="ml-2 h-5 w-5" color='white' />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 border-2 hover:bg-red-500/10 transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

