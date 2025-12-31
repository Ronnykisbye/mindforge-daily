import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import { mainProgram, maintenanceProgram } from '@/data/program';
import { Play, Pause, SkipForward, Check, Wind, Brain, Lightbulb, Heart } from 'lucide-react';

interface SessionViewProps {
  day: number;
  onComplete: () => void;
  onExit: () => void;
}

const stepIcons = {
  breathing: Wind,
  memory: Brain,
  recall: Lightbulb,
  reflection: Heart,
};

export const SessionView: React.FC<SessionViewProps> = ({ day, onComplete, onExit }) => {
  const { t } = useLanguage();
  const { completeDay } = useProgress();
  
  const program = day <= 30 ? mainProgram : maintenanceProgram;
  const dayData = program.find(d => d.day === day) || program[0];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(dayData.steps[0].durationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');

  const step = dayData.steps[currentStep];
  const Icon = stepIcons[step.type];

  const stepLabels = {
    breathing: t('calmBreathing'),
    memory: t('workingMemory'),
    recall: t('activeRecall'),
    reflection: t('reflection'),
  };

  const stepDescs = {
    breathing: t('calmBreathingDesc'),
    memory: t('workingMemoryDesc'),
    recall: t('activeRecallDesc'),
    reflection: t('reflectionDesc'),
  };

  // Timer
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Breathing animation
  useEffect(() => {
    if (step.type !== 'breathing' || isPaused) return;

    const phases: Array<'in' | 'hold' | 'out'> = ['in', 'hold', 'out'];
    const durations = [4000, 4000, 4000]; // 4s each phase
    let phaseIndex = 0;

    const runPhase = () => {
      setBreathPhase(phases[phaseIndex]);
      phaseIndex = (phaseIndex + 1) % 3;
    };

    runPhase();
    const interval = setInterval(runPhase, durations[0]);

    return () => clearInterval(interval);
  }, [step.type, isPaused]);

  const handleNext = useCallback(() => {
    if (currentStep < dayData.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(dayData.steps[currentStep + 1].durationMinutes * 60);
      setIsPaused(false);
    } else {
      completeDay(day);
      onComplete();
    }
  }, [currentStep, dayData.steps, day, completeDay, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((dayData.steps[currentStep].durationMinutes * 60 - timeRemaining) / 
    (dayData.steps[currentStep].durationMinutes * 60)) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 pb-8 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>{t('day')} {day > 30 ? `M${day - 30}` : day}</span>
          <span>·</span>
          <span>{t('step')} {currentStep + 1} {t('of')} {dayData.steps.length}</span>
        </div>

        {/* Step header */}
        <div className="text-center space-y-4">
          <div className="relative inline-flex items-center justify-center">
            <div className={`
              w-32 h-32 rounded-full flex items-center justify-center
              ${step.type === 'breathing' ? 'animate-breathe' : ''}
              bg-gradient-to-br from-primary/20 to-accent/20
            `}>
              <Icon className="w-16 h-16 text-primary" />
            </div>
            {/* Progress ring */}
            <svg className="absolute inset-0 w-32 h-32 -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-border"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold">{stepLabels[step.type]}</h2>
          <p className="text-muted-foreground">{stepDescs[step.type]}</p>
        </div>

        {/* Breathing guidance */}
        {step.type === 'breathing' && (
          <div className="text-center">
            <p className="text-3xl font-bold text-primary animate-pulse-glow inline-block px-8 py-4 rounded-2xl bg-primary/10">
              {breathPhase === 'in' && t('breatheIn')}
              {breathPhase === 'hold' && t('hold')}
              {breathPhase === 'out' && t('breatheOut')}
            </p>
          </div>
        )}

        {/* Memory exercise placeholder */}
        {(step.type === 'memory' || step.type === 'recall') && (
          <MemoryExercise 
            type={step.type} 
            difficulty={step.difficulty || 1}
            isPaused={isPaused}
          />
        )}

        {/* Reflection */}
        {step.type === 'reflection' && (
          <div className="text-center p-6 rounded-2xl bg-card border border-border">
            <p className="text-lg text-muted-foreground italic">
              Take a moment to reflect on today's practice. Notice how your mind feels.
            </p>
          </div>
        )}

        {/* Timer */}
        <div className="text-center">
          <p className="text-5xl font-mono font-bold tracking-wider">
            {formatTime(timeRemaining)}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="glass"
            size="lg"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <>
                <Play className="w-5 h-5 mr-2" />
                {t('resume')}
              </>
            ) : (
              <>
                <Pause className="w-5 h-5 mr-2" />
                {t('pause')}
              </>
            )}
          </Button>

          <Button
            variant="default"
            size="lg"
            onClick={handleNext}
          >
            {currentStep < dayData.steps.length - 1 ? (
              <>
                {t('next')}
                <SkipForward className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                {t('complete')}
                <Check className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2">
          {dayData.steps.map((_, index) => (
            <div
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index < currentStep
                  ? 'bg-primary'
                  : index === currentStep
                    ? 'bg-primary glow-primary'
                    : 'bg-border'
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple memory exercise component
interface MemoryExerciseProps {
  type: 'memory' | 'recall';
  difficulty: number;
  isPaused: boolean;
}

const MemoryExercise: React.FC<MemoryExerciseProps> = ({ type, difficulty, isPaused }) => {
  const { t } = useLanguage();
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [phase, setPhase] = useState<'show' | 'input' | 'result'>('show');
  const [showIndex, setShowIndex] = useState(0);

  const length = 3 + difficulty;

  useEffect(() => {
    // Generate random sequence
    const newSequence = Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
    setSequence(newSequence);
    setUserInput([]);
    setPhase('show');
    setShowIndex(0);
  }, [difficulty]);

  useEffect(() => {
    if (phase !== 'show' || isPaused) return;

    if (showIndex < sequence.length) {
      const timer = setTimeout(() => {
        setShowIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('input');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase, showIndex, sequence.length, isPaused]);

  const handleInput = (num: number) => {
    if (phase !== 'input') return;
    
    const newInput = [...userInput, num];
    setUserInput(newInput);

    if (newInput.length === sequence.length) {
      setPhase('result');
      setTimeout(() => {
        setSequence(Array.from({ length }, () => Math.floor(Math.random() * 9) + 1));
        setUserInput([]);
        setPhase('show');
        setShowIndex(0);
      }, 2000);
    }
  };

  const isCorrect = phase === 'result' && 
    userInput.length === sequence.length && 
    userInput.every((num, i) => num === sequence[i]);

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground">
        {phase === 'show' ? t('rememberSequence') : 
         phase === 'input' ? t('recallSequence') :
         isCorrect ? t('correct') : t('tryAgain')}
      </p>

      {phase === 'show' && (
        <div className="flex justify-center gap-3">
          {sequence.map((num, i) => (
            <div
              key={i}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold
                transition-all duration-300
                ${i < showIndex
                  ? 'bg-primary text-primary-foreground scale-100'
                  : 'bg-card border border-border scale-90 opacity-50'
                }
              `}
            >
              {i < showIndex ? num : '?'}
            </div>
          ))}
        </div>
      )}

      {phase === 'input' && (
        <>
          <div className="flex justify-center gap-3">
            {sequence.map((_, i) => (
              <div
                key={i}
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold
                  ${i < userInput.length
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                  }
                `}
              >
                {userInput[i] || '?'}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                variant="glass"
                className="h-14 text-xl font-bold"
                onClick={() => handleInput(num)}
              >
                {num}
              </Button>
            ))}
          </div>
        </>
      )}

      {phase === 'result' && (
        <div className={`
          text-center p-6 rounded-2xl
          ${isCorrect ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}
        `}>
          <p className="text-2xl font-bold">
            {isCorrect ? '✓' : '✗'}
          </p>
        </div>
      )}
    </div>
  );
};
