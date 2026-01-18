/* =========================================================
   AFSNIT 01 – Imports
   ========================================================= */

import React, { useEffect, useMemo, useState } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProgressProvider, useProgress } from "@/contexts/ProgressContext";
import { Header } from "@/components/Header";
import { LanguageSelector } from "@/components/LanguageSelector";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { DaySelector } from "@/components/DaySelector";
import { SessionOverview } from "@/components/SessionOverview";
import { SessionView } from "@/components/SessionView";
import { CompletionScreen } from "@/components/CompletionScreen";

/* =========================================================
   AFSNIT 02 – Typer
   ========================================================= */

type AppState = "language" | "welcome" | "daySelect" | "overview" | "session" | "complete";

/* =========================================================
   AFSNIT 03 – Install popup helpers (device-detektion)
   ========================================================= */

function isStandaloneMode(): boolean {
  // iOS Safari bruger navigator.standalone
  // Android/Chrome bruger display-mode: standalone
  const nav = window.navigator as unknown as { standalone?: boolean };
  const iosStandalone = Boolean(nav?.standalone);
  const displayModeStandalone = window.matchMedia?.("(display-mode: standalone)")?.matches ?? false;
  return iosStandalone || displayModeStandalone;
}

function detectDevice() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isEdge = /Edg/i.test(ua);
  const isChrome = /Chrome/i.test(ua) && !isEdge;
  const isSafari = /Safari/i.test(ua) && !/Chrome|Chromium|Edg/i.test(ua);
  const isMobile = isIOS || isAndroid;
  return { isIOS, isAndroid, isEdge, isChrome, isSafari, isMobile };
}

/* =========================================================
   AFSNIT 04 – Install popup (UI + logik)
   - Vises første gang
   - Gemmer “lukket” i localStorage
   - Understøtter “Installér” via beforeinstallprompt når muligt
   ========================================================= */

const INSTALL_DISMISS_KEY = "mindforge_install_dismissed_v1";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const InstallPopup: React.FC = () => {
  const device = useMemo(() => detectDevice(), []);
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Åbn popup første gang (men aldrig hvis app allerede er installeret)
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(INSTALL_DISMISS_KEY) === "1";
      if (dismissed) return;
      if (isStandaloneMode()) return;

      // lille delay så UI ikke “hopper” ved første render
      const t = window.setTimeout(() => setOpen(true), 400);
      return () => window.clearTimeout(t);
    } catch {
      // Hvis localStorage er blokeret, viser vi stadig popup første gang
      if (!isStandaloneMode()) setOpen(true);
    }
  }, []);

  // Lyt efter browserens install-event (Chrome/Edge/Android)
  useEffect(() => {
    const handler = (e: Event) => {
      // Gem prompten, så vi kan vise Installér-knappen
      e.preventDefault?.();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  const close = () => {
    try {
      localStorage.setItem(INSTALL_DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  };

  const installNow = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } finally {
      setDeferredPrompt(null);
      close();
    }
  };

  if (!open) return null;

  const showInstallButton = Boolean(deferredPrompt) && (device.isAndroid || device.isChrome || device.isEdge);
  const title = "Installér MindForge 15";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-lg rounded-2xl bg-background shadow-2xl border border-border">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Få appen som en rigtig app på din enhed. Det tager 10 sekunder.
              </p>
            </div>

            <button
              onClick={close}
              className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-muted"
              aria-label="Luk"
              title="Luk"
            >
              Luk
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pb-5">
          {/* Install-knap når browseren understøtter det */}
          {showInstallButton && (
            <div className="mb-4 rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted-foreground">
                Din browser understøtter installation direkte.
              </p>

              <button
                onClick={installNow}
                className="mt-3 w-full rounded-xl bg-primary px-4 py-3 text-primary-foreground font-bold hover:opacity-95"
              >
                Installér nu
              </button>
            </div>
          )}

          {/* Guide pr. device */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-base font-semibold">Sådan installerer du</h3>

            {/* iPhone/iPad */}
            {device.isIOS && (
              <div className="mt-3 text-sm">
                <p className="font-semibold">iPhone / iPad (Safari)</p>
                <ol className="mt-2 list-decimal pl-5 space-y-1 text-muted-foreground">
                  <li>Åbn appen i <span className="font-semibold">Safari</span></li>
                  <li>Tryk <span className="font-semibold">Del</span> (firkant med pil op)</li>
                  <li>Vælg <span className="font-semibold">Føj til hjemmeskærm</span></li>
                  <li>Tryk <span className="font-semibold">Tilføj</span></li>
                </ol>
              </div>
            )}

            {/* Android */}
            {device.isAndroid && (
              <div className="mt-3 text-sm">
                <p className="font-semibold">Android (Chrome)</p>
                <ol className="mt-2 list-decimal pl-5 space-y-1 text-muted-foreground">
                  <li>Tryk menu <span className="font-semibold">⋮</span></li>
                  <li>Vælg <span className="font-semibold">Installér app</span> eller <span className="font-semibold">Føj til startskærm</span></li>
                  <li>Bekræft <span className="font-semibold">Installér</span></li>
                </ol>
              </div>
            )}

            {/* Windows/Mac */}
            {!device.isMobile && (
              <div className="mt-3 text-sm">
                <p className="font-semibold">Windows / Mac (Chrome eller Edge)</p>
                <ol className="mt-2 list-decimal pl-5 space-y-1 text-muted-foreground">
                  <li>Kig i adresselinjen efter et <span className="font-semibold">Installér-ikon</span></li>
                  <li>Klik <span className="font-semibold">Installer</span></li>
                  <li>Appen kan fastgøres til proceslinjen/dock</li>
                </ol>
              </div>
            )}

            {/* Fallback hvis ingen install knap */}
            {!showInstallButton && !device.isIOS && (
              <p className="mt-3 text-sm text-muted-foreground">
                Hvis du ikke ser “Installér”, så prøv en hard reload (Ctrl/Cmd+Shift+R) og åbn siden igen.
              </p>
            )}
          </div>

          {/* Opdaterings-hjælp */}
          <div className="mt-4 rounded-xl border border-border bg-card p-4">
            <h3 className="text-base font-semibold">Hvis appen driller efter en opdatering</h3>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Lav en hard reload: <span className="font-semibold">Ctrl/Cmd + Shift + R</span></li>
              <li>Luk fanen helt og åbn linket igen</li>
              <li>Hvis du har installeret appen: luk den og start den igen</li>
            </ul>
          </div>

          {/* Footer knapper */}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={close}
              className="rounded-xl border border-border px-4 py-2 font-semibold hover:bg-muted"
            >
              Ikke nu
            </button>

            <button
              onClick={close}
              className="rounded-xl bg-primary px-4 py-2 text-primary-foreground font-bold hover:opacity-95"
            >
              Forstået
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   AFSNIT 05 – AppContent (flow)
   ========================================================= */

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const { setCurrentDay } = useProgress();
  const [appState, setAppState] = useState<AppState>("language");
  const [selectedDay, setSelectedDay] = useState(1);

  // Show language selector if no language is set
  React.useEffect(() => {
    if (language) {
      setAppState("welcome");
    }
  }, [language]);

  const handleWelcomeContinue = () => setAppState("daySelect");

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setCurrentDay(day);
    setAppState("overview");
  };

  const handleStartSession = () => setAppState("session");
  const handleSessionComplete = () => setAppState("complete");

  const handleNextDay = () => {
    const nextDay = Math.min(selectedDay + 1, 37);
    setSelectedDay(nextDay);
    setCurrentDay(nextDay);
    setAppState("overview");
  };

  const handleGoHome = () => setAppState("welcome");
  const handleChooseAnother = () => setAppState("daySelect");

  return (
    <div className="min-h-screen bg-background">
      {language && <Header />}

      {/* =========================================================
          AFSNIT 06 – Install Popup (første gang)
         ========================================================= */}
      <InstallPopup />

      {!language && <LanguageSelector />}

      {language && appState === "welcome" && (
        <WelcomeScreen onContinue={handleWelcomeContinue} />
      )}

      {language && appState === "daySelect" && <DaySelector onDaySelect={handleDaySelect} />}

      {language && appState === "overview" && (
        <SessionOverview day={selectedDay} onStart={handleStartSession} onChooseAnother={handleChooseAnother} />
      )}

      {language && appState === "session" && (
        <SessionView day={selectedDay} onComplete={handleSessionComplete} onExit={handleGoHome} />
      )}

      {language && appState === "complete" && (
        <CompletionScreen day={selectedDay} onNextDay={handleNextDay} onHome={handleGoHome} />
      )}
    </div>
  );
};

/* =========================================================
   AFSNIT 07 – Providers wrapper (Index)
   ========================================================= */

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
