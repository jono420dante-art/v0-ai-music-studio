"use client"

import { useState, useEffect, useRef } from "react"
import { 
  X, Sparkles, Lightbulb, TrendingUp, Zap, MessageSquare, 
  Bot, User, Send, ChevronRight, Wand2, RefreshCcw, 
  Terminal, Code2, Layout, Palette, Music, Mic2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string;
  role: "agent" | "user";
  text: string;
  timestamp: Date;
  suggestions?: string[];
  action?: string;
}

export default function MusicDesignAgent() {
  const [isOpen, setIsOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      text: "Greetings, I am your Dieter Music Design Agent. I've analyzed your current session. Would you like me to design a vocal structure for your 'Cybernetic Skyline' track?",
      timestamp: new Date(),
      suggestions: ["Synthesize Female Vocals", "Draft Phonk Lyrics", "Optimize Mixing Rack"]
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMsg])
    setInputValue("")
    setIsTyping(true)

    // Simulate agent "design intelligence"
    setTimeout(() => {
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        text: getAgentResponse(text),
        timestamp: new Date(),
        suggestions: getSuggestions(text)
      }
      setMessages(prev => [...prev, agentMsg])
      setIsTyping(false)
    }, 1500)
  }

  const getAgentResponse = (input: string) => {
    const text = input.toLowerCase()
    if (text.includes("vocal") || text.includes("sing")) {
      return "Design Intelligence initialized. I've mapped a female vocal pattern to your 128 BPM tempo. Syncing with the Singing Engine now. Shall I also add a 'Glow' effect to the high-end?"
    }
    if (text.includes("lyrics")) {
      return "I've drafted a structure using 4-bar stanzas. The mood is set to 'Atmospheric'. Should I refine the rhyming scheme for the chorus?"
    }
    return "Understood. I'm applying spatial design reasoning to your project structure. Every element is now aligned for professional-grade output."
  }

  const getSuggestions = (input: string) => {
    const text = input.toLowerCase()
    if (text.includes("vocal")) return ["Apply Glow FX", "Change to Male Baritone", "Export Vocal Stems"]
    return ["Optimize Layout", "Regenerate Melody", "Check Mastering Quality"]
  }

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-96 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[600px] ring-1 ring-white/5"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                   <Bot className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest leading-none">Design Agent</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/40 uppercase">Lokuma Intelligence Layer</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-xl text-white/20 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar" ref={scrollRef}>
              <div className="space-y-6 pb-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={cn(
                    "flex flex-col gap-3",
                    msg.role === "user" ? "items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user" 
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/10 font-medium" 
                        : "bg-white/5 text-white/80 rounded-tl-none border border-white/10"
                    )}>
                      {msg.text}
                    </div>
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.suggestions.map((s, i) => (
                          <button 
                            key={i}
                            onClick={() => handleSend(s)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-indigo-400 transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 p-3 bg-white/5 rounded-2xl border border-white/5 w-16">
                    <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-bounce" />
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 pt-0">
              <div className="bg-black/40 border border-white/10 rounded-2xl p-2 flex items-center gap-2 focus-within:border-indigo-500/50 transition-all shadow-inner">
                <Input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me to design your track..."
                  className="bg-transparent border-none focus-visible:ring-0 text-xs font-medium placeholder:text-white/20 h-10"
                />
                <Button 
                  onClick={() => handleSend()}
                  size="icon" 
                  className="h-10 w-10 rounded-xl bg-white text-black hover:bg-white/90 shadow-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                 {[
                   { icon: Layout, label: "Layout" },
                   { icon: Palette, label: "Style" },
                   { icon: Music, label: "Music" },
                   { icon: Mic2, label: "Vocal" }
                 ].map((tool, i) => (
                   <button key={i} className="flex flex-col items-center gap-1.5 p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group">
                      <tool.icon className="h-3 w-3 text-white/20 group-hover:text-indigo-400" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">{tool.label}</span>
                   </button>
                 ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 ring-2 ring-white/20 group hover:scale-110 transition-all"
          >
            <Bot className="h-8 w-8 text-white group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
