"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { 
  Video, Music, Play, Pause, 
  Upload, Scissors, Save, 
  Settings, Clock, Layers,
  Link, Download, Monitor,
  Zap, Share2
} from "lucide-react"

export default function VideoSyncPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoFile, setVideoFile] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<string | null>(null)
  const [syncOffset, setSyncOffset] = useState(0)

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 font-sans selection:bg-green-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              VIDEO SYNC ENGINE
            </h1>
            <p className="text-zinc-500 max-w-xl text-lg">
              Precisely align your AI-generated music with cinematic visuals. Timeline-based synchronization for pro music videos.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="h-12 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl px-6">
              <Settings className="w-4 h-4 mr-2" /> Project Settings
            </Button>
            <Button className="h-12 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl px-8 shadow-lg shadow-green-500/20">
              <Download className="w-4 h-4 mr-2" /> EXPORT FINAL
            </Button>
          </div>
        </header>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Preview Window (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="aspect-video bg-zinc-950 flex flex-col items-center justify-center relative group">
                {videoFile ? (
                  <video src={videoFile} className="w-full h-full object-contain" />
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                      <Monitor className="w-10 h-10 text-zinc-600" />
                    </div>
                    <p className="text-zinc-500 font-medium">No video source selected</p>
                    <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl">
                      <Upload className="w-4 h-4 mr-2" /> Upload Video
                    </Button>
                  </div>
                )}
                
                {/* HUD Overlay */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold border border-white/10 uppercase tracking-widest text-green-400">
                    Live Preview
                  </div>
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold border border-white/10 uppercase tracking-widest text-zinc-400">
                    1080p · 60fps
                  </div>
                </div>
              </div>

              {/* Quick Playback Bar */}
              <div className="p-6 bg-zinc-900/20 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button 
                    size="icon" 
                    className="w-12 h-12 rounded-2xl bg-white text-black hover:scale-105 transition-transform"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </Button>
                  <div className="text-xl font-mono tracking-tighter">
                    00:00:00:00
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button size="icon" variant="ghost" className="hover:bg-zinc-800 rounded-xl text-zinc-400">
                    <Scissors className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:bg-zinc-800 rounded-xl text-zinc-400">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Timeline Editor */}
            <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-2xl rounded-[2rem] overflow-hidden">
              <CardHeader className="p-6 border-b border-white/5 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-500" />
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">
                    Timeline Tracks
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase text-zinc-500 hover:text-white">Add Track</Button>
                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase text-zinc-500 hover:text-white">Clear All</Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {/* Video Track */}
                  <div className="flex group">
                    <div className="w-40 p-4 border-r border-white/5 bg-zinc-900/20 flex flex-col justify-center gap-2">
                      <div className="flex items-center gap-2">
                        <Video className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[10px] font-black uppercase text-zinc-400">Video 01</span>
                      </div>
                      <Slider defaultValue={[100]} max={100} className="w-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 h-24 bg-zinc-950/30 relative p-4 flex items-center">
                      <div className="h-16 w-3/4 bg-green-500/10 border border-green-500/30 rounded-xl relative overflow-hidden flex items-center px-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent" />
                        <span className="text-[10px] font-bold text-green-500/80 uppercase tracking-widest">Cinema_Sequence_A.mp4</span>
                      </div>
                    </div>
                  </div>

                  {/* Audio Track */}
                  <div className="flex group">
                    <div className="w-40 p-4 border-r border-white/5 bg-zinc-900/20 flex flex-col justify-center gap-2">
                      <div className="flex items-center gap-2">
                        <Music className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[10px] font-black uppercase text-zinc-400">Audio 01</span>
                      </div>
                      <Slider defaultValue={[100]} max={100} className="w-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 h-24 bg-zinc-950/30 relative p-4 flex items-center">
                      <div className="h-16 w-1/2 bg-blue-500/10 border border-blue-500/30 rounded-xl relative overflow-hidden flex items-center px-4 ml-24">
                        <div className="absolute inset-0 flex items-center justify-around gap-1 px-4 opacity-20">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <div key={i} className="w-0.5 bg-blue-400 rounded-full" style={{ height: `${Math.random() * 80 + 20}%` }} />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-blue-500/80 uppercase tracking-widest relative z-10">AI_Soul_Vocal.wav</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Ruler */}
                <div className="h-8 bg-zinc-900/40 border-t border-white/5 flex items-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end justify-between px-4 opacity-20">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className={`w-px bg-white ${i % 10 === 0 ? "h-4" : i % 5 === 0 ? "h-2" : "h-1"}`} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sync & Assets Sidebar (Right) */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-2xl rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                  <Link className="w-5 h-5 text-green-500" /> Synchronization
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Audio Offset (ms)</label>
                    <span className="text-sm font-mono text-green-500">+{syncOffset}ms</span>
                  </div>
                  <Slider 
                    value={[syncOffset]} 
                    onValueChange={(v) => setSyncOffset(v[0])} 
                    min={-2000} 
                    max={2000} 
                    step={1} 
                  />
                  <div className="flex justify-between text-[10px] font-bold text-zinc-600">
                    <span>-2000ms</span>
                    <span>0ms</span>
                    <span>+2000ms</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-16 flex-col gap-1 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-2xl transition-all">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Auto-Sync</span>
                  </Button>
                  <Button className="h-16 flex-col gap-1 bg-white/5 hover:bg-white/10 border border-white/5 text-white rounded-2xl transition-all">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Snap to BPM</span>
                  </Button>
                </div>
                
                <div className="p-6 bg-zinc-950/50 border border-white/5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-black uppercase text-zinc-400">Sync Engine Status</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-zinc-300">Frame-accurate lock enabled</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    <span className="text-sm font-medium text-zinc-500">Haptic feedback connected</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-2xl rounded-[2rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">
                  Media Pool
                </CardTitle>
                <Button size="icon" variant="ghost" className="rounded-xl h-8 w-8 hover:bg-zinc-800">
                  <Upload className="w-3 h-3" />
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {[
                  { name: "Neon_Dream_Loop.mp4", type: "video", size: "45.2 MB" },
                  { name: "Retro_VHS_Overlay.mov", type: "video", size: "12.8 MB" },
                  { name: "Vocal_Stem_Lead.wav", type: "audio", size: "8.4 MB" },
                  { name: "Master_Mix_Final.wav", type: "audio", size: "15.1 MB" },
                ].map((asset, i) => (
                  <div key={i} className="group p-4 bg-zinc-950/30 hover:bg-zinc-800/50 border border-white/5 rounded-2xl flex items-center justify-between transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                        {asset.type === "video" ? <Video className="w-4 h-4 text-green-400" /> : <Music className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-zinc-200">{asset.name}</div>
                        <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{asset.size}</div>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-600 hover:text-white rounded-lg">
                      <Save className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
