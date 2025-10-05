#!/bin/bash
cd backend
pip install -r requirements.txt
python seed_db.py
echo "API: http://localhost:8000 | Docs: http://localhost:8000/docs"
uvicorn main:app --reload --host 0.0.0.0 --port 8000
