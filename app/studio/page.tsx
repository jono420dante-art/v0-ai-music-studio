"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, Music, Mic2, Zap, Download, Clock, 
  Play, Pause, Volume2, Settings, Share2, Heart,
  LayoutDashboard, Library, Compass, Search
} from "lucide-react"
import { useToneEngine, useBeatDetector } from "@/hooks/use-tone-engine"
import { SpectrumVisualizer, BeatPulse, BeatGrid } from "@/components/audio-visualizer"
import { PlaybackModal } from "@/components/playback-modal"

// Vocal Synthesis Integration (Web Speech API + Mock AI)
const VocalEngine = ({ lyrics, isPlaying }: { lyrics: string, isPlaying: boolean }) => {
  useEffect(() => {
    if (isPlaying && lyrics) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(lyrics);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      synth.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [isPlaying, lyrics]);
  return null;
}

export default function StudioPage() {
  const [prompt, setPrompt] = useState("")
  const [lyrics, setLyrics] = useState("Neon lights reflect in the chrome, a cyber heart finding its home...")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { beats } = useBeatDetector()
  
  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsModalOpen(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between bg-white/5 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">DIETER STUDIO PRO</h1>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-black">AI Production Suite</p>
            </div>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl">
              <Settings className="h-5 w-5" />
            </Button>
            <Button className="bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 backdrop-blur-md px-6">
              Cloud Assets
            </Button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input & Controls */}
          <div className="lg:col-span-8 space-y-8">
            {/* Generator Card */}
            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
              <div className="p-10 space-y-8 relative z-10">
                <div className="space-y-2 text-center lg:text-left">
                  <h2 className="text-3xl font-bold flex items-center justify-center lg:justify-start gap-3">
                    <Sparkles className="h-8 w-8 text-indigo-400 animate-pulse" /> Create Your Sound
                  </h2>
                  <p className="text-white/40 text-base">Your imagination is the only limit to the music we can create together.</p>
                </div>
                
                <div className="relative group/input">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-focus-within/input:opacity-40 transition duration-500" />
                  <Input 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe a vibe: 'Melancholic piano with rainy lo-fi beats...'"
                    className="relative h-20 bg-black/60 border-white/5 rounded-[1.5rem] px-8 text-xl placeholder:text-white/20 focus:border-indigo-500/50 transition-all duration-300 shadow-2xl"
                  />
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="absolute right-3 top-3 h-14 px-10 rounded-2xl bg-white text-black hover:bg-white/90 font-bold text-lg transition-all duration-300 shadow-xl"
                  >
                    {isGenerating ? "Synthesizing..." : "Generate Master"}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {["Phonk", "Cyberpunk", "Dark Trap", "Ethno Jazz", "Synthwave 80s"].map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 border-white/5 cursor-pointer py-2 px-4 rounded-xl text-sm transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Vocal Section */}
            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Mic2 className="h-7 w-7 text-pink-500" /> Vocal Synthesis Engine
                </h2>
                <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/20 px-4 py-1 rounded-full text-xs font-bold">REAL-TIME</Badge>
              </div>
              <div className="relative">
                <textarea 
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="w-full h-48 bg-black/40 border border-white/5 rounded-3xl p-8 text-white/80 focus:outline-none focus:border-pink-500/50 transition-all resize-none font-mono text-lg leading-relaxed shadow-inner"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-white/20 font-mono uppercase tracking-widest">
                  <Clock className="h-3 w-3" /> Auto-Sync Active
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-6 items-center">
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500 \${isPlaying ? 'bg-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.4)] rotate-90' : 'bg-white/10 hover:bg-white/20'}\`}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                  </Button>
                  <div className="space-y-1">
                    <p className="text-lg font-bold">Preview Vocal Layer</p>
                    <p className="text-sm text-white/40 font-medium">Model: Studio Female Alpha v2.1</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                  <Volume2 className="h-5 w-5 text-white/40" />
                  <div className="h-1.5 w-32 bg-white/10 rounded-full relative">
                    <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Visualizers & Stats */}
          <div className="lg:col-span-4 space-y-8">
            {/* Beatnet Card */}
            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 p-4 opacity-5 group-hover:opacity-20 transition-all duration-700 rotate-12">
                <Zap className="h-48 w-48 text-yellow-500" />
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Beatnet Pulse</h3>
                <p className="text-4xl font-black text-white">128.4 <span className="text-lg text-yellow-500 font-medium">BPM</span></p>
              </div>
              <div className="h-40 flex items-end gap-2 px-2 relative z-10">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="flex-1 bg-yellow-500/10 rounded-full overflow-hidden relative h-full">
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-600 to-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all duration-300"
                      style={{ height: \`\${Math.random() * 70 + 30}%\` }}
                    />
                  </div>
                ))}
              </div>
              <Button className="w-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 rounded-[1.25rem] py-8 text-base font-bold relative z-10 transition-all">
                Lock Global Tempo
              </Button>
            </Card>

            {/* Project Stats */}
            <Card className="bg-white/5 border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white/90">Market Readiness</h3>
              <div className="space-y-4">
                {[
                  { label: "SEO Quality", val: "Excellent", color: "text-green-400", bg: "bg-green-400/10" },
                  { label: "Viral Potential", val: "88%", color: "text-indigo-400", bg: "bg-indigo-400/10" },
                  { label: "Vocal Clarity", val: "Ultra", color: "text-purple-400", bg: "bg-purple-400/10" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                    <span className="text-sm font-medium text-white/40">{item.label}</span>
                    <Badge className={\`\${item.bg} \${item.color} border-none font-bold px-4 py-1 rounded-full text-xs\`}>{item.val}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Button className="w-full h-20 rounded-[2.5rem] bg-indigo-600 text-white hover:bg-indigo-500 font-black text-xl shadow-2xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] group">
              Master & Distribute <Share2 className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Engines */}
      <VocalEngine lyrics={lyrics} isPlaying={isPlaying} />
      <PlaybackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        songTitle={prompt || "Cybernetic Vision"} 
        lyrics={lyrics} 
      />
    </div>
  )
}
