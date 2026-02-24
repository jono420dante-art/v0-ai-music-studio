"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Pause,
  Heart,
  Download,
  MoreHorizontal,
  Music2,
} from "lucide-react"

const libraryTracks = [
  {
    title: "Neon Solitude",
    genre: "Electronic",
    mood: "Melancholic",
    bpm: 128,
    key: "Am",
    voice: "Aria",
    duration: "3:42",
    plays: 247,
  },
  {
    title: "Golden Hour Dreams",
    genre: "R&B",
    mood: "Romantic",
    bpm: 92,
    key: "F",
    voice: "Nova",
    duration: "4:15",
    plays: 89,
  },
  {
    title: "Midnight Protocol",
    genre: "Hip-Hop",
    mood: "Dark",
    bpm: 144,
    key: "Dm",
    voice: "Kai",
    duration: "3:28",
    plays: 512,
  },
  {
    title: "Cherry Blossom Rain",
    genre: "Lo-fi",
    mood: "Peaceful",
    bpm: 78,
    key: "G",
    voice: "Luna",
    duration: "5:03",
    plays: 1204,
  },
  {
    title: "Solar Flare",
    genre: "House",
    mood: "Euphoric",
    bpm: 126,
    key: "A",
    voice: "Zara",
    duration: "6:20",
    plays: 2891,
  },
  {
    title: "Autumn Letters",
    genre: "Folk",
    mood: "Nostalgic",
    bpm: 88,
    key: "D",
    voice: "Rex",
    duration: "3:55",
    plays: 433,
  },
]

const sortOptions = ["Newest", "Most Played", "Liked"]

export default function LibraryPage() {
  const [sort, setSort] = useState("Newest")
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const [likedTracks, setLikedTracks] = useState<string[]>(["Solar Flare", "Cherry Blossom Rain", "Neon Solitude"])

  const toggleLike = (title: string) => {
    setLikedTracks((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const sortedTracks = [...libraryTracks].sort((a, b) => {
    if (sort === "Most Played") return b.plays - a.plays
    if (sort === "Liked") {
      const aLiked = likedTracks.includes(a.title) ? 1 : 0
      const bLiked = likedTracks.includes(b.title) ? 1 : 0
      return bLiked - aLiked
    }
    return 0
  })

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">My Library</h2>
            <p className="text-sm text-muted-foreground">{libraryTracks.length} tracks</p>
          </div>
          <div className="flex gap-1">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSort(option)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  sort === option
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Track Table */}
        <div className="rounded-xl border border-border bg-card">
          {/* Header */}
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto_auto] items-center gap-4 border-b border-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            <span className="w-9" />
            <span>Track</span>
            <span className="w-20">Genre</span>
            <span className="w-20">Mood</span>
            <span className="w-12 text-center">BPM</span>
            <span className="w-10 text-center">Key</span>
            <span className="w-14">Voice</span>
            <span className="w-12 text-right">Time</span>
            <span className="w-24" />
          </div>

          {/* Rows */}
          {sortedTracks.map((track) => (
            <div
              key={track.title}
              className={`group grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto_auto_auto] items-center gap-4 border-b border-border/50 px-4 py-3 transition-colors last:border-0 hover:bg-secondary/30 ${
                playingTrack === track.title ? "bg-primary/5" : ""
              }`}
            >
              <button
                onClick={() =>
                  setPlayingTrack(playingTrack === track.title ? null : track.title)
                }
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                {playingTrack === track.title ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5 ml-0.5" />
                )}
              </button>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{track.title}</p>
                <p className="text-[10px] text-muted-foreground">{track.plays.toLocaleString()} plays</p>
              </div>

              <Badge variant="outline" className="w-20 justify-center text-[10px] border-border text-muted-foreground">
                {track.genre}
              </Badge>

              <span className="w-20 text-xs text-muted-foreground">{track.mood}</span>
              <span className="w-12 text-center text-xs font-mono text-muted-foreground">{track.bpm}</span>
              <span className="w-10 text-center text-xs font-mono text-muted-foreground">{track.key}</span>
              <span className="w-14 text-xs text-muted-foreground">{track.voice}</span>
              <span className="w-12 text-right text-xs font-mono text-muted-foreground">{track.duration}</span>

              <div className="flex w-24 items-center justify-end gap-1">
                <button
                  onClick={() => toggleLike(track.title)}
                  className="rounded p-1.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Heart
                    className={`size-3.5 ${
                      likedTracks.includes(track.title) ? "fill-primary text-primary" : ""
                    }`}
                  />
                </button>
                <button className="rounded p-1.5 text-muted-foreground transition-colors hover:text-foreground">
                  <Download className="size-3.5" />
                </button>
                <button className="rounded p-1.5 text-muted-foreground transition-colors hover:text-foreground">
                  <MoreHorizontal className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
