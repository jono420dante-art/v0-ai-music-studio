"use client"

import { useState, useEffect } from "react"
import { X, Sparkles, Lightbulb, TrendingUp, Zap, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AIDirectorProps {
  context?: "home" | "create" | "studio" | "workflow" | "features" | "my-songs"
  userAction?: string
  songData?: any
}

export function AIDirector({ context = "home", userAction, songData }: AIDirectorProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentTip, setCurrentTip] = useState(0)
  const [chatMessages, setChatMessages] = useState<Array<{role: "director" | "user", text: string}>>([]
)

  const contextualAdvice = {
    home: [
      { icon: Sparkles, title: "Pro Tip", text: "Start with a clear vision of your song's mood and genre. The AI performs best with specific prompts like 'upbeat electronic pop with female vocals' rather than vague descriptions." },
      { icon: TrendingUp, title: "Trending", text: "Songs with BPM between 120-140 are currently trending. Consider electronic, pop, or hip-hop genres for maximum engagement." },
      { icon: Lightbulb, title: "Quick Win", text: "Use the 'Quick Actions' panel to jumpstart your creativity. Try 'Make a song' and describe your idea in natural language." }
    ],
    create: [
      { icon: Sparkles, title: "Director's Advice", text: "For best results: Be specific about genre, mood, and vocal style. Example: 'Create an energetic indie rock song with raspy male vocals, tempo 145 BPM, about overcoming challenges'" },
      { icon: Zap, title: "Pro Technique", text: "Layer your production: Start with the core song, then use stem separation to isolate vocals, add your own instrumentation, and remix for a unique sound." },
      { icon: Lightbulb, title: "Creative Boost", text: "Stuck on lyrics? Try our AI Lyrics Generator first. It creates professional, rhyming lyrics in any style. Then generate music to match!" },
      { icon: TrendingUp, title: "Industry Standard", text: "Professional songs typically have: Intro (0-8s), Verse 1 (8-24s), Chorus (24-40s), Verse 2 (40-56s), Chorus (56-72s), Bridge (72-88s), Final Chorus (88-120s). Structure your prompts accordingly." }
    ],
    studio: [
      { icon: Zap, title: "Mixing Pro Tip", text: "Always leave headroom! Keep your master fader at -6dB to -3dB to avoid clipping during final mastering." },
      { icon: Lightbulb, title: "EQ Guidance", text: "Start with subtractive EQ (cutting problem frequencies) before additive EQ (boosting). Cut before you boost saves your mix from muddiness." },
      { icon: Sparkles, title: "Vocals Clarity", text: "Boost around 3-5kHz for vocal presence. Cut around 200-400Hz to reduce muddiness. Add gentle compression (3:1 ratio) for consistency." },
      { icon: TrendingUp, title: "Stems Workflow", text: "Separate your track into stems (vocals, drums, bass, instruments) for professional mixing. Apply effects to individual stems for cleaner results." }
    ],
    workflow: [
      { icon: Lightbulb, title: "Efficient Workflow", text: "Professional workflow: 1) Write/generate lyrics, 2) Choose style & voice, 3) Generate initial track, 4) Separate stems, 5) Mix & master, 6) Distribute. Each step builds on the previous." },
      { icon: Sparkles, title: "Time Saver", text: "Batch process multiple variations! Generate 3-4 versions with slight prompt variations, then pick the best one to refine." }
    ],
    features: [
      { icon: Zap, title: "Feature Highlight", text: "Voice Cloning is incredibly powerful: Upload just 10 seconds of any voice, and clone it in 50+ languages. Perfect for multilingual content." },
      { icon: TrendingUp, title: "Distribution", text: "Use our direct distribution to Spotify, Apple Music, and YouTube. Your songs can go live in 24-48 hours with proper metadata." }
    ],
    "my-songs": [
      { icon: Lightbulb, title: "Organization Tip", text: "Tag your songs with genre, mood, and project names. This makes finding and managing your library much easier as it grows." },
      { icon: Sparkles, title: "Monetization", text: "Songs with professional mixing and mastering sell better. Consider running your top tracks through our mastering suite before publishing to marketplaces." },
      { icon: TrendingUp, title: "Analytics", text: "Track your song performance! Songs with engaging intros (first 5 seconds) have 3x higher retention rates." }
    ]
  }

  const tips = contextualAdvice[context] || contextualAdvice.home

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 15000) // Rotate tips every 15 seconds
    return () => clearInterval(interval)
  }, [tips.length])

  useEffect(() => {
    if (userAction) {
      const advice = generateContextualAdvice(userAction, context, songData)
      if (advice) {
        setChatMessages(prev => [...prev, { role: "director", text: advice }])
      }
    }
  }, [userAction, context, songData])

  const generateContextualAdvice = (action: string, ctx: string, data?: any): string | null => {
    const adviceMap: Record<string, string> = {
      "started-generation": "Great! Your song is generating. This typically takes 60-120 seconds. While you wait, consider what edits you might want to make—vocal adjustments, tempo changes, or stem separation for remixing.",
      "lyrics-generated": "Perfect! Now that you have lyrics, review them for flow and meaning. You can regenerate specific sections or edit manually before creating the music.",
      "song-completed": "Excellent work! Your song is ready. Next steps: 1) Listen critically for any issues, 2) Use stem separation if you want to remix, 3) Apply mastering for professional sound, 4) Export and distribute!",
      "editing-stems": "Pro mode activated! When editing stems: Focus on one element at a time. Start with vocals (clarity and presence), then drums (punch and space), then bass (low-end control), finally other instruments.",
      "exporting": "Export Tips: Use WAV (44.1kHz/16-bit minimum) for distribution. MP3 320kbps for demos. Always export stems separately if you might need them later!"
    }
    return adviceMap[action] || null
  }

  if (!isOpen) return null

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <Sparkles className="size-4" />
        AI Director
        <ChevronUp className="size-4" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 rounded-2xl border border-border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-purple-600/10 to-pink-600/10 p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
            <Sparkles className="size-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold">AI Director</h3>
            <p className="text-[10px] text-muted-foreground">Your Creative Guide</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="size-8 p-0"
          >
            <ChevronDown className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="size-8 p-0"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Current Tip */}
      <div className="border-b border-border p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            {(() => {
              const Icon = tips[currentTip].icon
              return <Icon className="size-5 text-primary" />
            })()}
          </div>
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">{tips[currentTip].title}</Badge>
              <span className="text-[10px] text-muted-foreground">{currentTip + 1}/{tips.length}</span>
            </div>
            <p className="text-xs leading-relaxed text-foreground">{tips[currentTip].text}</p>
          </div>
        </div>
        {/* Tip Navigation */}
        <div className="mt-3 flex gap-1">
          {tips.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTip(i)}
              className={`h-1 flex-1 rounded-full transition-all ${
                i === currentTip ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      {chatMessages.length > 0 && (
        <div className="max-h-48 space-y-2 overflow-y-auto border-b border-border p-4">
          {chatMessages.map((msg, i) => (
            <div key={i} className="flex gap-2">
              <MessageSquare className="size-4 shrink-0 text-primary" />
              <p className="text-xs text-muted-foreground">{msg.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="p-4">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="justify-start text-xs" onClick={() => setChatMessages(prev => [...prev, { role: "director", text: "Great question! For your first song, I recommend starting with a genre you love. Be specific: instead of 'pop song', try 'upbeat synth-pop with energetic female vocals, 128 BPM, about summer adventures'. The more details, the better the result!" }])}>
            <Lightbulb className="mr-1.5 size-3" />
            Get Advice
          </Button>
          <Button variant="outline" size="sm" className="justify-start text-xs" onClick={() => setCurrentTip((prev) => (prev + 1) % tips.length)}>
            <Sparkles className="mr-1.5 size-3" />
            Next Tip
          </Button>
        </div>
      </div>
    </div>
  )
}
