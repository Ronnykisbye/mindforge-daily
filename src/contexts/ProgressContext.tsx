import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressState {
  currentDay: number;
  completedDays: number[];
  lastSessionDate: string | null;
  streak: number;
}

interface ProgressContextType {
  progress: ProgressState;
  setCurrentDay: (day: number) => void;
  completeDay: (day: number) => void;
  resetProgress: () => void;
  isMaintenanceMode: boolean;
}

const defaultProgress: ProgressState = {
  currentDay: 1,
  completedDays: [],
  lastSessionDate: null,
  streak: 0,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress);

  useEffect(() => {
    const stored = localStorage.getItem('mindforge-progress');
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch {
        setProgress(defaultProgress);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mindforge-progress', JSON.stringify(progress));
  }, [progress]);

  const setCurrentDay = (day: number) => {
    setProgress(prev => ({ ...prev, currentDay: day }));
  };

  const completeDay = (day: number) => {
    const today = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      const newCompletedDays = prev.completedDays.includes(day)
        ? prev.completedDays
        : [...prev.completedDays, day];
      
      // Calculate streak
      let newStreak = prev.streak;
      if (prev.lastSessionDate) {
        const lastDate = new Date(prev.lastSessionDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          newStreak = prev.streak + 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      return {
        ...prev,
        completedDays: newCompletedDays,
        lastSessionDate: today,
        streak: newStreak,
        currentDay: Math.min(day + 1, 37), // 30 main + 7 maintenance
      };
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem('mindforge-progress');
  };

  const isMaintenanceMode = progress.completedDays.length >= 30;

  return (
    <ProgressContext.Provider value={{ progress, setCurrentDay, completeDay, resetProgress, isMaintenanceMode }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
