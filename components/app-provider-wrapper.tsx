"use client"

import { AppProvider } from "@/context/AppContext"

export function AppProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
