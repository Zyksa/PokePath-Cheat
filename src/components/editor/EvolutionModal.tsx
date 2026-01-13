import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Users, Box, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { PokemonSpecie } from '@/types/save';
import { getPokemonDisplayName } from '@/types/save';
import { POKEMON_DATABASE } from '@/data/pokemonData';

interface EvolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  basePokemon: PokemonSpecie;
  eggList: PokemonSpecie[];  // Add eggList to get real Pokemon data
  langIndex: number;
  level: number;
  shiny: boolean;
  onConfirm: (specie: PokemonSpecie, toBox: boolean, shiny: boolean, level: number) => void;
}

export function EvolutionModal({
  isOpen,
  onClose,
  basePokemon,
  eggList,
  langIndex,
  level,
  shiny: initialShiny,
  onConfirm,
}: EvolutionModalProps) {
  const { t } = useTranslation();
  const [selectedShiny, setSelectedShiny] = useState(initialShiny);

  // Build the full evolution chain using the shared helper function
  const evolutionChain = useMemo(() => {
    return getFullEvolutionChain(basePokemon, eggList);
  }, [basePokemon, eggList]);

  const handleSelect = (specie: PokemonSpecie, toBox: boolean, minLevel: number) => {
    // Auto-adjust level to at least the evolution level
    const finalLevel = Math.max(level, minLevel);
    onConfirm(specie, toBox, selectedShiny, finalLevel);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="gradient-text">{t('pokemon.chooseEvolution')}</DialogTitle>
          <DialogDescription>
            {t('pokemon.chooseEvolutionDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Shiny toggle */}
          <div className="flex items-center justify-center gap-3 pb-3 border-b border-white/10">
            <Switch
              checked={selectedShiny}
              onCheckedChange={setSelectedShiny}
              className="data-[state=checked]:bg-yellow-500"
            />
            <span className="text-sm flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Shiny
            </span>
          </div>

          {/* Evolution chain display */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {evolutionChain.map((evo, idx) => (
              <div key={evo.specie.id} className="flex items-center gap-2">
                {idx > 0 && (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-[10px]">Lv.{evo.level}</span>
                  </div>
                )}
                <div
                  className={`p-2 rounded-xl border-2 transition-all ${
                    level >= evo.level
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-white/10 bg-white/5 opacity-50'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-1"
                    style={{
                      background: `linear-gradient(135deg, ${evo.specie.color}40, ${evo.specie.color}20)`
                    }}
                  >
                    {selectedShiny && <Sparkles className="w-5 h-5 text-yellow-400" />}
                  </div>
                  <p className="text-xs font-medium text-center capitalize truncate max-w-[80px]">
                    {getPokemonDisplayName(evo.specie, langIndex)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Selection buttons for each evolution */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <p className="text-sm text-center text-muted-foreground">
              {t('pokemon.selectVersion')} (Lv.{level})
            </p>
            
            {evolutionChain.map((evo) => {
              // All evolutions are now selectable
              const needsLevelAdjust = level < evo.level && evo.level > 1;
              const isRecommended = evolutionChain.reduce((best, curr) => {
                if (level >= curr.level) return curr;
                return best;
              }, evolutionChain[0]).specie.id === evo.specie.id;

              return (
                <div
                  key={evo.specie.id}
                  className="section-card p-3"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${evo.specie.color}40, ${evo.specie.color}20)`
                      }}
                    >
                      {selectedShiny && <Sparkles className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium capitalize truncate">
                          {getPokemonDisplayName(evo.specie, langIndex)}
                        </p>
                        {isRecommended && (
                          <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                            {t('pokemon.recommended')}
                          </span>
                        )}
                        {needsLevelAdjust && (
                          <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">
                            → Lv.{evo.level}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {evo.level === 1 ? t('pokemon.baseForm') : `${t('pokemon.evolvesAt')} ${evo.level}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSelect(evo.specie, false, evo.level)}
                      className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-500 gap-1"
                    >
                      <Users className="w-3 h-3" />
                      {t('pokemon.addToTeam')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSelect(evo.specie, true, evo.level)}
                      variant="outline"
                      className="flex-1 h-8 text-xs border-white/10 hover:bg-white/5 gap-1"
                    >
                      <Box className="w-3 h-3" />
                      {t('pokemon.addToBox')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper to find the true base form in eggList
function findTrueBaseForm(pokemon: PokemonSpecie, eggList: PokemonSpecie[]): PokemonSpecie {
  // First check if this pokemon is already in eggList by ID or name
  const inEggList = eggList.find(p => 
    p.id === pokemon.id || 
    p.name[0].toLowerCase() === pokemon.name[0].toLowerCase()
  );
  
  if (inEggList) {
    // Check if something evolves INTO this pokemon (by name in any language)
    const pokemonNames = pokemon.name.map(n => n.toLowerCase());
    const preEvoInEggList = eggList.find(p => 
      p.evolution && pokemonNames.includes(p.evolution.pokemon.toLowerCase())
    );
    if (preEvoInEggList) {
      return findTrueBaseForm(preEvoInEggList, eggList);
    }
    return inEggList;
  }
  
  // Pokemon is not in eggList (it's an evolution like frogadier or greninja)
  // We need to trace back through the database to find who evolves into this
  // Search by any name in the pokemon's name array
  const pokemonNames = pokemon.name.map(n => n.toLowerCase());
  
  // First find this pokemon in the database to get all its names
  const dbPokemon = POKEMON_DATABASE.find(p => 
    pokemonNames.includes(p.names.en.toLowerCase()) ||
    pokemonNames.includes(p.names.fr.toLowerCase()) ||
    p.id === pokemon.id
  );
  
  if (dbPokemon) {
    // Now find who evolves into this pokemon
    const preEvoDb = POKEMON_DATABASE.find(p => 
      p.evolution?.pokemon.toLowerCase() === dbPokemon.names.en.toLowerCase()
    );
    
    if (preEvoDb) {
      // Check if this pre-evolution is in eggList
      const preEvoInEggList = eggList.find(p => 
        p.name[0].toLowerCase() === preEvoDb.names.en.toLowerCase() ||
        p.id === preEvoDb.id
      );
      
      if (preEvoInEggList) {
        // Found the base! But check if there's an even earlier form
        return findTrueBaseForm(preEvoInEggList, eggList);
      }
      
      // Pre-evo not in eggList, continue recursively with the database entry
      const fakePreEvo: PokemonSpecie = {
        ...pokemon,
        id: preEvoDb.id,
        name: [preEvoDb.names.en, preEvoDb.names.es, preEvoDb.names.fr, preEvoDb.names.pt, preEvoDb.names.it, preEvoDb.names.de, preEvoDb.names.ja, preEvoDb.names.ko],
      };
      return findTrueBaseForm(fakePreEvo, eggList);
    }
  }
  
  // Fallback: return the original pokemon
  return pokemon;
}

// Helper function to create an evolution from a base Pokemon using database info
function createEvolutionFromBase(trueBasePokemon: PokemonSpecie, evolutionName: string): PokemonSpecie | null {
  // Find the evolution data in our database
  const dbEvolution = POKEMON_DATABASE.find(
    p => p.names.en.toLowerCase() === evolutionName.toLowerCase()
  );
  
  if (!dbEvolution) return null;
  
  // Get the base form's name for sprite path construction
  const baseSpriteName = trueBasePokemon.name[0].toLowerCase();
  
  // Create the evolved Pokemon using base Pokemon's stats structure but with evolved data
  return {
    ...trueBasePokemon,
    id: dbEvolution.id,
    name: [
      dbEvolution.names.en,
      dbEvolution.names.es,
      dbEvolution.names.fr,
      dbEvolution.names.pt,
      dbEvolution.names.it,
      dbEvolution.names.de,
      dbEvolution.names.ja,
      dbEvolution.names.ko,
    ],
    color: dbEvolution.color,
    ability: {
      id: dbEvolution.abilityId,
      name: [dbEvolution.abilityNames.en, dbEvolution.abilityNames.es, dbEvolution.abilityNames.fr],
      description: trueBasePokemon.ability?.description || ['', '', ''],
    },
    evolution: dbEvolution.evolution,
    // Build sprite paths directly with the evolution name
    sprite: trueBasePokemon.sprite ? {
      base: trueBasePokemon.sprite.base.replace(baseSpriteName, evolutionName.toLowerCase()),
      frames: trueBasePokemon.sprite.frames,
      hold: trueBasePokemon.sprite.hold,
      image: trueBasePokemon.sprite.image.replace(baseSpriteName, evolutionName.toLowerCase()),
    } : undefined,
  };
}

// Helper to get the correct evolution for a given level using eggList
export function getEvolutionForLevel(pokemon: PokemonSpecie, level: number, eggList: PokemonSpecie[]): PokemonSpecie {
  // Find the true base form first
  const trueBase = findTrueBaseForm(pokemon, eggList);
  
  let current = trueBase;
  
  while (current.evolution && level >= current.evolution.level) {
    const nextName = current.evolution.pokemon.toLowerCase();
    
    // First try to find in eggList (real game data)
    let evolvedSpecie = eggList.find(
      p => p.name[0].toLowerCase() === nextName
    );
    
    // If not found in eggList, create from TRUE base Pokemon
    if (!evolvedSpecie) {
      evolvedSpecie = createEvolutionFromBase(trueBase, nextName) || undefined;
    }
    
    if (evolvedSpecie) {
      current = evolvedSpecie;
    } else {
      break;
    }
  }
  
  return current;
}

// Helper to get the full evolution chain from any Pokemon using eggList
export function getFullEvolutionChain(pokemon: PokemonSpecie, eggList: PokemonSpecie[]): { specie: PokemonSpecie; level: number }[] {
  const chain: { specie: PokemonSpecie; level: number }[] = [];
  
  // Find the true base form
  const trueBase = findTrueBaseForm(pokemon, eggList);
  
  // Now build the chain from the base form forward
  chain.push({ specie: trueBase, level: 1 });
  
  let current = trueBase;
  while (current.evolution) {
    const nextName = current.evolution.pokemon.toLowerCase();
    const nextLevel = current.evolution.level;
    
    // First try to find in eggList
    let evolvedSpecie = eggList.find(
      p => p.name[0].toLowerCase() === nextName
    );
    
    // If not found, create from TRUE base Pokemon using database
    if (!evolvedSpecie) {
      evolvedSpecie = createEvolutionFromBase(trueBase, nextName) || undefined;
    }
    
    if (evolvedSpecie) {
      chain.push({ specie: evolvedSpecie, level: nextLevel });
      current = evolvedSpecie;
    } else {
      break;
    }
  }
  
  return chain;
}
