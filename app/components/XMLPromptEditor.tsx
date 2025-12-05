'use client';

import { useState, useEffect, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface XMLSection {
  id: string;
  tagName: string;
  content: string;
  color: string;
}

interface XMLPromptEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const SECTION_COLORS = [
  'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
  'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
  'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
  'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
  'bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800',
  'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800',
  'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800',
  'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800',
];

function SortableSection({
  section,
  onEdit,
  onEditTag,
  onDelete,
}: {
  section: XMLSection;
  onEdit: (id: string, content: string) => void;
  onEditTag: (id: string, tagName: string) => void;
  onDelete: (id: string) => void;
}) {
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditingTag, setIsEditingTag] = useState(false);
  const [editContent, setEditContent] = useState(section.content);
  const [editTagName, setEditTagName] = useState(section.tagName);

  // Sync local state when section prop changes
  useEffect(() => {
    if (!isEditingContent) {
      setEditContent(section.content);
    }
  }, [section.content, isEditingContent]);

  useEffect(() => {
    if (!isEditingTag) {
      setEditTagName(section.tagName);
    }
  }, [section.tagName, isEditingTag]);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveContent = () => {
    onEdit(section.id, editContent);
    setIsEditingContent(false);
  };

  const handleCancelContent = () => {
    setEditContent(section.content);
    setIsEditingContent(false);
  };

  const handleSaveTag = () => {
    if (!editTagName.trim()) {
      alert('El nombre de la etiqueta no puede estar vacío');
      return;
    }
    onEditTag(section.id, editTagName.trim());
    setIsEditingTag(false);
  };

  const handleCancelTag = () => {
    setEditTagName(section.tagName);
    setIsEditingTag(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${section.color} border-2 rounded-xl p-4 mb-3 shadow-sm transition-all hover:shadow-md`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-1 flex-shrink-0"
            title="Arrastrar para reordenar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="9" x2="20" y2="9"></line>
              <line x1="4" y1="15" x2="20" y2="15"></line>
            </svg>
          </button>
          {isEditingTag ? (
            <div className="flex items-center gap-2 flex-1">
              <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">&lt;</span>
              <input
                type="text"
                value={editTagName}
                onChange={(e) => setEditTagName(e.target.value)}
                className="px-2 py-1 border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSaveTag()}
                autoFocus
              />
              <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">&gt;</span>
              <button
                onClick={handleSaveTag}
                className="text-xs px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                title="Guardar nombre"
              >
                ✓
              </button>
              <button
                onClick={handleCancelTag}
                className="text-xs px-2 py-1 border border-zinc-300 dark:border-zinc-600 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
                title="Cancelar"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingTag(true)}
              className="font-mono text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              title="Haz clic para editar el nombre de la etiqueta"
            >
              &lt;{section.tagName}&gt;
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {isEditingContent ? (
            <>
              <button
                onClick={handleSaveContent}
                className="text-xs px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelContent}
                className="text-xs px-3 py-1 border border-zinc-300 dark:border-zinc-600 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditingContent(true)}
                className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors text-xs"
                title="Editar contenido"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(section.id)}
                className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-xs"
                title="Eliminar"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>

      {isEditingContent ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
          rows={6}
        />
      ) : (
        <div className="text-sm text-zinc-700 dark:text-zinc-300 font-mono whitespace-pre-wrap bg-white/50 dark:bg-black/20 rounded-lg p-3">
          {section.content}
        </div>
      )}

      <div className="mt-2 text-xs font-mono text-zinc-500 dark:text-zinc-500">
        &lt;/{isEditingTag ? editTagName : section.tagName}&gt;
      </div>
    </div>
  );
}

export default function XMLPromptEditor({ content, onChange }: XMLPromptEditorProps) {
  const [sections, setSections] = useState<XMLSection[]>([]);
  const [rawMode, setRawMode] = useState(false);
  const [rawContent, setRawContent] = useState(content);
  const [newTagName, setNewTagName] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const isInternalUpdate = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const parseXMLContent = (xmlContent: string) => {
    const regex = /<(\w+)>([\s\S]*?)<\/\1>/g;
    const matches = Array.from(xmlContent.matchAll(regex));
    const parsedSections: XMLSection[] = matches.map((match, index) => ({
      id: `section-${index}`,
      tagName: match[1],
      content: match[2].trim(),
      color: SECTION_COLORS[index % SECTION_COLORS.length],
    }));
    setSections(parsedSections);
  };

  const reconstructXML = (sections: XMLSection[]): string => {
    return sections
      .map((section) => `<${section.tagName}>\n${section.content}\n</${section.tagName}>`)
      .join('\n\n');
  };

  // Parse XML content into sections when content changes from parent
  useEffect(() => {
    if (!rawMode && !isInternalUpdate.current) {
      parseXMLContent(content);
    }
    isInternalUpdate.current = false;
  }, [content, rawMode]);

  // Update parent when sections change (but only if not from external content change)
  useEffect(() => {
    if (sections.length > 0 && !rawMode) {
      const newXML = reconstructXML(sections);
      if (newXML.trim() !== content.trim()) {
        isInternalUpdate.current = true;
        onChange(newXML);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, rawMode]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleEditSection = (id: string, newContent: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, content: newContent } : section
      )
    );
  };

  const handleEditTag = (id: string, newTagName: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, tagName: newTagName } : section
      )
    );
  };

  const handleDeleteSection = (id: string) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== id));
  };

  const handleAddSection = () => {
    if (!newTagName.trim()) {
      alert('Por favor ingresa un nombre para la etiqueta XML');
      return;
    }

    const newSection: XMLSection = {
      id: `section-${sections.length}`,
      tagName: newTagName.trim(),
      content: '',
      color: SECTION_COLORS[sections.length % SECTION_COLORS.length],
    };

    setSections((prevSections) => [...prevSections, newSection]);
    setNewTagName('');
    setShowAddSection(false);
  };

  const toggleRawMode = () => {
    if (rawMode) {
      // Switching from raw to visual
      parseXMLContent(rawContent);
      onChange(rawContent);
    } else {
      // Switching from visual to raw
      setRawContent(reconstructXML(sections));
    }
    setRawMode(!rawMode);
  };

  const handleRawContentChange = (newContent: string) => {
    setRawContent(newContent);
    onChange(newContent);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-black dark:text-zinc-50">
          Contenido del Prompt (XML)
        </label>
        <button
          onClick={toggleRawMode}
          className="text-xs px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300 font-medium"
        >
          {rawMode ? '📐 Modo Visual' : '📝 Modo Texto'}
        </button>
      </div>

      {rawMode ? (
        <textarea
          value={rawContent}
          onChange={(e) => handleRawContentChange(e.target.value)}
          placeholder="Escribe aquí el prompt XML para tu agente de IA..."
          rows={20}
          className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white font-mono text-sm resize-none"
        />
      ) : (
        <div className="min-h-[400px] p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
          {sections.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-zinc-500 dark:text-zinc-400 mb-4">
                No se detectaron secciones XML. Añade tu primera sección o cambia al modo texto.
              </p>
              <button
                onClick={() => setShowAddSection(true)}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-sm font-medium"
              >
                + Añadir Sección
              </button>
            </div>
          ) : (
            <>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                  {sections.map((section) => (
                    <SortableSection
                      key={section.id}
                      section={section}
                      onEdit={handleEditSection}
                      onEditTag={handleEditTag}
                      onDelete={handleDeleteSection}
                    />
                  ))}
                </SortableContext>
              </DndContext>

              {!showAddSection && (
                <button
                  onClick={() => setShowAddSection(true)}
                  className="w-full mt-2 py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-white/50 dark:hover:bg-black/20 transition-colors text-zinc-600 dark:text-zinc-400 text-sm font-medium"
                >
                  + Añadir Nueva Sección
                </button>
              )}
            </>
          )}

          {showAddSection && (
            <div className="mt-4 p-4 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 rounded-lg">
              <label className="block text-sm font-medium text-black dark:text-zinc-50 mb-2">
                Nombre de la etiqueta XML
              </label>
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Ej: instructions, context, examples"
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white font-mono text-sm mb-3"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSection()}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors text-sm font-medium"
                >
                  Añadir
                </button>
                <button
                  onClick={() => {
                    setShowAddSection(false);
                    setNewTagName('');
                  }}
                  className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-3">
        💡 <span className="font-semibold">Tip:</span> En modo visual, arrastra las secciones para reordenarlas. Cada sección XML se identifica por colores claros. Cambia al modo texto para editar el XML completo directamente.
      </div>
    </div>
  );
}
