import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  const { t } = useLanguage();
  const { progress, isMaintenanceMode } = useProgress();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 animate-fade-in">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-6 animate-breathe">
            <span className="text-5xl">🧠</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight animate-slide-up">
            {t('welcomeTitle')}
          </h1>
          
          <p className="text-xl text-primary font-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('welcomeSubtitle')}
          </p>
        </div>

        <p className="text-muted-foreground leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {t('welcomeDescription')}
        </p>

        {progress.completedDays.length > 0 && (
          <div className="flex items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-bold text-primary">{progress.completedDays.length}</p>
              <p className="text-xs text-muted-foreground">{t('daysCompleted')}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-bold text-accent">{progress.streak}</p>
              <p className="text-xs text-muted-foreground">{t('currentStreak')}</p>
            </div>
          </div>
        )}

        {isMaintenanceMode && (
          <div className="flex items-center justify-center gap-2 text-accent animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">{t('maintenanceMode')}</span>
          </div>
        )}

        <Button
          variant="hero"
          className="w-full animate-slide-up"
          style={{ animationDelay: '0.4s' }}
          onClick={onContinue}
        >
          {t('getStarted')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
