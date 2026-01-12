import { useTranslation } from 'react-i18next';
import { Trophy, Unlock, Lock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { SaveData } from '@/types/save';

interface AchievementsEditorProps {
  saveData: SaveData;
  onToggleAchievement: (index: number) => void;
  onSetAllAchievements: (unlocked: boolean) => void;
}

export function AchievementsEditor({
  saveData,
  onToggleAchievement,
  onSetAllAchievements,
}: AchievementsEditorProps) {
  const { t, i18n } = useTranslation();
  
  const langIndex = i18n.language === 'fr' ? 2 : 0;
  const achievements = saveData.player.achievements;
  const unlockedCount = achievements.filter(a => a.status).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t('achievements.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('achievements.description')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => onSetAllAchievements(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold gap-2 hover:from-amber-400 hover:to-orange-400"
          >
            <Unlock className="w-4 h-4" />
            {t('achievements.unlockAll')}
          </Button>
          <Button
            onClick={() => onSetAllAchievements(false)}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 gap-2"
          >
            <Lock className="w-4 h-4" />
            {t('achievements.lockAll')}
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="section-card p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground font-medium">Progress</span>
          <Badge className="bg-amber-500/20 text-amber-400 font-bold text-lg px-4 py-1">
            <Trophy className="w-4 h-4 mr-2" />
            {unlockedCount} / {achievements.length}
          </Badge>
        </div>
        <div className="h-3 bg-black/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement, index) => (
          <button
            key={index}
            onClick={() => onToggleAchievement(index)}
            className={`section-card p-4 card-hover text-left transition-all ${
              achievement.status 
                ? 'ring-2 ring-amber-500/50 bg-gradient-to-br from-amber-500/10 to-orange-500/10' 
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  achievement.status
                    ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30'
                    : 'bg-white/5'
                }`}
              >
                {achievement.status ? (
                  <Check className="w-5 h-5 text-amber-400" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed">
                  {achievement.description[langIndex] || achievement.description[0]}
                </p>
                <Badge
                  variant={achievement.status ? 'default' : 'secondary'}
                  className={`mt-2 text-xs ${
                    achievement.status 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-white/5 text-muted-foreground'
                  }`}
                >
                  {achievement.status ? t('achievements.unlocked') : t('achievements.locked')}
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
