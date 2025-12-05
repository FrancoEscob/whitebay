'use client';

import { useEffect, useState } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') return false;
  
  // Verificar primero si ya hay una clase dark en el DOM (del script inline)
  if (document.documentElement.classList.contains('dark')) {
    return true;
  }
  
  const saved = localStorage.getItem('theme');
  if (saved) return saved === 'dark';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Inicializar el estado basándose en el tema actual del DOM
    if (typeof window === 'undefined') return false;
    return getInitialTheme();
  });

  // Sincronizar el DOM con el estado actual al montar
  useEffect(() => {
    const shouldBeDark = getInitialTheme();
    
    // Aplicar al DOM si es necesario
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Actualizar estado de forma síncrona
    setIsDark(shouldBeDark);
  }, []);

  const toggleTheme = () => {
    // Leer el estado actual del DOM para asegurar sincronización
    const currentIsDark = document.documentElement.classList.contains('dark');
    const newIsDark = !currentIsDark;
    
    setIsDark(newIsDark);
    
    // Aplicar cambios inmediatamente al DOM
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Cambiar tema"
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
