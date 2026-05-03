"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  ItemComponents,
  ItemRecipes,
  ItemDescriptions,
  Tools,
  ToolDescriptions,
  Berries,
  BerryDescriptions,
  ShinyItems,
  ShinyItemDescriptions,
  formatItemName,
  getBuildsInto,
  getItemCategory,
} from "@/lib/game-data"

const ITEM_SPRITE_BASE = "https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChessAssets/master/sprites/items"

type ItemCategory = "all" | "component" | "craftable" | "tool" | "berry" | "shiny"

function ItemSprite({ item, size = 48 }: { item: string; size?: number }) {
  const [hasError, setHasError] = useState(false)
  
  if (hasError) {
    return (
      <div 
        className="flex items-center justify-center rounded bg-muted text-xs font-medium"
        style={{ width: size, height: size }}
      >
        {item.slice(0, 2)}
      </div>
    )
  }

  return (
    <Image
      src={`${ITEM_SPRITE_BASE}/${item}.png`}
      alt={formatItemName(item)}
      width={size}
      height={size}
      className="pixelated"
      onError={() => setHasError(true)}
      unoptimized
    />
  )
}

// Get all items with their descriptions
function getAllItems() {
  const items: { name: string; description: string; category: string }[] = []
  
  // Components
  for (const comp of ItemComponents) {
    items.push({
      name: comp,
      description: ItemDescriptions[comp] || "",
      category: "Component",
    })
  }
  
  // Craftable items
  for (const item of Object.keys(ItemRecipes)) {
    items.push({
      name: item,
      description: ItemDescriptions[item] || "",
      category: "Craftable",
    })
  }
  
  // Tools
  for (const tool of Tools) {
    items.push({
      name: tool,
      description: ToolDescriptions[tool] || "",
      category: "Tool",
    })
  }
  
  // Berries
  for (const berry of Berries) {
    items.push({
      name: berry,
      description: BerryDescriptions[berry] || "",
      category: "Berry",
    })
  }
  
  // Shiny items
  for (const shiny of ShinyItems) {
    items.push({
      name: shiny,
      description: ShinyItemDescriptions[shiny] || "",
      category: "Shiny",
    })
  }
  
  return items
}

const allItems = getAllItems()

export function ItemSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<ItemCategory>("all")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch = 
        searchQuery === "" ||
        formatItemName(item.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = 
        categoryFilter === "all" ||
        item.category.toLowerCase() === categoryFilter
      
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, categoryFilter])
  
  const selectedItemData = selectedItem ? allItems.find((i) => i.name === selectedItem) : null
  const buildsInto = selectedItem && ItemComponents.includes(selectedItem as typeof ItemComponents[number]) 
    ? getBuildsInto(selectedItem) 
    : []

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search items by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {(["all", "component", "craftable", "tool", "berry", "shiny"] as ItemCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                categoryFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Item Detail */}
      {selectedItemData && (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start gap-6">
            <ItemSprite item={selectedItemData.name} size={80} />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">{formatItemName(selectedItemData.name)}</h2>
                <span className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  selectedItemData.category === "Component" && "bg-blue-500/20 text-blue-400",
                  selectedItemData.category === "Craftable" && "bg-green-500/20 text-green-400",
                  selectedItemData.category === "Tool" && "bg-amber-500/20 text-amber-400",
                  selectedItemData.category === "Berry" && "bg-pink-500/20 text-pink-400",
                  selectedItemData.category === "Shiny" && "bg-purple-500/20 text-purple-400",
                )}>
                  {selectedItemData.category}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground">{selectedItemData.description}</p>
              
              {/* Recipe */}
              {ItemRecipes[selectedItemData.name] && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Recipe</h4>
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 cursor-pointer hover:bg-secondary/80"
                      onClick={() => setSelectedItem(ItemRecipes[selectedItemData.name][0])}
                    >
                      <ItemSprite item={ItemRecipes[selectedItemData.name][0]} size={32} />
                      <span className="text-sm">{formatItemName(ItemRecipes[selectedItemData.name][0])}</span>
                    </div>
                    <span className="text-muted-foreground">+</span>
                    <div 
                      className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 cursor-pointer hover:bg-secondary/80"
                      onClick={() => setSelectedItem(ItemRecipes[selectedItemData.name][1])}
                    >
                      <ItemSprite item={ItemRecipes[selectedItemData.name][1]} size={32} />
                      <span className="text-sm">{formatItemName(ItemRecipes[selectedItemData.name][1])}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Builds Into */}
              {buildsInto.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Builds Into</h4>
                  <div className="flex flex-wrap gap-2">
                    {buildsInto.map(({ item }) => (
                      <div 
                        key={item}
                        className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 cursor-pointer hover:bg-secondary/80"
                        onClick={() => setSelectedItem(item)}
                      >
                        <ItemSprite item={item} size={24} />
                        <span className="text-sm">{formatItemName(item)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setSelectedItem(item.name)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border border-border p-4 cursor-pointer transition-all hover:bg-secondary",
              selectedItem === item.name && "bg-primary/10 border-primary"
            )}
          >
            <ItemSprite item={item.name} size={48} />
            <span className="text-sm font-medium text-center line-clamp-2">
              {formatItemName(item.name)}
            </span>
            <span className={cn(
              "text-xs rounded-full px-2 py-0.5",
              item.category === "Component" && "bg-blue-500/20 text-blue-400",
              item.category === "Craftable" && "bg-green-500/20 text-green-400",
              item.category === "Tool" && "bg-amber-500/20 text-amber-400",
              item.category === "Berry" && "bg-pink-500/20 text-pink-400",
              item.category === "Shiny" && "bg-purple-500/20 text-purple-400",
            )}>
              {item.category}
            </span>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No items found matching your search.
        </div>
      )}
    </div>
  )
}
