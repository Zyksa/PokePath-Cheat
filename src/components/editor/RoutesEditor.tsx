import { useTranslation } from 'react-i18next';
import { Map, Star, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { SaveData } from '@/types/save';

interface RoutesEditorProps {
  saveData: SaveData;
  onUpdateRouteWaves: (routeIndex: number, waves: number) => void;
  onMaxAllRoutes: () => void;
  onResetAllRoutes: () => void;
}

export function RoutesEditor({
  saveData,
  onUpdateRouteWaves,
  onMaxAllRoutes,
  onResetAllRoutes,
}: RoutesEditorProps) {
  const { t } = useTranslation();
  const totalStars = saveData.player.records.reduce((sum, waves) => sum + waves, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <Map className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t('routes.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('routes.description')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={onMaxAllRoutes}
            className="btn-gradient gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {t('routes.maxAll')} (900 Stars)
          </Button>
          <Button
            onClick={onResetAllRoutes}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t('routes.resetAll')}
          </Button>
        </div>
      </div>

      {/* Total Stars Progress */}
      <div className="section-card p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground font-medium">{t('routes.totalStars')}</span>
          <Badge className="bg-yellow-500/20 text-yellow-400 font-bold text-lg px-4 py-1">
            <Star className="w-4 h-4 mr-2 fill-yellow-400" />
            {totalStars} / 900
          </Badge>
        </div>
        <div className="h-3 bg-black/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 transition-all duration-500"
            style={{ width: `${(totalStars / 900) * 100}%` }}
          />
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {saveData.player.records.map((waves, index) => (
          <div
            key={index}
            className="section-card p-4 card-hover group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg">{t('routes.route')} {index + 1}</span>
              <Badge
                variant={waves >= 100 ? 'default' : 'secondary'}
                className={waves >= 100 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-muted-foreground'}
              >
                <Star className={`w-3 h-3 mr-1 ${waves >= 100 ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                {waves}/100
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Input
                type="number"
                min={0}
                max={100}
                value={waves}
                onChange={(e) => onUpdateRouteWaves(index, parseInt(e.target.value) || 0)}
                className="bg-black/50 border-white/10 text-center font-bold input-glow"
              />
              <Button
                size="sm"
                onClick={() => onUpdateRouteWaves(index, 100)}
                className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
              >
                MAX
              </Button>
            </div>
            
            {/* Mini progress bar */}
            <div className="h-1.5 bg-black/50 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${waves}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
