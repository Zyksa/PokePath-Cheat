import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, X, Box, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { SaveData, TeamPokemon } from '@/types/save';
import { getPokemonDisplayName, getAbilityName, getAbilityDescription } from '@/types/save';

interface ShinyEditorProps {
  saveData: SaveData;
  onToggleShiny: (index: number, isBox: boolean) => void;
  onSetAllShiny: (shiny: boolean) => void;
}

export function ShinyEditor({
  saveData,
  onToggleShiny,
  onSetAllShiny,
}: ShinyEditorProps) {
  const { t, i18n } = useTranslation();
  
  const langIndex = i18n.language === 'fr' ? 2 : 0;
  
  const teamPokemon: { pokemon: TeamPokemon; index: number }[] = useMemo(() => 
    (saveData.team || []).map((p, i) => ({ pokemon: p, index: i })),
    [saveData.team]
  );
  
  const boxPokemon: { pokemon: TeamPokemon; index: number }[] = useMemo(() =>
    (saveData.box || []).map((p, i) => ({ pokemon: p, index: i })),
    [saveData.box]
  );
  
  const totalCount = teamPokemon.length + boxPokemon.length;
  const shinyCount = 
    teamPokemon.filter(p => p.pokemon.shiny).length + 
    boxPokemon.filter(p => p.pokemon.shiny).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t('shiny.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('shiny.description')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => onSetAllShiny(true)}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold gap-2 hover:from-yellow-400 hover:to-amber-400"
          >
            <Sparkles className="w-4 h-4" />
            {t('shiny.shinyAll')}
          </Button>
          <Button
            onClick={() => onSetAllShiny(false)}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 gap-2"
          >
            <X className="w-4 h-4" />
            {t('shiny.unshinyAll')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="section-card p-5 flex items-center justify-center gap-8">
        <div className="text-center">
          <span className="text-muted-foreground text-sm">{t('shiny.shinyCount')}:</span>
          <span className="ml-2 text-2xl font-bold text-yellow-400">{shinyCount}</span>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="text-center">
          <span className="text-muted-foreground text-sm">{t('shiny.totalCount')}:</span>
          <span className="ml-2 text-2xl font-bold">{totalCount}</span>
        </div>
      </div>

      {/* Pokemon Grids */}
      {totalCount === 0 ? (
        <div className="section-card p-10 text-center text-muted-foreground">
          {t('shiny.noTeam')}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Team Section */}
          {teamPokemon.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="w-4 h-4" />
                {t('shiny.teamSection')} ({teamPokemon.filter(p => p.pokemon.shiny).length}/{teamPokemon.length})
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {teamPokemon.map(({ pokemon, index }) => (
                  <ShinyPokemonCard
                    key={`team-${index}`}
                    pokemon={pokemon}
                    index={index}
                    isBox={false}
                    langIndex={langIndex}
                    onToggleShiny={onToggleShiny}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Box Section */}
          {boxPokemon.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Box className="w-4 h-4" />
                {t('shiny.boxSection')} ({boxPokemon.filter(p => p.pokemon.shiny).length}/{boxPokemon.length})
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {boxPokemon.map(({ pokemon, index }) => (
                  <ShinyPokemonCard
                    key={`box-${index}`}
                    pokemon={pokemon}
                    index={index}
                    isBox={true}
                    langIndex={langIndex}
                    onToggleShiny={onToggleShiny}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ShinyPokemonCardProps {
  pokemon: TeamPokemon;
  index: number;
  isBox: boolean;
  langIndex: number;
  onToggleShiny: (index: number, isBox: boolean) => void;
}

function ShinyPokemonCard({
  pokemon,
  index,
  isBox,
  langIndex,
  onToggleShiny,
}: ShinyPokemonCardProps) {
  const specie = pokemon.specie;
  const color = specie.color || '#666';
  
  return (
    <div
      className={`section-card p-4 card-hover flex items-center justify-between gap-3 ${
        pokemon.shiny ? 'ring-2 ring-yellow-500/50' : ''
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            pokemon.shiny
              ? 'bg-gradient-to-br from-yellow-500/30 to-amber-500/30'
              : ''
          }`}
          style={{ backgroundColor: !pokemon.shiny ? `${color}30` : undefined }}
        >
          {pokemon.shiny && <Sparkles className="w-5 h-5 text-yellow-400" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium truncate capitalize">
            {getPokemonDisplayName(specie, langIndex)}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              Lv.{pokemon.lvl || 1}
            </span>
            {specie.ability && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="text-xs bg-purple-500/20 text-purple-300 cursor-help h-5">
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
      </div>
      
      <Switch
        checked={pokemon.shiny || false}
        onCheckedChange={() => onToggleShiny(index, isBox)}
        className="data-[state=checked]:bg-yellow-500"
      />
    </div>
  );
}
