import React from 'react';
import { Language, languageFlags, languageNames } from '@/data/translations';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const languages: Language[] = ['da', 'en', 'de', 'lt'];

export const LanguageSelector: React.FC = () => {
  const { setLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <span className="text-4xl">🧠</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">MindForge 15</h1>
          <p className="text-muted-foreground">Select Your Language</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {languages.map((lang) => (
            <Button
              key={lang}
              variant="flag"
              className="flex flex-col items-center gap-2 h-auto py-6"
              onClick={() => setLanguage(lang)}
            >
              <span className="text-5xl">{languageFlags[lang]}</span>
              <span className="text-sm font-medium text-muted-foreground">{languageNames[lang]}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
