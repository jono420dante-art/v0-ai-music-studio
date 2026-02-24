"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sparkles,
  Upload,
  Mic2,
  Music2,
  Wand2,
  Zap,
} from "lucide-react"

const genres = [
  "Pop", "Hip-Hop", "R&B", "Electronic", "House", "Techno",
  "Ambient", "Lo-fi", "Jazz", "Soul", "Rock", "Indie",
  "Classical", "Country", "Reggae", "Latin", "Afrobeats",
  "Metal", "Punk", "Blues", "Folk", "World",
]

const moods = [
  "Euphoric", "Melancholic", "Aggressive", "Peaceful", "Romantic",
  "Dark", "Uplifting", "Dreamy", "Energetic", "Nostalgic",
]

const productionStyles = [
  "Minimalist", "Orchestral", "Lo-fi", "Glitchy", "Cinematic",
  "Acoustic", "Synthetic", "Vintage", "Futuristic", "Raw",
  "Polished", "Experimental",
]

const voiceModels = [
  { id: "aria", name: "Aria", lang: "English", genre: "Pop/R&B", gender: "Female" },
  { id: "nova", name: "Nova", lang: "English", genre: "Soul/Gospel", gender: "Female" },
  { id: "luna", name: "Luna", lang: "Spanish/EN", genre: "Latin Pop", gender: "Female" },
  { id: "zara", name: "Zara", lang: "Multi", genre: "Electronic", gender: "Female" },
  { id: "kai", name: "Kai", lang: "English", genre: "Hip-Hop", gender: "Male" },
  { id: "rex", name: "Rex", lang: "English", genre: "Rock/Indie", gender: "Male" },
  { id: "omar", name: "Omar", lang: "Arabic/EN", genre: "World", gender: "Male" },
  { id: "chen", name: "Chen", lang: "Chinese/EN", genre: "Pop/EDM", gender: "Male" },
]

const quickMoods = [
  { label: "Surprise me", icon: Sparkles },
  { label: "Dark & moody", icon: Zap },
  { label: "Upbeat banger", icon: Music2 },
  { label: "Chill vibes", icon: Wand2 },
  { label: "Epic orchestral", icon: Music2 },
]

const keys = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
const scales = ["Major", "Minor", "Dorian", "Phrygian", "Lydian", "Mixolydian"]
const timeSignatures = ["4/4", "3/4", "6/8", "5/4", "7/8"]

export default function CreatePage() {
  const [mode, setMode] = useState("easy")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedVoice, setSelectedVoice] = useState("aria")
  const [voiceFilter, setVoiceFilter] = useState("all")
  const [bpm, setBpm] = useState([120])
  const [duration, setDuration] = useState([180])
  const [energy, setEnergy] = useState([70])
  const [valence, setValence] = useState([60])
  const [complexity, setComplexity] = useState([50])
  const [prompt, setPrompt] = useState("")
  const [lyrics, setLyrics] = useState("")

  const toggleSelection = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item])
  }

  const filteredVoices = voiceModels.filter((v) =>
    voiceFilter === "all" ? true : v.gender.toLowerCase() === voiceFilter
  )

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex h-full">
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Create Music</h2>
              <p className="text-sm text-muted-foreground">Generate AI-powered tracks in seconds</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="size-3.5 text-primary" />
              ~34 credits per generation
            </div>
          </div>

          {/* Upload Tabs */}
          <Tabs defaultValue="prompt" className="mb-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="reference" className="gap-1.5">
                <Upload className="size-3.5" />
                Reference
              </TabsTrigger>
              <TabsTrigger value="vocal-clone" className="gap-1.5">
                <Mic2 className="size-3.5" />
                Vocal Clone
              </TabsTrigger>
              <TabsTrigger value="melody" className="gap-1.5">
                <Music2 className="size-3.5" />
                Melody Upload
              </TabsTrigger>
            </TabsList>
            <TabsContent value="prompt" className="mt-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the music you want to create... e.g., 'A dreamy lo-fi beat with soft piano and vinyl crackle'"
                className="w-full resize-none rounded-lg border border-border bg-secondary p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                rows={3}
              />
            </TabsContent>
            <TabsContent value="reference" className="mt-4">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-8 text-center">
                <Upload className="mb-2 size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Drop audio reference here</p>
                <p className="text-xs text-muted-foreground">MP3, WAV, FLAC, M4A up to 100MB</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Browse File
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="vocal-clone" className="mt-4">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-8 text-center">
                <Mic2 className="mb-2 size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Upload voice sample to clone</p>
                <p className="text-xs text-muted-foreground">Clear vocal recording, 10-30 seconds</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Browse File
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="melody" className="mt-4">
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 p-8 text-center">
                <Music2 className="mb-2 size-8 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground">Upload melody for guidance</p>
                <p className="text-xs text-muted-foreground">MIDI, MP3, or hummed recording</p>
                <Button variant="outline" size="sm" className="mt-3">
                  Browse File
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Moods */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick Mood</p>
            <div className="flex flex-wrap gap-2">
              {quickMoods.map((mood) => (
                <Button
                  key={mood.label}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-border bg-secondary text-secondary-foreground hover:border-primary hover:text-primary"
                >
                  <mood.icon className="size-3.5" />
                  {mood.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Lyrics */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Lyrics</p>
              <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-primary">
                <Wand2 className="size-3" /> AI Generate
              </Button>
            </div>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Write or paste your lyrics here..."
              className="w-full resize-none rounded-lg border border-border bg-secondary p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              rows={4}
            />
          </div>

          {/* Mode Tabs */}
          <Tabs value={mode} onValueChange={setMode} className="mb-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="easy">Easy</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
              <TabsTrigger value="pro">Pro V8</TabsTrigger>
            </TabsList>

            <TabsContent value="easy" className="mt-4">
              <EasyModeContent
                genres={genres}
                moods={moods}
                productionStyles={productionStyles}
                selectedGenres={selectedGenres}
                selectedMoods={selectedMoods}
                selectedStyles={selectedStyles}
                toggleSelection={toggleSelection}
                setSelectedGenres={setSelectedGenres}
                setSelectedMoods={setSelectedMoods}
                setSelectedStyles={setSelectedStyles}
              />
            </TabsContent>

            <TabsContent value="custom" className="mt-4">
              <EasyModeContent
                genres={genres}
                moods={moods}
                productionStyles={productionStyles}
                selectedGenres={selectedGenres}
                selectedMoods={selectedMoods}
                selectedStyles={selectedStyles}
                toggleSelection={toggleSelection}
                setSelectedGenres={setSelectedGenres}
                setSelectedMoods={setSelectedMoods}
                setSelectedStyles={setSelectedStyles}
              />
              <MusicTheoryPanel />
            </TabsContent>

            <TabsContent value="pro" className="mt-4">
              <EasyModeContent
                genres={genres}
                moods={moods}
                productionStyles={productionStyles}
                selectedGenres={selectedGenres}
                selectedMoods={selectedMoods}
                selectedStyles={selectedStyles}
                toggleSelection={toggleSelection}
                setSelectedGenres={setSelectedGenres}
                setSelectedMoods={setSelectedMoods}
                setSelectedStyles={setSelectedStyles}
              />
              <MusicTheoryPanel />
              <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pro V8 - Advanced Controls
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-border bg-card p-3">
                    <p className="text-xs font-medium text-muted-foreground">Instrument Sequencer</p>
                    <div className="mt-2 flex gap-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-6 flex-1 rounded-sm ${i % 4 === 0 ? "bg-primary/30" : "bg-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-3">
                    <p className="text-xs font-medium text-muted-foreground">Multi-Voice Layering</p>
                    <div className="mt-2 flex flex-col gap-1">
                      {["Lead", "Harmony", "Ad-lib"].map((layer) => (
                        <div key={layer} className="flex items-center gap-2">
                          <span className="w-14 text-[10px] text-muted-foreground">{layer}</span>
                          <div className="h-1.5 flex-1 rounded-full bg-muted">
                            <div className="h-full w-3/4 rounded-full bg-primary/50" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Sliders */}
          <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-5">
            <SliderControl label="BPM" value={bpm} onChange={setBpm} min={60} max={200} display={`${bpm[0]} BPM`} />
            <SliderControl label="Duration" value={duration} onChange={setDuration} min={30} max={360} display={formatDuration(duration[0])} />
            <SliderControl label="Energy" value={energy} onChange={setEnergy} min={0} max={100} display={`${energy[0]}%`} />
            <SliderControl label="Valence" value={valence} onChange={setValence} min={0} max={100} display={`${valence[0]}%`} />
            <SliderControl label="Complexity" value={complexity} onChange={setComplexity} min={0} max={100} display={`${complexity[0]}%`} />
          </div>

          {/* Versions & Quality */}
          <div className="mb-6 flex gap-4">
            <div className="flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Versions</p>
              <Select defaultValue="2">
                <SelectTrigger className="w-full bg-secondary text-secondary-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 version</SelectItem>
                  <SelectItem value="2">2 versions</SelectItem>
                  <SelectItem value="3">3 versions</SelectItem>
                  <SelectItem value="4">4 versions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quality</p>
              <Select defaultValue="standard">
                <SelectTrigger className="w-full bg-secondary text-secondary-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (128kbps)</SelectItem>
                  <SelectItem value="high">High (320kbps)</SelectItem>
                  <SelectItem value="lossless">Lossless (WAV)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generate Button */}
          <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
            <Sparkles className="size-4" />
            Generate Track
          </Button>
        </div>
      </ScrollArea>

      {/* Voice Models Panel */}
      <div className="w-72 shrink-0 border-l border-border bg-card">
        <div className="border-b border-border p-4">
          <p className="text-sm font-semibold text-foreground">Voice Models</p>
          <div className="mt-3 flex gap-1">
            {["all", "female", "male"].map((f) => (
              <button
                key={f}
                onClick={() => setVoiceFilter(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  voiceFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="flex flex-col gap-1 p-2">
            {filteredVoices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => setSelectedVoice(voice.id)}
                className={`flex items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                  selectedVoice === voice.id
                    ? "bg-primary/10 ring-1 ring-primary"
                    : "hover:bg-secondary"
                }`}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground uppercase">
                  {voice.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{voice.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {voice.lang} &middot; {voice.genre}
                  </p>
                </div>
                {selectedVoice === voice.id && (
                  <div className="ml-auto size-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  display,
}: {
  label: string
  value: number[]
  onChange: (v: number[]) => void
  min: number
  max: number
  display: string
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <span className="text-xs font-semibold text-foreground">{display}</span>
      </div>
      <Slider value={value} onValueChange={onChange} min={min} max={max} step={1} />
    </div>
  )
}

function EasyModeContent({
  genres,
  moods,
  productionStyles,
  selectedGenres,
  selectedMoods,
  selectedStyles,
  toggleSelection,
  setSelectedGenres,
  setSelectedMoods,
  setSelectedStyles,
}: {
  genres: string[]
  moods: string[]
  productionStyles: string[]
  selectedGenres: string[]
  selectedMoods: string[]
  selectedStyles: string[]
  toggleSelection: (item: string, list: string[], setter: (v: string[]) => void) => void
  setSelectedGenres: (v: string[]) => void
  setSelectedMoods: (v: string[]) => void
  setSelectedStyles: (v: string[]) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <ChipGroup label="Genre" items={genres} selected={selectedGenres} toggle={(item) => toggleSelection(item, selectedGenres, setSelectedGenres)} />
      <ChipGroup label="Mood & Energy" items={moods} selected={selectedMoods} toggle={(item) => toggleSelection(item, selectedMoods, setSelectedMoods)} />
      <ChipGroup label="Production Style" items={productionStyles} selected={selectedStyles} toggle={(item) => toggleSelection(item, selectedStyles, setSelectedStyles)} />
    </div>
  )
}

function ChipGroup({
  label,
  items,
  selected,
  toggle,
}: {
  label: string
  items: string[]
  selected: string[]
  toggle: (item: string) => void
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Badge
            key={item}
            variant={selected.includes(item) ? "default" : "outline"}
            className={`cursor-pointer transition-colors ${
              selected.includes(item)
                ? "bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
            onClick={() => toggle(item)}
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  )
}

function MusicTheoryPanel() {
  return (
    <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Music Theory
      </p>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="mb-1.5 text-[10px] font-medium text-muted-foreground">Key</p>
          <Select defaultValue="C">
            <SelectTrigger className="w-full bg-card text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {keys.map((k) => (
                <SelectItem key={k} value={k}>{k}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="mb-1.5 text-[10px] font-medium text-muted-foreground">Scale</p>
          <Select defaultValue="Minor">
            <SelectTrigger className="w-full bg-card text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {scales.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="mb-1.5 text-[10px] font-medium text-muted-foreground">Time Signature</p>
          <Select defaultValue="4/4">
            <SelectTrigger className="w-full bg-card text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeSignatures.map((ts) => (
                <SelectItem key={ts} value={ts}>{ts}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
