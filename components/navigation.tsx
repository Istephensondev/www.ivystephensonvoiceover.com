"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Mail, Instagram, Youtube } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#demos", label: "Demos" },
  { href: "#about", label: "About Ivy" },
  { href: "#studio", label: "Studio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-primary text-primary-foreground sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'shadow-2xl shadow-primary/30' : 'shadow-xl'}`}>
      {/* Main Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-28 pt-2">
            {/* Logo */}
            <Link href="#home" className="group relative overflow-visible">
              <div className="relative">
                <span className="font-[--font-script] text-3xl md:text-4xl lg:text-5xl tracking-normal block leading-none font-bold">
                  {"Ivy Stephenson".split("").map((char, index) => (
                    <span
                      key={index}
                      className="inline-block animate-slide-letter hover:text-accent hover:-translate-y-1 transition-all duration-300 cursor-default"
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
                {/* Animated gradient line */}
                <span className="block h-[2px] my-2 bg-gradient-to-r from-accent via-primary-foreground to-accent animate-gradient-shift bg-[length:200%_100%]" />
                <span className="block text-lg md:text-xl lg:text-2xl tracking-[0.4em] text-accent uppercase font-bold animate-fade-in-up overflow-hidden" style={{ animationDelay: '0.8s' }}>
                  {"VOICEOVER".split("").map((char, index) => (
                    <span
                      key={index}
                      className="inline-block animate-revolve"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium tracking-wide hover:text-accent transition-all duration-300 uppercase relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Social Links Bar */}
      <div className="border-b border-white/10 py-4 bg-primary/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-10 text-base">
          <Link
            href="mailto:inquire@ivystephensonvoiceover.com"
            className="flex items-center gap-2.5 hover:text-accent transition-all duration-300 group"
          >
            <Mail className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
            <span className="hidden sm:inline font-medium">inquire@ivystephensonvoiceover.com</span>
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="flex items-center gap-2.5 hover:text-accent transition-all duration-300 group"
          >
            <Instagram className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            <span className="hidden sm:inline font-medium">Instagram</span>
          </Link>
          <Link
            href="https://www.youtube.com/@ivystephensonvoiceover"
            target="_blank"
            className="flex items-center gap-2.5 hover:text-accent transition-all duration-300 group"
          >
            <Youtube className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            <span className="hidden sm:inline font-medium">Youtube</span>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="border-b border-white/10 bg-primary/95 backdrop-blur-sm">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-4 text-lg font-medium tracking-wide hover:text-accent hover:translate-x-2 transition-all duration-300 uppercase border-b border-white/5 last:border-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
