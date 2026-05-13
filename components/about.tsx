"use client";

import { useEffect, useRef, useState } from "react";
import {
  Tv,
  Radio,
  Gamepad2,
  GraduationCap,
  Building2,
  Film,
  Clapperboard,
  Joystick,
  Phone,
  Podcast,
  Globe,
} from "lucide-react";

const industryNiches = [
  { icon: Tv, label: "Television" },
  { icon: Radio, label: "Radio" },
  { icon: Gamepad2, label: "Animation" },
  { icon: GraduationCap, label: "Education" },
  { icon: Building2, label: "Business" },
  { icon: Film, label: "Documentaries" },
  { icon: Clapperboard, label: "Movie Trailers" },
  { icon: Joystick, label: "Video Games" },
  { icon: Phone, label: "Telephone" },
  { icon: Podcast, label: "Podcasting" },
  { icon: Globe, label: "Internet" },
];

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-muted/30 py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-[--font-display] text-3xl lg:text-4xl text-foreground font-bold">
            Industry <span className="text-accent">Niches</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">Experienced across all major voiceover categories</p>
        </div>
        
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {industryNiches.map((niche, index) => (
            <div
              key={niche.label}
              className={`flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group cursor-default ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${index * 50 + 300}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-accent/20 group-hover:to-accent/10 group-hover:scale-110 transition-all duration-300">
                <niche.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium text-center">{niche.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
