"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Search,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronRight,
  Music,
  Video,
  Image as ImageIcon,
  Mic2,
  Sparkles,
  Scissors,
  AudioLines,
  PenTool,
  Camera,
  UserCircle,
  Clapperboard,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Disc3,
  SkipForward,
  SkipBack,
  Zap,
  Activity,
  CircleCheck,
  Globe,
  Layers,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

/* ─── Navigation Links ─── */
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Coproducer", href: "/music-generator" },
  { label: "Studio AI", href: "/music-generator" },
  { label: "Assets", href: "/library" },
  { label: "Marketplace", href: "/explore" },
  { label: "Sample Universe", href: "/explore" },
  { label: "Mixer Pro", href: "/mixer" },
  { label: "Model Library", href: "#models" },
]

/* ─── Quick Access Buttons ─── */
const quickAccess = [
  { label: "Explore Studio", href: "/music-generator", variant: "primary" as const },
  { label: "Learn More", href: "#features", variant: "secondary" as const },
  { label: "Launch Coproducer", href: "/music-generator", variant: "secondary" as const },
  { label: "Try Image Generator", href: "/video-generator", variant: "secondary" as const },
  { label: "Try Video Generator", href: "/video-generator", variant: "secondary" as const },
  { label: "Sample Universe", href: "/explore", variant: "secondary" as const },
  { label: "Quick Actions", href: "#quick-actions", variant: "secondary" as const },
]

/* ─── Quick Action Tools ─── */
const quickActions = [
  { label: "Make art", icon: ImageIcon, desc: "AI image generation", model: "Flux.1" },
  { label: "Make a video", icon: Clapperboard, desc: "Text-to-video synthesis", model: "Kling 3.0" },
  { label: "Make a song", icon: Music, desc: "Full track from prompt", model: "Audio Engine" },
  { label: "Voice swap", icon: Mic2, desc: "Clone & swap vocals", model: "Voice AI" },
  { label: "Professional headshot", icon: Camera, desc: "Studio-quality portraits", model: "SDXL" },
  { label: "Character design", icon: UserCircle, desc: "Create unique characters", model: "Flux.1" },
  { label: "Animate a photo", icon: Sparkles, desc: "Bring images to life", model: "Kling 3.0" },
  { label: "Split stems", icon: Scissors, desc: "Separate audio layers", model: "Demucs V4" },
  { label: "Sound effects", icon: AudioLines, desc: "Generate SFX from text", model: "Audio Engine" },
  { label: "Help me write", icon: PenTool, desc: "AI lyrics & copy", model: "Language AI" },
  { label: "Enter Studio", icon: LayoutDashboard, desc: "Full production suite", model: "DAW Engine" },
  { label: "Import content", icon: Layers, desc: "Upload & process media", model: "Pipeline" },
]

/* ─── Frontier Models ─── */
const frontierModels = [
  { name: "Flux.1", type: "Image Generation", status: "operational" },
  { name: "SDXL", type: "Image Generation", status: "operational" },
  { name: "Kling 3.0", type: "Video Synthesis", status: "operational" },
  { name: "VEO 3", type: "Video Generation", status: "operational" },
  { name: "Demucs V4", type: "Audio Separation", status: "operational" },
  { name: "Whisper V3", type: "Speech Recognition", status: "operational" },
]

/* ─── Trending Tracks ─── */
const trendingTracks = [
  {
    id: "1",
    title: "Cyber Sunset",
    artist: "NeonWave",
    genre: "Synthwave",
    bpm: 112,
    duration: "03:42",
    plays: "184K",
    added: null,
  },
  {
    id: "2",
    title: "Techno Bloom",
    artist: "DJ Mira",
    genre: "Techno",
    bpm: 128,
    duration: "04:11",
    plays: "142K",
    added: null,
  },
  {
    id: "3",
    title: "Lo-Fi Rain",
    artist: "SleepyBeats",
    genre: "Lo-Fi Hip Hop",
    bpm: 88,
    duration: "05:20",
    plays: "312K",
    added: null,
  },
]

const recentlyAdded = [
  {
    id: "4",
    title: "Astral Drift",
    artist: "CosmicSynth",
    genre: "Ambient",
    bpm: 72,
    duration: "06:15",
    plays: "23K",
    added: "2 hours ago",
  },
  {
    id: "5",
    title: "Pulse Drive",
    artist: "VoltMachine",
    genre: "EDM",
    bpm: 140,
    duration: "03:55",
    plays: "8K",
    added: "5 hours ago",
  },
  {
    id: "6",
    title: "Velvet Midnight",
    artist: "SoulCollective",
    genre: "R&B",
    bpm: 96,
    duration: "04:30",
    plays: "15K",
    added: "8 hours ago",
  },
]

/* ─── Component ─── */
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentTrack, setCurrentTrack] = useState<typeof trendingTracks[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const allTracks = [...trendingTracks, ...recentlyAdded]

  const playTrack = useCallback((track: typeof trendingTracks[0]) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgress(0)
  }, [])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const skipNext = useCallback(() => {
    if (!currentTrack) return
    const idx = allTracks.findIndex((t) => t.id === currentTrack.id)
    const next = allTracks[(idx + 1) % allTracks.length]
    playTrack(next)
  }, [currentTrack, allTracks, playTrack])

  const skipPrev = useCallback(() => {
    if (!currentTrack) return
    const idx = allTracks.findIndex((t) => t.id === currentTrack.id)
    const prev = allTracks[(idx - 1 + allTracks.length) % allTracks.length]
    playTrack(prev)
  }, [currentTrack, allTracks, playTrack])

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 100
          }
          return prev + 0.5
        })
      }, 150)
    } else if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current)
    }
  }, [isPlaying])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ─── Top Navigation ─── */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-8 px-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Music className="size-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-wider text-foreground">DIETER PRO</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks, genres, artists..."
                className="h-9 w-64 rounded-lg border border-border bg-secondary pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Link href="/music-generator">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Launch Studio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1">
        {/* ─── Hero Section ─── */}
        <section className="relative overflow-hidden border-b border-border/50">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

          <div className="relative mx-auto max-w-[1440px] px-6 py-24 text-center lg:py-32">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
              <Zap className="mr-1.5 size-3" />
              NEW TECHNOLOGY &ndash; AI THAT HEARS YOUR SOUL
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              Your Ideas.{" "}
              <span className="text-primary">Infinite Music.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground lg:text-lg">
              Professional AI Music Studio for producers and enthusiasts.
              Generate tracks, videos, art, and more with frontier AI models.
            </p>

            {/* Quick Access Buttons */}
            <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
              {quickAccess.map((item) => (
                <Link key={item.label} href={item.href}>
                  <Button
                    variant={item.variant === "primary" ? "default" : "outline"}
                    size="sm"
                    className={
                      item.variant === "primary"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }
                  >
                    {item.label}
                    <ChevronRight className="ml-1 size-3" />
                  </Button>
                </Link>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-8 rounded-xl border border-border bg-card/60 px-8 py-4 backdrop-blur-sm lg:gap-12">
              {[
                { label: "Project Memory", value: "\u221E" },
                { label: "Voice Languages", value: "50+" },
                { label: "Distribution Portals", value: "6" },
                { label: "Free to Start", value: "\u2713" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold text-foreground lg:text-2xl">{stat.value}</p>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Quick Actions Panel ─── */}
        <section id="quick-actions" className="border-b border-border/50 py-16">
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  One-click AI tools powered by frontier models
                </p>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Activity className="mr-1.5 size-3" />
                All systems operational
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={
                    action.label === "Enter Studio" || action.label === "Make a song" || action.label === "Help me write" || action.label === "Split stems" || action.label === "Sound effects" || action.label === "Voice swap"
                      ? "/music-generator"
                      : action.label === "Import content"
                        ? "/library"
                        : "/video-generator"
                  }
                  className="group flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/40 hover:bg-card/80"
                >
                  <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-primary/10">
                    <action.icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{action.label}</span>
                  <span className="mt-0.5 text-[10px] text-muted-foreground">{action.desc}</span>
                  <span className="mt-2 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
                    {action.model}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Frontier Models ─── */}
        <section id="models" className="border-b border-border/50 py-16">
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground">Frontier Models</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                State-of-the-art AI models powering every tool
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {frontierModels.map((model) => (
                <div
                  key={model.name}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Globe className="size-4 text-primary" />
                    <span className="text-sm font-bold text-foreground">{model.name}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{model.type}</p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <CircleCheck className="size-3 text-primary" />
                    <span className="text-[10px] font-medium capitalize text-primary">
                      {model.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Music Discovery ─── */}
        <section className="border-b border-border/50 py-16">
          <div className="mx-auto max-w-[1440px] px-6">
            {/* Trending Tracks */}
            <div className="mb-12">
              <div className="mb-6 flex items-center gap-2">
                <TrendingUp className="size-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Trending Tracks</h2>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {trendingTracks.map((track, i) => (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-all ${
                      currentTrack?.id === track.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-3xl font-black text-primary/15">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex size-9 items-center justify-center rounded-full bg-secondary text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Play className="size-3.5 ml-0.5" />
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{track.title}</p>
                    <p className="text-xs text-muted-foreground">{track.artist}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                      <Badge variant="outline" className="border-border text-[10px] text-muted-foreground">
                        {track.genre}
                      </Badge>
                      <span>{track.bpm} BPM</span>
                      <span>{track.duration}</span>
                    </div>
                    <p className="mt-2 text-[10px] text-muted-foreground">{track.plays} plays</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recently Added */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-2">
                <Clock className="size-5 text-muted-foreground" />
                <h2 className="text-xl font-bold text-foreground">Recently Added</h2>
              </div>
              <div className="flex flex-col gap-1">
                {recentlyAdded.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => playTrack(track)}
                    className={`group flex items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors hover:bg-secondary/50 ${
                      currentTrack?.id === track.id ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause className="size-3.5" />
                      ) : (
                        <Play className="size-3.5 ml-0.5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{track.title}</p>
                      <p className="text-xs text-muted-foreground">{track.artist}</p>
                    </div>
                    <Badge variant="outline" className="hidden border-border text-[10px] text-muted-foreground sm:inline-flex">
                      {track.genre}
                    </Badge>
                    <span className="hidden text-xs text-muted-foreground sm:block">
                      {track.bpm} BPM
                    </span>
                    <span className="hidden text-xs font-mono text-muted-foreground sm:block">
                      {track.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {track.added}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discover More CTA */}
            <div className="flex justify-center">
              <Link href="/explore">
                <Button variant="outline" className="gap-2 border-border text-muted-foreground hover:border-primary hover:text-foreground">
                  Discover More
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Creative Engine Feature Cards ─── */}
        <section id="features" className="py-16">
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-foreground">Creative Engine</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything you need for professional AI music production
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {[
                { title: "Text-to-Full-Song", desc: "Generate complete tracks from natural language prompts" },
                { title: "Browser DAW Studio", desc: "Professional mixing console in the browser" },
                { title: "Multilingual Vocals", desc: "50+ voice languages and accents" },
                { title: "AI Mastering", desc: "Professional mastering and cinematic effects" },
                { title: "Songwriting Tools", desc: "AI-powered lyrics and composition" },
                { title: "Export & Distribution", desc: "Direct to Spotify, Apple Music, and more" },
                { title: "Infinite Memory", desc: "Unlimited project storage and history" },
                { title: "AI SEO Coach", desc: "Optimize your music for discovery" },
                { title: "Creator Community", desc: "Collaborate, share, and discover" },
                { title: "Extreme Effects", desc: "Real-time audio effects for studio and stage" },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
                >
                  <p className="text-xs font-semibold text-foreground">{feature.title}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 DIETER PRO. All rights reserved &ndash; ED GEERDES
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/music-generator" className="hover:text-foreground">Music Studio</Link>
            <Link href="/video-generator" className="hover:text-foreground">Video Suite</Link>
          </div>
        </div>
      </footer>

      {/* ─── Audio Player (sticky bottom) ─── */}
      {currentTrack && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-6 py-3">
            {/* Track info */}
            <div className="flex items-center gap-3 min-w-0 w-56 shrink-0">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Disc3 className={`size-5 text-primary ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{currentTrack.title}</p>
                <p className="truncate text-[10px] text-muted-foreground">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex items-center gap-3">
                <button
                  onClick={skipPrev}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Previous track"
                >
                  <SkipBack className="size-4" />
                </button>
                <button
                  onClick={togglePlay}
                  className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
                </button>
                <button
                  onClick={skipNext}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Next track"
                >
                  <SkipForward className="size-4" />
                </button>
              </div>
              {/* Scrubber */}
              <div className="flex w-full max-w-md items-center gap-2">
                <span className="w-8 text-right text-[10px] font-mono text-muted-foreground">
                  {formatTime(progress, currentTrack.duration)}
                </span>
                <Slider
                  value={[progress]}
                  onValueChange={([v]) => setProgress(v)}
                  min={0}
                  max={100}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-8 text-[10px] font-mono text-muted-foreground">
                  {currentTrack.duration}
                </span>
              </div>
            </div>

            {/* Volume */}
            <div className="hidden items-center gap-2 w-36 shrink-0 sm:flex">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={(v) => {
                  setVolume(v)
                  if (isMuted) setIsMuted(false)
                }}
                min={0}
                max={100}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Helper ─── */
function formatTime(progressPct: number, durationStr: string) {
  const parts = durationStr.split(":")
  const totalSec = parseInt(parts[0]) * 60 + parseInt(parts[1])
  const currentSec = Math.round((progressPct / 100) * totalSec)
  const m = Math.floor(currentSec / 60)
  const s = currentSec % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}
