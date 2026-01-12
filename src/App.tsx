import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './components/LanguageToggle';
import { FileUploader } from './components/FileUploader';
import { SaveEditor } from './components/SaveEditor';
import { useSaveEditor } from './hooks/useSaveEditor';
import { Toaster } from '@/components/ui/sonner';
import { Coins, Map, Swords, Sparkles, Trophy, BarChart3, Gift, Target, Heart, ArrowUpCircle, Box, Languages } from 'lucide-react';
import './i18n';

function App() {
  const { t } = useTranslation();
  const editor = useSaveEditor();

  const features = [
    { icon: Coins, label: t('features.gold'), color: 'text-yellow-400' },
    { icon: Map, label: t('features.routes'), color: 'text-green-400' },
    { icon: Swords, label: t('features.pokemon'), color: 'text-blue-400' },
    { icon: ArrowUpCircle, label: t('features.levels'), color: 'text-cyan-400' },
    { icon: Gift, label: t('features.give'), color: 'text-pink-400' },
    { icon: Sparkles, label: t('features.shiny'), color: 'text-yellow-300' },
    { icon: Target, label: t('features.target'), color: 'text-orange-400' },
    { icon: Heart, label: t('features.favorite'), color: 'text-red-400' },
    { icon: Box, label: t('features.box'), color: 'text-purple-400' },
    { icon: Trophy, label: t('features.achievements'), color: 'text-amber-400' },
    { icon: BarChart3, label: t('features.stats'), color: 'text-indigo-400' },
    { icon: Languages, label: t('features.language'), color: 'text-sky-400' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-xl bg-black/20">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl">🎮</span>
              </div>
              <div>
                <h1 className="text-2xl font-black gradient-text tracking-tight">
                  {t('common.title')}
                </h1>
                <p className="text-xs text-muted-foreground">{t('common.subtitle')}</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-4 py-8 flex-1">
          {!editor.saveData ? (
            <div className="space-y-8">
              {/* File Uploader */}
              <div className="max-w-2xl mx-auto">
                <div className="glass rounded-3xl p-8 shadow-2xl">
                  <FileUploader
                    onLoadSave={editor.loadSave}
                    isLoading={editor.isLoading}
                    error={editor.error}
                  />
                </div>
              </div>

              {/* Features Section */}
              <div className="max-w-4xl mx-auto">
                <div className="glass rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-bold gradient-text text-center mb-6">
                    {t('features.title')}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/5"
                      >
                        <feature.icon className={`w-8 h-8 ${feature.color}`} />
                        <span className="text-sm text-center font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SEO Content Section */}
              <div className="max-w-4xl mx-auto">
                <div className="glass rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-xl font-bold gradient-text mb-4">
                    {t('seo.title')}
                  </h2>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>{t('seo.description')}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{t('seo.howToTitle')}</h3>
                        <ol className="list-decimal list-inside space-y-1 text-xs">
                          <li>{t('seo.step1')}</li>
                          <li>{t('seo.step2')}</li>
                          <li>{t('seo.step3')}</li>
                          <li>{t('seo.step4')}</li>
                        </ol>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{t('seo.whyTitle')}</h3>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>{t('seo.why1')}</li>
                          <li>{t('seo.why2')}</li>
                          <li>{t('seo.why3')}</li>
                          <li>{t('seo.why4')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <SaveEditor editor={editor} />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t('footer.madeWith')} ❤️ {t('footer.by')}{' '}
              <a 
                href="https://www.zyksa.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Zyksa
              </a>
            </p>
            <p className="text-xs text-muted-foreground/60">
              {t('footer.community')}
            </p>
          </div>
        </footer>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default App;
