'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPromptPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const generateUniqueId = (): string => {
    // Usar crypto.randomUUID() si está disponible, sino combinar timestamp + random
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback: timestamp + número aleatorio para evitar colisiones
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  };

  const savePrompt = () => {
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa el título y el contenido del prompt.');
      return;
    }

    const savedPrompts = localStorage.getItem('ai-prompts');
    const prompts = savedPrompts ? JSON.parse(savedPrompts) : [];

    const newPrompt = {
      id: generateUniqueId(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    prompts.push(newPrompt);
    localStorage.setItem('ai-prompts', JSON.stringify(prompts));
    router.push('/prompts');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/prompts"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6 inline-block"
        >
          ← Volver a prompts
        </Link>

        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-8">
          Nuevo Prompt
        </h1>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Asistente de código Python"
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
              Contenido del Prompt
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe aquí el prompt para tu agente de IA..."
              rows={15}
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white font-mono text-sm resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={savePrompt}
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-medium"
            >
              Guardar
            </button>
            <Link
              href="/prompts"
              className="px-6 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-black dark:text-zinc-50"
            >
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
