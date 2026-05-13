"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    company: "Harper Petersen",
    text: "Ivy has an incredible voice, takes direction extremely well, and is a joy to work with. Don't hesitate to book her. We'll definitely be hiring her again!",
    category: "eBay",
    rating: 5,
  },
  {
    company: "Epipheo",
    text: "Working with Ivy was such a pleasure. Not only is she warm and personable, but Ivy is incredibly professional. For our project together, we had a rather specific character and tone needed from the VO. She brought the energy and adaptability to the recording that definitely improved our animated video. I would work with her again anytime!",
    category: "Animation",
    rating: 5,
  },
  {
    company: "Bryan",
    text: "Ivy's diverse collection of demos made it very easy to send her my script with referential notes, and I was able to get perfect takes. She turned around a quick addition as well, so I would highly recommend her if you like her demos!",
    category: "Verified Client",
    rating: 5,
  },
  {
    company: "Andrea Salte Voie",
    text: "Great working with Ivy! We really liked her voice! She is easy to communicate with, delivers fast, and she took direction very well. Thank you, Ivy!",
    category: "Online Ad",
    rating: 5,
  },
  {
    company: "SOCO Advertising",
    text: "Outstanding talent! Great to work with! Fast as can be, friendly and fantastic work. A true pro!",
    category: "Radio Ad",
    rating: 5,
  },
  {
    company: "UBC Studios",
    text: "Ivy was extremely professional, took direction well, and provided excellent quality files!",
    category: "Video Narration",
    rating: 5,
  },
  {
    company: "Lemonlight",
    text: "Great VO artist and communicator. Would absolutely recommend Ivy for any project!",
    category: "Verified Client",
    rating: 5,
  },
  {
    company: "Heart and Soul Marketing",
    text: "Working with Ivy was great! We needed a very specific style of read, and she delivered.",
    category: "Online Ad",
    rating: 5,
  },
  {
    company: "AR Marketing",
    text: "A great talent to work with, and was very flexible with our schedule and turnaround time.",
    category: "Online Ad",
    rating: 5,
  },
  {
    company: "National University",
    text: "Great job! Thank you very much for helping us.",
    category: "Online Ad",
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

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

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section id="testimonials" ref={sectionRef} className="bg-background py-12 lg:py-16 relative overflow-hidden">
      {/* Tie-dye red background decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600/70 via-accent to-red-500/50" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-l from-accent via-red-500/60 to-transparent" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-accent/15 via-red-500/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-600/8 via-accent/5 to-red-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-red-500/12 via-accent/8 to-transparent rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 relative">
        <h2 className={`font-serif text-3xl lg:text-4xl text-foreground text-center mb-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Happy <span className="text-accent">Clients</span>
        </h2>
        <p className={`text-muted-foreground text-center text-sm mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          What clients are saying about working with Ivy
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className={`bg-primary p-6 rounded-lg border border-accent/30 relative group hover:border-accent/50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors duration-300">
                <Quote className="w-4 h-4 text-accent" />
              </div>
              
              <div className="mb-3">
                <h3 className="font-semibold text-primary-foreground text-lg mb-1">{testimonial.company}</h3>
                <span className="text-xs text-accent font-semibold tracking-wider uppercase bg-accent/20 px-2 py-0.5 rounded-full">{testimonial.category}</span>
                <div className="flex gap-1 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-3 h-3 fill-accent text-accent transition-all duration-300" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed text-sm">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="p-2 hover:bg-primary rounded-full transition-all duration-300 text-muted-foreground hover:text-accent hover:scale-110 active:scale-95"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "bg-accent w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 hover:bg-primary rounded-full transition-all duration-300 text-muted-foreground hover:text-accent hover:scale-110 active:scale-95"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
