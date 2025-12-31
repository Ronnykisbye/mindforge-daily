import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface DaySelectorProps {
  onDaySelect: (day: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ onDaySelect }) => {
  const { t } = useLanguage();
  const { progress, isMaintenanceMode } = useProgress();
  const [selectedDay, setSelectedDay] = useState(progress.currentDay);

  const maxDays = isMaintenanceMode ? 37 : 30;

  const handlePrevious = () => {
    setSelectedDay(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setSelectedDay(prev => Math.min(maxDays, prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">{t('whichDay')}</h2>
          <p className="text-muted-foreground">{t('dayRange')}</p>
        </div>

        <div className="flex items-center justify-center gap-6">
          <Button
            variant="glass"
            size="icon"
            onClick={handlePrevious}
            disabled={selectedDay <= 1}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center glow-primary">
              <span className="text-5xl font-bold">{selectedDay}</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card px-3 py-1 rounded-full border border-border">
              <span className="text-sm text-muted-foreground">{t('day')}</span>
            </div>
          </div>

          <Button
            variant="glass"
            size="icon"
            onClick={handleNext}
            disabled={selectedDay >= maxDays}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: Math.min(30, maxDays) }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`
                relative aspect-square rounded-lg text-sm font-medium transition-all duration-200
                ${selectedDay === day
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : progress.completedDays.includes(day)
                    ? 'bg-primary/20 text-primary'
                    : 'bg-card border border-border hover:border-primary/50'
                }
              `}
            >
              {day}
              {progress.completedDays.includes(day) && (
                <Check className="absolute -top-1 -right-1 w-3 h-3 text-primary" />
              )}
            </button>
          ))}
        </div>

        {isMaintenanceMode && (
          <div className="pt-4">
            <p className="text-sm text-muted-foreground text-center mb-2">{t('maintenanceMode')}</p>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }, (_, i) => i + 31).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    aspect-square rounded-lg text-sm font-medium transition-all duration-200
                    ${selectedDay === day
                      ? 'bg-accent text-accent-foreground glow-accent'
                      : progress.completedDays.includes(day)
                        ? 'bg-accent/20 text-accent'
                        : 'bg-card border border-border hover:border-accent/50'
                    }
                  `}
                >
                  {day - 30}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="hero"
          className="w-full"
          onClick={() => onDaySelect(selectedDay)}
        >
          {t('continue')}
        </Button>
      </div>
    </div>
  );
};
