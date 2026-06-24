@echo off

:: Iniciar el backend de Python
start "Backend" cmd /k "cd /d %~dp0tienda-backend && venv\Scripts\activate.bat && uvicorn main:app --reload"

:: Iniciar el frontend de React
start "Frontend" cmd /k "cd /d %~dp0tienda-frontend && npm run dev"