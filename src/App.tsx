/* =========================================================
   AFSNIT 01 – Imports
   ========================================================= */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/* =========================================================
   AFSNIT 02 – QueryClient
   ========================================================= */

const queryClient = new QueryClient();

/* =========================================================
   AFSNIT 03 – App (GitHub Pages kompatibel routing)
   - HashRouter virker stabilt på GitHub Pages i undermapper
   - Undgår "non-existent route" / refresh-404 / blank side
   ========================================================= */

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
