'use client';
import { useState, useEffect } from 'react';
import { resolveInitialTheme, saveTheme } from './theme';

export function useTheme() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsLight(resolveInitialTheme());
    setMounted(true);
  }, []);

  const toggle = () => {
    setIsLight(prev => {
      const newVal = !prev;
      saveTheme(newVal);
      return newVal;
    });
  };

  const light = mounted && isLight;
  return { isLight, light, mounted, toggle };
}
