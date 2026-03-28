"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, Music, Mic2, Zap, Download, Play, Pause, 
  Volume2, Settings, Share2, Heart, Trash2, RotateCcw,
  CheckCircle2, AlertCircle, Headphones, Waves, Wind,
  Layers, Palette, Layout, Wand2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToneEngine, useBeatDetector } from "@/hooks/use-tone-engine"
import { PlaybackModal } from "@/components/playback-modal"
import { cn } from "@/lib/utils"

// Advanced Vocal AI Simulation
const SingingEngine = ({ lyrics, isPlaying, voiceType, bpm }: any) => {
  const synthRef = useRef<any>(null)
  
  useEffect(() => {
    if (isPlaying && lyrics) {
      const synth = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(lyrics)
      
      // Select best voice
      const voices = synth.getVoices()
      const preferredVoices = voices.filter(v => 
        v.name.includes("Google") || v.name.includes("Premium") || v.name.includes("Singing")
      )
      
      utterance.voice = preferredVoices[0] || voices[0]
      utterance.rate = (bpm / 120) * 0.9 // Sync rate with BPM
      utterance.pitch = voiceType === "female" ? 1.4 : voiceType === "child" ? 1.8 : 0.8
      utterance.volume = 1
      
      synth.speak(utterance)
      synthRef.current = utterance
    } else {
      window.speechSynthesis.cancel()
    }
  }, [isPlaying, lyrics, voiceType, bpm])
  
  return null
}

export default function MusicGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [lyrics, setLyrics] = useState("Walking through the city of neon dreams, 
Everything is faster than it seems. 
Heartbeat racing like a drum and bass, 
Trying to find a piece of quiet space.")
  const [selectedGenre, setSelectedGenre] = useState("Phonk")
  const [selectedVoice, setSelectedVoice] = useState("female")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { play, stop, currentBpm } = useToneEngine()

  const handleGenerate = async () => {
    if (!prompt) return
    setIsGenerating(true)
    setProgress(0)
    
    // Simulate generation stages
    const stages = ["Analyzing mood", "Composing melody", "Arranging beats", "Generating vocals", "Mastering track"]
    let currentStep = 0
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setIsModalOpen(true)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-8 font-sans selection:bg-indigo-500/40 overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.03] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20 ring-1 ring-white/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter">VOCAL GEN MASTER</h1>
              <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">AI Singing & Song Production</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white/40 hover:text-white rounded-xl px-5">
              <RotateCcw className="h-4 w-4 mr-2" /> Reset
            </Button>
            <Button className="bg-white text-black hover:bg-white/90 rounded-2xl px-8 font-bold h-12 shadow-xl">
              Launch Studio Pro
            </Button>
          </div>
        </header>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Creative Input Panel */}
          <div className="lg:col-span-8 space-y-8">
            {/* Song description */}
            <Card className="bg-white/[0.03] border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -mr-32 -mt-32 rounded-full group-hover:bg-indigo-500/10 transition-colors duration-700" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Music className="h-6 w-6 text-indigo-400" /> Song Architect
                  </h2>
                  <div className="flex gap-2">
                    {["808", "Vintage", "Clear"].map(m => (
                      <Badge key={m} variant="outline" className="border-white/10 text-white/40 text-[10px] uppercase px-2">{m}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <Input 
                    placeholder="Describe your song (e.g. 'Epic cinematic phonk with heavy bass...')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="h-20 bg-black/40 border-white/10 rounded-3xl px-8 text-xl placeholder:text-white/10 focus:ring-2 ring-indigo-500/20 transition-all shadow-inner"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white/20 hover:text-white"><Zap className="h-5 w-5" /></Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {["Phonk", "Cyberpunk", "Dark Trap", "Lofi", "Techno"].map(genre => (
                    <button 
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm font-bold border transition-all duration-300",
                        selectedGenre === genre 
                          ? "bg-white text-black border-white shadow-lg scale-105" 
                          : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* AI Lyric & Vocal Engine */}
            <Card className="bg-white/[0.03] border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl relative">
              <div className="flex items-center justify-between relative z-10">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Mic2 className="h-6 w-6 text-pink-500" /> AI Vocal Suite
                </h2>
                <div className="flex items-center gap-4">
                   <select 
                    value={selectedVoice} 
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="bg-black/40 border border-white/10 text-white/80 rounded-xl px-4 py-2 text-sm outline-none"
                   >
                     <option value="female">Studio Female</option>
                     <option value="male">Rich Baritone</option>
                     <option value="child">Echo Child</option>
                   </select>
                   <Badge className="bg-pink-500/10 text-pink-400 border-none font-bold">HQ ENGINE</Badge>
                </div>
              </div>

              <div className="relative group z-10">
                <textarea 
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="w-full h-64 bg-black/40 border border-white/10 rounded-[2rem] p-8 text-lg text-white/60 font-mono leading-relaxed focus:outline-none focus:border-pink-500/50 transition-all shadow-inner resize-none"
                  placeholder="Paste your lyrics here or let AI generate them..."
                />
                <Button className="absolute bottom-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 px-6 h-10 backdrop-blur-xl">
                  <Wand2 className="h-4 w-4 mr-2" /> AI Write
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 relative z-10">
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => {
                      setIsPlaying(!isPlaying)
                      if (!isPlaying) play(selectedGenre, 128)
                      else stop()
                    }}
                    className={cn(
                      "h-20 w-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ring-4 ring-white/5",
                      isPlaying 
                        ? "bg-pink-500 text-white scale-110 shadow-pink-500/40 rotate-90" 
                        : "bg-white text-black hover:scale-105 active:scale-95"
                    )}
                  >
                    {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 ml-1.5" />}
                  </button>
                  <div>
                    <p className="text-xl font-bold tracking-tight">Audio Synthesis Active</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-bold text-white/30 flex items-center gap-1">
                        <Waves className="h-3 w-3" /> Real-time Vocals
                      </span>
                      <span className="text-xs font-bold text-white/30 flex items-center gap-1">
                        <Headphones className="h-3 w-3" /> Studio Monitoring
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Master Volume</span>
                  <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                    <Volume2 className="h-5 w-5 text-white/40" />
                    <Slider defaultValue={[75]} max={100} className="w-32" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Visualization & Actions Panel */}
          <div className="lg:col-span-4 space-y-8">
            {/* Generation Progress */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="bg-indigo-600 border-none rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-500/30 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <div className="relative z-10 space-y-6">
                      <div className="flex justify-between items-end">
                        <h3 className="text-3xl font-black italic">GENESIS</h3>
                        <span className="text-4xl font-black opacity-40">{progress}%</span>
                      </div>
                      <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-white shadow-[0_0_20px_white]"
                          initial={{ width: 0 }}
                          animate={{ width: \`\${progress}%\` }}
                        />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-60">Synthesizing vocal patterns and arrangement...</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mastering Controls */}
            <Card className="bg-white/[0.03] border-white/5 rounded-[3rem] p-8 space-y-8 shadow-2xl">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Palette className="h-5 w-5 text-indigo-400" /> Mastering Rack
              </h3>
              
              <div className="space-y-6">
                {[
                  { label: "Vocal Clarity", val: 85, color: "bg-pink-500" },
                  { label: "Bass Warmth", val: 92, color: "bg-indigo-500" },
                  { label: "Reverb Tail", val: 40, color: "bg-purple-500" },
                  { label: "Presence", val: 65, color: "bg-yellow-500" }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                      <span>{item.label}</span>
                      <span className="text-white/80">{item.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full">
                      <div className={cn("h-full rounded-full shadow-[0_0_10px_currentColor]", item.color)} style={{ width: \`\${item.val}%\`, color: \`var(--\${item.color.split('-')[1]}-500)\` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] font-bold text-white/20 uppercase mb-1">BPM</p>
                  <p className="text-2xl font-black">128.0</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] font-bold text-white/20 uppercase mb-1">Key</p>
                  <p className="text-2xl font-black">Cm</p>
                </div>
              </div>
            </Card>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full h-24 rounded-[2.5rem] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-2xl shadow-2xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
            >
              {isGenerating ? "CREATING..." : "GENERATE SONG"}
              <Sparkles className="ml-3 h-8 w-8 group-hover:rotate-12 transition-transform" />
            </Button>
            
            <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
              Powered by Dieter AI Audio v4.0 (2026)
            </p>
          </div>
        </div>
      </div>

      {/* Secret Singing Engine */}
      <SingingEngine 
        lyrics={lyrics} 
        isPlaying={isPlaying} 
        voiceType={selectedVoice} 
        bpm={128} 
      />

      <PlaybackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        songTitle={prompt || "Cybernetic Skyline"} 
        lyrics={lyrics} 
      />
    </div>
  )
}
