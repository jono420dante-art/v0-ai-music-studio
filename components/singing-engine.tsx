"use client"

import { useEffect, useRef } from "react"

interface SingingEngineProps {
  lyrics: string
  isPlaying: boolean
  voiceType?: 'female' | 'male' | 'child'
  bpm?: number
}

export function SingingEngine({ lyrics, isPlaying, voiceType = 'female', bpm = 120 }: SingingEngineProps) {
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([])
  const isActiveRef = useRef(false)

  const getVoice = () => {
    if (typeof window === 'undefined') return null
    const voices = window.speechSynthesis.getVoices()
    if (voiceType === 'female') {
      return voices.find(v => 
        v.name.includes('Samantha') || 
        v.name.includes('Google UK English Female') ||
        v.name.includes('Female') ||
        v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
      ) || voices.find(v => v.lang.startsWith('en')) || null
    } else if (voiceType === 'male') {
      return voices.find(v => 
        v.name.includes('Daniel') || 
        v.name.includes('Google UK English Male') ||
        v.name.includes('Male') ||
        v.lang.startsWith('en') && v.name.toLowerCase().includes('male')
      ) || voices.find(v => v.lang.startsWith('en')) || null
    } else {
      return voices.find(v => v.name.includes('Junior') || v.name.includes('child')) || null
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (isPlaying && lyrics) {
      isActiveRef.current = true
      window.speechSynthesis.cancel()

      const lines = lyrics.split('\n').filter(l => l.trim())
      const beatDuration = (60 / bpm) * 1000 * 2

      lines.forEach((line) => {
        const utterance = new SpeechSynthesisUtterance(line)
        const voice = getVoice()
        if (voice) utterance.voice = voice
        utterance.rate = bpm > 120 ? 1.2 : bpm > 90 ? 1.0 : 0.85
        utterance.pitch = voiceType === 'female' ? 1.4 : voiceType === 'child' ? 1.8 : 0.9
        utterance.volume = 1
        window.speechSynthesis.speak(utterance)
      })
    } else if (!isPlaying) {
      isActiveRef.current = false
      window.speechSynthesis.cancel()
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel()
      }
    }
  }, [isPlaying, lyrics, voiceType, bpm])

  return null
}
