"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Play,
  Heart,
  Shuffle,
  TrendingUp,
} from "lucide-react"

const trendingTracks = [
  { title: "Aurora Protocol", artist: "DJ Mira", genre: "Techno", plays: "142K" },
  { title: "Soul Fragment", artist: "Elara V", genre: "Soul", plays: "89K" },
  { title: "Crimson Desert", artist: "NomadX", genre: "Cinematic", plays: "67K" },
]

const allTracks = [
  { title: "Aurora Protocol", artist: "DJ Mira", genre: "Techno", plays: "142K" },
  { title: "Soul Fragment", artist: "Elara V", genre: "Soul", plays: "89K" },
  { title: "Crimson Desert", artist: "NomadX", genre: "Cinematic", plays: "67K" },
  { title: "Pixel Garden", artist: "SynthWave88", genre: "Lo-fi", plays: "234K" },
  { title: "Velvet Thunder", artist: "The Rooks", genre: "Rock", plays: "45K" },
  { title: "Oasis Night", artist: "Omar Al-Rawi", genre: "World", plays: "28K" },
  { title: "Glass Ceiling", artist: "Nova & Kai", genre: "R&B", plays: "312K" },
  { title: "System Override", artist: "CyberpunkZ", genre: "Industrial", plays: "56K" },
]

const genreTabs = [
  "All", "Pop", "Hip-Hop", "R&B", "Electronic", "House",
  "Techno", "Ambient", "Lo-fi", "Jazz", "Soul", "Rock", "Indie",
]

export default function ExplorePage() {
  const [search, setSearch] = useState("")
  const [activeGenre, setActiveGenre] = useState("All")
  const [likedTracks, setLikedTracks] = useState<string[]>([])
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)

  const toggleLike = (title: string) => {
    setLikedTracks((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  const filteredTracks = allTracks.filter((track) => {
    const matchesSearch =
      search === "" ||
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = activeGenre === "All" || track.genre === activeGenre
    return matchesSearch && matchesGenre
  })

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Explore</h2>
          <p className="text-sm text-muted-foreground">Discover AI-generated music from the community</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tracks, artists..."
            className="w-full rounded-lg border border-border bg-secondary py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Trending */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Trending Now</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {trendingTracks.map((track, i) => (
              <div
                key={track.title}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl font-black text-primary/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground">{track.title}</p>
                <p className="text-xs text-muted-foreground">{track.artist}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                    {track.genre}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{track.plays} plays</span>
                </div>
                <button
                  onClick={() => setPlayingTrack(track.title)}
                  className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Play className="size-3.5 ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Tabs */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {genreTabs.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeGenre === genre
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Track List */}
        <div className="flex flex-col gap-1">
          {filteredTracks.map((track) => (
            <div
              key={track.title}
              className={`group flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-secondary/50 ${
                playingTrack === track.title ? "bg-primary/5" : ""
              }`}
            >
              <button
                onClick={() =>
                  setPlayingTrack(playingTrack === track.title ? null : track.title)
                }
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <Play className="size-3.5 ml-0.5" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground">{track.artist}</p>
              </div>
              <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                {track.genre}
              </Badge>
              <span className="w-14 text-right text-xs text-muted-foreground">
                {track.plays}
              </span>
              <button
                onClick={() => toggleLike(track.title)}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Heart
                  className={`size-4 ${
                    likedTracks.includes(track.title) ? "fill-primary text-primary" : ""
                  }`}
                />
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Shuffle className="size-3" /> Remix
              </Button>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
