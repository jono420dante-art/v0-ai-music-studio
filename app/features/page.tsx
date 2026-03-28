"use client"

import Link from "next/link"
import { Music, Mic2, Wand2, Scissors, Download, Share2, Sparkles, Layers, Settings, Globe, Zap, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function FeaturesPage() {
  const features = [
    { icon: Wand2, title: "AI Song Generation", desc: "Generate complete songs with vocals, instruments, and professional production from text prompts. Powered by Suno AI.", status: "operational" },
    { icon: Mic2, title: "Voice Cloning & Swap", desc: "Clone any voice with 10-second samples. Swap vocals between languages and styles instantly.", status: "operational" },
    { icon: Scissors, title: "Stem Separation", desc: "Separate any track into vocals, drums, bass, and instruments with AI. Perfect for remixing.", status: "operational" },
    { icon: Layers, title: "Professional Mixing", desc: "Browser-based DAW with effects, EQ, compression, and mastering tools.", status: "operational" },
    { icon: Sparkles, title: "AI Lyrics Writer", desc: "Generate professional lyrics in any style, theme, or language with GPT-4.", status: "operational" },
    { icon: Download, title: "Multi-Format Export", desc: "Export in WAV, MP3, FLAC, and stems. Ready for distribution.", status: "operational" },
    { icon: Share2, title: "Direct Distribution", desc: "Publish directly to Spotify, Apple Music, YouTube Music, and more platforms.", status: "beta" },
    { icon: Globe, title: "50+ Languages", desc: "Generate vocals in over 50 languages with native pronunciation and accents.", status: "operational" },
    { icon: Settings, title: "Style Control", desc: "Fine-tune genre, mood, tempo, key, and energy levels with precision.", status: "operational" },
    { icon: Zap, title: "Real-time Collaboration", desc: "Work with team members in real-time. Share projects instantly.", status: "coming-soon" }
  ]

  const stats = [
    { value: "50M+", label: "Songs Generated" },
    { value: "180+", label: "Countries" },
    { value: "99.9%", label: "Uptime" },
    { value: "< 2min", label: "Avg Generation Time" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary"><Music className="size-4 text-primary-foreground" /></div>
            <span className="text-sm font-bold tracking-wider">DIETER PRO</span>
          </Link>
          <Link href="/create"><Button>Start Creating</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30"><Sparkles className="mr-1.5 size-3" />All Features</Badge>
          <h1 className="mb-4 text-4xl font-bold">Professional AI Music <span className="text-primary">Production Suite</span></h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">Everything you need to create, edit, and distribute professional music with AI</p>
        </div>

        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10"><feature.icon className="size-6 text-primary" /></div>
                <Badge variant={feature.status === "operational" ? "default" : feature.status === "beta" ? "secondary" : "outline"} className="text-[10px]">
                  {feature.status === "operational" ? <CheckCircle2 className="mr-1 size-3" /> : null}
                  {feature.status}
                </Badge>
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Ready to Create Professional Music?</h2>
          <p className="mb-6 text-muted-foreground">Start creating songs with AI in minutes. No credit card required.</p>
          <Link href="/create"><Button size="lg" className="gap-2">Start Free <Sparkles className="size-4" /></Button></Link>
        </div>
      </main>
    </div>
  )
}
