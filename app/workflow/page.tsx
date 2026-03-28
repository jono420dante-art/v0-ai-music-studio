"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowRight, CheckCircle2, Music, Upload,
  Download, Share2, Sparkles, Layers, Settings 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function WorkflowPage() {
  const workflows = [
    {
      title: "Song Creation Workflow",
      description: "Create professional AI-generated songs from lyrics to master",
      steps: [
        { name: "Write or Generate Lyrics", icon: Sparkles, desc: "Use AI lyrics generator or write your own" },
        { name: "Choose Style & Voice", icon: Music, desc: "Select genre, mood, voice type and language" },
        { name: "Generate Song", icon: Music, desc: "AI creates full track with vocals and instruments" },
        { name: "Edit & Mix", icon: Layers, desc: "Adjust stems, add effects, professional mixing" },
        { name: "Master & Export", icon: Download, desc: "Final mastering and export in multiple formats" },
        { name: "Distribute", icon: Share2, desc: "Publish to Spotify, Apple Music, YouTube" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Music className="size-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-wider">DIETER PRO</span>
          </Link>
          <Link href="/create"><Button className="bg-primary">Start Creating</Button></Link>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">AI Music Production <span className="text-primary">Workflows</span></h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">Step-by-step guides to create and distribute professional music</p>
        </div>
        <div className="space-y-12">
          {workflows.map((workflow, idx) => (
            <div key={idx} className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-2 text-2xl font-bold">{workflow.title}</h2>
              <p className="mb-8 text-muted-foreground">{workflow.description}</p>
              <div className="space-y-4">
                {workflow.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl border border-border bg-background p-6">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">{i + 1}</div>
                    <div className="flex-1"><h3 className="mb-1 font-semibold">{step.name}</h3><p className="text-sm text-muted-foreground">{step.desc}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center"><Link href="/create"><Button className="gap-2">Try This Workflow <ArrowRight className="size-4" /></Button></Link></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
