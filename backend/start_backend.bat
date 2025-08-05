@echo off
cd /d C:\projects\LoopTrade\looptrade_dashboard
call venv\Scripts\activate.bat
uvicorn backend.main:app --reload
