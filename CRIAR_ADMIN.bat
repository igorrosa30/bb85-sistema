@echo off
TITLE Criar Usuario Admin
color 0A

echo ===================================================
echo      CRIANDO USUARIO ADMINISTRADOR MASTER
echo ===================================================
echo.

npx ts-node create-admin.ts

echo.
echo ===================================================
echo CREDENCIAIS DE ACESSO:
echo.
echo Email: admin@bb85.com
echo Senha: Admin@BB85!2026
echo.
echo ATENCAO: Altere a senha apos o primeiro login!
echo ===================================================
echo.

PAUSE
