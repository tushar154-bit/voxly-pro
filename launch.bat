@echo off
setlocal enabledelayedexpansion
title Voxly Pro

echo ========================================
echo   Voxly Pro - Full Stack Launcher
echo ========================================
echo.

cd /d "%~dp0"

REM --- 1. Ensure Docker Desktop is running ------------------------------------
set "DOCKER=C:\Program Files\Docker\Docker\resources\bin\docker.exe"
if not exist "%DOCKER%" (
    echo ERROR: Docker Desktop is not installed.
    echo    Install from https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo [1/3] Checking Docker daemon...
"%DOCKER%" info >nul 2>&1
if errorlevel 1 (
    echo    Docker is not running - launching Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo    Waiting for daemon to start (this can take up to 60s)...
    set /a TRIES=0
    :wait_docker
        timeout /t 3 /nobreak >nul
        "%DOCKER%" info >nul 2>&1
        if not errorlevel 1 goto docker_ready
        set /a TRIES+=1
        if !TRIES! geq 25 (
            echo    ERROR: Docker did not start within 75 seconds.
            echo    Please start Docker Desktop manually and try again.
            pause
            exit /b 1
        )
        goto wait_docker
    :docker_ready
    echo    Docker is ready.
) else (
    echo    Docker is already running.
)

REM --- 2. Start the Postgres container ----------------------------------------
echo.
echo [2/3] Starting Postgres container...
"%DOCKER%" compose up -d
if errorlevel 1 (
    echo    ERROR: Failed to start Postgres container.
    pause
    exit /b 1
)

REM Quick health check on :5432
set /a DB_TRIES=0
:wait_db
    timeout /t 1 /nobreak >nul
    netstat -ano | findstr "LISTENING" | findstr ":5432" >nul
    if not errorlevel 1 goto db_ready
    set /a DB_TRIES+=1
    if !DB_TRIES! geq 20 (
        echo    WARNING: Postgres not listening on 5432 yet; continuing anyway.
        goto db_ready
    )
    goto wait_db
:db_ready
echo    Postgres is listening on 5432.

REM --- 3. Start the dev server ------------------------------------------------
echo.
echo [3/3] Starting dev server on http://localhost:3000 ...
echo    (Press Ctrl+C in this window to stop the server)
echo.

REM Open browser after a short delay so the server is ready when it loads.
start "" powershell -NoProfile -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3000'"

call npm run dev

echo.
echo Server stopped. Press any key to close.
pause >nul
endlocal
