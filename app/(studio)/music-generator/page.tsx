"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Music, 
  Mic2, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  Plus, 
  Play, 
  Pause,
  Maximize2,
  Trash2,
  Settings2,
  Languages,
  Ghost
} from "lucide-react"
import { SingingEngine } from "@/components/singing-engine"
import { PlaybackModal } from "@/components/playback-modal"
import { motion, AnimatePresence } from "framer-motion"

export default function MusicGeneratorPage() {
  const [lyrics, setLyrics] = useState("")
  const [prompt, setPrompt] = useState("")
  const [isInstrumental, setIsInstrumental] = useState(false)
  const [vocalGender, setVocalGender] = useState<"female" | "male">("female")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<string[]>([])
  const [songTitle, setSongTitle] = useState("")

  const styles = ["Sultry", "Latin Trap", "Slow Jam", "Electronic", "Jazz", "Pop", "Rock", "Country"]

  const toggleStyle = (style: string) => {
    setSelectedStyle(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    )
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsModalOpen(true)
    }, 3000)
  }

  const handleGenerateLyrics = () => {
    setLyrics("In the neon glow of the midnight rain,
We find our rhythm, we break the chain.
Digital echoes in a cyber sea,
Lost in the pulse of eternity.")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Controls (Mureka Style) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex gap-2 p-1 bg-white/5 rounded-full w-fit">
            <Button variant="ghost" className="rounded-full bg-white text-black hover:bg-white px-6">Custom</Button>
            <Button variant="ghost" className="rounded-full text-white/60 hover:text-white px-6">Easy</Button>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Reference
            </Button>
            <Button variant="outline" className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">
              <Plus className="mr-2 h-4 w-4" /> Vocal
            </Button>
          </div>

          <Card className="bg-[#141417] border-white/5 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Lyrics</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">Instrumental</span>
                <Switch 
                  checked={isInstrumental} 
                  onCheckedChange={setIsInstrumental}
                  className="data-[state=checked]:bg-indigo-500"
                />
              </div>
            </div>
            
            <Textarea 
              placeholder="Enter lyrics here or leave blank for instrumental"
              className="min-h-[200px] bg-black/40 border-white/5 focus-visible:ring-indigo-500 text-white placeholder:text-white/20"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              disabled={isInstrumental}
            />

            <div className="flex justify-between gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-white/40 hover:text-white"
                onClick={() => setLyrics("")}
              >
                <RefreshCw className="mr-2 h-3 w-3" /> Optimize
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-indigo-400 hover:text-indigo-300"
                onClick={handleGenerateLyrics}
              >
                <Sparkles className="mr-2 h-3 w-3" /> Generate Lyrics
              </Button>
            </div>
          </Card>

          <Card className="bg-[#141417] border-white/5 p-6 space-y-4">
            <span className="text-sm font-medium">Style</span>
            <Textarea 
              placeholder="Enter style, mood, instrument, etc."
              className="min-h-[80px] bg-black/40 border-white/5 focus-visible:ring-indigo-500 text-white placeholder:text-white/20"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <Button size="icon" variant="ghost" className="rounded-full bg-white/5 h-8 w-8"><RefreshCw className="h-4 w-4"/></Button>
              {styles.map(style => (
                <Badge 
                  key={style}
                  variant="outline"
                  className={`cursor-pointer px-3 py-1 border-white/10 transition-colors ${selectedStyle.includes(style) ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400' : 'hover:bg-white/5'}`}
                  onClick={() => toggleStyle(style)}
                >
                  + {style}
                </Badge>
              ))}
            </div>
          </Card>

          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium text-white/60">Vocal Gender</span>
            <div className="flex gap-4">
              <button 
                onClick={() => setVocalGender('female')}
                className={`text-sm ${vocalGender === 'female' ? 'text-white underline underline-offset-8 decoration-2' : 'text-white/40'}`}
              >
                Female
              </button>
              <button 
                onClick={() => setVocalGender('male')}
                className={`text-sm ${vocalGender === 'male' ? 'text-white underline underline-offset-8 decoration-2' : 'text-white/40'}`}
              >
                Male
              </button>
            </div>
          </div>

          <Card className="bg-[#141417] border-white/5 p-6 space-y-4">
            <span className="text-sm font-medium">Song title</span>
            <Input 
              placeholder="Song title"
              className="bg-black/40 border-white/5 focus-visible:ring-indigo-500 text-white"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
            />
          </Card>

          <Button 
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Generating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Music className="h-5 w-5" />
                <span>Create</span>
              </div>
            )}
          </Button>
        </div>

        {/* Right Content: Player/Empty State */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[600px] border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-indigo-500 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-tr from-[#1a1a1e] to-[#2a2a2e] flex items-center justify-center border-4 border-white/10 shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <Music className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="absolute inset-0 rounded-full border border-white/5" />
            </motion.div>
          </div>
          <div className="mt-12 text-center space-y-4">
            <h3 className="text-xl font-semibold text-white/80">No songs yet, create one now!</h3>
            <p className="text-white/40 max-w-sm mx-auto">
              Your generated tracks will appear here. Use the sidebar to configure your lyrics, style, and vocals.
            </p>
          </div>
        </div>

      </div>

      {/* Hidden Engines */}
      <SingingEngine 
        lyrics={lyrics}
        isPlaying={isPlaying}
        voiceType={vocalGender === 'female' ? 'female' : 'male'}
        bpm={128}
      />
      <PlaybackModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        songTitle={songTitle || "Cybernetic Serenade"}
        lyrics={lyrics || "Sample generated lyrics for your amazing new AI track."}
      />
    </div>
  )
}
