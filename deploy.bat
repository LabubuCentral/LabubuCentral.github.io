@echo off
REM ============================
REM GitHub Pages Upload Script (Fixed)
REM ============================

REM Set your local folder path
SET LocalFolder=C:\LabubuWebsite

REM Set your GitHub repository URL
SET RepoURL=https://github.com/LabubuCentral/LabubuCentral.github.io.git

REM Navigate to your local folder
cd /d "%LocalFolder%"

REM Initialize git if not already done
git init

REM Add remote if not already set
git remote add origin %RepoURL%

REM Rename branch to main
git branch -M main

REM Stage all changes
git add .

REM Commit changes
git commit -m "Upload website files"

REM Push to GitHub Pages (main branch)
git push -u origin main

echo Upload complete!
pause
