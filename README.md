# 🎌 Anime Translator

![Anime Translator Screenshot](public/screenshot.png)

> **Learn German while watching your favorite anime.**  
> Paste captions, get instant word-by-word translations, and visualize vocabulary complexity.

## ✨ Features

- **Word-for-Word Translation**: Hover over any word to see its translation in **English** or **Spanish**.
- **Complexity Analysis**: Visualize word difficulty with color-coded highlights (Green/Yellow/Red).
- **Smart Filtering**: Automatically ignores common function words (e.g., *die, und, mit*) to focus on vocabulary.
- **Google Cloud Integration**: Powered by Google Cloud Translation API for accurate results.
- **Premium UI**: Glassmorphism design with smooth animations and dark mode aesthetics.

## 🛠️ Tech Stack

### Frontend
- **React** (Vite)
- **Vanilla CSS** (Glassmorphism Design)

### Backend
- **Python** (FastAPI)
- **Spacy** (NLP & POS Tagging)
- **Pyphen** (Syllable Counting)
- **Google Cloud Translation API**

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.8+
- Google Cloud API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/anime-translator.git
    cd anime-translator
    ```

2.  **Frontend Setup**
    ```bash
    npm install
    ```

3.  **Backend Setup**
    ```bash
    # Create virtual environment
    python3 -m venv backend/venv
    source backend/venv/bin/activate

    # Install dependencies
    pip install -r backend/requirements.txt
    
    # Download German language model
    python -m spacy download de_core_news_sm
    ```

4.  **Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    VITE_GOOGLE_API_KEY=your_api_key_here
    ```

### Running the App

1.  **Start the Backend**
    ```bash
    # From root directory
    backend/venv/bin/python backend/main.py
    ```
    *Server runs on http://localhost:8000*

2.  **Start the Frontend**
    ```bash
    # Open a new terminal
    npm run dev
    ```
    *App runs on http://localhost:5173*

---

## 🌟 Features

- **Real-time Translation:** Uses Google Cloud API for accurate translations.
- **Smart Complexity Analysis:**
    - <span style="color: #4ade80">**Green:**</span> Common words (Top 1000).
    - <span style="color: #facc15">**Yellow:**</span> Less common words or abstract concepts.
    - <span style="color: #ef4444">**Red:**</span> Rare words, long compounds, or complex syllables.
    - **Ignored:** Function words (Articles, Prepositions, etc.) are automatically filtered to reduce noise.
- **Known Words:** Click any word to mark it as "Known" and ignore it in future.
- **Glassmorphism UI:** A premium, modern aesthetic.

## 📖 Usage

1. **Paste Captions**: Copy German subtitles from your video player and paste them into the text area.
2. **Translate**: Click the **"Translate & Analyze"** button.
3. **Learn**:
   - **Hover** over words to see translations.
   - **Toggle** "Show Word Complexity" to see difficulty levels.

## 🧪 Testing

To verify the API integration without the UI, run the included test script:

```bash
node test-api.mjs
```

## 📄 License

This project is licensed under the MIT License.
