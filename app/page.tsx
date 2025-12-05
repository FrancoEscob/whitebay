'use client';

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-black dark:via-zinc-950 dark:to-black font-sans relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-200/10 to-pink-200/10 dark:from-cyan-900/5 dark:to-pink-900/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-20 px-8 sm:py-32 relative z-10">
        <div className="flex items-center gap-3 animate-fade-in">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-8 text-center animate-fade-in-up">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-2xl opacity-20 dark:opacity-30 rounded-full"></div>
            <h1 className="relative max-w-2xl text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
              Editor de Prompts para IA
            </h1>
          </div>
          
          <p className="max-w-2xl text-lg sm:text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            Crea, edita y gestiona prompts XML para tus agentes de IA de forma simple, visual y eficiente. 
            <span className="block mt-2 text-base text-zinc-500 dark:text-zinc-500">
              🎨 Secciones con colores • 🎯 Drag & Drop • ✨ Editor visual
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <Link
              href="/prompts"
              className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 dark:hover:shadow-purple-500/30 font-semibold text-lg overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Gestionar Prompts</span>
              <span className="relative text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            
            <Link
              href="/prompts/new"
              className="flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border-2 border-zinc-300 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-black dark:text-zinc-50 px-8 transition-all hover:scale-105 hover:border-black dark:hover:border-white hover:shadow-xl font-semibold text-lg"
            >
              <span>+ Crear Nuevo</span>
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold text-black dark:text-zinc-50 mb-1">Colores Visuales</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Cada sección XML con su propio color distintivo</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-black dark:text-zinc-50 mb-1">Drag & Drop</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Reordena secciones arrastrando y soltando</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-black dark:text-zinc-50 mb-1">Modo Dual</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Alterna entre editor visual y texto plano</p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-zinc-500 dark:text-zinc-500 animate-fade-in">
          <p>Hecho con ❤️ por FrancoEscob</p>
        </div>
      </main>
    </div>
  );
}
