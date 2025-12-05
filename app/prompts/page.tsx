'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Prompt {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedPrompts = localStorage.getItem('ai-prompts');
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    }
  }, []);

  const filteredPrompts = prompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deletePrompt = (id: string) => {
    const updatedPrompts = prompts.filter(p => p.id !== id);
    setPrompts(updatedPrompts);
    localStorage.setItem('ai-prompts', JSON.stringify(updatedPrompts));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 inline-block"
          >
            ← Volver
          </Link>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
              Prompts para IA
            </h1>
            <Link
              href="/prompts/new"
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-sm font-medium"
            >
              + Nuevo Prompt
            </Link>
          </div>
          <input
            type="text"
            placeholder="Buscar prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          />
        </div>

        {filteredPrompts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              {prompts.length === 0
                ? 'No hay prompts guardados. Crea tu primer prompt.'
                : 'No se encontraron prompts que coincidan con tu búsqueda.'}
            </p>
            {prompts.length === 0 && (
              <Link
                href="/prompts/new"
                className="inline-block px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Crear primer prompt
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <Link
                    href={`/prompts/${prompt.id}`}
                    className="flex-1"
                  >
                    <h2 className="text-lg font-semibold text-black dark:text-zinc-50 mb-2 hover:underline">
                      {prompt.title}
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {prompt.content}
                    </p>
                  </Link>
                  <button
                    onClick={() => deletePrompt(prompt.id)}
                    className="ml-4 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-sm"
                    title="Eliminar"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                  {new Date(prompt.createdAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
