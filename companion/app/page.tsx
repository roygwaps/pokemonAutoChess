"use client"

import { useState } from "react"
import { Search, Grid3X3, Sparkles, List } from "lucide-react"
import { ItemCheatsheet } from "@/components/item-cheatsheet"
import { ItemSearch } from "@/components/item-search"
import { cn } from "@/lib/utils"

type Tab = "cheatsheet" | "search"

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("cheatsheet")

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">PAC Companion</h1>
                <p className="text-xs text-muted-foreground">Pokemon Auto Chess Helper</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <nav className="flex items-center gap-1 rounded-lg bg-muted p-1">
              <button
                onClick={() => setActiveTab("cheatsheet")}
                className={cn(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === "cheatsheet"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Item Grid</span>
              </button>
              <button
                onClick={() => setActiveTab("search")}
                className={cn(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === "search"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {activeTab === "cheatsheet" ? <ItemCheatsheet /> : <ItemSearch />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          <p>
            Not affiliated with Pokemon Auto Chess. Made for personal use.
          </p>
        </div>
      </footer>
    </div>
  )
}
