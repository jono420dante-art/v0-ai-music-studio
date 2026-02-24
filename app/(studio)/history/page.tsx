"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Music2,
  Scissors,
  FileText,
  Wand2,
  BarChart3,
  Zap,
  Play,
  Heart,
} from "lucide-react"

const stats = [
  { label: "Total Tracks", value: "6", icon: Music2 },
  { label: "Credits Used", value: "350", icon: Zap },
  { label: "Total Plays", value: "5,376", icon: Play },
  { label: "Liked Tracks", value: "3", icon: Heart },
]

const activities = [
  {
    action: 'Generated "Neon Solitude"',
    type: "create",
    icon: Wand2,
    time: "2 min ago",
    detail: "Electronic / Melancholic / 128 BPM",
  },
  {
    action: 'Split stems from "midnight_mix.wav"',
    type: "stem",
    icon: Scissors,
    time: "15 min ago",
    detail: "6 stems extracted / WAV format",
  },
  {
    action: "Generated lyrics - Love & Heartbreak",
    type: "lyrics",
    icon: FileText,
    time: "32 min ago",
    detail: "132 words / 24 lines / Poetic style",
  },
  {
    action: 'Mixed "Golden Hour Dreams"',
    type: "mix",
    icon: BarChart3,
    time: "1 hour ago",
    detail: "8 channels / Exported as WAV",
  },
  {
    action: 'Generated "Midnight Protocol"',
    type: "create",
    icon: Wand2,
    time: "2 hours ago",
    detail: "Hip-Hop / Dark / 144 BPM",
  },
  {
    action: 'Generated "Cherry Blossom Rain"',
    type: "create",
    icon: Wand2,
    time: "3 hours ago",
    detail: "Lo-fi / Peaceful / 78 BPM",
  },
  {
    action: 'Split stems from "summer_anthem.mp3"',
    type: "stem",
    icon: Scissors,
    time: "5 hours ago",
    detail: "6 stems extracted / MP3 format",
  },
  {
    action: 'Generated "Solar Flare"',
    type: "create",
    icon: Wand2,
    time: "Yesterday",
    detail: "House / Euphoric / 126 BPM",
  },
]

const typeColors: Record<string, string> = {
  create: "text-primary bg-primary/10",
  stem: "text-chart-2 bg-chart-2/10",
  lyrics: "text-chart-4 bg-chart-4/10",
  mix: "text-chart-5 bg-chart-5/10",
}

export default function HistoryPage() {
  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">History</h2>
          <p className="text-sm text-muted-foreground">Your recent activity and stats</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="size-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Activity Feed */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">Activity Log</h3>
          <div className="rounded-xl border border-border bg-card">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b border-border/50 p-4 last:border-0"
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                    typeColors[activity.type]
                  }`}
                >
                  <activity.icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
