import { useTranslation } from 'react-i18next';
import { Coins, Star, User, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { SaveData } from '@/types/save';

interface GeneralEditorProps {
  saveData: SaveData;
  onUpdateGold: (value: number) => void;
  onUpdatePlayerName: (name: string) => void;
  onUpdateTeamSlots: (slots: number) => void;
}

export function GeneralEditor({
  saveData,
  onUpdateGold,
  onUpdatePlayerName,
  onUpdateTeamSlots,
}: GeneralEditorProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
          <Coins className="w-6 h-6 text-yellow-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{t('general.title')}</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Gold */}
        <div className="section-card p-5 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Coins className="w-5 h-5 text-yellow-500" />
            </div>
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t('general.gold')}
            </Label>
          </div>
          <Input
            type="number"
            value={saveData.player.gold}
            onChange={(e) => onUpdateGold(parseInt(e.target.value) || 0)}
            className="bg-black/50 border-white/10 text-2xl font-bold h-14 input-glow"
          />
        </div>

        {/* Stars */}
        <div className="section-card p-5 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t('general.stars')}
            </Label>
            <Badge variant="secondary" className="text-xs bg-secondary/30">
              {t('general.starsCalculated')}
            </Badge>
          </div>
          <div className="bg-black/50 border border-white/10 rounded-lg h-14 flex items-center px-4">
            <span className="text-2xl font-bold text-yellow-400">{saveData.player.stars}</span>
            <span className="text-muted-foreground ml-2">/ 900</span>
          </div>
        </div>

        {/* Player Name */}
        <div className="section-card p-5 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t('general.playerName')}
            </Label>
          </div>
          <Input
            type="text"
            value={saveData.player.name}
            onChange={(e) => onUpdatePlayerName(e.target.value)}
            className="bg-black/50 border-white/10 text-lg font-medium h-14 input-glow"
          />
        </div>

        {/* Team Slots */}
        <div className="section-card p-5 card-hover">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t('general.teamSlots')}
            </Label>
          </div>
          <Input
            type="number"
            min={1}
            max={12}
            value={saveData.player.teamSlots}
            onChange={(e) => onUpdateTeamSlots(parseInt(e.target.value) || 1)}
            className="bg-black/50 border-white/10 text-2xl font-bold h-14 input-glow"
          />
        </div>
      </div>
    </div>
  );
}
