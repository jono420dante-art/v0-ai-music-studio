"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, Share2, Rocket, 
  BarChart3, CheckCircle2, Clock, 
  ExternalLink, DollarSign, Users,
  Play, TrendingUp, ShieldCheck,
  Music2, Headphones, Smartphone,
  Zap, Award
} from "lucide-react"

export default function DistributionPortalPage() {
  const [isDeploying, setIsDeploying] = useState(false)

  const platforms = [
    { 
      id: "spotify", 
      name: "Spotify", 
      icon: <Headphones className="w-6 h-6 text-[#1DB954]" />, 
      status: "Ready", 
      reach: "600M+ Users", 
      royalty: "Estimated $0.003 - $0.005 per stream" 
    },
    { 
      id: "apple", 
      name: "Apple Music", 
      icon: <Smartphone className="w-6 h-6 text-[#FA243C]" />, 
      status: "Ready", 
      reach: "100M+ Users", 
      royalty: "Estimated $0.01 per stream" 
    },
    { 
      id: "napster", 
      name: "Napster", 
      icon: <Music2 className="w-6 h-6 text-[#000000]" />, 
      status: "Configuring", 
      reach: "5M+ Users", 
      royalty: "High loyalty payouts" 
    },
  ]

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent border border-white/5">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Globe className="w-64 h-64 text-blue-500 rotate-12" />
          </div>
          <div className="relative z-10 space-y-6 max-w-2xl">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Global Distribution v2.4
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              PUBLISH TO THE <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">WORLD</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-medium">
              One-click distribution to all major streaming platforms. Direct-to-fan sales with high-fidelity lossless audio support.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl px-8 transition-all hover:scale-105 shadow-xl shadow-blue-500/20">
                <Rocket className="w-5 h-5 mr-2" /> Start Campaign
              </Button>
              <Button size="lg" variant="outline" className="h-14 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-2xl px-8 transition-all">
                <BarChart3 className="w-5 h-5 mr-2" /> Revenue Dashboard
              </Button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Distribution Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platforms.map((platform) => (
                <Card key={platform.id} className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                  <CardHeader className="p-8 pb-0 flex flex-row items-center justify-between">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      {platform.icon}
                    </div>
                    {platform.status === "Ready" ? (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-bold">READY</Badge>
                    ) : (
                      <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 font-bold">PENDING</Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black tracking-tight">{platform.name}</h3>
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{platform.reach}</p>
                    </div>
                    <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                      <p className="text-[10px] font-black text-zinc-600 uppercase mb-1">Royalty Structure</p>
                      <p className="text-xs font-mono text-zinc-300">{platform.royalty}</p>
                    </div>
                    <Button variant="outline" className="w-full h-12 border-zinc-800 hover:bg-zinc-800 rounded-xl group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all">
                      Configure Portal <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-zinc-900/40 border-dashed border-2 border-zinc-800/50 backdrop-blur-xl rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center space-y-4 group cursor-pointer hover:bg-zinc-900/60 transition-all">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Share2 className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-300">Request Platform</h4>
                  <p className="text-[10px] text-zinc-500 uppercase font-black">20+ Integrations in beta</p>
                </div>
              </Card>
            </div>

            {/* Campaign History */}
            <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-xl font-black uppercase tracking-tighter">Active Campaigns</CardTitle>
                <CardDescription>Track the performance of your released tracks</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {[
                    { title: "Midnight Echoes", date: "Mar 12, 2026", reach: "1.2M", revenue: "$4,250", status: "Active" },
                    { title: "Neon Skyline", date: "Feb 28, 2026", reach: "890K", revenue: "$2,890", status: "Active" },
                    { title: "Quantum Rhythm", date: "Feb 15, 2026", reach: "450K", revenue: "$1,120", status: "Completed" },
                  ].map((track, i) => (
                    <div key={i} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-white/5">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-bold">{track.title}</div>
                          <div className="text-[10px] text-zinc-500 uppercase font-black">{track.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="hidden md:block text-right">
                          <div className="text-[10px] text-zinc-600 uppercase font-black">Reach</div>
                          <div className="text-xs font-mono font-bold text-blue-400">{track.reach}</div>
                        </div>
                        <div className="hidden md:block text-right">
                          <div className="text-[10px] text-zinc-600 uppercase font-black">Net Revenue</div>
                          <div className="text-xs font-mono font-bold text-green-400">{track.revenue}</div>
                        </div>
                        <Badge variant="outline" className={`${track.status === "Active" ? "text-green-500 border-green-500/20" : "text-zinc-500 border-zinc-800"}`}>
                          {track.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Tools Sidebar */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-[2.5rem] p-8 border-none shadow-2xl overflow-hidden relative group">
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                <TrendingUp className="w-64 h-64" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-200">Total Royalty Balance</h4>
                  <div className="text-5xl font-black tracking-tighter">$8,260.45</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
                    <div className="text-[10px] font-black uppercase text-blue-200">This Month</div>
                    <div className="text-lg font-bold">+$1,420</div>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl">
                    <div className="text-[10px] font-black uppercase text-blue-200">Growth</div>
                    <div className="text-lg font-bold">+24.5%</div>
                  </div>
                </div>
                <Button className="w-full h-12 bg-white text-blue-600 hover:bg-zinc-100 font-bold rounded-xl shadow-lg">
                  <DollarSign className="w-4 h-4 mr-2" /> Request Payout
                </Button>
              </div>
            </Card>

            <Card className="bg-zinc-900/40 border-zinc-800/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-zinc-500">Distribution Guard</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold">AI Fingerprint ID</div>
                      <p className="text-[10px] text-zinc-500">Copyright protection enabled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Award className="w-5 h-5 text-purple-500" />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold">Smart Contracts</div>
                      <p className="text-[10px] text-zinc-500">Automated royalty splits</p>feat: add distribution portal component for Spotify, Apple Music, and Napster with royalty tracking
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold">Fast Tracking</div>
                      <p className="text-[10px] text-zinc-500">Express review priority</p>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <Button variant="secondary" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl">
                    <Users className="w-4 h-4 mr-2" /> Manage Splits
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support Box */}
            <div className="p-8 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] space-y-4 text-center">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-blue-500" />
              </div>
              <h5 className="font-bold">Need Help?</h5>
              <p className="text-xs text-zinc-500">Our distribution experts are ready to assist you.</p>
              <Button variant="link" className="text-blue-500 text-xs font-bold uppercase tracking-widest">Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
