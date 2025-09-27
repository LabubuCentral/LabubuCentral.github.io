@echo off
REM ===============================
REM LabubuCentral Deployment Script
REM ===============================

REM 1. Navigate to your repo directory (change if different)
cd /d C:\LabubuWebsite

REM 2. Ensure we're on the main branch
git checkout main

REM 3. Stage all changes
git add .

REM 4. Commit changes (only if there are any)
git diff --cached --quiet
if %errorlevel% neq 0 (
    git commit -m "Auto-deploy on %date% at %time%"
)

REM 5. Fetch latest from GitHub
git fetch origin

REM 6. Rebase local commits on top of remote
git rebase origin/main

REM 7. Push changes to GitHub
git push origin main

REM ===============================
echo Deployment complete!
pause
