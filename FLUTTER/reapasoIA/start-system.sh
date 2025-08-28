#!/bin/bash

echo "========================================"
echo "  SISTEMA DE BIBLIOTECA ESCOLAR"
echo "========================================"
echo ""
echo "Iniciando sistema completo..."
echo ""

echo "[1/3] Verificando dependencias..."
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias del frontend..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Instalando dependencias del backend..."
    cd backend
    npm install
    cd ..
fi

echo "[2/3] Verificando base de datos..."
cd backend
echo "Ejecutando migraciones..."
npm run db:migrate
echo "Poblando con datos de prueba..."
npm run db:seed
cd ..

echo "[3/3] Iniciando sistema..."
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo "Swagger:  http://localhost:3001/api-docs"
echo ""
echo "Presiona Ctrl+C para detener el sistema"
echo ""

npm run dev

