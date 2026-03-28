"use client"

import { useState, useEffect, useRef } from "react"
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Mic2, Sparkles } from "lucide-react"

interface Word {
  text: string;
  startTime: number;
  endTime: number;
}

export function PlaybackModal({ 
  isOpen, 
  onClose, 
  songTitle, 
  lyrics 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  songTitle: string; 
  lyrics: string 
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  // Split lyrics into words with mock timestamps for "following" effect
  const words: Word[] = lyrics.split(" ").map((word, i) => ({
    text: word,
    startTime: i * 0.5,
    endTime: (i + 1) * 0.5
  }))

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#0a0a0a] border-white/10 text-white rounded-[2rem] overflow-hidden p-0 shadow-2xl">
        <div className="flex h-[600px]">
          {/* Visualizer Side */}
          <div className="flex-1 bg-gradient-to-br from-indigo-900/40 via-black to-purple-900/40 p-8 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop')] opacity-10 mix-blend-overlay" />
            
            <div className="relative z-10 space-y-2">
              <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 px-3">NOW PLAYING</Badge>
              <h2 className="text-3xl font-bold tracking-tight">{songTitle || "Cyber Sunset"}</h2>
              <p className="text-white/40 flex items-center gap-2"><Sparkles className="h-4 w-4" /> AI Generated Master</p>
            </div>

            <div className="relative z-10 h-64 flex items-center justify-center">
              <div className="w-full max-w-xs aspect-square rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-inner overflow-hidden">
                <Music className={`h-24 w-24 text-white/10 ${isPlaying ? 'animate-pulse' : ''}`} />
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="h-1.5 w-full bg-white/10 rounded-full relative overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-100" 
                  style={{ width: \`\${Math.min((currentTime / (words.length * 0.5)) * 100, 100)}%\` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button variant="ghost" size="icon" className="text-white/40 hover:text-white"><SkipBack /></Button>
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-14 w-14 rounded-full bg-white text-black hover:bg-white/90 shadow-xl transition-transform active:scale-95"
                  >
                    {isPlaying ? <Pause /> : <Play className="ml-1" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white/40 hover:text-white"><SkipForward /></Button>
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <Volume2 className="h-4 w-4" />
                  <div className="h-1 w-20 bg-white/10 rounded-full">
                    <div className="h-full w-3/4 bg-white/40 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lyrics Side */}
          <div className="w-80 bg-white/5 backdrop-blur-md border-l border-white/10 p-8 flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Mic2 className="h-4 w-4" /> Lyrics Flow
            </h3>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div className="flex flex-wrap gap-x-2 gap-y-4 leading-relaxed">
                {words.map((word, i) => {
                  const isActive = currentTime >= word.startTime && currentTime < word.endTime;
                  const isPast = currentTime >= word.endTime;
                  return (
                    <span 
                      key={i} 
                      className={`text-2xl font-bold transition-all duration-300 \${
                        isActive 
                        ? 'text-white scale-110 blur-0 shadow-lg' 
                        : isPast 
                          ? 'text-white/20 blur-[1px]' 
                          : 'text-white/40 blur-[2px]'
                      }\`}
                    >
                      {word.text}
                    </span>
                  )
                })}
              </div>
            </div>
            <Button className="w-full h-12 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/30 rounded-xl font-semibold">
              Sync Vocals
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
