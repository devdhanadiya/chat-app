"use client";

import { useState, useEffect } from "react";
import useThemeStore from "@/store/useThemeStore";
import useAuthStore from "@/store/useAuthStore";
import Loading from "@/app/loading";
import { ChildrenProps } from "@/types";

function ThemeProvider({ children }: ChildrenProps) {
  const { theme, isLoading, setIsLoading } = useThemeStore();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, [setIsLoading]);

  if (!mounted || isLoading) {
    return <Loading />;
  }

  return <div data-theme={theme}>{children}</div>;
}

function AuthProvider({ children }: ChildrenProps) {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <Loading />;
  }
  return children;
}

export default function Provider({ children }: ChildrenProps) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
