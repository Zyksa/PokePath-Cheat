// Type definitions for PokePath TD save file

export interface SaveData {
  area: AreaData;
  box: TeamPokemon[];
  new: boolean;
  player: PlayerData;
  shop: ShopData;
  team?: TeamPokemon[];
  teamManager?: unknown[][];
}

export interface AreaData {
  routeNumber: number;
  routeWaves: number[];
}

export interface PlayerData {
  achievementProgress: AchievementProgress;
  achievements: Achievement[];
  extraGold: number;
  fossilInTeam: number;
  gold: number;
  health: number[];
  name: string;
  portrait: number;
  records: number[];
  sortedBox: number;
  stars: number;
  stats: PlayerStats;
  teamSlots: number;
}

export interface AchievementProgress {
  count: number;
  delibirdCount: number;
  evolutionCount: number;
  heartRestore: number;
  stolenGold: number;
}

export interface Achievement {
  description: string[];
  image: string;
  status: boolean;
}

export interface PlayerStats {
  appliedBurns: number;
  appliedCurses: number;
  appliedPoisons: number;
  appliedSlows: number;
  appliedStuns: number;
  defeatedEnemies: number;
  defeatedSpecies: string[];
  highestHit: number;
  highestPokemonLevel: number;
  pokemonOwned: number;
  resets: number;
  timePlayed: number;
  totalGold: number;
  totalPokemonLevel: number;
  wavesCompleted: number;
}

// Team/Box Pokemon structure (has lvl, favorite, specie, targetMode)
export interface TeamPokemon {
  favorite: boolean;
  lvl: number;
  specie: PokemonSpecie;
  targetMode?: string;
  shiny?: boolean;
}

// Pokemon specie data (from shop.eggList)
export interface PokemonSpecie {
  ability?: PokemonAbility;
  attackType?: string;
  color?: string;
  costScale?: string;
  critical?: StatScale;
  evolution?: Evolution;
  id: number;
  name: string[];
  power?: StatScale;
  projectile?: Projectile;
  projectileSound?: string;
  projectileSpeed?: number;
  range?: RangeData;
  rangeType?: string;
  ricochet?: number;
  speed?: StatScale;
  sprite?: SpriteData;
  tiles?: number[];
}

export interface PokemonAbility {
  description: string[];
  id: string;
  name: string[];
}

export interface StatScale {
  base: number;
  scale: number;
}

export interface Evolution {
  level: number;
  pokemon: string;
}

export interface Projectile {
  sprite: {
    frames: number;
    image: string;
  };
}

export interface RangeData {
  base: number;
  inner: number;
  scale: number;
}

export interface SpriteData {
  base: string;
  frames: number;
  hold: number;
  image: string;
}

export interface ShopData {
  eggList: PokemonSpecie[];
  eggPrice?: number;
}

// Helper to get Pokemon display name from specie
export function getPokemonDisplayName(specie: PokemonSpecie, langIndex: number = 0): string {
  if (Array.isArray(specie.name)) {
    return specie.name[langIndex] || specie.name[0];
  }
  return String(specie.name);
}

// Helper to get ability name
export function getAbilityName(ability: PokemonAbility | undefined, langIndex: number = 0): string {
  if (!ability) return '';
  return ability.name[langIndex] || ability.name[0];
}

// Helper to get ability description
export function getAbilityDescription(ability: PokemonAbility | undefined, langIndex: number = 0): string {
  if (!ability) return '';
  return ability.description[langIndex] || ability.description[0];
}

// Helper to calculate stars from records
export function calculateStars(records: number[]): number {
  return records.reduce((sum, waves) => sum + waves, 0);
}

// Target modes available
export const TARGET_MODES = [
  'first',
  'last', 
  'closest',
  'farthest',
  'strongest',
  'weakest',
  'notBurned',
  'notPoisoned',
  'notSlowed',
  'notCursed',
] as const;

export type TargetMode = typeof TARGET_MODES[number];
