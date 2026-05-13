"use client";

import { Download, Play, Pause, ChevronDown, Mic, ChevronLeft, ChevronRight, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface DemoClip {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
}

interface DemoCategory {
  id: string;
  genre: string;
  clips: DemoClip[];
}

interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
}

const videos: VideoItem[] = [
  { id: "video-1", title: "Video 1", youtubeId: "hBEProTBKSk" },
  { id: "video-2", title: "Video 2", youtubeId: "9-aVes1jZm8" },
  { id: "video-3", title: "Video 3", youtubeId: "DLiq2UD-5TY" },
];

const demoCategories: DemoCategory[] = [
  {
    id: "commercial",
    genre: "Commercial",
    clips: [
      { id: "commercial-2026", title: "2026 Commercial Demo (JMC Demos)", duration: "1:30", audioUrl: "/demos/ivy-stephenson-female-voiceover-commercial-demo-2026.mp3" },
      { id: "commercial-demo", title: "Commercial Demo (Ivy Stephenson Demos)", duration: "1:00", audioUrl: "/demos/ivy-stephenson-female-voiceover-commercial-demo.wav" },
      { id: "bar-s-promo", title: "Bar-S - Promo (Online Ad)", duration: "0:30", audioUrl: "/demos/ivy-stephenson-female-voiceover-bar-s-promo.mp3" },
      { id: "pizzahut-ad", title: "Pizza Hut - National Commercial - Online Ad - Television (Ivy Stephenson Demos)", duration: "0:30", audioUrl: "/demos/ivy-stephenson-female-voiceover-pizza-hut-commercial.wav" },
    ],
  },
  {
    id: "animation",
    genre: "Animation & Video Games",
    clips: [
      { id: "animation-videogame", title: "Video Games - Child, Evil Queen, Fairy, Evil Charismatic King (Ivy Stephenson Demos)", duration: "1:00", audioUrl: "/demos/ivy-stephenson-female-voiceover-animation-character-demo.mp3" },
      { id: "animation-voices", title: "Animation/Character Voices - Child, Evil Villain, Fairy, Creatures, Robot, Female, Male (Ivy Stephenson Demos)", duration: "1:00", audioUrl: "/demos/ivy-stephenson-female-voiceover-character-voices-demo.wav" },
    ],
  },
];

function SoundWave({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-4">
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-1 bg-accent rounded-full transition-all duration-150 ${
            isPlaying ? 'sound-bar' : 'h-1'
          }`}
          style={{ 
            height: isPlaying ? `${Math.random() * 12 + 4}px` : '4px',
            animationDelay: `${bar * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [expandedGenre, setExpandedGenre] = useState<string | null>("commercial");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentClip = demoCategories
    .flatMap(cat => cat.clips)
    .find(clip => clip.id === playingId);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
        setIsLoading(false);
      });
      audioRef.current.addEventListener('ended', () => {
        setPlayingId(null);
        setCurrentTime(0);
      });
      audioRef.current.addEventListener('canplay', () => {
        setIsLoading(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = (clipId: string, audioUrl: string) => {
    if (playingId === clipId) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      setIsLoading(true);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(() => {
          setIsLoading(false);
        });
      }
      setPlayingId(clipId);
      setCurrentTime(0);
    }
  };

  const toggleGenre = (genreId: string) => {
    setExpandedGenre(expandedGenre === genreId ? null : genreId);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section id="home" className="bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-5 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-accent/8 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-accent/6 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-32 h-0.5 bg-gradient-to-r from-accent/30 to-transparent" />
        <div className="absolute top-1/3 right-0 w-48 h-0.5 bg-gradient-to-l from-accent/20 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-24 h-0.5 bg-gradient-to-r from-accent/25 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-10 sm:px-16 lg:px-24 py-12 lg:py-16">
        
        {/* Featured Commercial Demo - Centered above middle column */}
        <div className="mb-6 flex justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 relative group cursor-pointer" onClick={() => togglePlay('featured-commercial', '/demos/ivy-stephenson-female-voiceover-commercial-demo-2026.mp3')}>
            <div className="absolute -inset-px bg-gradient-to-r from-accent/50 to-accent/30 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-all duration-300" />
            <div className="relative bg-card border border-border/50 rounded-full px-5 py-2.5 shadow-md flex items-center gap-4 transition-all duration-300 group-hover:shadow-lg group-hover:border-accent/30">
              
              <div className="relative flex-shrink-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  playingId === 'featured-commercial' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground'
                }`}>
                  {playingId === 'featured-commercial' ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-[10px] font-medium tracking-widest uppercase text-accent">Featured</span>
                <span className="text-muted-foreground/40">|</span>
                <span className="text-sm font-semibold text-foreground truncate">2026 Commercial Demo (JMC Demos)</span>
              </div>

              {playingId === 'featured-commercial' ? (
                <div className="flex items-center gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-0.5 bg-accent rounded-full sound-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              ) : (
                <span className="text-xs text-muted-foreground font-medium">0:30</span>
              )}
            </div>
          </div>
        </div>

        {/* 3-Column Grid: Book Box | Demos | Headshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* Column 1: Get A Quote Box */}
          <div className="bg-gradient-to-br from-primary via-primary to-primary/95 text-primary-foreground p-8 md:p-10 lg:p-12 rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-center order-2 lg:order-1 creative-card glow-accent-hover noise-overlay">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent via-accent/80 to-transparent" />
            <div className="absolute bottom-0 left-0 w-1.5 h-full bg-gradient-to-t from-accent via-accent/50 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/5 rounded-tl-full" />
            
            <div className="absolute top-6 right-6 opacity-10">
              <Mic className="w-20 h-20 animate-float" />
            </div>
            
            <p className="text-accent font-semibold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              Get A Quote
            </p>
            <h2 className="font-[--font-display] text-3xl lg:text-4xl xl:text-5xl leading-tight mb-6 font-bold">
              Hear The{" "}
              <span className="block">Difference.</span>
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
              Professional female voiceover artist based in Nashville and Orlando. Broadcast-quality audio from a voice your audience <strong className="text-primary-foreground font-bold">won&apos;t forget.</strong>
            </p>
            <Button
              asChild
              variant="outline"
              className="bg-white/10 border-2 border-accent text-accent hover:bg-accent hover:text-primary-foreground px-8 py-6 text-base font-semibold tracking-wider uppercase transition-all duration-300 rounded-lg hover:scale-105 w-fit backdrop-blur-sm"
            >
              <a href="#contact" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Book Ivy
              </a>
            </Button>
          </div>

          {/* Column 2: Demo Reels (Center) */}
          <div id="demos" className="bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden flex flex-col order-1 lg:order-2 relative creative-card group/demos">
            {/* Animated gradient border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-accent via-accent/40 to-primary rounded-2xl opacity-50 group-hover/demos:opacity-80 transition-opacity duration-500 -z-10 blur-[1px]" />
            
            {/* Corner accents with animation */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/20 via-accent/10 to-transparent rounded-bl-full animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-accent/15 via-accent/5 to-transparent rounded-tr-full animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-0 w-16 h-32 bg-gradient-to-l from-accent/10 to-transparent" />
            
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-primary to-primary/95 text-primary-foreground px-5 py-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/5" />
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent via-accent to-accent/30" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-accent/50 via-accent/20 to-transparent" />
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-accent rounded-full animate-ping opacity-50" />
                </div>
                <h2 className="text-xl font-bold tracking-wide">Demo Reels</h2>
              </div>
            </div>
                {/* Now Playing Bar */}
                {playingId && currentClip && (
              <div className="bg-gradient-to-r from-accent to-accent/90 text-accent-foreground p-4 border-b border-accent-foreground/10">
                <div className="flex items-center gap-3 mb-2">
                  <SoundWave isPlaying={!!playingId} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{currentClip.title}</p>
                    <p className="text-xs opacity-80">
                      {formatTime(currentTime)} / {formatTime(duration || 0)}
                    </p>
                  </div>
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                <div 
                  className="h-2 bg-accent-foreground/20 rounded-full cursor-pointer overflow-hidden"
                  onClick={handleSeek}
                >
                  <div 
                    className="h-full bg-accent-foreground rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="divide-y divide-border flex-1 overflow-y-auto">
              {demoCategories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleGenre(category.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 hover:bg-muted/60 transition-all duration-300 group ${
                      expandedGenre === category.id ? 'bg-muted/40' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        category.clips.some(c => c.id === playingId) 
                          ? 'bg-accent animate-pulse scale-125' 
                          : 'bg-primary/30 group-hover:bg-primary/60'
                      }`} />
                      <span className="font-semibold text-base text-foreground">{category.genre}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-all duration-300 ${
                      expandedGenre === category.id ? 'rotate-180 text-primary' : ''
                    }`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ease-out ${expandedGenre === category.id ? 'max-h-[500px]' : 'max-h-0'}`}>
                    <div className="bg-gradient-to-b from-muted/30 to-muted/10 border-t border-border/50">
                      {category.clips.map((clip, index) => (
                        <div
                          key={clip.id}
                          className={`flex items-center justify-between px-5 py-4 pl-10 hover:bg-accent/5 transition-all duration-300 group/clip border-b border-border/30 last:border-b-0 ${
                            playingId === clip.id ? 'bg-accent/10 border-l-2 border-l-accent' : ''
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => togglePlay(clip.id, clip.audioUrl)}
                              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                playingId === clip.id 
                                  ? 'bg-accent text-accent-foreground scale-110' 
                                  : 'bg-primary text-primary-foreground hover:scale-110 hover:shadow-lg hover:shadow-accent/20'
                              }`}
                            >
                              {playingId === clip.id && (
                                <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-30" />
                              )}
                              {playingId === clip.id ? (
                                <Pause className="w-4 h-4 relative z-10" />
                              ) : (
                                <Play className="w-4 h-4 ml-0.5 relative z-10" />
                              )}
                            </button>
                            <div>
                              <span className={`text-sm font-medium transition-colors duration-300 ${playingId === clip.id ? 'text-accent' : 'group-hover/clip:text-accent'}`}>{clip.title}</span>
                              <p className="text-xs text-muted-foreground flex items-center gap-2">
                                <span>{clip.duration}</span>
                                {playingId === clip.id && (
                                  <span className="flex items-center gap-0.5">
                                    {[...Array(3)].map((_, i) => (
                                      <span key={i} className="w-0.5 bg-accent rounded-full sound-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                                    ))}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                          <a 
                            href={clip.audioUrl}
                            download
                            className="p-2.5 hover:bg-accent/10 rounded-full transition-all duration-300 text-muted-foreground hover:text-accent opacity-0 group-hover/clip:opacity-100 hover:scale-110"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Videos Section */}
            <div className="border-t border-border">
              <div className="bg-muted/30 px-5 py-3 flex items-center gap-2">
                <Film className="w-4 h-4 text-accent" />
                <span className="font-semibold text-sm">Videos</span>
              </div>
              <div className="p-4">
                <div className="relative flex items-center">
                  {/* Previous Arrow */}
                  <button
                    onClick={prevVideo}
                    className="absolute left-0 z-10 w-8 h-8 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Video Container */}
                  <div className="w-full max-w-[320px] mx-auto">
                    <div className="relative aspect-video bg-primary/10 rounded-lg overflow-hidden shadow-md">
                      <iframe
                        src={`https://www.youtube.com/embed/${videos[currentVideoIndex].youtubeId}`}
                        title={videos[currentVideoIndex].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <p className="text-center mt-2 font-medium text-xs text-foreground truncate">
                      {videos[currentVideoIndex].title}
                    </p>
                  </div>

                  {/* Next Arrow */}
                  <button
                    onClick={nextVideo}
                    className="absolute right-0 z-10 w-8 h-8 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentVideoIndex 
                          ? "bg-accent w-4" 
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          
        </div>

        {/* About & Studio Section - Full Width Below */}
        <div id="about" className="mt-8 bg-card rounded-xl border border-border shadow-2xl p-8 lg:p-12 relative overflow-hidden creative-card">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/8 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/6 to-transparent rounded-tr-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* About Text */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="decorative-line w-8" />
                <h2 className="font-[--font-display] text-3xl lg:text-4xl text-foreground font-bold">
                  About <span className="text-accent">Ivy</span>
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                Ivy Stephenson is a professional <strong className="text-foreground">female voice over artist and voice actor</strong> based in Nashville, TN and Orlando, FL providing professional-quality audio to clients worldwide from two fully equipped home studios.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                With more than <strong className="text-foreground">15 years of experience in music production, performance, and audio engineering</strong>, Ivy brings both creative and technical experience to every project. She holds a degree in Audio Engineering from <strong className="text-foreground">SAE Institute</strong> on Music Row in Nashville, Tennessee.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                Ivy&apos;s background in performance started early through theater productions throughout childhood and her teen years, where she developed experience in acting, vocal control, and character work. She also grew up in <strong className="text-foreground">Nashville, TN</strong> playing music and harmonizing with her family, which helped shape her natural understanding of timing, tone, and delivery.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                Her combined experience in theater, music, and audio engineering allows her to deliver clean, professional recordings that are ready for <strong className="text-foreground">commercial, television, film, animation, video game, and digital media</strong> projects. She primarily focuses on commercial voice over, animation, television, film, and video games, while remaining open to a wide range of voice over styles and creative work. Her <strong className="text-foreground">dynamic range of character voices</strong> allows her to bring unique personalities to life, from playful and energetic to dark and dramatic.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                Known for being <strong className="text-foreground">down-to-earth and easy to work with</strong>, Ivy focuses on making the recording process straightforward and collaborative. Clients value her fast turnaround times, attention to detail, and reliable delivery of quality audio from first recording to final file.
              </p>
            </div>

            {/* Voice Style & Strengths */}
            <div className="lg:border-l lg:border-border lg:pl-12">
              {/* Headshot */}
              <div className="relative w-full h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow-lg mb-6">
                <Image
                  src="/images/ivy-stephenson-female-voiceover-artist-nashville.jpg"
                  alt="Ivy Stephenson - Professional Female Voiceover Artist Nashville Orlando"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="font-[--font-display] text-xl lg:text-2xl font-bold text-foreground mb-6">Voice Style & Strengths</h3>
              <ul className="space-y-3 text-muted-foreground text-base lg:text-lg">
                {[
                  "Fresh, warm, and expressive",
                  "Confident and charismatic",
                  "Quirky with emotional range",
                  "Conversational and authentic",
                  "Technically precise and reliable"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-accent font-bold text-lg mt-6">
                Let&apos;s bring your project to life!
              </p>
            </div>
          </div>

          {/* Studio Section - Floating Box with Gradient Border */}
          <div id="studio" className="mt-12 relative">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-sm opacity-75" />
            <div className="relative bg-card rounded-2xl p-8 lg:p-10 shadow-2xl">
              <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
              <h3 className="font-[--font-display] text-2xl lg:text-3xl text-foreground font-bold">
                The <span className="text-accent">Studio</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ivy Stephenson operates two professional voiceover recording studios — one in <strong className="text-foreground">Nashville, Tennessee</strong> and one in <strong className="text-foreground">Orlando, Florida</strong> — giving clients coast-to-coast availability with no compromise on quality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Both studios feature professionally treated acoustics, whisper-quiet recording environments, and industry-standard equipment trusted by national brands, advertising agencies, and production companies worldwide.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every voiceover session is recorded on a <strong className="text-foreground">Neumann TLM-103 Microphone</strong> through a <strong className="text-foreground">Universal Audio Apollo Heritage x8p</strong> with industry plug-ins and signal chains, delivering broadcast-ready, clean audio straight to your inbox — no cleanup required on your end.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Need to direct the session live? Ivy is fully equipped for remote directed sessions via <strong className="text-foreground">Source-Connect, Zoom, or phone patch</strong>. Need a fast self-directed turnaround? That&apos;s available too.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re a Nashville-based production company, an Orlando advertising agency, or a brand searching for a professional female voiceover artist anywhere in the world — the studio is ready.
              </p>

              {/* Studio Features Carousel */}
              <div className="w-full pt-4 overflow-hidden">
                <div className="flex animate-marquee gap-8">
                  {[
                    "Professionally Treated Acoustics",
                    "Neumann TLM-103 — Universal Audio Apollo x8p",
                    "Source-Connect | Zoom | Phone Patch",
                    "Nashville, TN & Orlando, FL",
                    "Self-Directed & Live-Directed Sessions",
                    "Fast Turnaround — Same Day Delivery",
                    "Clean Audio — No Post-Cleanup Needed",
                    "Professionally Treated Acoustics",
                    "Neumann TLM-103 — Universal Audio Apollo x8p",
                    "Source-Connect | Zoom | Phone Patch",
                    "Nashville, TN & Orlando, FL",
                    "Self-Directed & Live-Directed Sessions",
                    "Fast Turnaround ��� Same Day Delivery",
                    "Clean Audio — No Post-Cleanup Needed",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-accent text-lg">✦</span>
                      <span className="text-base font-medium text-foreground whitespace-nowrap">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
