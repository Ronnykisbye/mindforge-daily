import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ProgressProvider, useProgress } from '@/contexts/ProgressContext';
import { Header } from '@/components/Header';
import { LanguageSelector } from '@/components/LanguageSelector';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { DaySelector } from '@/components/DaySelector';
import { SessionOverview } from '@/components/SessionOverview';
import { SessionView } from '@/components/SessionView';
import { CompletionScreen } from '@/components/CompletionScreen';
import { InstallPrompt } from '@/components/InstallPrompt';

type AppState = 
  | 'language'
  | 'welcome'
  | 'daySelect'
  | 'overview'
  | 'session'
  | 'complete';

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const { progress, setCurrentDay } = useProgress();
  const [appState, setAppState] = useState<AppState>('language');
  const [selectedDay, setSelectedDay] = useState(1);

  // Show language selector if no language is set
  React.useEffect(() => {
    if (language) {
      setAppState('welcome');
    }
  }, [language]);

  const handleWelcomeContinue = () => {
    setAppState('daySelect');
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setCurrentDay(day);
    setAppState('overview');
  };

  const handleStartSession = () => {
    setAppState('session');
  };

  const handleSessionComplete = () => {
    setAppState('complete');
  };

  const handleNextDay = () => {
    const nextDay = Math.min(selectedDay + 1, 37);
    setSelectedDay(nextDay);
    setCurrentDay(nextDay);
    setAppState('overview');
  };

  const handleGoHome = () => {
    setAppState('welcome');
  };

  const handleChooseAnother = () => {
    setAppState('daySelect');
  };

  return (
    <div className="min-h-screen bg-background">
      {language && <Header />}
      <InstallPrompt />
      
      {!language && <LanguageSelector />}
      
      {language && appState === 'welcome' && (
        <WelcomeScreen onContinue={handleWelcomeContinue} />
      )}
      
      {language && appState === 'daySelect' && (
        <DaySelector onDaySelect={handleDaySelect} />
      )}
      
      {language && appState === 'overview' && (
        <SessionOverview
          day={selectedDay}
          onStart={handleStartSession}
          onChooseAnother={handleChooseAnother}
        />
      )}
      
      {language && appState === 'session' && (
        <SessionView
          day={selectedDay}
          onComplete={handleSessionComplete}
          onExit={handleGoHome}
        />
      )}
      
      {language && appState === 'complete' && (
        <CompletionScreen
          day={selectedDay}
          onNextDay={handleNextDay}
          onHome={handleGoHome}
        />
      )}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
