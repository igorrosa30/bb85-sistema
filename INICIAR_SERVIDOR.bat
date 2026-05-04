@echo off
echo ========================================
echo   BB85 - Iniciando Servidor Local
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Instalando dependencias...
call npm install

echo.
echo [2/3] Gerando Prisma Client...
call npx prisma generate

echo.
echo [3/3] Iniciando servidor de desenvolvimento...
echo.
echo Acesse: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

call npm run dev

pause
