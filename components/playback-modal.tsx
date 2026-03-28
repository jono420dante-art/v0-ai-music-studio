"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Pause, Download, Share2, Mic2, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlaybackModalProps {
  isOpen: boolean
  onClose: () => void
  songTitle: string
  lyrics: string
}

export function PlaybackModal({ isOpen, onClose, songTitle, lyrics }: PlaybackModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [progress, setProgress] = useState(0)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lines = lyrics.split("\n").filter(l => l.trim())

  useEffect(() => {
    if (!isOpen) {
      stopSinging()
      setCurrentLine(0)
      setProgress(0)
      setIsPlaying(false)
    }
  }, [isOpen])

  const stopSinging = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel()
    }
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const startSinging = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    stopSinging()
    const voices = window.speechSynthesis.getVoices()
    const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('female') || v.name.includes('Samantha') || v.name.includes('Google UK English Female'))

    lines.forEach((line, index) => {
      const utterance = new SpeechSynthesisUtterance(line)
      if (femaleVoice) utterance.voice = femaleVoice
      utterance.rate = 0.85
      utterance.pitch = 1.3
      utterance.volume = 1
      utterance.onstart = () => {
        setCurrentLine(index)
        setProgress(Math.round((index / lines.length) * 100))
      }
      if (index === lines.length - 1) {
        utterance.onend = () => {
          setIsPlaying(false)
          setCurrentLine(0)
          setProgress(100)
        }
      }
      window.speechSynthesis.speak(utterance)
    })
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (isPlaying) {
      stopSinging()
      setIsPlaying(false)
    } else {
      startSinging()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl mx-4 bg-[#0f0f11] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Mic2 className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="font-bold text-white">{songTitle}</h2>
              <p className="text-xs text-white/40">AI Generated • Dieter Pro</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Lyric Display */}
        <div className="p-6 space-y-3 min-h-[240px] max-h-[320px] overflow-y-auto">
          {lines.map((line, i) => (
            <p 
              key={i}
              className={`text-center text-lg transition-all duration-300 ${
                i === currentLine && isPlaying
                  ? 'text-white font-bold scale-110 text-indigo-300'
                  : i < currentLine
                  ? 'text-white/30 text-sm'
                  : 'text-white/60'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Progress */}
        <div className="px-6 pb-2">
          <div className="w-full h-1 bg-white/10 rounded-full">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-6">
          <Button variant="ghost" size="sm" className="text-white/40 hover:text-white">
            <Volume2 className="h-4 w-4 mr-2" /> Voice
          </Button>
          <Button 
            className={`w-16 h-16 rounded-full ${
              isPlaying ? 'bg-red-500 hover:bg-red-400' : 'bg-indigo-600 hover:bg-indigo-500'
            } text-white shadow-lg`}
            size="icon"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>
          <Button variant="ghost" size="sm" className="text-white/40 hover:text-white">
            <Download className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>
      </div>
    </div>
  )
}
