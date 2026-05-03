"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { PokemonList, getPokemonSpriteUrl, getRarityColor } from "../lib/pokemon-data";
import { SynergyColors } from "../lib/game-data";
import type { Synergy, Rarity } from "../lib/types";

const ALL_SYNERGIES: Synergy[] = [
  "NORMAL", "FIRE", "WATER", "ELECTRIC", "GRASS", "ICE", "FIGHTING", "POISON",
  "GROUND", "FLYING", "PSYCHIC", "BUG", "ROCK", "GHOST", "DRAGON", "DARK",
  "STEEL", "FAIRY", "AQUATIC", "MONSTER", "AMORPHOUS", "WILD", "SOUND", "FLORA",
  "BABY", "HUMAN", "LIGHT", "GOURMET", "FOSSIL", "ARTIFICIAL", "FIELD"
];

const ALL_RARITIES: Rarity[] = ["COMMON", "UNCOMMON", "RARE", "EPIC", "UNIQUE", "LEGENDARY"];

export function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSynergy, setSelectedSynergy] = useState<Synergy | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<Rarity | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPokemon = useMemo(() => {
    return PokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSynergy = !selectedSynergy || pokemon.types.includes(selectedSynergy);
      const matchesRarity = !selectedRarity || pokemon.rarity === selectedRarity;
      return matchesSearch && matchesSynergy && matchesRarity;
    });
  }, [searchTerm, selectedSynergy, selectedRarity]);

  const clearFilters = () => {
    setSelectedSynergy(null);
    setSelectedRarity(null);
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))/20] transition-all text-lg"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-lg border transition-all flex items-center gap-2 ${
            showFilters || selectedSynergy || selectedRarity
              ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))]"
              : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"
          }`}
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4 space-y-4">
          {/* Synergy Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))]">Synergy Type</h3>
              {(selectedSynergy || selectedRarity) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-[hsl(var(--primary))] hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_SYNERGIES.map((synergy) => (
                <button
                  key={synergy}
                  onClick={() => setSelectedSynergy(selectedSynergy === synergy ? null : synergy)}
                  className={`px-2 py-1 text-xs rounded-md border transition-all ${
                    selectedSynergy === synergy
                      ? "border-white"
                      : "border-transparent hover:border-[hsl(var(--border))]"
                  }`}
                  style={{
                    backgroundColor: SynergyColors[synergy],
                    color: ["ELECTRIC", "FAIRY", "LIGHT", "ICE", "NORMAL", "FLYING", "STEEL", "BABY", "FLORA", "GOURMET"].includes(synergy) ? "#1a1a2e" : "#fff"
                  }}
                >
                  {synergy}
                </button>
              ))}
            </div>
          </div>

          {/* Rarity Filter */}
          <div>
            <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-2">Rarity</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_RARITIES.map((rarity) => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(selectedRarity === rarity ? null : rarity)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-all ${
                    selectedRarity === rarity
                      ? "border-white"
                      : "border-transparent hover:border-[hsl(var(--border))]"
                  }`}
                  style={{
                    backgroundColor: getRarityColor(rarity),
                    color: rarity === "COMMON" ? "#1a1a2e" : "#fff"
                  }}
                >
                  {rarity}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-sm text-[hsl(var(--muted-foreground))]">
        Showing {filteredPokemon.length} of {PokemonList.length} Pokemon
      </div>

      {/* Pokemon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.index + pokemon.name}
            className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-3 hover:border-[hsl(var(--primary))] transition-all hover:shadow-lg hover:shadow-[hsl(var(--primary))/10] group"
          >
            {/* Sprite */}
            <div className="relative aspect-square mb-2 bg-[hsl(var(--secondary))] rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={getPokemonSpriteUrl(pokemon.index)}
                alt={pokemon.name}
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                loading="lazy"
              />
              {/* Stars */}
              <div className="absolute top-1 right-1 flex">
                {Array.from({ length: pokemon.stars }).map((_, i) => (
                  <span key={i} className="text-xs text-[hsl(var(--accent))]">★</span>
                ))}
              </div>
              {/* Rarity indicator */}
              <div
                className="absolute bottom-1 left-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: getRarityColor(pokemon.rarity) }}
                title={pokemon.rarity}
              />
            </div>

            {/* Name */}
            <h3 className="font-semibold text-sm text-center truncate text-[hsl(var(--foreground))]">
              {pokemon.name.replace(/_/g, " ")}
            </h3>

            {/* Types */}
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-1.5 py-0.5 text-[10px] rounded"
                  style={{
                    backgroundColor: SynergyColors[type],
                    color: ["ELECTRIC", "FAIRY", "LIGHT", "ICE", "NORMAL", "FLYING", "STEEL", "BABY", "FLORA", "GOURMET"].includes(type) ? "#1a1a2e" : "#fff"
                  }}
                >
                  {type}
                </span>
              ))}
            </div>

            {/* Stats preview on hover - shown in tooltip style */}
            <div className="mt-2 pt-2 border-t border-[hsl(var(--border))] grid grid-cols-2 gap-1 text-[10px] text-[hsl(var(--muted-foreground))]">
              <span>HP: {pokemon.hp}</span>
              <span>ATK: {pokemon.atk}</span>
              <span>DEF: {pokemon.def}</span>
              <span>SPD: {pokemon.speed}</span>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredPokemon.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[hsl(var(--muted-foreground))] text-lg">No Pokemon found</p>
          <button
            onClick={clearFilters}
            className="mt-2 text-[hsl(var(--primary))] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
