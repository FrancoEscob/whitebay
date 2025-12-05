# 🚀 Editor de Prompts para IA

Un editor visual e interactivo para crear y gestionar prompts XML para agentes de inteligencia artificial. Desarrollado con Next.js, React y TypeScript.

## ✨ Características Principales

### 🎨 Editor Visual XML con Colores
- Cada sección XML se muestra con un color distintivo y claro
- 8 esquemas de colores diferentes que se alternan automáticamente
- Visualización clara de etiquetas XML de apertura y cierre
- Fondo con gradientes para mejor legibilidad

### 🎯 Drag & Drop Intuitivo
- Reordena secciones XML simplemente arrastrando y soltando
- Feedback visual durante el arrastre
- Funciona tanto con mouse como con teclado
- Powered by `@dnd-kit` para máxima compatibilidad

### 📝 Modo Dual de Edición
- **Modo Visual**: Edita cada sección individualmente con colores y drag & drop
- **Modo Texto**: Edita el XML completo en formato texto plano
- Cambia entre modos sin perder información
- Parsing automático de XML al cambiar de modo

### 🌓 Tema Oscuro/Claro
- Soporte completo para modo oscuro
- Cambio suave entre temas
- Los colores se adaptan automáticamente
- Persistencia de preferencias

### 💾 Gestión de Prompts
- Crea, edita y elimina prompts
- Almacenamiento local (LocalStorage)
- Búsqueda en tiempo real
- Fecha de creación automática

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 16](https://nextjs.org/)
- **UI**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **Fuentes**: Geist Sans & Geist Mono

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Compilación

```bash
# Compilar para producción
npm run build

# Ejecutar versión de producción
npm start
```

## 📖 Cómo Usar

### Crear un Nuevo Prompt

1. Ve a la página principal y haz clic en "**Crear Nuevo**" o "**Gestionar Prompts**"
2. En la lista de prompts, haz clic en "**+ Nuevo Prompt**"
3. Ingresa un título descriptivo
4. Usa el editor visual o modo texto para escribir tu prompt XML

### Editor Visual

#### Añadir Secciones
1. Haz clic en "**+ Añadir Nueva Sección**"
2. Ingresa el nombre de la etiqueta XML (ej: `instructions`, `context`, `examples`)
3. Escribe el contenido de la sección

#### Editar Secciones
- Haz clic en el ícono ✏️ para editar el contenido
- Guarda los cambios o cancela

#### Reordenar Secciones
- Haz clic en el ícono de líneas (☰) y arrastra la sección
- Suelta en la nueva posición deseada

#### Eliminar Secciones
- Haz clic en el ícono ✕ para eliminar una sección

### Modo Texto

1. Haz clic en "**📝 Modo Texto**" para cambiar al editor de texto
2. Edita el XML directamente con sintaxis completa
3. Cambia de vuelta a "**📐 Modo Visual**" para ver las secciones parseadas

### Ejemplo de Prompt XML

```xml
<instructions>
Eres un asistente de programación experto en Python.
Tu objetivo es ayudar a los usuarios a escribir código limpio y eficiente.
</instructions>

<context>
El usuario está trabajando en un proyecto de análisis de datos con pandas.
</context>

<examples>
Pregunta: ¿Cómo filtro un DataFrame?
Respuesta: Puedes usar df[df['columna'] > valor] para filtrar filas.
</examples>

<constraints>
- Siempre explica tu código
- Usa buenas prácticas de Python
- Considera el rendimiento
</constraints>
```

## 🎨 Esquema de Colores

El editor utiliza 8 esquemas de colores que se alternan automáticamente:

1. 💙 Azul - `bg-blue-50 / bg-blue-950`
2. 💜 Púrpura - `bg-purple-50 / bg-purple-950`
3. 💚 Verde - `bg-green-50 / bg-green-950`
4. 🧡 Ámbar - `bg-amber-50 / bg-amber-950`
5. 💗 Rosa - `bg-pink-50 / bg-pink-950`
6. 💎 Cian - `bg-cyan-50 / bg-cyan-950`
7. 🌹 Rose - `bg-rose-50 / bg-rose-950`
8. 💙 Índigo - `bg-indigo-50 / bg-indigo-950`

## 📁 Estructura del Proyecto

```
my-app/
├── app/
│   ├── components/
│   │   ├── ThemeProvider.tsx    # Proveedor de tema oscuro/claro
│   │   ├── ThemeToggle.tsx      # Botón de cambio de tema
│   │   └── XMLPromptEditor.tsx  # Editor visual XML con drag & drop
│   ├── prompts/
│   │   ├── [id]/
│   │   │   └── page.tsx         # Página de edición de prompt
│   │   ├── new/
│   │   │   └── page.tsx         # Página de creación de prompt
│   │   └── page.tsx             # Lista de prompts
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales
├── public/                      # Archivos estáticos
├── package.json                 # Dependencias
└── README.md                    # Este archivo
```

## 🤝 Contribuciones

Este proyecto fue creado por **FrancoEscob** como una herramienta para facilitar la creación de prompts estructurados para agentes de IA.

## 📝 Licencia

Proyecto privado - Todos los derechos reservados.

## 🔮 Próximas Características

- [ ] Exportar/Importar prompts en formato JSON
- [ ] Plantillas predefinidas de prompts
- [ ] Validación de sintaxis XML
- [ ] Historial de versiones
- [ ] Compartir prompts mediante URL
- [ ] Integración con APIs de IA populares

---

**Hecho con ❤️ por FrancoEscob**
