import { useTranslation } from 'react-i18next';
import { BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SaveData, PlayerStats } from '@/types/save';

interface StatsEditorProps {
  saveData: SaveData;
  onUpdateStat: (statKey: keyof PlayerStats, value: number) => void;
}

const statIcons: Record<string, string> = {
  defeatedEnemies: '⚔️',
  wavesCompleted: '🌊',
  totalGold: '💰',
  timePlayed: '⏱️',
  highestHit: '💥',
  resets: '🔄',
  pokemonOwned: '🎮',
  appliedBurns: '🔥',
  appliedPoisons: '☠️',
  appliedStuns: '⚡',
  appliedSlows: '🐢',
  appliedCurses: '👻',
};

export function StatsEditor({ saveData, onUpdateStat }: StatsEditorProps) {
  const { t } = useTranslation();
  const stats = saveData.player.stats;

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const statEntries: { key: keyof PlayerStats; label: string; value: number }[] = [
    { key: 'defeatedEnemies', label: t('stats.defeatedEnemies'), value: stats.defeatedEnemies },
    { key: 'wavesCompleted', label: t('stats.wavesCompleted'), value: stats.wavesCompleted },
    { key: 'totalGold', label: t('stats.totalGold'), value: stats.totalGold },
    { key: 'timePlayed', label: t('stats.timePlayed'), value: stats.timePlayed },
    { key: 'highestHit', label: t('stats.highestHit'), value: stats.highestHit },
    { key: 'resets', label: t('stats.resets'), value: stats.resets },
    { key: 'pokemonOwned', label: t('stats.pokemonOwned'), value: stats.pokemonOwned },
    { key: 'appliedBurns', label: t('stats.appliedBurns'), value: stats.appliedBurns },
    { key: 'appliedPoisons', label: t('stats.appliedPoisons'), value: stats.appliedPoisons },
    { key: 'appliedStuns', label: t('stats.appliedStuns'), value: stats.appliedStuns },
    { key: 'appliedSlows', label: t('stats.appliedSlows'), value: stats.appliedSlows },
    { key: 'appliedCurses', label: t('stats.appliedCurses'), value: stats.appliedCurses },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{t('stats.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('stats.description')}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statEntries.map(({ key, label, value }) => (
          <div key={key} className="section-card p-4 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{statIcons[key]}</span>
              <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
            </div>
            
            {key === 'timePlayed' ? (
              <div className="space-y-2">
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => onUpdateStat(key, parseInt(e.target.value) || 0)}
                  className="bg-black/50 border-white/10 font-mono input-glow"
                />
                <p className="text-xs text-muted-foreground">
                  {formatTime(value)}
                </p>
              </div>
            ) : (
              <Input
                type="number"
                value={value}
                onChange={(e) => onUpdateStat(key, parseInt(e.target.value) || 0)}
                className="bg-black/50 border-white/10 text-xl font-bold input-glow"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
