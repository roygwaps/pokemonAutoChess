"use client";

import { useState, useMemo } from "react";
import { ChevronRight, Sparkles, Wrench, Cherry, Gem } from "lucide-react";
import {
  ItemComponents,
  ItemRecipes,
  ItemDescriptions,
  Tools,
  ToolDescriptions,
  ShinyItems,
  ShinyItemDescriptions,
  Berries,
  BerryDescriptions,
  formatItemName,
  getBuildsInto,
} from "@/lib/game-data";

type ItemCategory = "components" | "tools" | "shiny" | "berries";

export function ItemCheatsheet() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ItemCategory>("components");

  const buildsInto = useMemo(() => {
    if (!selectedComponent) return [];
    return getBuildsInto(selectedComponent);
  }, [selectedComponent]);

  const categories: { id: ItemCategory; label: string; icon: React.ReactNode }[] = [
    { id: "components", label: "Craftable Items", icon: <Gem className="w-4 h-4" /> },
    { id: "tools", label: "Tools", icon: <Wrench className="w-4 h-4" /> },
    { id: "shiny", label: "Shiny Items", icon: <Sparkles className="w-4 h-4" /> },
    { id: "berries", label: "Berries", icon: <Cherry className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedComponent(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                : "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Craftable Items Tab */}
      {activeCategory === "components" && (
        <div className="space-y-6">
          {/* Base Components */}
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-[hsl(var(--foreground))]">
              Base Components
            </h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              Click a component to see what items it can build into.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {ItemComponents.map((component) => (
                <button
                  key={component}
                  onClick={() => setSelectedComponent(selectedComponent === component ? null : component)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    selectedComponent === component
                      ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] border-[hsl(var(--accent))]"
                      : "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"
                  }`}
                >
                  <div className="font-medium text-sm">{formatItemName(component)}</div>
                  <div className="text-[10px] opacity-75 mt-1 line-clamp-2">
                    {ItemDescriptions[component]?.split(".")[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Builds Into Section */}
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[hsl(var(--foreground))]">
              <ChevronRight className="w-5 h-5 text-[hsl(var(--primary))]" />
              Builds Into
            </h2>

            {!selectedComponent ? (
              <p className="text-[hsl(var(--muted-foreground))]">
                Select a base component above to see what it builds into.
              </p>
            ) : buildsInto.length === 0 ? (
              <p className="text-[hsl(var(--muted-foreground))]">
                This component doesn&apos;t build into any items.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {buildsInto.map(({ item, recipe }) => (
                  <div
                    key={item}
                    className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg p-4 hover:border-[hsl(var(--primary))] transition-all"
                  >
                    <h3 className="font-bold text-[hsl(var(--accent))] mb-2">
                      {formatItemName(item)}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] mb-3">
                      <span className={recipe[0] === selectedComponent ? "text-[hsl(var(--accent))] font-medium" : ""}>
                        {formatItemName(recipe[0])}
                      </span>
                      <span>+</span>
                      <span className={recipe[1] === selectedComponent ? "text-[hsl(var(--accent))] font-medium" : ""}>
                        {formatItemName(recipe[1])}
                      </span>
                    </div>
                    <p className="text-sm text-[hsl(var(--foreground))]">
                      {ItemDescriptions[item] || "No description available."}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Full Recipe Grid */}
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 text-[hsl(var(--foreground))]">
              All Craftable Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {Object.entries(ItemRecipes).map(([item, recipe]) => (
                <div
                  key={item}
                  className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg p-3 hover:border-[hsl(var(--primary))] transition-all"
                >
                  <div className="font-medium text-sm text-[hsl(var(--accent))]">
                    {formatItemName(item)}
                  </div>
                  <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                    {formatItemName(recipe[0])} + {formatItemName(recipe[1])}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools Tab */}
      {activeCategory === "tools" && (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2 text-[hsl(var(--foreground))]">
            Tools (Artificial Synergy)
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            Tools are obtained through the Artificial synergy. Each game randomly selects which tools are available.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Tools.map((tool) => (
              <div
                key={tool}
                className="bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-lg p-4 hover:border-[hsl(var(--primary))] transition-all"
              >
                <h3 className="font-bold text-[hsl(var(--primary))] mb-2">
                  {formatItemName(tool)}
                </h3>
                <p className="text-sm text-[hsl(var(--foreground))]">
                  {ToolDescriptions[tool] || "No description available."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shiny Items Tab */}
      {activeCategory === "shiny" && (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2 text-[hsl(var(--foreground))]">
            Shiny Items
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            Shiny items are rare rewards obtained from defeating shiny Pokemon teams during PvE rounds or from golden eggs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ShinyItems.map((item) => (
              <div
                key={item}
                className="bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(38,92%,50%,0.1)] border border-[hsl(var(--accent))/50] rounded-lg p-4 hover:border-[hsl(var(--accent))] transition-all"
              >
                <h3 className="font-bold text-[hsl(var(--accent))] mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {formatItemName(item)}
                </h3>
                <p className="text-sm text-[hsl(var(--foreground))]">
                  {ShinyItemDescriptions[item] || "No description available."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Berries Tab */}
      {activeCategory === "berries" && (
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2 text-[hsl(var(--foreground))]">
            Berries (Grass Synergy)
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            Berries are collected from berry trees when the Grass synergy is active. Click on berry trees next to your avatar to collect them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Berries.map((berry) => (
              <div
                key={berry}
                className="bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(142,76%,36%,0.1)] border border-[hsl(142,76%,36%,0.5)] rounded-lg p-4 hover:border-[hsl(142,76%,36%)] transition-all"
              >
                <h3 className="font-bold text-[hsl(142,76%,36%)] mb-2 flex items-center gap-2">
                  <Cherry className="w-4 h-4" />
                  {formatItemName(berry)}
                </h3>
                <p className="text-sm text-[hsl(var(--foreground))]">
                  {BerryDescriptions[berry] || "No description available."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
