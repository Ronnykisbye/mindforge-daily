import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowRight, Home, Sparkles } from 'lucide-react';

interface CompletionScreenProps {
  day: number;
  onNextDay: () => void;
  onHome: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  day,
  onNextDay,
  onHome,
}) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 animate-fade-in">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary animate-scale-in">
            <Trophy className="w-16 h-16 text-primary-foreground" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-accent animate-pulse" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold animate-slide-up">
            {t('sessionComplete')}
          </h1>
          <p className="text-xl text-primary animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('greatWork')}
          </p>
          <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('dayCompleted', { day: day > 30 ? `M${day - 30}` : String(day) })}
          </p>
        </div>

        <div className="space-y-3 pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {day < 37 && (
            <Button
              variant="hero"
              className="w-full"
              onClick={onNextDay}
            >
              {t('nextDay')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
          
          <Button
            variant="outline"
            className="w-full"
            onClick={onHome}
          >
            <Home className="mr-2 w-5 h-5" />
            {t('backToHome')}
          </Button>
        </div>
      </div>
    </div>
  );
};
