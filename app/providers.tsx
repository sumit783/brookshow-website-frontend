'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnWindowFocus: false, // Prevent refetching when switching tabs
        retry: (failureCount, error: any) => {
          // Do not retry when getting 401 Unauthorized
          if (error?.response?.status === 401 || error?.status === 401) {
            return false;
          }
          return failureCount < 1;
        },
      },
    },
  }));
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
