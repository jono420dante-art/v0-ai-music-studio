"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Music, 
  Mic2, 
  Scissors, 
  SlidersHorizontal, 
  Compass, 
  Library, 
  Clock, 
  Sparkles, 
  Zap, 
  Video, 
  Home, 
  LayoutDashboard,
  BarChart3,
  ShoppingBag
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const mainLinks = [
  { href: "/", label: "Home", icon: Home },
]

const studioLinks = [
  { href: "/studio", label: "Studio Dashboard", icon: Sparkles, isNew: true },
  { href: "/music-generator", label: "AI Music Gen", icon: Music },
  { href: "/video-generator", label: "Video Suite", icon: Video },
  { href: "/lyrics", label: "Lyrics AI", icon: Mic2 },
  { href: "/stem-splitter", label: "Stem Splitter", icon: Scissors },
  { href: "/mixer", label: "Mixer Pro", icon: SlidersHorizontal },
]

const discoverLinks = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/my-songs", label: "My Portfolio", icon: BarChart3 },
  { href: "/library", label: "Asset Library", icon: Library },
  { href: "/history", label: "History", icon: Clock },
]

export function AppSidebar() {
  const pathname = usePathname()
  const creditsUsed = 650
  const creditsTotal = 1000

  return (
    <aside className="w-64 bg-black border-r border-white/5 flex flex-col h-full">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <Music className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold tracking-tighter text-xl">DIETER PRO</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-8 custom-scrollbar">
        <div>
          <div className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Main</div>
          <div className="space-y-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  pathname === link.href ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Studio Suite</div>
          <div className="space-y-1">
            {studioLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  pathname === link.href ? "bg-indigo-600/10 text-indigo-400" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", pathname === link.href ? "text-indigo-400" : "")} />
                <span className="flex-1">{link.label}</span>
                {link.isNew && (
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-none text-[8px] h-4 px-1.5 font-bold">NEW</Badge>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Resources</div>
          <div className="space-y-1">
            {discoverLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  pathname === link.href ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-6 mt-auto border-t border-white/5 space-y-4 bg-white/[0.02]">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="text-white/40">Studio Credits</span>
            <span className="text-white">{creditsUsed} / {creditsTotal}</span>
          </div>
          <Progress value={(creditsUsed / creditsTotal) * 100} className="h-1 bg-white/5" />
        </div>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold h-10 shadow-lg shadow-indigo-500/20">
          Upgrade to Pro
        </Button>
      </div>
    </aside>
  )
}
