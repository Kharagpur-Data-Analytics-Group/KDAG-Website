# KDAG Website

Web application for KDAG (Kharagpur Data Analytics Group) with React frontend and Flask backend.

## Project Structure

```
KDAG-Website/
├── backend/          # Flask Python backend
├── frontend/         # React frontend
└── README.md
```

## Local Development

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # macOS/Linux
   # venv\Scripts\activate    # Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend:**
   ```bash
   python app.py
   ```
   Server runs on `http://localhost:5001`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the frontend:**
   ```bash
   npm run dev
   # or
   npm start
   ```
   App runs on `http://localhost:3000`

## Available Scripts

### Frontend
- `npm run dev` - Start development server (recommended)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Build and serve production build locally

### Backend
- `python app.py` - Start Flask development server

---

For more details, visit [KDAG Website](https://www.kdagiitkgp.com)
