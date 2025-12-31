import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useProgress } from '@/contexts/ProgressContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Settings as SettingsIcon, Moon, Sun, RotateCcw } from 'lucide-react';
import { languageFlags, Language } from '@/data/translations';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const languages: Language[] = ['da', 'en', 'de', 'lt'];

interface SettingsPanelProps {
  trigger?: React.ReactNode;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ trigger }) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { resetProgress, progress } = useProgress();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <SettingsIcon className="h-5 w-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('settings')}</SheetTitle>
          <SheetDescription>
            {t('progress')}: {progress.completedDays.length}/30 {t('daysCompleted')}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Theme toggle */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{t('theme')}</h3>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => theme === 'dark' && toggleTheme()}
              >
                <Sun className="w-4 h-4 mr-2" />
                {t('light')}
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => theme === 'light' && toggleTheme()}
              >
                <Moon className="w-4 h-4 mr-2" />
                {t('dark')}
              </Button>
            </div>
          </div>

          {/* Language selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{t('language')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? 'default' : 'outline'}
                  onClick={() => setLanguage(lang)}
                  className="justify-start"
                >
                  <span className="text-lg mr-2">{languageFlags[lang]}</span>
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Reset progress */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{t('resetProgress')}</h3>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t('resetProgress')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('resetProgress')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('resetConfirm')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={resetProgress}>
                    {t('confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
