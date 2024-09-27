import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-card py-12 text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <FooterSection title="Avalanche">
              <FooterLink href="https://www.avax.network/get-started" external>
                Get Started
              </FooterLink>
              <FooterLink href="https://subnets.avax.network/" external>
                Explorer
              </FooterLink>
              <FooterLink href="https://stats.avax.network/dashboard/overview/" external>
                Statistics
              </FooterLink>
            </FooterSection>
            
            <FooterSection title="Community" className="md:items-center">
              
              <FooterLink href="https://github.com/ava-labs" external>
                GitHub
              </FooterLink>
              <FooterLink href="https://medium.com/@avaxdevelopers" external>
                Medium Blog
              </FooterLink>
              <FooterLink href="https://twitter.com/AvaxDevelopers" external>
                Twitter
              </FooterLink>
            </FooterSection>
            
            <FooterSection title="More Links" className="md:items-end">
              <FooterLink href="https://status.avax.network/" external>
              Network Status
              </FooterLink>
              <FooterLink href="https://core.app/" external>
              Core Wallet
              </FooterLink>
              <FooterLink href="https://www.avax.network/legal" external>
              Legal
              </FooterLink>
            </FooterSection>
          </div>
          <div className="mt-12 text-xs text-center text-secondary-foreground/70">
            Crafted with ❤️ by Ava Labs DevRel team.
          </div>
        </div>
      </div>
    </footer>
  )
}

interface FooterSectionProps {
  title: string
  children: React.ReactNode
  className?: string
}

function FooterSection({ title, children, className = "" }: FooterSectionProps) {
  return (
    <div className={`col-span-1 flex flex-col items-start ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {children}
      </ul>
    </div>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}
  
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-secondary-foreground hover:text-primary transition-colors duration-200 inline-flex items-center"
        {...linkProps}
      >
        {children}
        {external && <ExternalLink className="ml-1 h-3 w-4" />}
      </Link>
    </li>
  )
}