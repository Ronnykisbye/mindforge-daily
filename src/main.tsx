/* =========================================================
   AFSNIT 01 – Imports
   ========================================================= */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/* =========================================================
   AFSNIT 02 – ErrorBoundary (viser fejl i UI i stedet for hvid side)
   ========================================================= */

type ErrorBoundaryState = {
  hasError: boolean;
  message?: string;
  stack?: string;
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const err = error instanceof Error ? error : new Error(String(error));
    return { hasError: true, message: err.message, stack: err.stack };
  }

  componentDidCatch(error: unknown) {
    // Vi logger stadig til console, så du kan klikke på stacktrace
    // (men vigtigst: vi viser også fejlen på skærmen)
    console.error("MindForge crash:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
          <h1 style={{ fontSize: 20, marginBottom: 8 }}>
            Appen crashede ved opstart
          </h1>

          <p style={{ marginBottom: 12 }}>
            Kopiér teksten herunder og send den til mig, så retter vi fejlen i
            næste trin.
          </p>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#111827",
              color: "#F9FAFB",
              padding: 12,
              borderRadius: 8,
              overflow: "auto",
            }}
          >
{`FEJLMEDDELELSE:
${this.state.message ?? "(ingen message)"}

STACK:
${this.state.stack ?? "(ingen stack)"}
`}
          </pre>

          <p style={{ marginTop: 12, opacity: 0.85 }}>
            Tip: Hvis du lige har ændret routing/PWA, kan du også prøve hard
            reload (Ctrl+Shift+R).
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

/* =========================================================
   AFSNIT 03 – App mount (React root)
   ========================================================= */

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
