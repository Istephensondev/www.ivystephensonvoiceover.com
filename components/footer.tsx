import Link from "next/link";
import { Mail, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground py-14 relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="font-serif text-3xl block">Ivy Stephenson</span>
            <span className="text-sm tracking-[0.4em] text-accent uppercase mt-2 block font-medium">
              Voiceover
            </span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
            {["Home", "Demos", "About", "Studio", "Contact"].map((item) => (
              <Link 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-accent transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-4">
              <a 
                href="mailto:inquire@ivystephensonvoiceover.com"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@ivystephensonvoiceover"
                target="_blank"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-primary-foreground/60">
              &copy; {new Date().getFullYear()} Ivy Stephenson. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
