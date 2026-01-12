import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Swords, ArrowUp, Plus, Trash2, Heart, Search, Sparkles, Box, Users, Zap, Target, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { SaveData, TeamPokemon, PokemonSpecie, TargetMode } from '@/types/save';
import { getPokemonDisplayName, getAbilityName, getAbilityDescription, TARGET_MODES } from '@/types/save';
import { POKEMON_DATABASE } from '@/data/pokemonData';
import { EvolutionModal, getEvolutionForLevel, getFullEvolutionChain } from './EvolutionModal';

interface PokemonEditorProps {
  saveData: SaveData;
  onUpdatePokemon: (index: number, pokemon: TeamPokemon, isBox: boolean) => void;
  onUpdateLevel: (index: number, level: number, isBox: boolean) => void;
  onMaxAllLevels: () => void;
  onGiveAllPokemon: (shiny: boolean, level: number) => number | undefined;
  onAddPokemon: (specie: PokemonSpecie, toBox: boolean, shiny: boolean, level: number) => void;
  onRemovePokemon: (index: number, isBox: boolean) => void;
  onUpdateTargetMode: (index: number, targetMode: TargetMode, isBox: boolean) => void;
  onToggleFavorite: (index: number, isBox: boolean) => void;
  onToggleShiny: (index: number, isBox: boolean) => void;
}

export function PokemonEditor({
  saveData,
  onUpdatePokemon,
  onUpdateLevel,
  onMaxAllLevels,
  onGiveAllPokemon,
  onAddPokemon,
  onRemovePokemon,
  onUpdateTargetMode,
  onToggleFavorite,
  onToggleShiny,
}: PokemonEditorProps) {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [abilityFilter, setAbilityFilter] = useState<string>('all');
  const [addShiny, setAddShiny] = useState(false);
  const [addLevel, setAddLevel] = useState(1);
  
  // Evolution modal state
  const [evolutionModal, setEvolutionModal] = useState<{
    isOpen: boolean;
    pokemon: PokemonSpecie | null;
  }>({ isOpen: false, pokemon: null });
  
  // Give All confirmation modal
  const [showGiveAllConfirm, setShowGiveAllConfirm] = useState(false);
  
  const langIndex = i18n.language === 'fr' ? 2 : 0;
  
  // Collect all Pokemon from team and box
  const allPokemon: { pokemon: TeamPokemon; index: number; isBox: boolean }[] = useMemo(() => [
    ...(saveData.team || []).map((p, i) => ({ pokemon: p, index: i, isBox: false })),
    ...(saveData.box || []).map((p, i) => ({ pokemon: p, index: i, isBox: true })),
  ], [saveData.team, saveData.box]);

  // Get all available Pokemon from shop eggList or fallback to database
  const availablePokemon = useMemo(() => {
    // Use eggList if available and has data
    if (saveData.shop?.eggList && saveData.shop.eggList.length > 0) {
      return saveData.shop.eggList;
    }
    // Fallback: Convert database to PokemonSpecie format
    return POKEMON_DATABASE.map(dbPokemon => ({
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
        description: ['', '', ''] // No descriptions in database
      },
      evolution: dbPokemon.evolution,
      attackType: 'single' as const,
      costScale: 'mid' as const,
      critical: { base: 0, scale: 0 },
      power: { base: 10, scale: 1 },
      range: { base: 100, inner: 0, scale: 0 },
      rangeType: 'circle' as const,
      speed: { base: 1000, scale: 0 },
      sprite: { base: '', frames: 1, hold: 15, image: '' },
      tiles: [1],
    })) as PokemonSpecie[];
  }, [saveData.shop]);

  // Get unique abilities for filter
  const uniqueAbilities = useMemo(() => {
    const abilities = new Set<string>();
    availablePokemon.forEach(p => {
      if (p.ability?.id) {
        abilities.add(p.ability.id);
      }
    });
    return Array.from(abilities).sort();
  }, [availablePokemon]);

  // Filter available Pokemon based on search and ability
  const filteredAvailable = useMemo(() => {
    return availablePokemon.filter(pokemon => {
      const name = getPokemonDisplayName(pokemon, langIndex).toLowerCase();
      const matchesSearch = name.includes(searchTerm.toLowerCase());
      const matchesAbility = abilityFilter === 'all' || pokemon.ability?.id === abilityFilter;
      return matchesSearch && matchesAbility;
    });
  }, [availablePokemon, searchTerm, abilityFilter, langIndex]);

  const handleAddPokemon = (specie: PokemonSpecie, toBox: boolean, shiny: boolean, level: number) => {
    onAddPokemon(specie, toBox, shiny, level);
    const pokemonName = getPokemonDisplayName(specie, langIndex);
    const destination = toBox ? t('pokemon.boxPokemon') : t('pokemon.teamPokemon');
    toast.success(t('pokemon.pokemonAdded'), {
      description: `${pokemonName} (Lv.${level}) → ${destination}`,
    });
  };

  // Open evolution modal when clicking add
  const handleOpenEvolutionModal = (specie: PokemonSpecie) => {
    // Check if pokemon has evolutions
    if (specie.evolution) {
      setEvolutionModal({ isOpen: true, pokemon: specie });
    } else {
      // No evolution, show simple add buttons - but we still open modal to let user choose team/box
      setEvolutionModal({ isOpen: true, pokemon: specie });
    }
  };

  // Handle level change with evolution check
  const handleLevelChange = (index: number, newLevel: number, isBox: boolean, pokemon: TeamPokemon) => {
    // First update the level
    onUpdateLevel(index, newLevel, isBox);
    
    // Check if Pokemon should evolve
    const currentSpecie = pokemon.specie;
    if (currentSpecie.evolution && newLevel >= currentSpecie.evolution.level) {
      const evolvedSpecie = getEvolutionForLevel(currentSpecie, newLevel);
      
      // If the pokemon evolved to a different species
      if (evolvedSpecie.id !== currentSpecie.id) {
        const newPokemon = {
          ...pokemon,
          lvl: newLevel,
          specie: evolvedSpecie,
        };
        onUpdatePokemon(index, newPokemon, isBox);
        
        const oldName = getPokemonDisplayName(currentSpecie, langIndex);
        const newName = getPokemonDisplayName(evolvedSpecie, langIndex);
        toast.success(t('pokemon.evolved'), {
          description: `${oldName} → ${newName}`,
        });
      }
    }
  };

  // Handle remove with toast
  const handleRemovePokemon = (index: number, isBox: boolean) => {
    const pokemon = isBox ? saveData.box?.[index] : saveData.team?.[index];
    if (pokemon) {
      const name = getPokemonDisplayName(pokemon.specie, langIndex);
      onRemovePokemon(index, isBox);
      toast.info(t('pokemon.pokemonRemoved'), {
        description: name,
      });
    }
  };

  // Handle shiny toggle with toast
  const handleToggleShiny = (index: number, isBox: boolean) => {
    const pokemon = isBox ? saveData.box?.[index] : saveData.team?.[index];
    if (pokemon) {
      const name = getPokemonDisplayName(pokemon.specie, langIndex);
      onToggleShiny(index, isBox);
      toast.success(pokemon.shiny ? t('shiny.removeShiny') : t('shiny.makeShiny'), {
        description: name,
      });
    }
  };

  // Handle favorite toggle with toast
  const handleToggleFavorite = (index: number, isBox: boolean) => {
    const pokemon = isBox ? saveData.box?.[index] : saveData.team?.[index];
    if (pokemon) {
      const name = getPokemonDisplayName(pokemon.specie, langIndex);
      onToggleFavorite(index, isBox);
      toast.success(pokemon.favorite ? t('pokemon.unfavorited') : t('pokemon.favorited'), {
        description: name,
      });
    }
  };

  // Handle instant evolution to a specific form
  const handleEvolveTo = (index: number, newSpecie: PokemonSpecie, newLevel: number, isBox: boolean) => {
    const pokemon = isBox ? saveData.box?.[index] : saveData.team?.[index];
    if (pokemon) {
      const oldName = getPokemonDisplayName(pokemon.specie, langIndex);
      const newName = getPokemonDisplayName(newSpecie, langIndex);
      
      const newPokemon = {
        ...pokemon,
        lvl: Math.max(pokemon.lvl || 1, newLevel), // Set level to at least evolution level
        specie: newSpecie,
      };
      onUpdatePokemon(index, newPokemon, isBox);
      
      toast.success(t('pokemon.evolved'), {
        description: `${oldName} → ${newName}`,
      });
    }
  };

  const handleGiveAll = () => {
    setShowGiveAllConfirm(false);
    const count = onGiveAllPokemon(false, 100);
    if (count && count > 0) {
      toast.success(t('pokemon.pokemonGiven'), {
        description: `${count} Pokémon`,
      });
    } else {
      toast.info(t('pokemon.pokemonGiven'), {
        description: '0 Pokémon',
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <Swords className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t('pokemon.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('pokemon.description')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowGiveAllConfirm(true)}
            className="btn-gradient gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('pokemon.giveAll')}
          </Button>
          <Button
            onClick={onMaxAllLevels}
            variant="outline"
            className="border-white/10 hover:bg-white/5 gap-2"
          >
            <ArrowUp className="w-4 h-4" />
            {t('pokemon.allMaxLevel')}
          </Button>
        </div>
      </div>

      {/* Sub-tabs for My Pokemon / Give Pokemon */}
      <Tabs defaultValue="my-pokemon" className="space-y-4">
        <TabsList className="w-full h-auto flex-wrap gap-2 bg-black/20 p-1.5 rounded-lg border border-white/5">
          <TabsTrigger
            value="my-pokemon"
            className="flex-1 gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600"
          >
            <Users className="w-4 h-4" />
            {t('pokemon.myPokemonTab')}
          </TabsTrigger>
          <TabsTrigger
            value="give-pokemon"
            className="flex-1 gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600"
          >
            <Plus className="w-4 h-4" />
            {t('pokemon.givePokemonTab')}
          </TabsTrigger>
        </TabsList>

        {/* My Pokemon Tab */}
        <TabsContent value="my-pokemon" className="mt-0 space-y-4">
          {allPokemon.length === 0 ? (
            <div className="section-card p-10 text-center text-muted-foreground">
              {t('pokemon.noPokemon')}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {allPokemon.map(({ pokemon, index, isBox }) => (
                <PokemonCard
                  key={`${isBox ? 'box' : 'team'}-${index}`}
                  pokemon={pokemon}
                  index={index}
                  isBox={isBox}
                  langIndex={langIndex}
                  onUpdateLevel={(idx, lvl, box) => handleLevelChange(idx, lvl, box, pokemon)}
                  onRemove={handleRemovePokemon}
                  onUpdateTargetMode={onUpdateTargetMode}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleShiny={handleToggleShiny}
                  onEvolveTo={handleEvolveTo}
                  t={t}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Give Pokemon Tab */}
        <TabsContent value="give-pokemon" className="mt-0 space-y-4">
          {/* Search and Filter */}
          <div className="section-card p-4 space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('pokemon.searchPokemon')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/30 border-white/10"
              />
            </div>
            
            {/* Ability filter buttons */}
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground">{t('pokemon.filterByAbility')}:</span>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  size="sm"
                  variant={abilityFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setAbilityFilter('all')}
                  className={`h-7 text-xs ${abilityFilter === 'all' ? 'bg-primary' : 'border-white/10 hover:bg-white/5'}`}
                >
                  {t('pokemon.filterAll')}
                </Button>
                {uniqueAbilities.map(ability => (
                  <Button
                    key={ability}
                    size="sm"
                    variant={abilityFilter === ability ? 'default' : 'outline'}
                    onClick={() => setAbilityFilter(ability)}
                    className={`h-7 text-xs capitalize ${abilityFilter === ability ? 'bg-purple-600 hover:bg-purple-500' : 'border-white/10 hover:bg-white/5'}`}
                  >
                    {ability}
                  </Button>
                ))}
              </div>
            </div>

            {/* Options for adding */}
            <div className="flex items-center gap-6 flex-wrap pt-3 border-t border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{t('pokemon.level')}:</span>
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={addLevel}
                  onChange={(e) => setAddLevel(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  className="w-20 h-8 bg-black/50 border-white/10 text-center"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setAddLevel(100)}
                  className="h-8 text-xs text-green-400 hover:bg-green-500/10"
                >
                  MAX
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={addShiny}
                  onCheckedChange={setAddShiny}
                  className="data-[state=checked]:bg-yellow-500"
                />
                <span className="text-sm flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  Shiny
                </span>
              </div>
            </div>
          </div>

          {/* Available Pokemon Grid */}
          <div className="section-card p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              {t('pokemon.availablePokemon')} ({filteredAvailable.length})
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAvailable.map((specie) => (
                <GivePokemonCard
                  key={specie.id}
                  specie={specie}
                  langIndex={langIndex}
                  level={addLevel}
                  onAdd={handleOpenEvolutionModal}
                  t={t}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Evolution Modal */}
      {evolutionModal.pokemon && (
        <EvolutionModal
          isOpen={evolutionModal.isOpen}
          onClose={() => setEvolutionModal({ isOpen: false, pokemon: null })}
          basePokemon={evolutionModal.pokemon}
          langIndex={langIndex}
          level={addLevel}
          shiny={addShiny}
          onConfirm={handleAddPokemon}
        />
      )}

      {/* Give All Confirmation Modal */}
      <Dialog open={showGiveAllConfirm} onOpenChange={setShowGiveAllConfirm}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              {t('pokemon.giveAllConfirmTitle')}
            </DialogTitle>
            <DialogDescription>
              {t('pokemon.giveAllConfirmDesc')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowGiveAllConfirm(false)}
              className="border-white/10"
            >
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleGiveAll}
              className="btn-gradient"
            >
              {t('common.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Component for displaying owned Pokemon
interface PokemonCardProps {
  pokemon: TeamPokemon;
  index: number;
  isBox: boolean;
  langIndex: number;
  onUpdateLevel: (index: number, level: number, isBox: boolean) => void;
  onRemove: (index: number, isBox: boolean) => void;
  onUpdateTargetMode: (index: number, targetMode: TargetMode, isBox: boolean) => void;
  onToggleFavorite: (index: number, isBox: boolean) => void;
  onToggleShiny: (index: number, isBox: boolean) => void;
  onEvolveTo: (index: number, newSpecie: PokemonSpecie, newLevel: number, isBox: boolean) => void;
  t: (key: string) => string;
}

function PokemonCard({
  pokemon,
  index,
  isBox,
  langIndex,
  onUpdateLevel,
  onRemove,
  onUpdateTargetMode,
  onToggleFavorite,
  onToggleShiny,
  onEvolveTo,
  t,
}: PokemonCardProps) {
  const specie = pokemon.specie;
  const color = specie.color || '#666';
  
  // Get full evolution chain for this Pokemon
  const evolutionChain = useMemo(() => getFullEvolutionChain(specie), [specie]);
  
  // Find current position in evolution chain
  const currentIndex = evolutionChain.findIndex(e => e.specie.id === specie.id);
  
  // Get available evolutions (forms after current)
  const availableEvolutions = evolutionChain.slice(currentIndex + 1);

  return (
    <div
      className={`section-card p-4 card-hover relative ${
        pokemon.shiny ? 'ring-2 ring-yellow-500/50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ 
            background: `linear-gradient(135deg, ${color}40, ${color}20)`
          }}
        >
          {pokemon.shiny && <Sparkles className="w-5 h-5 text-yellow-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-lg truncate capitalize">
            {getPokemonDisplayName(specie, langIndex)}
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge
              variant="secondary"
              className="text-xs bg-white/5"
            >
              {isBox ? <Box className="w-3 h-3 mr-1" /> : <Users className="w-3 h-3 mr-1" />}
              {isBox ? t('pokemon.boxPokemon') : t('pokemon.teamPokemon')}
            </Badge>
            {specie.ability && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="text-xs bg-purple-500/20 text-purple-300 cursor-help">
                      {getAbilityName(specie.ability, langIndex)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{getAbilityDescription(specie.ability, langIndex)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onToggleFavorite(index, isBox)}
            className={`h-7 w-7 ${pokemon.favorite ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'}`}
          >
            <Heart className={`w-4 h-4 ${pokemon.favorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onToggleShiny(index, isBox)}
            className={`h-7 w-7 ${pokemon.shiny ? 'text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'}`}
          >
            <Sparkles className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove(index, isBox)}
            className="h-7 w-7 text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Level Control */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('pokemon.level')}</span>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              max={100}
              value={pokemon.lvl || 1}
              onChange={(e) => onUpdateLevel(index, parseInt(e.target.value) || 1, isBox)}
              className="w-20 h-7 bg-black/50 border-white/10 text-center text-sm font-bold"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onUpdateLevel(index, 100, isBox)}
              className="h-7 px-2 text-xs text-green-400 hover:bg-green-500/10"
            >
              MAX
            </Button>
          </div>
        </div>
        
        <Slider
          value={[pokemon.lvl || 1]}
          min={1}
          max={100}
          step={1}
          onValueChange={([value]) => onUpdateLevel(index, value, isBox)}
          className="py-1"
        />
      </div>

      {/* Evolution shortcuts */}
      {availableEvolutions.length > 0 && (
        <div className="pt-2 mb-2 border-t border-white/5">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <ArrowUp className="w-3 h-3" />
            {t('pokemon.evolveShortcuts')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {availableEvolutions.map((evo) => (
              <Button
                key={evo.specie.id}
                size="sm"
                variant="outline"
                onClick={() => onEvolveTo(index, evo.specie, evo.level, isBox)}
                className="h-7 text-xs border-white/10 hover:bg-primary/20 hover:border-primary/50 gap-1"
                style={{
                  background: `linear-gradient(135deg, ${evo.specie.color}10, transparent)`
                }}
              >
                <ArrowRight className="w-3 h-3" />
                <span className="capitalize">{getPokemonDisplayName(evo.specie, langIndex)}</span>
                <span className="text-[10px] text-muted-foreground">Lv.{evo.level}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Target Mode */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-xs text-muted-foreground">{t('pokemon.targetMode')}</span>
        <Select
          value={pokemon.targetMode || 'first'}
          onValueChange={(value) => onUpdateTargetMode(index, value as TargetMode, isBox)}
        >
          <SelectTrigger className="w-[130px] h-7 text-xs bg-black/30 border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TARGET_MODES.map(mode => (
              <SelectItem key={mode} value={mode} className="text-xs">
                {t(`targetModes.${mode}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Evolution info - only show if not already showing shortcuts */}
      {specie.evolution && availableEvolutions.length === 0 && (
        <div className="pt-2 mt-2 border-t border-white/5">
          <p className="text-xs text-muted-foreground">
            {t('pokemon.maxEvolution')} ✨
          </p>
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5 text-xs text-muted-foreground">
        {specie.power && (
          <span>⚔️ {specie.power.base}</span>
        )}
        {specie.speed && (
          <span>⚡ {specie.speed.base}</span>
        )}
        {specie.range && (
          <span>🎯 {specie.range.base}</span>
        )}
        {specie.attackType && (
          <Badge variant="outline" className="text-xs h-5 capitalize">
            {specie.attackType}
          </Badge>
        )}
      </div>
    </div>
  );
}

// Helper function to calculate stats at a given level
function calculateStat(base: number, scale: number, level: number): number {
  return Math.round(base + (scale * (level - 1)));
}

// Component for available Pokemon to add
interface GivePokemonCardProps {
  specie: PokemonSpecie;
  langIndex: number;
  level: number;
  onAdd: (specie: PokemonSpecie) => void;
  t: (key: string) => string;
}

function GivePokemonCard({
  specie,
  langIndex,
  level,
  onAdd,
  t,
}: GivePokemonCardProps) {
  const [showMax, setShowMax] = useState(false);
  const color = specie.color || '#666';
  
  // Calculate stats at current level or max level
  const displayLevel = showMax ? 100 : level;
  const power = specie.power ? calculateStat(specie.power.base, specie.power.scale, displayLevel) : 0;
  const speed = specie.speed ? calculateStat(specie.speed.base, specie.speed.scale, displayLevel) : 0;
  const range = specie.range ? calculateStat(specie.range.base, specie.range.scale, displayLevel) : 0;

  // Check if has evolutions
  const hasEvolutions = !!specie.evolution;

  return (
    <div className="section-card p-3 card-hover">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ 
            background: `linear-gradient(135deg, ${color}40, ${color}20)`
          }}
        >
          <span className="text-sm">🎮</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm truncate capitalize">
            {getPokemonDisplayName(specie, langIndex)}
          </p>
          {specie.ability && (
            <p className="text-xs text-purple-300 truncate">
              {getAbilityName(specie.ability, langIndex)}
            </p>
          )}
        </div>
        {/* Lvl 100 preview button */}
        <Button
          size="sm"
          variant={showMax ? 'default' : 'outline'}
          onClick={() => setShowMax(!showMax)}
          className={`h-6 px-1.5 text-[10px] shrink-0 ${showMax ? 'bg-green-600 hover:bg-green-500' : 'border-white/10 hover:bg-white/5'}`}
        >
          Lv.100
        </Button>
      </div>

      {/* Stats at current/max level */}
      <div className="flex items-center justify-between text-xs mb-2 px-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-1 text-red-400">
                <Swords className="w-3 h-3" />{power}
              </span>
            </TooltipTrigger>
            <TooltipContent><p>{t('pokemon.power')}</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-1 text-yellow-400">
                <Zap className="w-3 h-3" />{speed}
              </span>
            </TooltipTrigger>
            <TooltipContent><p>{t('pokemon.speed')}</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-1 text-blue-400">
                <Target className="w-3 h-3" />{range}
              </span>
            </TooltipTrigger>
            <TooltipContent><p>{t('pokemon.range')}</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge variant="outline" className="text-[10px] h-4 px-1">
          Lv.{displayLevel}
        </Badge>
      </div>

      {/* Single Add button that opens evolution modal */}
      <Button
        size="sm"
        onClick={() => onAdd(specie)}
        className="w-full h-8 text-xs bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 gap-1"
      >
        <Plus className="w-3 h-3" />
        {t('pokemon.addPokemon')}
        {hasEvolutions && <span className="text-[10px] opacity-70">+evo</span>}
      </Button>
    </div>
  );
}
