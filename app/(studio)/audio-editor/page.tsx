"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Upload, Download, Play, Pause, Scissors, Volume2, Settings } from "lucide-react"

export default function AudioEditorPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  
  // Audio editing controls
  const [fadeIn, setFadeIn] = useState([0])
  const [fadeOut, setFadeOut] = useState([0])
  const [trimStart, setTrimStart] = useState([0])
  const [trimEnd, setTrimEnd] = useState([100])
  const [volume, setVolume] = useState([100])
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file)
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
    }
  }, [])

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setTrimEnd([audioRef.current.duration])
    }
  }, [])

  const applyFadeIn = useCallback(async () => {
    alert("Fade In: " + fadeIn[0] + "s - Feature coming soon with Web Audio API")
  }, [fadeIn])

  const applyFadeOut = useCallback(async () => {
    alert("Fade Out: " + fadeOut[0] + "s - Feature coming soon with Web Audio API")
  }, [fadeOut])

  const applyTrim = useCallback(async () => {
    alert(`Trim from ${trimStart[0]}s to ${trimEnd[0]}s - Feature coming soon with FFmpeg.wasm`)
  }, [trimStart, trimEnd])

  const exportAudio = useCallback(async () => {
    if (!audioFile) return
    const link = document.createElement("a")
    link.href = audioUrl!
    link.download = `edited_${audioFile.name}`
    link.click()
  }, [audioFile, audioUrl])

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Audio Editor</h1>
          <p className="text-muted-foreground mt-2">Fade, trim, and edit your audio tracks</p>
        </div>

        {/* Upload Section */}
        {!audioFile ? (
          <div className="rounded-xl border-2 border-dashed border-border bg-card p-12 text-center">
            <Upload className="mx-auto mb-4 size-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">Upload Audio File</h3>
            <p className="mb-4 text-sm text-muted-foreground">MP3, WAV, OGG, M4A supported</p>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button>Browse Files</Button>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{audioFile.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {(audioFile.size / 1024 / 1024).toFixed(2)} MB • {formatTime(duration)}
                  </p>
                </div>
                <Badge variant="outline">Ready to Edit</Badge>
              </div>
            </div>

            {/* Waveform Canvas */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Waveform</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </Button>
                </div>
              </div>
              <div className="relative h-32 rounded-lg bg-secondary">
                <canvas
                  ref={canvasRef}
                  className="h-full w-full"
                  width={800}
                  height={128}
                />
                <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Audio Controls */}
            <audio
              ref={audioRef}
              src={audioUrl || undefined}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Editing Tools */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Fade In */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Fade In</h3>
                  <span className="text-sm text-muted-foreground">{fadeIn[0]}s</span>
                </div>
                <Slider
                  value={fadeIn}
                  onValueChange={setFadeIn}
                  min={0}
                  max={10}
                  step={0.1}
                  className="mb-4"
                />
                <Button onClick={applyFadeIn} size="sm" className="w-full">
                  Apply Fade In
                </Button>
              </div>

              {/* Fade Out */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Fade Out</h3>
                  <span className="text-sm text-muted-foreground">{fadeOut[0]}s</span>
                </div>
                <Slider
                  value={fadeOut}
                  onValueChange={setFadeOut}
                  min={0}
                  max={10}
                  step={0.1}
                  className="mb-4"
                />
                <Button onClick={applyFadeOut} size="sm" className="w-full">
                  Apply Fade Out
                </Button>
              </div>

              {/* Trim Start */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Trim Start</h3>
                  <span className="text-sm text-muted-foreground">{trimStart[0].toFixed(1)}s</span>
                </div>
                <Slider
                  value={trimStart}
                  onValueChange={setTrimStart}
                  min={0}
                  max={duration}
                  step={0.1}
                  className="mb-4"
                />
                <Button onClick={applyTrim} size="sm" variant="outline" className="w-full">
                  <Scissors className="mr-2 size-4" />
                  Cut from Start
                </Button>
              </div>

              {/* Trim End */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Trim End</h3>
                  <span className="text-sm text-muted-foreground">{trimEnd[0].toFixed(1)}s</span>
                </div>
                <Slider
                  value={trimEnd}
                  onValueChange={setTrimEnd}
                  min={0}
                  max={duration}
                  step={0.1}
                  className="mb-4"
                />
                <Button onClick={applyTrim} size="sm" variant="outline" className="w-full">
                  <Scissors className="mr-2 size-4" />
                  Cut from End
                </Button>
              </div>

              {/* Volume */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Volume</h3>
                  <span className="text-sm text-muted-foreground">{volume[0]}%</span>
                </div>
                <Slider
                  value={volume}
                  onValueChange={(v) => {
                    setVolume(v)
                    if (audioRef.current) {
                      audioRef.current.volume = v[0] / 100
                    }
                  }}
                  min={0}
                  max={100}
                  className="mb-4"
                />
                <div className="flex items-center gap-2">
                  <Volume2 className="size-4 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">Adjust playback volume</div>
                </div>
              </div>

              {/* Export */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-primary">Export Audio</h3>
                  <Settings className="size-4 text-primary" />
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Download your edited track
                </p>
                <Button onClick={exportAudio} className="w-full" size="lg">
                  <Download className="mr-2 size-4" />
                  Export Track
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
