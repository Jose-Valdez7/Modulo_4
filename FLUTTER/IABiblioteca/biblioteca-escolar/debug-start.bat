@echo off
echo ========================================
echo   DEBUG - SISTEMA DE BIBLIOTECA
echo ========================================
echo.

echo [1/3] Verificando directorio actual...
echo Directorio actual: %CD%
echo.

echo [2/3] Verificando archivos...
if exist "package.json" (
    echo ✓ package.json encontrado
) else (
    echo ✗ package.json NO encontrado
    pause
    exit /b 1
)

if exist "src\App.tsx" (
    echo ✓ App.tsx encontrado
) else (
    echo ✗ App.tsx NO encontrado
    pause
    exit /b 1
)

if exist "node_modules" (
    echo ✓ node_modules encontrado
) else (
    echo ✗ node_modules NO encontrado
    pause
    exit /b 1
)

echo.
echo [3/3] Intentando iniciar frontend...
echo.
echo Comando: npm start
echo.

npm start

pause

