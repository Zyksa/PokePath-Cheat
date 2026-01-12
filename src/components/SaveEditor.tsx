import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, RotateCcw, Settings, Map, Swords, Sparkles, Trophy, BarChart3, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralEditor } from './editor/GeneralEditor';
import { RoutesEditor } from './editor/RoutesEditor';
import { PokemonEditor } from './editor/PokemonEditor';
import { ShinyEditor } from './editor/ShinyEditor';
import { AchievementsEditor } from './editor/AchievementsEditor';
import { StatsEditor } from './editor/StatsEditor';
import { downloadSaveFile } from '@/utils/saveUtils';
import type { useSaveEditor } from '@/hooks/useSaveEditor';

type SaveEditorReturn = ReturnType<typeof useSaveEditor>;

interface SaveEditorProps {
  editor: SaveEditorReturn;
}

export function SaveEditor({ editor }: SaveEditorProps) {
  const { t } = useTranslation();
  const { saveData } = editor;
  const [copied, setCopied] = useState(false);

  if (!saveData) return null;

  const handleDownload = () => {
    const encoded = editor.getEncodedSave();
    if (encoded) {
      downloadSaveFile(encoded, 'pokepath_modified_save.txt');
    }
  };

  const handleCopy = async () => {
    const encoded = editor.getEncodedSave();
    if (encoded) {
      try {
        await navigator.clipboard.writeText(encoded);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 section-card">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Editing save for: <span className="font-bold text-foreground">{saveData.player.name}</span>
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={editor.resetChanges}
            variant="outline"
            className="border-white/10 hover:bg-white/5 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t('common.resetButton')}
          </Button>
          <Button
            onClick={handleCopy}
            variant="outline"
            className={`border-white/10 gap-2 transition-colors ${
              copied ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'hover:bg-white/5'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? t('common.copied') : t('common.copyButton')}
          </Button>
          <Button
            onClick={handleDownload}
            className="btn-gradient gap-2"
          >
            <Download className="w-4 h-4" />
            {t('common.downloadButton')}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="w-full h-auto flex-wrap gap-2 bg-black/30 p-2 rounded-xl border border-white/5">
          <TabsTrigger
            value="general"
            className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            <Settings className="w-4 h-4" />
            {t('tabs.general')}
          </TabsTrigger>
          <TabsTrigger
            value="routes"
            className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            <Map className="w-4 h-4" />
            {t('tabs.routes')}
          </TabsTrigger>
          <TabsTrigger
            value="pokemon"
            className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            <Swords className="w-4 h-4" />
            {t('tabs.pokemon')}
          </TabsTrigger>
          <TabsTrigger
            value="shiny"
            className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            <Sparkles className="w-4 h-4" />
            {t('tabs.shiny')}
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            <Trophy className="w-4 h-4" />
            {t('tabs.achievements')}
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="flex-1 min-w-[120px] gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            <BarChart3 className="w-4 h-4" />
            {t('tabs.stats')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0">
          <GeneralEditor
            saveData={saveData}
            onUpdateGold={editor.updateGold}
            onUpdatePlayerName={editor.updatePlayerName}
            onUpdateTeamSlots={editor.updateTeamSlots}
          />
        </TabsContent>

        <TabsContent value="routes" className="mt-0">
          <RoutesEditor
            saveData={saveData}
            onUpdateRouteWaves={editor.updateRouteWaves}
            onMaxAllRoutes={editor.maxAllRoutes}
            onResetAllRoutes={editor.resetAllRoutes}
          />
        </TabsContent>

        <TabsContent value="pokemon" className="mt-0">
          <PokemonEditor
            saveData={saveData}
            onUpdatePokemon={editor.updatePokemon}
            onUpdateLevel={editor.updatePokemonLevel}
            onMaxAllLevels={editor.maxAllLevels}
            onAddPokemon={editor.addPokemon}
            onRemovePokemon={editor.removePokemon}
            onUpdateTargetMode={editor.updatePokemonTargetMode}
            onToggleFavorite={editor.togglePokemonFavorite}
            onToggleShiny={editor.togglePokemonShiny}
          />
        </TabsContent>

        <TabsContent value="shiny" className="mt-0">
          <ShinyEditor
            saveData={saveData}
            onToggleShiny={editor.togglePokemonShiny}
            onSetAllShiny={editor.setAllShiny}
          />
        </TabsContent>

        <TabsContent value="achievements" className="mt-0">
          <AchievementsEditor
            saveData={saveData}
            onToggleAchievement={editor.toggleAchievement}
            onSetAllAchievements={editor.setAllAchievements}
          />
        </TabsContent>

        <TabsContent value="stats" className="mt-0">
          <StatsEditor
            saveData={saveData}
            onUpdateStat={editor.updateStat}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
