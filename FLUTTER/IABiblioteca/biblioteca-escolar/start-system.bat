@echo off
echo ========================================
echo   SISTEMA DE BIBLIOTECA ESCOLAR
echo ========================================
echo.
echo Iniciando sistema completo...
echo.

echo [1/3] Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias del frontend...
    npm install
)

if not exist "backend\node_modules" (
    echo Instalando dependencias del backend...
    cd backend
    npm install
    cd ..
)

echo [2/3] Verificando base de datos...
cd backend
echo Ejecutando migraciones...
npm run db:migrate
echo Poblando con datos de prueba...
npm run db:seed
cd ..

echo [3/3] Iniciando sistema...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:3001
echo Swagger:  http://localhost:3001/api-docs
echo.
echo Presiona Ctrl+C para detener el sistema
echo.

npm run dev

pause

