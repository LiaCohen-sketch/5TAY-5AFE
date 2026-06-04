@echo off
cd /d "%~dp0"
py -3.12 -m pip install -r requirements.txt -q
py -3.12 app.py
