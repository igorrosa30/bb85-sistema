@echo off
TITLE BB85 Auto-Deploy v3
CLS
color 0A

echo ===================================================
echo      BB85 - SISTEMA DE DEPLOY AUTOMATICO v3
echo ===================================================
echo.

:: 1. Verificar Git
echo 1. Verificando instalacao do Git...
git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 GOTO INSTALL_GIT
echo [OK] Git encontrado.
echo.

:: 2. Verificar Identidade (Nome/Email) - FIX PARA O ERRO RELATADO
echo 2. Verificando configuracao de usuario...
git config user.email >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo ===================================================
    echo PRECISAMOS CONFIGURAR SEU GITHUB (Apenas 1x)
    echo ===================================================
    echo O Git precisa do seu Email e Nome para registrar quem fez as mudancas.
    echo.
    set /p GIT_EMAIL="Digite seu Email do GitHub: "
    set /p GIT_NAME="Digite seu Nome ou Apelido: "
    
    git config --global user.email "%GIT_EMAIL%"
    git config --global user.name "%GIT_NAME%"
    echo.
    echo [OK] Identidade configurada!
) ELSE (
    echo [OK] Usuario ja configurado.
)

:: 3. Inicializar e Limpar
echo.
echo 3. configurando Repositorio...
IF NOT EXIST ".git" git init

:: Resetar remote caso o usuario tenha colado errado antes
git remote remove origin >nul 2>&1

:: Perguntar URL sempre para garantir (em caso de erro anterior)
echo.
echo ===================================================
echo Cole a URL do seu repositorio GitHub.
echo Exemplo: https://github.com/igorrosa30/bb85-sistema.git
echo ===================================================
echo.
set /p REPO_URL="URL do Repositorio: "
git remote add origin %REPO_URL%

:: 4. Preparar Arquivos
echo.
echo 4. Preparando arquivos...
git checkout -b main >nul 2>&1
git add .
git commit -m "Deploy automatico via script BB85"

:: 5. Enviar
echo.
echo 5. Enviando para o GitHub...
echo Aguarde...
git push -u origin main

IF %ERRORLEVEL% NEQ 0 GOTO ERROR_PUSH

echo.
echo ===================================================
echo [SUCESSO] Codigo enviado com sucesso!
echo.
echo Agora va no Netlify:
echo 1. Add new site > Import from existing project
echo 2. GitHub > Selecione este repositorio
echo.
echo Pressione qualquer tecla para sair.
echo ===================================================
PAUSE
EXIT

:INSTALL_GIT
color 0E
echo [AVISO] Git nao detectado. Instalando...
winget install --id Git.Git -e --source winget
echo Feche esta janela e abra novamente apos instalar.
PAUSE
EXIT

:ERROR_PUSH
color 0C
echo.
echo [ERRO] Falha ao enviar para o GitHub.
echo.
echo DICA: Se aparecer uma janela pedindo senha, use seu login do GitHub.
echo Verifique se o repositorio esta vazio (sem README).
echo.
echo Tente rodar o script novamente.
PAUSE
EXIT
