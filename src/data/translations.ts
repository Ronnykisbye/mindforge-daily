export type Language = 'en' | 'da' | 'de' | 'lt';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Language selection
    selectLanguage: "Select Your Language",
    
    // Welcome
    welcomeTitle: "Welcome to MindForge 15",
    welcomeSubtitle: "15 minutes a day to sharpen your mind",
    welcomeDescription: "A 30-day brain training program designed to enhance your cognitive abilities through focused, daily practice.",
    getStarted: "Get Started",
    
    // Day selection
    whichDay: "Which day are you on?",
    dayRange: "Select your current day (1-30)",
    day: "Day",
    continue: "Continue",
    
    // Session overview
    todaysFocus: "Today's Focus",
    totalTime: "15 minutes total",
    startSession: "Start Today's Session",
    chooseAnotherDay: "Choose Another Day",
    
    // Steps
    step: "Step",
    of: "of",
    calmBreathing: "Calm Breathing",
    calmBreathingDesc: "Center yourself with deep, rhythmic breathing",
    workingMemory: "Working Memory",
    workingMemoryDesc: "Challenge your short-term memory capacity",
    activeRecall: "Active Recall",
    activeRecallDesc: "Strengthen memory retrieval pathways",
    reflection: "Reflection",
    reflectionDesc: "Consolidate what you've learned today",
    
    // Timer
    minutes: "min",
    seconds: "sec",
    pause: "Pause",
    resume: "Resume",
    next: "Next",
    complete: "Complete",
    
    // Breathing
    breatheIn: "Breathe In",
    hold: "Hold",
    breatheOut: "Breathe Out",
    
    // Memory exercises
    rememberSequence: "Remember the sequence",
    recallSequence: "Recall the sequence",
    correct: "Correct!",
    tryAgain: "Try Again",
    
    // Completion
    sessionComplete: "Session Complete!",
    greatWork: "Great work today",
    dayCompleted: "Day {day} completed",
    nextDay: "Next Day",
    backToHome: "Back to Home",
    
    // Maintenance
    maintenanceMode: "Maintenance Mode",
    maintenanceDesc: "Keep your mind sharp with weekly practice",
    
    // Settings
    settings: "Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    resetProgress: "Reset Progress",
    resetConfirm: "Are you sure you want to reset all progress?",
    cancel: "Cancel",
    confirm: "Confirm",
    
    // Progress
    progress: "Progress",
    daysCompleted: "Days Completed",
    currentStreak: "Current Streak",
    
    // Navigation
    previousDay: "Previous Day",
    nextDayNav: "Next Day",
  },
  
  da: {
    // Language selection
    selectLanguage: "Vælg dit sprog",
    
    // Welcome
    welcomeTitle: "Velkommen til MindForge 15",
    welcomeSubtitle: "15 minutter om dagen for at skærpe dit sind",
    welcomeDescription: "Et 30-dages hjernetræningsprogram designet til at forbedre dine kognitive evner gennem fokuseret, daglig øvelse.",
    getStarted: "Kom i gang",
    
    // Day selection
    whichDay: "Hvilken dag er du på?",
    dayRange: "Vælg din nuværende dag (1-30)",
    day: "Dag",
    continue: "Fortsæt",
    
    // Session overview
    todaysFocus: "Dagens fokus",
    totalTime: "15 minutter i alt",
    startSession: "Start dagens session",
    chooseAnotherDay: "Vælg en anden dag",
    
    // Steps
    step: "Trin",
    of: "af",
    calmBreathing: "Rolig vejrtrækning",
    calmBreathingDesc: "Centrer dig selv med dyb, rytmisk vejrtrækning",
    workingMemory: "Arbejdshukommelse",
    workingMemoryDesc: "Udfordre din korttidshukommelse",
    activeRecall: "Aktiv genkaldelse",
    activeRecallDesc: "Styrk hukommelsens genkaldelsesveje",
    reflection: "Refleksion",
    reflectionDesc: "Konsolider hvad du har lært i dag",
    
    // Timer
    minutes: "min",
    seconds: "sek",
    pause: "Pause",
    resume: "Genoptag",
    next: "Næste",
    complete: "Fuldfør",
    
    // Breathing
    breatheIn: "Træk vejret ind",
    hold: "Hold",
    breatheOut: "Pust ud",
    
    // Memory exercises
    rememberSequence: "Husk sekvensen",
    recallSequence: "Genkald sekvensen",
    correct: "Korrekt!",
    tryAgain: "Prøv igen",
    
    // Completion
    sessionComplete: "Session fuldført!",
    greatWork: "Godt arbejde i dag",
    dayCompleted: "Dag {day} fuldført",
    nextDay: "Næste dag",
    backToHome: "Tilbage til start",
    
    // Maintenance
    maintenanceMode: "Vedligeholdelsestilstand",
    maintenanceDesc: "Hold dit sind skarpt med ugentlig øvelse",
    
    // Settings
    settings: "Indstillinger",
    theme: "Tema",
    light: "Lys",
    dark: "Mørk",
    language: "Sprog",
    resetProgress: "Nulstil fremskridt",
    resetConfirm: "Er du sikker på, at du vil nulstille alt fremskridt?",
    cancel: "Annuller",
    confirm: "Bekræft",
    
    // Progress
    progress: "Fremskridt",
    daysCompleted: "Dage fuldført",
    currentStreak: "Nuværende streak",
    
    // Navigation
    previousDay: "Forrige dag",
    nextDayNav: "Næste dag",
  },
  
  de: {
    // Language selection
    selectLanguage: "Wähle deine Sprache",
    
    // Welcome
    welcomeTitle: "Willkommen bei MindForge 15",
    welcomeSubtitle: "15 Minuten am Tag, um deinen Geist zu schärfen",
    welcomeDescription: "Ein 30-tägiges Gehirntrainingsprogramm zur Verbesserung deiner kognitiven Fähigkeiten durch fokussierte, tägliche Übung.",
    getStarted: "Los geht's",
    
    // Day selection
    whichDay: "An welchem Tag bist du?",
    dayRange: "Wähle deinen aktuellen Tag (1-30)",
    day: "Tag",
    continue: "Weiter",
    
    // Session overview
    todaysFocus: "Heutiger Fokus",
    totalTime: "15 Minuten insgesamt",
    startSession: "Heutige Sitzung starten",
    chooseAnotherDay: "Anderen Tag wählen",
    
    // Steps
    step: "Schritt",
    of: "von",
    calmBreathing: "Ruhiges Atmen",
    calmBreathingDesc: "Zentriere dich mit tiefer, rhythmischer Atmung",
    workingMemory: "Arbeitsgedächtnis",
    workingMemoryDesc: "Fordere dein Kurzzeitgedächtnis heraus",
    activeRecall: "Aktives Abrufen",
    activeRecallDesc: "Stärke die Abrufwege des Gedächtnisses",
    reflection: "Reflexion",
    reflectionDesc: "Festige, was du heute gelernt hast",
    
    // Timer
    minutes: "Min",
    seconds: "Sek",
    pause: "Pause",
    resume: "Fortsetzen",
    next: "Weiter",
    complete: "Abschließen",
    
    // Breathing
    breatheIn: "Einatmen",
    hold: "Halten",
    breatheOut: "Ausatmen",
    
    // Memory exercises
    rememberSequence: "Merke dir die Reihenfolge",
    recallSequence: "Rufe die Reihenfolge ab",
    correct: "Richtig!",
    tryAgain: "Nochmal versuchen",
    
    // Completion
    sessionComplete: "Sitzung abgeschlossen!",
    greatWork: "Gute Arbeit heute",
    dayCompleted: "Tag {day} abgeschlossen",
    nextDay: "Nächster Tag",
    backToHome: "Zurück zur Startseite",
    
    // Maintenance
    maintenanceMode: "Wartungsmodus",
    maintenanceDesc: "Halte deinen Geist scharf mit wöchentlicher Übung",
    
    // Settings
    settings: "Einstellungen",
    theme: "Design",
    light: "Hell",
    dark: "Dunkel",
    language: "Sprache",
    resetProgress: "Fortschritt zurücksetzen",
    resetConfirm: "Bist du sicher, dass du allen Fortschritt zurücksetzen möchtest?",
    cancel: "Abbrechen",
    confirm: "Bestätigen",
    
    // Progress
    progress: "Fortschritt",
    daysCompleted: "Abgeschlossene Tage",
    currentStreak: "Aktuelle Serie",
    
    // Navigation
    previousDay: "Vorheriger Tag",
    nextDayNav: "Nächster Tag",
  },
  
  lt: {
    // Language selection
    selectLanguage: "Pasirinkite savo kalbą",
    
    // Welcome
    welcomeTitle: "Sveiki atvykę į MindForge 15",
    welcomeSubtitle: "15 minučių per dieną protui lavinti",
    welcomeDescription: "30 dienų smegenų treniravimo programa, skirta pagerinti jūsų kognityvines galimybes per kasdienę praktiką.",
    getStarted: "Pradėti",
    
    // Day selection
    whichDay: "Kuri diena?",
    dayRange: "Pasirinkite savo dabartinę dieną (1-30)",
    day: "Diena",
    continue: "Tęsti",
    
    // Session overview
    todaysFocus: "Šios dienos tikslas",
    totalTime: "Iš viso 15 minučių",
    startSession: "Pradėti šios dienos sesiją",
    chooseAnotherDay: "Pasirinkti kitą dieną",
    
    // Steps
    step: "Žingsnis",
    of: "iš",
    calmBreathing: "Ramus kvėpavimas",
    calmBreathingDesc: "Susikoncentruokite su giliu, ritminiu kvėpavimu",
    workingMemory: "Darbinė atmintis",
    workingMemoryDesc: "Išbandykite savo trumpalaikę atmintį",
    activeRecall: "Aktyvus prisiminimas",
    activeRecallDesc: "Stiprinkite atminties prisiminimo kelius",
    reflection: "Apmąstymas",
    reflectionDesc: "Įtvirtinkite tai, ką išmokote šiandien",
    
    // Timer
    minutes: "min",
    seconds: "sek",
    pause: "Pauzė",
    resume: "Tęsti",
    next: "Kitas",
    complete: "Baigti",
    
    // Breathing
    breatheIn: "Įkvėpkite",
    hold: "Laikykite",
    breatheOut: "Iškvėpkite",
    
    // Memory exercises
    rememberSequence: "Įsiminkite seką",
    recallSequence: "Prisiminkite seką",
    correct: "Teisingai!",
    tryAgain: "Bandykite dar kartą",
    
    // Completion
    sessionComplete: "Sesija baigta!",
    greatWork: "Puikus darbas šiandien",
    dayCompleted: "{day} diena baigta",
    nextDay: "Kita diena",
    backToHome: "Grįžti į pradžią",
    
    // Maintenance
    maintenanceMode: "Palaikymo režimas",
    maintenanceDesc: "Išlaikykite protą aštrų praktikuodami kas savaitę",
    
    // Settings
    settings: "Nustatymai",
    theme: "Tema",
    light: "Šviesi",
    dark: "Tamsi",
    language: "Kalba",
    resetProgress: "Atstatyti progresą",
    resetConfirm: "Ar tikrai norite atstatyti visą progresą?",
    cancel: "Atšaukti",
    confirm: "Patvirtinti",
    
    // Progress
    progress: "Progresas",
    daysCompleted: "Baigtos dienos",
    currentStreak: "Dabartinė serija",
    
    // Navigation
    previousDay: "Ankstesnė diena",
    nextDayNav: "Kita diena",
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  da: "Dansk",
  de: "Deutsch",
  lt: "Lietuvių",
};

export const languageFlags: Record<Language, string> = {
  en: "🇬🇧",
  da: "🇩🇰",
  de: "🇩🇪",
  lt: "🇱🇹",
};
