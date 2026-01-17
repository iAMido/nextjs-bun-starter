"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CVNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const navItems = [
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Experience", href: "experience" },
    { label: "Education", href: "education" },
    { label: "Contact", href: "contact" }
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollToSection(item.href)}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <X className="h-6 w-6 text-slate-700" />
        ) : (
          <Menu className="h-6 w-6 text-slate-700" />
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-left px-4 py-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
