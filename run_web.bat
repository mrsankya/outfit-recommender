@echo off
title StyleSense — Fashion Outfit Recommendation System
color 0A

echo.
echo  ======================================================
echo    StyleSense — Fashion Outfit Recommendation System
echo    React + Vite + Three.js  (Web Edition)
echo    G H Raisoni College of Engineering, Jalgaon
echo  ======================================================
echo.
echo  Starting development server...
echo  The app will open at: http://localhost:5173
echo.
echo  Press Ctrl+C to stop the server.
echo.

cd /d "%~dp0fashion-web"
npm run dev -- --open

pause
