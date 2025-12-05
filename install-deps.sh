#!/bin/bash
# Script para instalar dependencias con Bun

echo "Instalando dependencias con Bun..."
bun install

echo "Verificando instalación..."
if [ -d "node_modules/@dnd-kit/core" ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error: Las dependencias no se instalaron correctamente"
    exit 1
fi
