"use client";

import { type ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export { QueryProvider } from "./query-provider";
export { ThemeProvider, useTheme } from "./theme-provider";

