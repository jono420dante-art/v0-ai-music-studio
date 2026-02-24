"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  Upload,
  Video,
  Clock,
  Gauge,
  Film,
  Maximize,
  Move3d,
  Eye,
} from "lucide-react"

const models = [
  {
    id: "kling",
    name: "Kling 3.0",
    desc: "High-fidelity synthesis with precise motion control and photorealistic output",
  },
  {
    id: "veo",
    name: "VEO 3",
    desc: "Advanced generation with cinematic camera movements and natural physics",
  },
  {
    id: "img2vid",
    name: "Image-to-Video",
    desc: "Animate any still image with intelligent motion inference and style transfer",
  },
]

export default function VideoGeneratorPage() {
  const [activeModel, setActiveModel] = useState("kling")
  const [prompt, setPrompt] = useState("")
  const [duration, setDuration] = useState([10])
  const [isGenerating, setIsGenerating] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 3000)
  }

  return (
    <div className="flex h-full">
      {/* ─── Main Panel ─── */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Video Generation Suite</h2>
            <p className="text-sm text-muted-foreground">
              Create stunning videos with state-of-the-art AI models
            </p>
          </div>

          {/* ─── Model Tabs ─── */}
          <Tabs value={activeModel} onValueChange={setActiveModel} className="mb-6">
            <TabsList className="bg-secondary">
              {models.map((model) => (
                <TabsTrigger key={model.id} value={model.id}>
                  {model.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {models.map((model) => (
              <TabsContent key={model.id} value={model.id} className="mt-4">
                <div className="rounded-lg border border-border bg-card/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Video className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{model.name}</p>
                      <p className="text-xs text-muted-foreground">{model.desc}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto border-primary/30 text-primary text-[10px]">
                      Operational
                    </Badge>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* ─── Image Upload (for Image-to-Video) ─── */}
          {activeModel === "img2vid" && (
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Upload Image
              </p>
              <div
                onClick={() => setImageUploaded(true)}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
                  imageUploaded
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary/50 hover:border-primary/50"
                }`}
              >
                <Upload className="mb-2 size-8 text-muted-foreground" />
                {imageUploaded ? (
                  <>
                    <p className="text-sm font-medium text-foreground">scene_photo.png uploaded</p>
                    <p className="text-xs text-muted-foreground">1920x1080 - 2.4MB</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-foreground">
                      Drag & drop image or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP up to 20MB
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── Video Prompt ─── */}
          <div className="mb-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Video Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A cinematic aerial shot flying over a neon-lit cyberpunk city at night, rain glistening on the streets below, slow camera push-in..."
              className="w-full resize-none rounded-lg border border-border bg-secondary p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              rows={4}
            />
          </div>

          {/* ─── Duration Slider ─── */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Duration
              </p>
              <span className="text-xs font-semibold text-foreground">{duration[0]}s</span>
            </div>
            <Slider
              value={duration}
              onValueChange={setDuration}
              min={5}
              max={60}
              step={5}
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>5s</span>
              <span>60s</span>
            </div>
          </div>

          {/* ─── Generate Button ─── */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Generating Video...
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Generate Video
              </>
            )}
          </Button>

          {/* ─── Preview Placeholder (shown after generation) ─── */}
          {isGenerating && (
            <div className="mt-6 flex aspect-video items-center justify-center rounded-xl border border-border bg-card">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm font-medium text-foreground">Rendering preview...</p>
                <p className="text-xs text-muted-foreground">This may take a moment</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* ─── Right Panel: Live Stats ─── */}
      <div className="w-72 shrink-0 border-l border-border bg-card/50">
        <ScrollArea className="h-full">
          <div className="p-4">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Live Stats
            </p>

            {/* Stats */}
            <div className="flex flex-col gap-3 mb-6">
              <StatCard icon={Film} label="Videos Generated" value="42" />
              <StatCard icon={Clock} label="Avg Duration" value="15s" />
              <StatCard icon={Gauge} label="Quality" value="4K" />
            </div>

            {/* Feature Cards */}
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Features
            </p>
            <div className="flex flex-col gap-3">
              <FeatureCard
                icon={Eye}
                title="Real-time Preview"
                desc="See your video as it generates"
              />
              <FeatureCard
                icon={Maximize}
                title="4K Export"
                desc="Download in stunning 4K quality"
              />
              <FeatureCard
                icon={Move3d}
                title="Motion Control"
                desc="Fine-tune camera and motion paths"
              />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/50 p-3">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="size-3.5 text-primary" />
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-3">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground">{title}</span>
      </div>
      <p className="text-[10px] text-muted-foreground">{desc}</p>
    </div>
  )
}
