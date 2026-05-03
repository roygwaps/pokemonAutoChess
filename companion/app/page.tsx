"use client";

import { useState } from "react";
import { Sword, Package, Zap, Github } from "lucide-react";
import { PokemonSearch } from "@/components/pokemon-search";
import { ItemCheatsheet } from "@/components/item-cheatsheet";

type Tab = "pokemon" | "items";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("pokemon");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[hsl(var(--background))]/95 backdrop-blur border-b border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">
                  PAC Companion
                </h1>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Pokemon Auto Chess Reference
                </p>
              </div>
            </div>
            <a
              href="https://github.com/keldaanCommunity/pokemonAutoChess"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab("pokemon")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === "pokemon"
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
              }`}
            >
              <Sword className="w-4 h-4" />
              Pokemon Search
            </button>
            <button
              onClick={() => setActiveTab("items")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === "items"
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
              }`}
            >
              <Package className="w-4 h-4" />
              Item Cheatsheet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "pokemon" && <PokemonSearch />}
        {activeTab === "items" && <ItemCheatsheet />}
      </main>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--border))] mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-[hsl(var(--muted-foreground))]">
          <p>
            PAC Companion is a fan-made tool for{" "}
            <a
              href="https://pokemon-auto-chess.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--primary))] hover:underline"
            >
              Pokemon Auto Chess
            </a>
          </p>
          <p className="mt-1 text-xs">
            Pokemon and Pokemon character names are trademarks of Nintendo.
          </p>
        </div>
      </footer>
    </div>
  );
}
