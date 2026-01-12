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
  langIndex: number;
  level: number;
  shiny: boolean;
  onConfirm: (specie: PokemonSpecie, toBox: boolean, shiny: boolean, level: number) => void;
}

export function EvolutionModal({
  isOpen,
  onClose,
  basePokemon,
  langIndex,
  level,
  shiny: initialShiny,
  onConfirm,
}: EvolutionModalProps) {
  const { t } = useTranslation();
  const [selectedShiny, setSelectedShiny] = useState(initialShiny);

  // Build the full evolution chain
  const evolutionChain = useMemo(() => {
    const chain: { specie: PokemonSpecie; level: number }[] = [];
    
    // Start with the base pokemon
    chain.push({ specie: basePokemon, level: 1 });
    
    // Follow the evolution chain
    let current = basePokemon;
    while (current.evolution) {
      const nextName = current.evolution.pokemon.toLowerCase();
      const nextLevel = current.evolution.level;
      
      // Find the evolved form in database
      const dbPokemon = POKEMON_DATABASE.find(
        p => p.names.en.toLowerCase() === nextName
      );
      
      if (dbPokemon) {
        // Convert to PokemonSpecie format
        const evolvedSpecie: PokemonSpecie = {
          id: dbPokemon.id,
          name: [
            dbPokemon.names.en,
            dbPokemon.names.es,
            dbPokemon.names.fr,
            dbPokemon.names.pt,
            dbPokemon.names.it,
            dbPokemon.names.de,
            dbPokemon.names.ja,
            dbPokemon.names.ko,
          ],
          color: dbPokemon.color,
          ability: {
            id: dbPokemon.abilityId,
            name: [dbPokemon.abilityNames.en, dbPokemon.abilityNames.es, dbPokemon.abilityNames.fr],
            description: ['', '', '']
          },
          evolution: dbPokemon.evolution,
          attackType: 'single',
          costScale: 'mid',
          critical: { base: 0, scale: 0 },
          power: { base: 10, scale: 1 },
          range: { base: 100, inner: 0, scale: 0 },
          rangeType: 'circle',
          speed: { base: 1000, scale: 0 },
          sprite: { base: '', frames: 1, hold: 15, image: '' },
          tiles: [1],
        };
        
        chain.push({ specie: evolvedSpecie, level: nextLevel });
        current = evolvedSpecie;
      } else {
        break;
      }
    }
    
    return chain;
  }, [basePokemon]);

  const handleSelect = (specie: PokemonSpecie, toBox: boolean) => {
    onConfirm(specie, toBox, selectedShiny, level);
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
              const canSelect = level >= evo.level || evo.level === 1;
              const isRecommended = evolutionChain.reduce((best, curr) => {
                if (level >= curr.level) return curr;
                return best;
              }, evolutionChain[0]).specie.id === evo.specie.id;

              return (
                <div
                  key={evo.specie.id}
                  className={`section-card p-3 ${!canSelect ? 'opacity-40' : ''}`}
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
                        {isRecommended && canSelect && (
                          <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">
                            {t('pokemon.recommended')}
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
                      onClick={() => handleSelect(evo.specie, false)}
                      disabled={!canSelect}
                      className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-500 gap-1"
                    >
                      <Users className="w-3 h-3" />
                      {t('pokemon.addToTeam')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSelect(evo.specie, true)}
                      disabled={!canSelect}
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

// Helper to get the correct evolution for a given level
export function getEvolutionForLevel(basePokemon: PokemonSpecie, level: number): PokemonSpecie {
  let current = basePokemon;
  
  while (current.evolution && level >= current.evolution.level) {
    const nextName = current.evolution.pokemon.toLowerCase();
    
    const dbPokemon = POKEMON_DATABASE.find(
      p => p.names.en.toLowerCase() === nextName
    );
    
    if (dbPokemon) {
      current = {
        id: dbPokemon.id,
        name: [
          dbPokemon.names.en,
          dbPokemon.names.es,
          dbPokemon.names.fr,
          dbPokemon.names.pt,
          dbPokemon.names.it,
          dbPokemon.names.de,
          dbPokemon.names.ja,
          dbPokemon.names.ko,
        ],
        color: dbPokemon.color,
        ability: {
          id: dbPokemon.abilityId,
          name: [dbPokemon.abilityNames.en, dbPokemon.abilityNames.es, dbPokemon.abilityNames.fr],
          description: ['', '', '']
        },
        evolution: dbPokemon.evolution,
        attackType: 'single',
        costScale: 'mid',
        critical: { base: 0, scale: 0 },
        power: { base: 10, scale: 1 },
        range: { base: 100, inner: 0, scale: 0 },
        rangeType: 'circle',
        speed: { base: 1000, scale: 0 },
        sprite: { base: '', frames: 1, hold: 15, image: '' },
        tiles: [1],
      };
    } else {
      break;
    }
  }
  
  return current;
}
