"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  Upload,
  Scissors,
  Music2,
  Drum,
  Guitar,
  Waves,
  Sparkles,
  Download,
  Play,
  Pause,
  Volume2,
} from "lucide-react"

const stems = [
  { id: "vocals", label: "Lead Vocals", icon: Music2, color: "bg-chart-1" },
  { id: "drums", label: "Drums", icon: Drum, color: "bg-chart-2" },
  { id: "bass", label: "Bass", icon: Guitar, color: "bg-chart-3" },
  { id: "melody", label: "Melody / Synth", icon: Sparkles, color: "bg-chart-4" },
  { id: "harmony", label: "Harmony / Pads", icon: Waves, color: "bg-chart-5" },
  { id: "fx", label: "FX / Ambience", icon: Volume2, color: "bg-primary" },
]

export default function StemSplitterPage() {
  const [uploaded, setUploaded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [complete, setComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playingStems, setPlayingStems] = useState<Record<string, boolean>>({})
  const [stemVolumes, setStemVolumes] = useState<Record<string, number[]>>(() =>
    Object.fromEntries(stems.map((s) => [s.id, [80]]))
  )

  const handleUpload = () => {
    setUploaded(true)
    setProcessing(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setProcessing(false)
          setComplete(true)
          return 100
        }
        return prev + 2
      })
    }, 60)
  }

  const toggleStemPlay = (id: string) => {
    setPlayingStems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Stem Splitter</h2>
        <p className="text-sm text-muted-foreground">
          Separate any song into individual stems: vocals, drums, bass, melody, harmony, and FX
        </p>
      </div>

      {!uploaded ? (
        <div
          onClick={handleUpload}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-16 text-center transition-colors hover:border-primary/50 hover:bg-card/80"
        >
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
            <Upload className="size-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold text-foreground">
            Drop your track here
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            MP3, WAV, FLAC, M4A &middot; Max 100MB
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            Browse File
          </Button>
        </div>
      ) : processing ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-16 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            <Scissors className="size-7 text-primary animate-pulse" />
          </div>
          <p className="text-lg font-semibold text-foreground">Splitting stems...</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Analyzing and separating audio channels
          </p>
          <div className="mt-6 w-full max-w-sm">
            <Progress value={progress} className="h-2" />
            <p className="mt-2 text-xs text-muted-foreground">{progress}% complete</p>
          </div>
        </div>
      ) : (
        <div>
          {/* File Info */}
          <div className="mb-6 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Music2 className="size-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">midnight_mix.wav</p>
              <p className="text-xs text-muted-foreground">3:42 &middot; WAV &middot; 44.1kHz</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Download className="size-3" /> Download All
            </Button>
          </div>

          {/* Stems Grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {stems.map((stem) => (
              <div
                key={stem.id}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className={`flex size-8 items-center justify-center rounded-lg ${stem.color}/15`}>
                    <stem.icon className={`size-4 ${stem.color.replace("bg-", "text-")}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{stem.label}</span>
                </div>

                {/* Waveform placeholder */}
                <div className="mb-3 flex h-12 items-end gap-px rounded-md bg-secondary p-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm ${stem.color}`}
                      style={{
                        height: `${20 + Math.random() * 80}%`,
                        opacity: playingStems[stem.id] ? 0.8 : 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStemPlay(stem.id)}
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {playingStems[stem.id] ? (
                      <Pause className="size-3" />
                    ) : (
                      <Play className="size-3 ml-0.5" />
                    )}
                  </button>
                  <Slider
                    value={stemVolumes[stem.id]}
                    onValueChange={(v) =>
                      setStemVolumes((prev) => ({ ...prev, [stem.id]: v }))
                    }
                    min={0}
                    max={100}
                    className="flex-1"
                  />
                  <span className="w-8 text-right text-[10px] text-muted-foreground">
                    {stemVolumes[stem.id]?.[0]}%
                  </span>
                </div>

                <Button variant="ghost" size="sm" className="mt-2 w-full gap-1.5 text-xs text-muted-foreground">
                  <Download className="size-3" /> Export
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
