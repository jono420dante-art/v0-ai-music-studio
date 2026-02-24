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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

const mainLinks = [
  { href: "/", label: "Home", icon: Home },
]

const studioLinks = [
  { href: "/music-generator", label: "Music Studio", icon: Sparkles, isNew: true },
  { href: "/video-generator", label: "Video Suite", icon: Video },
  { href: "/create", label: "Quick Create", icon: LayoutDashboard },
  { href: "/lyrics", label: "Lyrics AI", icon: Mic2 },
  { href: "/stem-splitter", label: "Stem Splitter", icon: Scissors },
  { href: "/mixer", label: "Mixer Pro", icon: SlidersHorizontal },
]

const discoverLinks = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/library", label: "My Library", icon: Library },
  { href: "/history", label: "History", icon: Clock },
]

export function AppSidebar() {
  const pathname = usePathname()
  const creditsUsed = 650
  const creditsTotal = 1000

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <Music className="size-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-wide text-sidebar-foreground">DIETER PRO</h1>
          <p className="text-[10px] tracking-widest text-muted-foreground">AI Music Studio</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {/* Main */}
        <ul className="flex flex-col gap-0.5 mb-4">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Studio */}
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Studio
        </p>
        <ul className="flex flex-col gap-0.5">
          {studioLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <link.icon className="size-4" />
                  {link.label}
                  {link.isNew && (
                    <span className="ml-auto rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                      NEW
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="mb-2 mt-6 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Discover
        </p>
        <ul className="flex flex-col gap-0.5">
          {discoverLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <link.icon className="size-4" />
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-primary" />
            <span className="font-medium text-sidebar-foreground">Credits</span>
          </div>
          <span>{creditsUsed}/{creditsTotal}</span>
        </div>
        <Progress value={(creditsUsed / creditsTotal) * 100} className="mt-2 h-1.5" />
      </div>
    </aside>
  )
}
