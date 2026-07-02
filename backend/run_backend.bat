@echo off
cd /d "%~dp0"
echo ===================================================
echo   BRINGO - INICIALIZADOR DO BACKEND (PYTHON + SQLITE)
echo ===================================================
echo.

:: Check if venv folder exists
if not exist "venv" (
    echo Criando ambiente virtual Python (venv)...
    py -3 -m venv venv
    if errorlevel 1 (
        py -m venv venv
    )
    if errorlevel 1 (
        python -m venv venv
    )
    if errorlevel 1 (
        echo ERRO: Python nao encontrado! Instale o Python 3 para continuar.
        pause
        exit /b 1
    )
    echo Ambiente virtual criado com sucesso!
    echo.
)

echo Ativando ambiente virtual...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERRO ao ativar o ambiente virtual.
    pause
    exit /b 1
)
echo.

echo Instalando dependencias de backend...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERRO ao instalar as dependencias. Verifique sua conexao de internet.
    pause
    exit /b 1
)
echo Dependencias instaladas com sucesso!
echo.

echo Iniciando o servidor do backend (Flask + SQLite)...
echo O backend rodara em: http://localhost:5001
echo.
python app.py

pause
