"use client"

import { useEffect, useRef } from "react"

interface WaveformVisualizerProps {
  data: number[]
  isPlaying: boolean
  color?: string
  height?: number
  barCount?: number
}

export function WaveformVisualizer({
  data,
  isPlaying,
  color = "var(--primary)",
  height = 48,
  barCount = 48,
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    ctx.clearRect(0, 0, rect.width, rect.height)

    const barWidth = rect.width / barCount
    const gap = 1

    for (let i = 0; i < barCount; i++) {
      const dataIdx = Math.floor((i / barCount) * data.length)
      const value = data[dataIdx] !== undefined ? Math.abs(data[dataIdx]) : 0
      const barHeight = Math.max(2, value * rect.height * (isPlaying ? 1.5 : 0.3))

      ctx.fillStyle = color
      ctx.globalAlpha = isPlaying ? 0.6 + value * 0.4 : 0.2
      ctx.fillRect(
        i * barWidth + gap / 2,
        (rect.height - barHeight) / 2,
        barWidth - gap,
        barHeight
      )
    }
  }, [data, isPlaying, color, height, barCount])

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-md"
      style={{ height }}
    />
  )
}

interface SpectrumVisualizerProps {
  data: number[]
  isPlaying: boolean
  barCount?: number
  height?: number
}

export function SpectrumVisualizer({
  data,
  isPlaying,
  barCount = 32,
  height = 64,
}: SpectrumVisualizerProps) {
  return (
    <div className="flex items-end gap-px" style={{ height }}>
      {Array.from({ length: barCount }).map((_, i) => {
        const dataIdx = Math.floor((i / barCount) * data.length)
        const value = data[dataIdx] !== undefined ? data[dataIdx] : 0
        const barHeight = isPlaying ? Math.max(2, value * height) : 2 + Math.random() * 4
        return (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-primary transition-all duration-75"
            style={{
              height: barHeight,
              opacity: isPlaying ? 0.4 + value * 0.6 : 0.15,
            }}
          />
        )
      })}
    </div>
  )
}

interface BeatPulseProps {
  currentBeat: number
  isActive: boolean
}

export function BeatPulse({ currentBeat, isActive }: BeatPulseProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="size-2 rounded-full transition-all duration-100"
          style={{
            backgroundColor:
              isActive && i === currentBeat % 8
                ? "var(--primary)"
                : "var(--secondary)",
            transform: isActive && i === currentBeat % 8 ? "scale(1.5)" : "scale(1)",
            boxShadow:
              isActive && i === currentBeat % 8
                ? "0 0 8px var(--primary)"
                : "none",
          }}
        />
      ))}
      <span className="ml-2 text-[10px] font-mono text-muted-foreground">
        Beat {currentBeat}
      </span>
    </div>
  )
}

interface BeatGridProps {
  beats: { time: number; strength: number }[]
  maxBeats?: number
}

export function BeatGrid({ beats, maxBeats = 32 }: BeatGridProps) {
  const displayed = beats.slice(-maxBeats)
  return (
    <div className="flex items-end gap-px rounded-md bg-secondary/50 p-2" style={{ height: 40 }}>
      {displayed.map((beat, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm bg-primary"
          style={{
            height: `${Math.max(10, beat.strength * 100)}%`,
            opacity: 0.3 + beat.strength * 0.7,
          }}
        />
      ))}
      {displayed.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <span className="text-[10px] text-muted-foreground">Waiting for audio...</span>
        </div>
      )}
    </div>
  )
}
