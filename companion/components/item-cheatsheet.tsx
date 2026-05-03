"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ItemComponents, ItemRecipes, formatItemName, ItemDescriptions } from "@/lib/game-data"

const ITEM_SPRITE_BASE = "https://raw.githubusercontent.com/keldaanCommunity/pokemonAutoChessAssets/master/sprites/items"

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

// Build the combination matrix
function buildCraftMatrix() {
  const matrix: Record<string, Record<string, string | null>> = {}
  
  for (const comp1 of ItemComponents) {
    matrix[comp1] = {}
    for (const comp2 of ItemComponents) {
      matrix[comp1][comp2] = null
    }
  }
  
  for (const [result, [c1, c2]] of Object.entries(ItemRecipes)) {
    // Fill both directions since order doesn't matter
    matrix[c1][c2] = result
    matrix[c2][c1] = result
  }
  
  return matrix
}

export function ItemCheatsheet() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  
  const craftMatrix = useMemo(() => buildCraftMatrix(), [])
  
  const hoveredDescription = hoveredItem 
    ? ItemDescriptions[hoveredItem] || `No description available for ${formatItemName(hoveredItem)}`
    : null

  return (
    <div className="space-y-6">
      {/* Item tooltip */}
      <div className="min-h-[80px] rounded-lg border border-border bg-card p-4">
        {hoveredItem ? (
          <div className="flex items-start gap-4">
            <ItemSprite item={hoveredItem} size={64} />
            <div>
              <h3 className="font-semibold text-lg">{formatItemName(hoveredItem)}</h3>
              <p className="text-muted-foreground text-sm mt-1">{hoveredDescription}</p>
              {ItemRecipes[hoveredItem] && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="text-muted-foreground">Recipe:</span>
                  <ItemSprite item={ItemRecipes[hoveredItem][0]} size={24} />
                  <span className="text-muted-foreground">+</span>
                  <ItemSprite item={ItemRecipes[hoveredItem][1]} size={24} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center">Hover over an item to see details</p>
        )}
      </div>

      {/* Cheatsheet Grid */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="border-collapse">
            <thead>
              <tr>
                {/* Empty corner cell */}
                <th className="w-16 h-16 p-1" />
                {/* Column headers */}
                {ItemComponents.map((comp) => (
                  <th 
                    key={comp} 
                    className={cn(
                      "w-16 h-16 p-1 cursor-pointer transition-all",
                      selectedComponent === comp && "bg-primary/20 rounded-lg"
                    )}
                    onClick={() => setSelectedComponent(selectedComponent === comp ? null : comp)}
                    onMouseEnter={() => setHoveredItem(comp)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-center justify-center h-full">
                      <ItemSprite item={comp} size={48} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ItemComponents.map((rowComp) => (
                <tr key={rowComp}>
                  {/* Row header */}
                  <th 
                    className={cn(
                      "w-16 h-16 p-1 cursor-pointer transition-all",
                      selectedComponent === rowComp && "bg-primary/20 rounded-lg"
                    )}
                    onClick={() => setSelectedComponent(selectedComponent === rowComp ? null : rowComp)}
                    onMouseEnter={() => setHoveredItem(rowComp)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex items-center justify-center h-full">
                      <ItemSprite item={rowComp} size={48} />
                    </div>
                  </th>
                  {/* Cells */}
                  {ItemComponents.map((colComp) => {
                    const result = craftMatrix[rowComp]?.[colComp]
                    const isHighlighted = selectedComponent && (rowComp === selectedComponent || colComp === selectedComponent)
                    
                    return (
                      <td 
                        key={`${rowComp}-${colComp}`}
                        className={cn(
                          "w-16 h-16 p-1 border border-border transition-all",
                          isHighlighted && "bg-primary/10",
                          result && "cursor-pointer hover:bg-secondary"
                        )}
                        onMouseEnter={() => result && setHoveredItem(result)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="flex items-center justify-center h-full">
                          {result ? (
                            <ItemSprite item={result} size={40} />
                          ) : (
                            <div className="w-10 h-10 rounded bg-muted/50" />
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {ItemComponents.map((comp) => (
          <div 
            key={comp}
            className={cn(
              "flex items-center gap-3 rounded-lg border border-border p-3 transition-all cursor-pointer",
              selectedComponent === comp ? "bg-primary/20 border-primary" : "hover:bg-secondary"
            )}
            onClick={() => setSelectedComponent(selectedComponent === comp ? null : comp)}
            onMouseEnter={() => setHoveredItem(comp)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <ItemSprite item={comp} size={32} />
            <span className="text-sm font-medium">{formatItemName(comp)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
