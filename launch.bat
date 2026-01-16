@echo off
REM VoxlyPro Launch Script
REM Opens the project in your default browser

echo.
echo ========================================
echo   VoxlyPro Social Listening Dashboard
echo ========================================
echo.
echo Starting VoxlyPro...
echo.

REM Check if index.html exists
if not exist "index.html" (
    echo ERROR: index.html not found!
    echo Please make sure you're running this from the VoxlyPro directory.
    pause
    exit /b 1
)

REM Open in default browser
echo Opening in your default browser...
start "" "index.html"

echo.
echo ========================================
echo VoxlyPro is now running!
echo ========================================
echo.
echo Browser Tips:
echo - Press F12 to open Developer Console
echo - Use Ctrl+Shift+M to toggle device toolbar
echo - Clear cache with Ctrl+Shift+R if needed
echo.
echo Quick Console Commands to Try:
echo - Notifications.success('Hello!')
echo - Utils.formatNumber(156789)
echo - DataMgr.getFilteredData()
echo.
echo Press any key to exit this window...
pause > nul
