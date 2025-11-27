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

- **Frontend**: React + Vite
- **Styling**: Vanilla CSS (Custom Glassmorphism Design)
- **API**: Google Cloud Translation API

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A Google Cloud API Key with Cloud Translation API enabled.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Martinmjal/anime_translator.git
   cd anime_translator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Google Cloud API Key:
   ```env
   VITE_GOOGLE_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

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
