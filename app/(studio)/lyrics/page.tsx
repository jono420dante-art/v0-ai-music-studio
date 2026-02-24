"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sparkles, Copy, Download, FileText } from "lucide-react"

const themes = [
  "Love & Heartbreak", "Ambition & Success", "Identity", "Social Justice",
  "Party & Fun", "Spirituality", "Loss & Grief", "Adventure",
]

const structures = [
  "Verse-Chorus", "Verse-Pre-Chorus-Chorus", "AABA", "Through-composed", "Custom",
]

const rhymeSchemes = ["AABB", "ABAB", "ABCB", "AABA", "Free Verse", "Terza Rima"]

const writingStyles = ["Poetic", "Direct", "Storytelling", "Abstract", "Conversational"]

const sampleLyrics = `[Verse 1]
Neon lights bleed through the rain-soaked street
Every heartbeat lost in digital heat
Searching for a signal in the noise
Finding something real among the void

[Pre-Chorus]
And I know you feel it too
This electricity between me and you
Pull me closer, let the music guide us through

[Chorus]
We are the ones who burn the midnight sky
Dancing on the edge of something we can't define
Lost in the frequency, electric and alive
Neon solitude, we're finally free tonight

[Verse 2]
Scattered memories like pixels on a screen
Living in the spaces in between
Your voice a melody I can't forget
A song that I haven't written yet

[Bridge]
Let it all go / Let the bass drop low
Feel the rhythm in your soul
We're never letting go`

export default function LyricsPage() {
  const [selectedTheme, setSelectedTheme] = useState("Love & Heartbreak")
  const [selectedRhyme, setSelectedRhyme] = useState("ABAB")
  const [selectedStyle, setSelectedStyle] = useState("Poetic")
  const [context, setContext] = useState("")
  const [generated, setGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGenerated(true)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="flex h-full">
      {/* Input Panel */}
      <ScrollArea className="flex-1 border-r border-border">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Lyrics AI</h2>
            <p className="text-sm text-muted-foreground">Generate professional lyrics with AI assistance</p>
          </div>

          {/* Theme */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Theme</p>
            <div className="flex flex-wrap gap-1.5">
              {themes.map((theme) => (
                <Badge
                  key={theme}
                  variant={selectedTheme === theme ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedTheme === theme
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                  onClick={() => setSelectedTheme(theme)}
                >
                  {theme}
                </Badge>
              ))}
            </div>
          </div>

          {/* Song Structure */}
          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Song Structure</p>
            <Select defaultValue="Verse-Pre-Chorus-Chorus">
              <SelectTrigger className="w-full bg-secondary text-secondary-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {structures.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Rhyme Scheme */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Rhyme Scheme</p>
            <div className="flex flex-wrap gap-1.5">
              {rhymeSchemes.map((scheme) => (
                <Badge
                  key={scheme}
                  variant={selectedRhyme === scheme ? "default" : "outline"}
                  className={`cursor-pointer font-mono transition-colors ${
                    selectedRhyme === scheme
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                  onClick={() => setSelectedRhyme(scheme)}
                >
                  {scheme}
                </Badge>
              ))}
            </div>
          </div>

          {/* Writing Style */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Writing Style</p>
            <div className="flex flex-wrap gap-1.5">
              {writingStyles.map((style) => (
                <Badge
                  key={style}
                  variant={selectedStyle === style ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedStyle === style
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                  onClick={() => setSelectedStyle(style)}
                >
                  {style}
                </Badge>
              ))}
            </div>
          </div>

          {/* Context */}
          <div className="mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Context</p>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe the story or feeling you want to convey..."
              className="w-full resize-none rounded-lg border border-border bg-secondary p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              rows={4}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <Sparkles className="size-4" />
            {isGenerating ? "Generating..." : "Generate Lyrics"}
          </Button>
        </div>
      </ScrollArea>

      {/* Output Panel */}
      <div className="flex w-[420px] shrink-0 flex-col bg-card">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Output</span>
          </div>
          {generated && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>Words: 132</span>
              <span>Lines: 24</span>
              <span>Sections: 5</span>
            </div>
          )}
        </div>
        <ScrollArea className="flex-1">
          {generated ? (
            <div className="p-4">
              <div className="mb-4 flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Copy className="size-3" /> Copy
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Download className="size-3" /> Export
                </Button>
              </div>
              <h3 className="mb-4 text-lg font-bold text-foreground">Neon Solitude</h3>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                {sampleLyrics}
              </pre>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
                <FileText className="size-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground">No lyrics generated yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Configure your settings and hit generate
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
