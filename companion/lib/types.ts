// Type definitions for Pokemon Auto Chess companion app

export type Synergy =
  | "NORMAL"
  | "FIRE"
  | "WATER"
  | "ELECTRIC"
  | "GRASS"
  | "ICE"
  | "FIGHTING"
  | "POISON"
  | "GROUND"
  | "FLYING"
  | "PSYCHIC"
  | "BUG"
  | "ROCK"
  | "GHOST"
  | "DRAGON"
  | "DARK"
  | "STEEL"
  | "FAIRY"
  | "AQUATIC"
  | "MONSTER"
  | "AMORPHOUS"
  | "WILD"
  | "SOUND"
  | "FLORA"
  | "BABY"
  | "HUMAN"
  | "LIGHT"
  | "GOURMET"
  | "FOSSIL"
  | "ARTIFICIAL"
  | "FIELD";

export type Rarity =
  | "COMMON"
  | "UNCOMMON"
  | "RARE"
  | "EPIC"
  | "UNIQUE"
  | "LEGENDARY";

export interface PokemonData {
  index: string;
  name: string;
  types: Synergy[];
  rarity: Rarity;
  stars: number;
  hp: number;
  atk: number;
  def: number;
  speDef: number;
  speed: number;
  range: number;
  pp: number;
  skill: string;
}

export interface ItemData {
  name: string;
  description: string;
  synergy?: Synergy;
}

export interface ItemRecipeData {
  result: string;
  components: [string, string];
}
