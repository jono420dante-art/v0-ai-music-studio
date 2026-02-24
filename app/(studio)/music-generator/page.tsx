"use client"

import { useState, useCallback } from "react"
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
  Lightbulb,
  Gauge,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Zap,
  Play,
  Pause,
  Square,
} from "lucide-react"
import { useToneEngine, useSpectrum, useBeatDetector } from "@/hooks/use-tone-engine"
import { SpectrumVisualizer, BeatPulse, BeatGrid } from "@/components/audio-visualizer"

/* ─── Genre list (16 genres) ─── */
const genres = [
  "Afro House", "Cinematic", "Lo-Fi", "EDM", "Hip-Hop", "Jazz",
  "Ambient", "Pop", "Techno", "Trap", "R&B", "Soul",
  "Indie", "Metal", "Classical", "Reggae",
]

/* ─── Mood Grid (20 moods with instrument tags) ─── */
const moodGrid = [
  { mood: "Energetic", tag: "Mixer Board" },
  { mood: "Calm", tag: "Equalizer" },
  { mood: "Uplifting", tag: "Microphone" },
  { mood: "Dark", tag: "Headphones" },
  { mood: "Melancholic", tag: "Synthesizer" },
  { mood: "Joyful", tag: "Guitar" },
  { mood: "Mysterious", tag: "Drums" },
  { mood: "Dreamy", tag: "Sheet Music" },
  { mood: "Aggressive", tag: "Amplifier" },
  { mood: "Peaceful", tag: "Speaker" },
  { mood: "Epic", tag: "Orchestra" },
  { mood: "Ambient", tag: "Reverb" },
  { mood: "Funky", tag: "Trumpet" },
  { mood: "Romantic", tag: "Violin" },
  { mood: "Cinematic", tag: "Film Score" },
  { mood: "Psychedelic", tag: "Effects Pedal" },
  { mood: "Minimalist", tag: "Sine Wave" },
  { mood: "Tribal", tag: "Percussion" },
  { mood: "Ethereal", tag: "Pad Synth" },
  { mood: "Industrial", tag: "Synthesizer" },
]

/* ─── Audio Quality Options ─── */
const audioQualities = [
  { value: "128", label: "128kbps" },
  { value: "192", label: "192kbps" },
  { value: "256", label: "256kbps" },
  { value: "320", label: "320kbps" },
  { value: "flac", label: "FLAC (Lossless)" },
  { value: "wav", label: "WAV (Studio)" },
]

/* ─── BPM presets per genre ─── */
const genreBPM: Record<string, number> = {
  "Afro House": 120, "Cinematic": 80, "Lo-Fi": 85, "EDM": 128,
  "Hip-Hop": 90, "Jazz": 110, "Ambient": 70, "Pop": 120,
  "Techno": 130, "Trap": 140, "R&B": 95, "Soul": 100,
  "Indie": 115, "Metal": 160, "Classical": 100, "Reggae": 80,
}

export default function MusicGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [duration, setDuration] = useState([30])
  const [compression, setCompression] = useState([50])
  const [reverb, setReverb] = useState([30])
  const [delay, setDelay] = useState([20])
  const [audioQuality, setAudioQuality] = useState("320")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [masterGain, setMasterGain] = useState([0])
  const [stereoWidth, setStereoWidth] = useState([100])
  const [bass, setBass] = useState([50])
  const [treble, setTreble] = useState([50])
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const tone = useToneEngine()
  const spectrum = useSpectrum(32)
  const beatDetector = useBeatDetector()

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    )
  }

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    // Simulate generation time then play Tone.js preview
    setTimeout(async () => {
      setIsGenerating(false)
      setHasGenerated(true)
      const genreKey = selectedGenre?.toLowerCase().replace(/\s+/g, "-") || "default"
      const bpm = selectedGenre ? genreBPM[selectedGenre] || 120 : 120
      const synthType = selectedMoods.includes("Dark") || selectedMoods.includes("Aggressive")
        ? "bass" as const
        : selectedMoods.includes("Dreamy") || selectedMoods.includes("Ethereal")
          ? "pad" as const
          : "lead" as const
      await tone.playSequence(genreKey, bpm, synthType)
      spectrum.start()
      beatDetector.startDetection()
    }, 2000)
  }, [selectedGenre, selectedMoods, tone, spectrum, beatDetector])

  const handlePreviewToggle = useCallback(async () => {
    if (tone.isPlaying) {
      tone.pause()
      spectrum.stop()
      beatDetector.stopDetection()
    } else {
      await tone.resume()
      spectrum.start()
      beatDetector.startDetection()
    }
  }, [tone, spectrum, beatDetector])

  const handleStop = useCallback(() => {
    tone.stop()
    spectrum.stop()
    beatDetector.stopDetection()
  }, [tone, spectrum, beatDetector])

  /* Dynamic suggestion */
  const suggestion = selectedGenre
    ? `Try ${selectedGenre} + ${selectedMoods[0] || "Energetic"} for maximum impact`
    : "Select a genre and mood to get AI suggestions"

  const qualityLabel = audioQualities.find((q) => q.value === audioQuality)?.label || "320kbps"

  return (
    <div className="flex h-full">
      {/* ─── Left Panel: AI Director ─── */}
      <div className="w-72 shrink-0 border-r border-border bg-card/50">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-3 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              AI Director
            </p>

            {/* Suggestion Card */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <Lightbulb className="size-3.5 text-primary" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Suggestion</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">{suggestion}</p>
            </div>

            {/* Beat Detection Card (BeatNet-inspired) */}
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <Zap className="size-3.5 text-chart-3" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-chart-3">
                  BeatNet Detector
                </span>
              </div>
              {beatDetector.isDetecting ? (
                <div className="flex flex-col gap-2">
                  <BeatPulse currentBeat={beatDetector.currentBeat} isActive={true} />
                  <BeatGrid beats={beatDetector.beats} maxBeats={16} />
                  <p className="text-[10px] text-muted-foreground">
                    {beatDetector.beats.length} beats detected
                  </p>
                </div>
              ) : (
                <p className="text-xs text-foreground leading-relaxed">
                  Generate a track to detect beats and tempo in real-time
                </p>
              )}
            </div>

            {/* Live Spectrum */}
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <div className="mb-2 flex items-center gap-2">
                <SlidersHorizontal className="size-3.5 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Output Spectrum
                </span>
              </div>
              <SpectrumVisualizer
                data={spectrum.spectrumData}
                isPlaying={tone.isPlaying}
                barCount={24}
                height={36}
              />
            </div>

            {/* Quality Card */}
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <Gauge className="size-3.5 text-muted-foreground" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Quality</span>
              </div>
              <p className="text-xs text-foreground">
                Generating at {qualityLabel} {audioQuality === "wav" || audioQuality === "flac" ? "- Lossless" : "- Studio Grade"}
              </p>
            </div>

            {/* Quality & Tools */}
            <div className="mt-2 border-t border-border pt-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Quality & Tools
              </p>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Audio Quality
                </label>
                <Select value={audioQuality} onValueChange={setAudioQuality}>
                  <SelectTrigger className="w-full bg-secondary text-secondary-foreground text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {audioQualities.map((q) => (
                      <SelectItem key={q.value} value={q.value}>{q.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <LeftSlider label="Compression" value={compression} onChange={setCompression} suffix="%" />
              <LeftSlider label="Reverb" value={reverb} onChange={setReverb} suffix="%" />
              <LeftSlider label="Delay" value={delay} onChange={setDelay} suffix="%" />

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="mt-3 flex w-full items-center justify-between rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Advanced Tools
                {showAdvanced ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </button>

              {showAdvanced && (
                <div className="mt-3 flex flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                  <LeftSlider label="Master Gain" value={masterGain} onChange={setMasterGain} min={-12} max={12} suffix=" dB" />
                  <LeftSlider label="Stereo Width" value={stereoWidth} onChange={setStereoWidth} suffix="%" />
                  <LeftSlider label="Bass" value={bass} onChange={setBass} suffix="%" />
                  <LeftSlider label="Treble" value={treble} onChange={setTreble} suffix="%" />
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* ─── Main Panel ─── */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Music Generation Studio</h2>
            <p className="text-sm text-muted-foreground">
              Create professional tracks with AI-powered production tools &middot; Powered by Tone.js
            </p>
          </div>

          {/* Prompt */}
          <div className="mb-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Describe Your Music
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A dreamy lo-fi beat with soft piano, vinyl crackle, and a chill jazz saxophone solo in the background..."
              className="w-full resize-none rounded-lg border border-border bg-secondary p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              rows={3}
            />
          </div>

          {/* Genre Selector */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Genre {selectedGenre && <span className="text-primary">({genreBPM[selectedGenre]} BPM)</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedGenre === genre
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                  onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Studio Mood Grid */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Studio Mood Grid
            </p>
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-5">
              {moodGrid.map((item) => (
                <button
                  key={item.mood}
                  onClick={() => toggleMood(item.mood)}
                  className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all ${
                    selectedMoods.includes(item.mood)
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className={`text-xs font-semibold ${
                    selectedMoods.includes(item.mood) ? "text-primary" : "text-foreground"
                  }`}>
                    {item.mood}
                  </span>
                  <span className="mt-0.5 text-[10px] text-muted-foreground">{item.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Duration
              </p>
              <span className="text-xs font-semibold text-foreground">{duration[0]}s</span>
            </div>
            <Slider value={duration} onValueChange={setDuration} min={10} max={120} step={5} />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>10s</span>
              <span>120s</span>
            </div>
          </div>

          {/* Generate / Preview Controls */}
          <div className="flex gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Generate Track
                </>
              )}
            </Button>

            {hasGenerated && (
              <>
                <Button
                  onClick={handlePreviewToggle}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  {tone.isPlaying ? (
                    <>
                      <Pause className="size-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="size-4" />
                      Preview
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleStop}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <Square className="size-4" />
                  Stop
                </Button>
              </>
            )}
          </div>

          {/* Preview Waveform when playing */}
          {hasGenerated && (
            <div className="mt-6 rounded-xl border border-border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Generated Preview
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground">
                    {selectedGenre || "Default"} &middot; {selectedGenre ? genreBPM[selectedGenre] : 120} BPM
                  </span>
                  <Badge variant="outline" className="border-primary/30 text-primary text-[10px]">
                    Tone.js
                  </Badge>
                </div>
              </div>
              <SpectrumVisualizer
                data={spectrum.spectrumData}
                isPlaying={tone.isPlaying}
                barCount={48}
                height={56}
              />
              {/* Scrubber */}
              <div className="mt-3 flex items-center gap-3">
                <span className="w-10 text-right text-[10px] font-mono text-muted-foreground">
                  {formatTime(tone.progress)}
                </span>
                <Slider
                  value={[tone.progress]}
                  onValueChange={([v]) => tone.setProgress(v)}
                  min={0}
                  max={100}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-10 text-[10px] font-mono text-muted-foreground">
                  {duration[0]}s
                </span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

/* ─── Reusable left-panel slider ─── */
function LeftSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  suffix = "",
}: {
  label: string
  value: number[]
  onChange: (v: number[]) => void
  min?: number
  max?: number
  suffix?: string
}) {
  return (
    <div className="mb-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-semibold text-foreground">
          {value[0] > 0 && min < 0 ? `+${value[0]}` : value[0]}{suffix}
        </span>
      </div>
      <Slider value={value} onValueChange={onChange} min={min} max={max} step={1} />
    </div>
  )
}

function formatTime(progressPct: number) {
  const totalSec = 30 // loop duration
  const currentSec = Math.round((progressPct / 100) * totalSec)
  const m = Math.floor(currentSec / 60)
  const s = currentSec % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}
