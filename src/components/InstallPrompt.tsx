import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPrompt: React.FC = () => {
  const { t, language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay if not already installed
      const dismissed = localStorage.getItem('mindforge-install-dismissed');
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('mindforge-install-dismissed', 'true');
  };

  if (!showPrompt || !deferredPrompt || !language) return null;

  const installTexts: Record<string, { title: string; desc: string; button: string }> = {
    en: { title: 'Install MindForge 15', desc: 'Add to home screen for the best experience', button: 'Install' },
    da: { title: 'Installer MindForge 15', desc: 'Tilføj til startskærm for den bedste oplevelse', button: 'Installer' },
    de: { title: 'MindForge 15 installieren', desc: 'Zum Startbildschirm hinzufügen für beste Erfahrung', button: 'Installieren' },
    lt: { title: 'Įdiegti MindForge 15', desc: 'Pridėti prie pagrindinio ekrano geriausiai patirčiai', button: 'Įdiegti' },
  };

  const text = installTexts[language] || installTexts.en;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="max-w-md mx-auto p-4 rounded-2xl bg-card border border-border shadow-lg backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold">{text.title}</h3>
            <p className="text-sm text-muted-foreground">{text.desc}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0"
            onClick={handleDismiss}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="mt-4">
          <Button
            variant="default"
            className="w-full"
            onClick={handleInstall}
          >
            <Download className="w-4 h-4 mr-2" />
            {text.button}
          </Button>
        </div>
      </div>
    </div>
  );
};
