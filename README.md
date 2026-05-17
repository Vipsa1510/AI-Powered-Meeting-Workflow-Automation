# AI Meeting Assistant

An AI-powered meeting assistant that analyzes meeting transcripts, extracts action items, identifies decisions, and generates professional follow-up emails using Gemini AI.

---

# Features

- AI-powered meeting summarization
- Action item extraction
- Deadline detection
- Decision extraction
- Professional follow-up email generation
- Transcript upload support (.txt and .vtt)
- Drag & Drop file upload
- Copy summary functionality
- Copy email functionality
- Markdown export

---

# Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

## Backend
- FastAPI
- Python
- Gemini API

---

# Project Structure

```bash
backend/
frontend/
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Create virtual environment

```bash
python -m venv venv
```

## Activate virtual environment

### Mac/Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

## Install dependencies

```bash
pip install -r requirements.txt
```

## Create .env file

```env
GEMINI_API_KEY=your_api_key
MODEL_NAME=gemini-2.5-flash
```

## Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Supported File Types

- .txt
- .vtt

---

