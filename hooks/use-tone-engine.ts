"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import * as Tone from "tone"

/* ─── Note sequences for different genres ─── */
const SEQUENCES: Record<string, { notes: string[]; subdivision: string }> = {
  synthwave: { notes: ["C4", "E4", "G4", "B4", "A4", "F4", "D4", "G4"], subdivision: "8n" },
  techno: { notes: ["C3", "C3", "G3", "C3", "Eb3", "C3", "G3", "Bb3"], subdivision: "16n" },
  "lo-fi": { notes: ["D4", "F4", "A4", "C5", "A4", "F4", "D4", "E4"], subdivision: "4n" },
  ambient: { notes: ["C4", "E4", "G4", "B4", "D5", "G4", "E4", "C4"], subdivision: "2n" },
  edm: { notes: ["E3", "E3", "G3", "A3", "B3", "A3", "G3", "E3"], subdivision: "16n" },
  "r&b": { notes: ["Bb3", "D4", "F4", "A4", "G4", "Eb4", "C4", "D4"], subdivision: "8n" },
  default: { notes: ["C4", "E4", "G4", "B4", "A4", "F4", "D4", "G4"], subdivision: "8n" },
}

function getSequenceForGenre(genre: string) {
  const key = genre.toLowerCase().replace(/\s+/g, "-")
  return SEQUENCES[key] || SEQUENCES.default
}

/* ─── BPM-to-Tone BPM mapping ─── */
function applyBPM(bpm: number) {
  Tone.getTransport().bpm.value = bpm
}

/* ─── Synth presets ─── */
function createSynth(type: "lead" | "bass" | "pad" = "lead"): Tone.PolySynth | Tone.Synth {
  switch (type) {
    case "bass":
      return new Tone.Synth({
        oscillator: { type: "triangle" },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.4, release: 0.8 },
      }).toDestination()
    case "pad":
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.5, decay: 0.8, sustain: 0.6, release: 2 },
      }).toDestination()
    default:
      return new Tone.Synth({
        oscillator: { type: "sawtooth" },
        envelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 1 },
      }).toDestination()
  }
}

/* ─── Beat detection (BeatNet-inspired client-side) ─── */
export interface BeatEvent {
  time: number
  strength: number
}

export function useBeatDetector() {
  const [beats, setBeats] = useState<BeatEvent[]>([])
  const [currentBeat, setCurrentBeat] = useState<number>(0)
  const [isDetecting, setIsDetecting] = useState(false)
  const analyserRef = useRef<Tone.Analyser | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startDetection = useCallback(() => {
    if (!analyserRef.current) {
      analyserRef.current = new Tone.Analyser("waveform", 256)
      Tone.getDestination().connect(analyserRef.current)
    }
    setIsDetecting(true)
    setBeats([])

    let beatCount = 0
    const startTime = Tone.now()
    intervalRef.current = setInterval(() => {
      if (analyserRef.current) {
        const waveform = analyserRef.current.getValue() as Float32Array
        // Simple energy-based onset detection
        let energy = 0
        for (let i = 0; i < waveform.length; i++) {
          energy += Math.abs(waveform[i])
        }
        energy /= waveform.length

        if (energy > 0.05) {
          beatCount++
          const elapsed = Tone.now() - startTime
          setBeats((prev) => [...prev, { time: elapsed, strength: Math.min(energy * 10, 1) }])
          setCurrentBeat(beatCount)
        }
      }
    }, 50) // ~20 Hz detection rate
  }, [])

  const stopDetection = useCallback(() => {
    setIsDetecting(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (analyserRef.current) analyserRef.current.dispose()
    }
  }, [])

  return { beats, currentBeat, isDetecting, startDetection, stopDetection }
}

/* ─── Waveform analyzer hook ─── */
export function useWaveform(fftSize: number = 128) {
  const analyserRef = useRef<Tone.Analyser | null>(null)
  const [waveformData, setWaveformData] = useState<number[]>([])
  const rafRef = useRef<number | null>(null)

  const start = useCallback(() => {
    if (!analyserRef.current) {
      analyserRef.current = new Tone.Analyser("waveform", fftSize)
      Tone.getDestination().connect(analyserRef.current)
    }

    const update = () => {
      if (analyserRef.current) {
        const values = analyserRef.current.getValue() as Float32Array
        setWaveformData(Array.from(values))
      }
      rafRef.current = requestAnimationFrame(update)
    }
    update()
  }, [fftSize])

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (analyserRef.current) analyserRef.current.dispose()
    }
  }, [])

  return { waveformData, start, stop }
}

/* ─── FFT Spectrum analyzer hook ─── */
export function useSpectrum(fftSize: number = 64) {
  const analyserRef = useRef<Tone.Analyser | null>(null)
  const [spectrumData, setSpectrumData] = useState<number[]>([])
  const rafRef = useRef<number | null>(null)

  const start = useCallback(() => {
    if (!analyserRef.current) {
      analyserRef.current = new Tone.Analyser("fft", fftSize)
      Tone.getDestination().connect(analyserRef.current)
    }

    const update = () => {
      if (analyserRef.current) {
        const values = analyserRef.current.getValue() as Float32Array
        // Convert from dB to linear scale
        const linear = Array.from(values).map((v) => Math.max(0, (v + 100) / 100))
        setSpectrumData(linear)
      }
      rafRef.current = requestAnimationFrame(update)
    }
    update()
  }, [fftSize])

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (analyserRef.current) analyserRef.current.dispose()
    }
  }, [])

  return { spectrumData, start, stop }
}

/* ─── Main Tone Engine Hook ─── */
export function useToneEngine() {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const synthRef = useRef<Tone.Synth | Tone.PolySynth | null>(null)
  const sequenceRef = useRef<Tone.Sequence | null>(null)
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const init = useCallback(async () => {
    if (Tone.getContext().state !== "running") {
      await Tone.start()
    }
    setIsReady(true)
  }, [])

  const playSequence = useCallback(
    async (genre: string, bpm: number = 120, synthType: "lead" | "bass" | "pad" = "lead") => {
      await init()

      // Cleanup previous
      if (sequenceRef.current) {
        sequenceRef.current.stop()
        sequenceRef.current.dispose()
      }
      if (synthRef.current) {
        synthRef.current.dispose()
      }

      applyBPM(bpm)
      const synth = createSynth(synthType)
      synthRef.current = synth

      const { notes, subdivision } = getSequenceForGenre(genre)
      const seq = new Tone.Sequence(
        (time, note) => {
          if (synth instanceof Tone.PolySynth) {
            synth.triggerAttackRelease(note, "8n", time)
          } else {
            synth.triggerAttackRelease(note, "8n", time)
          }
        },
        notes,
        subdivision
      )

      sequenceRef.current = seq
      seq.start(0)
      Tone.getTransport().start()
      setIsPlaying(true)
      setProgress(0)

      // Advance progress
      const totalDuration = 30 // seconds for a full loop
      if (progressInterval.current) clearInterval(progressInterval.current)
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0 // Loop
          }
          return prev + 100 / (totalDuration * 10)
        })
      }, 100)
    },
    [init]
  )

  const stop = useCallback(() => {
    Tone.getTransport().stop()
    if (sequenceRef.current) {
      sequenceRef.current.stop()
      sequenceRef.current.dispose()
      sequenceRef.current = null
    }
    if (synthRef.current) {
      synthRef.current.dispose()
      synthRef.current = null
    }
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
    setIsPlaying(false)
    setProgress(0)
  }, [])

  const pause = useCallback(() => {
    Tone.getTransport().pause()
    setIsPlaying(false)
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }
  }, [])

  const resume = useCallback(async () => {
    await init()
    Tone.getTransport().start()
    setIsPlaying(true)

    const totalDuration = 30
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 100 / (totalDuration * 10)
      })
    }, 100)
  }, [init])

  const setVolume = useCallback((vol: number) => {
    // vol: 0-100
    Tone.getDestination().volume.value = Tone.gainToDb(vol / 100)
  }, [])

  const setBPM = useCallback((bpm: number) => {
    applyBPM(bpm)
  }, [])

  useEffect(() => {
    return () => {
      stop()
    }
  }, [stop])

  return {
    isReady,
    isPlaying,
    progress,
    setProgress,
    init,
    playSequence,
    stop,
    pause,
    resume,
    setVolume,
    setBPM,
  }
}

/* ─── Multi-channel Mixer Engine ─── */
export interface MixerChannel {
  id: string
  label: string
  volume: number
  muted: boolean
  solo: boolean
  pan: number
  synth: Tone.Synth | null
  panner: Tone.Panner | null
  channel: Tone.Channel | null
}

export function useMixerEngine() {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const channelsRef = useRef<Map<string, { synth: Tone.Synth; panner: Tone.Panner; channel: Tone.Channel; sequence: Tone.Sequence }>>(new Map())

  const init = useCallback(async () => {
    if (Tone.getContext().state !== "running") {
      await Tone.start()
    }
    setIsReady(true)
  }, [])

  const setupChannel = useCallback(
    (id: string, notes: string[], subdivision: string, synthType: "lead" | "bass" | "pad" = "lead") => {
      // Clean up existing
      const existing = channelsRef.current.get(id)
      if (existing) {
        existing.sequence.dispose()
        existing.synth.dispose()
        existing.panner.dispose()
        existing.channel.dispose()
      }

      const channel = new Tone.Channel().toDestination()
      const panner = new Tone.Panner(0).connect(channel)
      const synth = createSynth(synthType) as Tone.Synth
      synth.disconnect()
      synth.connect(panner)

      const seq = new Tone.Sequence(
        (time, note) => {
          synth.triggerAttackRelease(note, "8n", time)
        },
        notes,
        subdivision
      )

      channelsRef.current.set(id, { synth, panner, channel, sequence: seq })
    },
    []
  )

  const setChannelVolume = useCallback((id: string, vol: number) => {
    const ch = channelsRef.current.get(id)
    if (ch) {
      ch.channel.volume.value = Tone.gainToDb(vol / 100)
    }
  }, [])

  const setChannelPan = useCallback((id: string, pan: number) => {
    const ch = channelsRef.current.get(id)
    if (ch) {
      ch.panner.pan.value = pan / 50 // convert -50..50 to -1..1
    }
  }, [])

  const setChannelMute = useCallback((id: string, muted: boolean) => {
    const ch = channelsRef.current.get(id)
    if (ch) {
      ch.channel.mute = muted
    }
  }, [])

  const setChannelSolo = useCallback((id: string, solo: boolean) => {
    const ch = channelsRef.current.get(id)
    if (ch) {
      ch.channel.solo = solo
    }
  }, [])

  const startAll = useCallback(async () => {
    await init()
    Tone.getTransport().bpm.value = 120
    channelsRef.current.forEach(({ sequence }) => {
      sequence.start(0)
    })
    Tone.getTransport().start()
    setIsPlaying(true)
  }, [init])

  const stopAll = useCallback(() => {
    Tone.getTransport().stop()
    channelsRef.current.forEach(({ sequence }) => {
      sequence.stop()
    })
    setIsPlaying(false)
  }, [])

  const dispose = useCallback(() => {
    stopAll()
    channelsRef.current.forEach(({ synth, panner, channel, sequence }) => {
      sequence.dispose()
      synth.dispose()
      panner.dispose()
      channel.dispose()
    })
    channelsRef.current.clear()
  }, [stopAll])

  useEffect(() => {
    return () => {
      dispose()
    }
  }, [dispose])

  return {
    isReady,
    isPlaying,
    init,
    setupChannel,
    setChannelVolume,
    setChannelPan,
    setChannelMute,
    setChannelSolo,
    startAll,
    stopAll,
    dispose,
  }
}
