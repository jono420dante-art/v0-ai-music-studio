"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Music, Sparkles, RefreshCw, Plus } from "lucide-react"
import { PlaybackModal } from "@/components/playback-modal"
import { SingingEngine } from "@/components/singing-engine"

export default function MusicGeneratorPage() {
  const [lyrics, setLyrics] = useState("")
  const [style, setStyle] = useState("")
  const [songTitle, setSongTitle] = useState("")
  const [isInstrumental, setIsInstrumental] = useState(false)
  const [vocalGender, setVocalGender] = useState<"Female" | "Male">("Female")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [generatedSong, setGeneratedSong] = useState<any>(null)
  const [mode, setMode] = useState<"Easy" | "Custom">("Custom")

  const styles = ["Sultry", "Latin Trap", "Slow Jam", "Electro"]

  const toggleStyle = (s: string) => {
    setSelectedStyles(prev => 
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  const handleGenerateLyrics = async () => {
    try {
      const res = await fetch('/api/lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: style || 'love song', 
          genre: selectedStyles[0] || 'pop', 
          mood: 'energetic' 
        })
      })
      const data = await res.json()
      setLyrics(data.lyrics || "")
    } catch (e) {
      console.error('Lyrics generation failed:', e)
    }
  }

  const handleCreate = async () => {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate-song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: style,
          genre: selectedStyles[0] || 'pop',
          lyrics,
          isInstrumental,
          voiceGender: vocalGender.toLowerCase(),
          styles: selectedStyles,
          songTitle: songTitle || 'Untitled Track',
          bpm: 120,
          duration: 30,
          mood: ['energetic']
        })
      })
      const data = await res.json()
      if (data.success) {
        setGeneratedSong(data)
        setIsModalOpen(true)
      }
    } catch (e) {
      console.error('Song generation failed:', e)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* LEFT PANEL - MUREKA EXACT CLONE */}
        <div className="lg:col-span-5 bg-[#0d0d0f] border-r border-white/5 p-6 space-y-5 min-h-screen">
          
          {/* Easy/Custom Mode Tabs */}
          <div className="flex gap-1 p-0.5 bg-white/[0.06] rounded-full w-fit">
            <button 
              onClick={() => setMode('Easy')}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                mode === 'Easy' ? 'bg-transparent text-white/70' : 'text-white/40'
              }`}
            >
              Easy
            </button>
            <button 
              onClick={() => setMode('Custom')}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                mode === 'Custom' ? 'bg-white text-black' : 'text-white/40'
              }`}
            >
              Custom
            </button>
          </div>

          {/* Reference/Remix/Vocal Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/10 bg-white/[0.04] hover:bg-white/10 rounded-lg text-xs h-8">
              <Plus className="mr-1.5 h-3 w-3" /> Reference
            </Button>
            <Button variant="outline" size="sm" className="border-white/10 bg-white/[0.04] hover:bg-white/10 rounded-lg text-xs h-8">
              <Plus className="mr-1.5 h-3 w-3" /> Remix <span className="ml-1 text-[10px] bg-pink-500 px-1.5 py-0.5 rounded">New</span>
            </Button>
            <Button variant="outline" size="sm" className="border-white/10 bg-white/[0.04] hover:bg-white/10 rounded-lg text-xs h-8">
              <Plus className="mr-1.5 h-3 w-3" /> Vocal
            </Button>
          </div>

          {/* Lyrics Section */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-white/90">Lyrics</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40">Instrumental</span>
                <Switch 
                  checked={isInstrumental} 
                  onCheckedChange={setIsInstrumental}
                  className="data-[state=checked]:bg-white/20"
                />
              </div>
            </div>
            <Textarea 
              placeholder="Enter lyrics here or leave blank for instrumental"
              className="min-h-[160px] bg-black/30 border-white/[0.08] focus-visible:ring-1 focus-visible:ring-white/20 resize-none text-sm placeholder:text-white/20 rounded-lg"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              disabled={isInstrumental}
            />
            <div className="flex justify-between">
              <Button variant="ghost" size="sm" className="text-xs text-white/30 hover:text-white/60 h-7 px-2">
                <RefreshCw className="mr-1.5 h-3 w-3" /> Optimize
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-indigo-400 hover:text-indigo-300 h-7 px-2" onClick={handleGenerateLyrics}>
                <Sparkles className="mr-1.5 h-3 w-3" /> Generate Lyrics
              </Button>
            </div>
          </div>

          {/* Style Section */}
          <div className="space-y-2.5">
            <span className="text-sm font-medium text-white/90">Style</span>
            <Textarea 
              placeholder="Enter style, mood, instrument, etc. to control the generated music"
              className="min-h-[90px] bg-black/30 border-white/[0.08] focus-visible:ring-1 focus-visible:ring-white/20 resize-none text-sm placeholder:text-white/20 rounded-lg"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <button className="w-7 h-7 rounded-full bg-white/[0.04] hover:bg-white/10 flex items-center justify-center border border-white/10">
                <RefreshCw className="h-3 w-3 text-white/40"/>
              </button>
              {styles.map(s => (
                <Badge 
                  key={s}
                  variant="outline"
                  className={`cursor-pointer px-2.5 py-0.5 text-xs border-white/10 transition-all ${
                    selectedStyles.includes(s) 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-white/[0.02] hover:bg-white/[0.06] text-white/60'
                  }`}
                  onClick={() => toggleStyle(s)}
                >
                  + {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* Vocal Gender */}
          <div className="flex justify-between items-center py-1">
            <span className="text-sm font-medium text-white/60">Vocal Gender</span>
            <div className="flex gap-6">
              <button 
                onClick={() => setVocalGender('Female')}
                className={`text-sm transition-colors ${
                  vocalGender === 'Female' ? 'text-white font-medium' : 'text-white/40 hover:text-white/60'
                }`}
              >
                Female
              </button>
              <button 
                onClick={() => setVocalGender('Male')}
                className={`text-sm transition-colors ${
                  vocalGender === 'Male' ? 'text-white font-medium' : 'text-white/40 hover:text-white/60'
                }`}
              >
                Male
              </button>
            </div>
          </div>

          {/* Song Title */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-white/90">Song title</span>
            <div className="relative">
              <Input 
                placeholder="Song title"
                maxLength={50}
                className="bg-black/30 border-white/[0.08] focus-visible:ring-1 focus-visible:ring-white/20 text-sm h-10 rounded-lg pr-12"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30">
                {songTitle.length}/50
              </div>
            </div>
          </div>

          {/* Create Button - Mureka Purple */}
          <Button 
            className="w-full h-12 rounded-xl bg-[#6366f1] hover:bg-[#5558e3] text-white font-medium text-[15px] shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
            onClick={handleCreate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Create
              </>
            )}
          </Button>
        </div>

        {/* RIGHT PANEL - EMPTY STATE */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-12 bg-[#0a0a0c]">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <Music className="w-12 h-12 text-indigo-400" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium text-white/70">No songs yet, create one now!</h3>
              <p className="text-sm text-white/40 max-w-sm mx-auto">
                Fill in the fields on the left and click Create to generate your first AI-powered track with vocals and instruments.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Hidden Components */}
      <SingingEngine 
        lyrics={generatedSong?.lyrics || lyrics}
        isPlaying={false}
        voiceType={vocalGender === 'Female' ? 'female' : 'male'}
        bpm={120}
      />
      
      <PlaybackModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        songTitle={generatedSong?.title || songTitle || 'AI Generated Track'}
        lyrics={generatedSong?.lyrics || lyrics || 'No lyrics available'}
      />
    </div>
  )
}

