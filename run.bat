@echo off
title Fashion Outfit Recommendation System
color 0A

echo.
echo  =====================================================
echo    Fashion Outfit Recommendation System
echo    G H Raisoni College of Engineering, Jalgaon
echo  =====================================================
echo.
echo  Starting application...
echo.

python fashion_outfit_recommendation.py

if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Something went wrong. Trying with "py" launcher...
    echo.
    py fashion_outfit_recommendation.py
)

if %errorlevel% neq 0 (
    echo.
    echo  [ERROR] Could not start the application.
    echo  Make sure Python 3 is installed and added to PATH.
    echo.
    pause
)
