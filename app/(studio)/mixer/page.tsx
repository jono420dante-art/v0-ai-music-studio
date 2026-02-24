"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  SkipBack,
  Rewind,
  Square,
  Play,
  FastForward,
  SkipForward,
  Download,
  Volume2,
  VolumeX,
  Pause,
} from "lucide-react"
import { useMixerEngine, useSpectrum } from "@/hooks/use-tone-engine"
import { SpectrumVisualizer } from "@/components/audio-visualizer"

/* ─── Channel definitions with note sequences ─── */
const channelDefs = [
  { id: "vocals", label: "Lead Vocals", volume: 85, muted: false, solo: false, notes: ["C5", "E5", "G5", "A5", "G5", "E5", "C5", "D5"], sub: "4n", type: "lead" as const },
  { id: "kick", label: "Kick", volume: 90, muted: false, solo: false, notes: ["C2", "C2", "C2", "C2"], sub: "4n", type: "bass" as const },
  { id: "snare", label: "Snare", volume: 78, muted: false, solo: false, notes: ["E3", "E3", "E3", "E3"], sub: "8n", type: "lead" as const },
  { id: "hihat", label: "Hi-Hats", volume: 65, muted: false, solo: false, notes: ["F#5", "F#5", "F#5", "F#5", "F#5", "F#5", "F#5", "F#5"], sub: "16n", type: "lead" as const },
  { id: "bass", label: "Bass", volume: 88, muted: false, solo: false, notes: ["C2", "G2", "Eb2", "Bb2"], sub: "4n", type: "bass" as const },
  { id: "synth", label: "Synth Lead", volume: 72, muted: false, solo: false, notes: ["C4", "E4", "G4", "B4", "A4", "F4", "D4", "G4"], sub: "8n", type: "lead" as const },
  { id: "pad", label: "Pad", volume: 55, muted: false, solo: false, notes: ["C3", "E3", "G3", "B3"], sub: "2n", type: "pad" as const },
  { id: "master", label: "Master", volume: 95, muted: false, solo: false, notes: [], sub: "4n", type: "lead" as const },
]

export default function MixerPage() {
  const [channelState, setChannelState] = useState(channelDefs)
  const [selectedChannel, setSelectedChannel] = useState("vocals")
  const [eqLow, setEqLow] = useState([2])
  const [eqMid, setEqMid] = useState([-1])
  const [eqHigh, setEqHigh] = useState([3])
  const [pan, setPan] = useState([0])
  const [reverb, setReverb] = useState([25])
  const [delay, setDelay] = useState([10])
  const [compression, setCompression] = useState([60])
  const [transportTime, setTransportTime] = useState("00:00:00.000")

  const mixer = useMixerEngine()
  const spectrum = useSpectrum(32)

  // Initialize mixer channels on mount
  useEffect(() => {
    channelDefs.forEach((ch) => {
      if (ch.id !== "master" && ch.notes.length > 0) {
        mixer.setupChannel(ch.id, ch.notes, ch.sub, ch.type)
        mixer.setChannelVolume(ch.id, ch.volume)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Transport time ticker
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null
    if (mixer.isPlaying) {
      let seconds = 0
      interval = setInterval(() => {
        seconds += 0.1
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        const ms = Math.floor((seconds % 1) * 1000)
        setTransportTime(
          `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(ms).padStart(3, "0")}`
        )
      }, 100)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [mixer.isPlaying])

  const handlePlay = useCallback(async () => {
    if (mixer.isPlaying) {
      mixer.stopAll()
      spectrum.stop()
    } else {
      await mixer.startAll()
      spectrum.start()
    }
  }, [mixer, spectrum])

  const handleStop = useCallback(() => {
    mixer.stopAll()
    spectrum.stop()
    setTransportTime("00:00:00.000")
  }, [mixer, spectrum])

  const updateChannel = (id: string, updates: Partial<(typeof channelDefs)[0]>) => {
    setChannelState((prev) =>
      prev.map((ch) => {
        if (ch.id !== id) return ch
        const updated = { ...ch, ...updates }
        // Sync with Tone.js
        if (updates.volume !== undefined) mixer.setChannelVolume(id, updates.volume)
        if (updates.muted !== undefined) mixer.setChannelMute(id, updates.muted)
        if (updates.solo !== undefined) mixer.setChannelSolo(id, updates.solo)
        return updated
      })
    )
  }

  const currentChannel = channelState.find((ch) => ch.id === selectedChannel)

  return (
    <div className="flex h-full flex-col">
      {/* Transport Bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="size-8 p-0 text-muted-foreground hover:text-foreground">
            <SkipBack className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="size-8 p-0 text-muted-foreground hover:text-foreground">
            <Rewind className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 text-muted-foreground hover:text-foreground"
            onClick={handleStop}
          >
            <Square className="size-3.5" />
          </Button>
          <Button
            size="sm"
            className="size-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handlePlay}
          >
            {mixer.isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="sm" className="size-8 p-0 text-muted-foreground hover:text-foreground">
            <FastForward className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="size-8 p-0 text-muted-foreground hover:text-foreground">
            <SkipForward className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-6">
          <div className="rounded-md bg-secondary px-4 py-1.5 font-mono text-sm text-foreground">
            {transportTime}
          </div>
          <div className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">
            120 BPM
          </div>
          {/* Live spectrum in transport bar */}
          <div className="hidden w-24 lg:block">
            <SpectrumVisualizer
              data={spectrum.spectrumData}
              isPlaying={mixer.isPlaying}
              barCount={16}
              height={24}
            />
          </div>
        </div>

        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="size-3.5" />
          Export Mix
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Channel Faders */}
        <ScrollArea className="flex-1">
          <div className="flex gap-0 p-4">
            {channelState.map((ch) => (
              <div
                key={ch.id}
                onClick={() => setSelectedChannel(ch.id)}
                className={`flex w-24 shrink-0 cursor-pointer flex-col items-center rounded-lg border p-3 transition-colors ${
                  selectedChannel === ch.id
                    ? "border-primary bg-primary/5"
                    : "border-transparent hover:bg-secondary/50"
                }`}
              >
                <p className="mb-3 text-[10px] font-medium text-muted-foreground truncate w-full text-center">
                  {ch.label}
                </p>

                {/* Vertical Fader */}
                <div className="relative mb-3 h-40 w-6">
                  <div className="absolute inset-0 rounded-full bg-secondary" />
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-150"
                    style={{
                      height: `${ch.volume}%`,
                      backgroundColor: ch.muted
                        ? "var(--destructive)"
                        : mixer.isPlaying
                          ? "var(--primary)"
                          : "var(--primary)",
                      opacity: ch.muted ? 0.3 : mixer.isPlaying ? 0.7 : 0.4,
                    }}
                  />
                  {/* Level meter ticks */}
                  <div className="absolute -left-2 bottom-0 top-0 flex flex-col justify-between py-1">
                    {[100, 75, 50, 25, 0].map((tick) => (
                      <div key={tick} className="h-px w-1.5 bg-muted-foreground/30" />
                    ))}
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={ch.volume}
                    onChange={(e) =>
                      updateChannel(ch.id, { volume: parseInt(e.target.value) })
                    }
                    className="absolute inset-0 cursor-pointer opacity-0"
                    style={{
                      writingMode: "vertical-lr",
                      direction: "rtl",
                    }}
                    aria-label={`${ch.label} volume`}
                  />
                </div>

                <span className="mb-2 text-xs font-semibold text-foreground">
                  {ch.volume}
                </span>

                {/* Mute / Solo */}
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateChannel(ch.id, { muted: !ch.muted })
                    }}
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors ${
                      ch.muted
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    M
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateChannel(ch.id, { solo: !ch.solo })
                    }}
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold transition-colors ${
                      ch.solo
                        ? "bg-chart-3 text-card"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    S
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Channel Inspector */}
        <div className="w-72 shrink-0 border-l border-border bg-card">
          <ScrollArea className="h-full">
            <div className="p-4">
              <div className="mb-1 flex items-center gap-2">
                {currentChannel?.muted ? (
                  <VolumeX className="size-4 text-destructive" />
                ) : (
                  <Volume2 className="size-4 text-primary" />
                )}
                <p className="text-sm font-semibold text-foreground">
                  {currentChannel?.label}
                </p>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Channel Inspector</p>

              {/* Live spectrum for selected channel */}
              <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Output Spectrum
                </p>
                <SpectrumVisualizer
                  data={spectrum.spectrumData}
                  isPlaying={mixer.isPlaying}
                  barCount={24}
                  height={40}
                />
              </div>

              {/* EQ */}
              <div className="mb-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Equalizer
                </p>
                <div className="flex flex-col gap-4">
                  <EqSlider label="Low" value={eqLow} onChange={setEqLow} />
                  <EqSlider label="Mid" value={eqMid} onChange={setEqMid} />
                  <EqSlider label="High" value={eqHigh} onChange={setEqHigh} />
                </div>
              </div>

              {/* Pan */}
              <div className="mb-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Pan
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground">L</span>
                  <Slider
                    value={pan}
                    onValueChange={(v) => {
                      setPan(v)
                      if (selectedChannel) mixer.setChannelPan(selectedChannel, v[0])
                    }}
                    min={-50}
                    max={50}
                    className="flex-1"
                  />
                  <span className="text-[10px] text-muted-foreground">R</span>
                </div>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  {pan[0] === 0 ? "Center" : pan[0] < 0 ? `L${Math.abs(pan[0])}` : `R${pan[0]}`}
                </p>
              </div>

              {/* Effects */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Effects
                </p>
                <div className="flex flex-col gap-4">
                  <EffectSlider label="Reverb" value={reverb} onChange={setReverb} />
                  <EffectSlider label="Delay" value={delay} onChange={setDelay} />
                  <EffectSlider label="Compression" value={compression} onChange={setCompression} />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

function EqSlider({
  label,
  value,
  onChange,
}: {
  label: string
  value: number[]
  onChange: (v: number[]) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 text-xs text-muted-foreground">{label}</span>
      <Slider value={value} onValueChange={onChange} min={-12} max={12} className="flex-1" />
      <span className="w-12 text-right text-xs text-foreground">
        {value[0] > 0 ? `+${value[0]}` : value[0]} dB
      </span>
    </div>
  )
}

function EffectSlider({
  label,
  value,
  onChange,
}: {
  label: string
  value: number[]
  onChange: (v: number[]) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-xs text-muted-foreground">{label}</span>
      <Slider value={value} onValueChange={onChange} min={0} max={100} className="flex-1" />
      <span className="w-8 text-right text-xs text-foreground">{value[0]}%</span>
    </div>
  )
}
