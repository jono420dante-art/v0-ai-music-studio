"use client"

import { useState } from "react"
import Link from "next/link"
import { Music, Play, Download, Share2, MoreVertical, Search, Filter, Grid, List, Sparkles, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AIDirector } from "@/components/ai-director"

export default function MySongsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterGenre, setFilterGenre] = useState("all")

  // Mock data - will be replaced with database queries
  const songs = [
    { id: "1", title: "Summer Nights", genre: "Pop", bpm: 128, duration: "3:45", created: "2 days ago", plays: 1247, status: "published", artwork: "/api/placeholder/200/200" },
    { id: "2", title: "Midnight Drive", genre: "Electronic", bpm: 140, duration: "4:12", created: "1 week ago", plays: 892, status: "draft", artwork: "/api/placeholder/200/200" },
    { id: "3", title: "Acoustic Dreams", genre: "Indie", bpm: 95, duration: "3:28", created: "2 weeks ago", plays: 2341, status: "published", artwork: "/api/placeholder/200/200" },
    { id: "4", title: "Bass Drop", genre: "Dubstep", bpm: 150, duration: "2:55", created: "3 weeks ago", plays: 567, status: "published", artwork: "/api/placeholder/200/200" },
    { id: "5", title: "Jazz Fusion", genre: "Jazz", bpm: 110, duration: "5:23", created: "1 month ago", plays: 1876, status: "archived", artwork: "/api/placeholder/200/200" },
    { id: "6", title: "Hip Hop Flow", genre: "Hip Hop", bpm: 85, duration: "3:15", created: "1 month ago", plays: 3429, status: "published", artwork: "/api/placeholder/200/200" }
  ]

  const stats = [
    { label: "Total Songs", value: songs.length, icon: Music },
    { label: "Total Plays", value: songs.reduce((sum, s) => sum + s.plays, 0).toLocaleString(), icon: TrendingUp },
    { label: "Published", value: songs.filter(s => s.status === "published").length, icon: Sparkles },
    { label: "This Month", value: songs.filter(s => s.created.includes("days") || s.created.includes("week")).length, icon: Clock }
  ]

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = filterGenre === "all" || song.genre === filterGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen bg-background">
      {/* AI Director */}
      <AIDirector context="my-songs" />

      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary"><Music className="size-4 text-primary-foreground" /></div>
            <span className="text-sm font-bold tracking-wider">DIETER PRO</span>
          </Link>
          <Link href="/create"><Button>Create New Song</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">My Songs</h1>
          <p className="text-muted-foreground">Manage your AI-generated music library</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <stat.icon className="size-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="h-10 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Genres</option>
              <option value="Pop">Pop</option>
              <option value="Electronic">Electronic</option>
              <option value="Indie">Indie</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Jazz">Jazz</option>
              <option value="Dubstep">Dubstep</option>
            </select>
            <div className="flex rounded-lg border border-border bg-background">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
              >
                <Grid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Songs Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSongs.map((song) => (
              <div key={song.id} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg">
                <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold">{song.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px]">{song.genre}</Badge>
                      <span>{song.duration}</span>
                      <span>{song.bpm} BPM</span>
                    </div>
                  </div>
                  <button className="text-muted-foreground transition-colors hover:text-foreground">
                    <MoreVertical className="size-4" />
                  </button>
                </div>
                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {song.created}
                  <span>•</span>
                  <TrendingUp className="size-3" />
                  {song.plays.toLocaleString()} plays
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gap-1"><Play className="size-3" />Play</Button>
                  <Button size="sm" variant="outline" className="gap-1"><Download className="size-3" /></Button>
                  <Button size="sm" variant="outline" className="gap-1"><Share2 className="size-3" /></Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSongs.map((song) => (
              <div key={song.id} className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40">
                <div className="size-12 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                <div className="flex-1">
                  <h3 className="font-semibold">{song.title}</h3>
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{song.genre}</span>
                    <span>•</span>
                    <span>{song.duration}</span>
                    <span>•</span>
                    <span>{song.bpm} BPM</span>
                  </div>
                </div>
                <div className="hidden text-sm text-muted-foreground sm:block">
                  <div className="flex items-center gap-1"><TrendingUp className="size-3" />{song.plays.toLocaleString()}</div>
                </div>
                <div className="hidden text-sm text-muted-foreground sm:block">{song.created}</div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost"><Play className="size-4" /></Button>
                  <Button size="sm" variant="ghost"><Download className="size-4" /></Button>
                  <Button size="sm" variant="ghost"><Share2 className="size-4" /></Button>
                  <Button size="sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredSongs.length === 0 && (
          <div className="py-16 text-center">
            <Music className="mx-auto mb-4 size-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No songs found</h3>
            <p className="mb-6 text-sm text-muted-foreground">Try adjusting your search or create a new song</p>
            <Link href="/create"><Button><Sparkles className="mr-2 size-4" />Create Your First Song</Button></Link>
          </div>
        )}
      </main>
    </div>
  )
}
