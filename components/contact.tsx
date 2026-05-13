"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, CheckCircle, Mic2 } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [fileName, setFileName] = useState("No file chosen");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://formspree.io/f/' + (process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again or email directly.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-gradient-to-br from-muted/30 via-background to-muted/50 py-20 lg:py-32 relative overflow-hidden">
      {/* Tie-dye red background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent/40 via-red-500/30 to-transparent rounded-full blur-3xl animate-float" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-bl from-red-600/35 via-accent/25 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-accent/35 via-red-400/28 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tl from-red-500/30 via-accent/22 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Decorative mic icon */}
      <div className="absolute top-1/4 right-10 opacity-5 hidden lg:block">
        <Mic2 className="w-48 h-48 animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-3xl mx-auto px-8 sm:px-12 lg:px-16 relative">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-serif text-4xl lg:text-5xl text-foreground mb-5">
            Get A <span className="gradient-text">Quote</span> For Your Project
          </h2>
          <p className="text-muted-foreground text-lg">
            E-mail Ivy at{" "}
            <a
              href="mailto:inquire@ivystephensonvoiceover.com"
              className="text-primary hover:text-accent transition-colors duration-300 font-semibold underline underline-offset-4 decoration-accent/50 hover:decoration-accent"
            >
              inquire@ivystephensonvoiceover.com
            </a>{" "}
            or fill out the contact form below!
          </p>
        </div>

        {isSubmitted ? (
          <div className={`text-center py-16 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-serif text-2xl text-foreground mb-3">Message Sent!</h3>
            <p className="text-muted-foreground">Thanks for reaching out. Ivy will get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="group">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-card border-border h-14 px-5 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 group-hover:border-primary/30"
                />
              </div>
              <div className="group">
                <Input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-card border-border h-14 px-5 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 group-hover:border-primary/30"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="group">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-card border-border h-14 px-5 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 group-hover:border-primary/30"
                />
              </div>
              <div className="group">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="615-123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-card border-border h-14 px-5 rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 group-hover:border-primary/30"
                />
              </div>
            </div>
            <div className="group">
              <textarea
                name="message"
                placeholder="Tell me about your project here. You can also upload a script below."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-5 py-4 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none transition-all duration-300 group-hover:border-primary/30"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 flex-wrap">
                <label className="inline-flex items-center gap-2.5 px-5 py-3.5 bg-card border border-border text-sm font-medium cursor-pointer hover:bg-muted hover:border-primary/30 rounded-lg transition-all duration-300 group">
                  <Paperclip className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  Choose File
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </label>
                <span className="text-sm text-muted-foreground">{fileName}</span>
              </div>
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-12 py-8 text-lg font-semibold tracking-wide rounded-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-105 active:scale-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2.5" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2.5" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
