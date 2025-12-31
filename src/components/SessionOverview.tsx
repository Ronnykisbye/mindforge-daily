import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { mainProgram, maintenanceProgram, dayFocuses } from '@/data/program';
import { Play, Calendar, Clock, Wind, Brain, Lightbulb, Heart } from 'lucide-react';

interface SessionOverviewProps {
  day: number;
  onStart: () => void;
  onChooseAnother: () => void;
}

const stepIcons = {
  breathing: Wind,
  memory: Brain,
  recall: Lightbulb,
  reflection: Heart,
};

export const SessionOverview: React.FC<SessionOverviewProps> = ({
  day,
  onStart,
  onChooseAnother,
}) => {
  const { t, language } = useLanguage();
  
  const program = day <= 30 ? mainProgram : maintenanceProgram;
  const dayData = program.find(d => d.day === day) || program[0];
  const focus = language && dayFocuses[language]?.[dayData.focusKey] || dayFocuses.en[dayData.focusKey];

  const stepLabels = {
    breathing: t('calmBreathing'),
    memory: t('workingMemory'),
    recall: t('activeRecall'),
    reflection: t('reflection'),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 pb-8 animate-fade-in">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{t('day')} {day > 30 ? `M${day - 30}` : day}</span>
          </div>
          
          <h2 className="text-3xl font-bold">{t('todaysFocus')}</h2>
          <p className="text-xl text-primary font-medium">{focus}</p>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{t('totalTime')}</span>
          </div>
        </div>

        <div className="space-y-3">
          {dayData.steps.map((step, index) => {
            const Icon = stepIcons[step.type];
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{stepLabels[step.type]}</p>
                  <p className="text-sm text-muted-foreground">
                    {step.durationMinutes} {t('minutes')}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3 pt-4">
          <Button
            variant="hero"
            className="w-full"
            onClick={onStart}
          >
            <Play className="w-5 h-5 mr-2" />
            {t('startSession')}
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={onChooseAnother}
          >
            {t('chooseAnotherDay')}
          </Button>
        </div>
      </div>
    </div>
  );
};
