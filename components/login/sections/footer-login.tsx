import Link from 'next/link';
import React from 'react'

export function FooterLogin() {
  return (
    <div>
      <footer className="pt-10">
              <p className="text-zinc-400 items-center justify-center w-full max-w-[400px] text-center text-sm font-medium">
                By clicking continue, you agree to our{" "}
                <Link
                  href="#"
                  className="underline text-white hover:text-gray-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="underline text-white hover:text-gray-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </footer>
    </div>
  )
}
