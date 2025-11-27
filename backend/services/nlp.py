import spacy
import pyphen
import os
import json

# Load NLP models
try:
    nlp = spacy.load("de_core_news_sm")
except OSError:
    print("Downloading language model...")
    from spacy.cli import download
    download("de_core_news_sm")
    nlp = spacy.load("de_core_news_sm")

dic = pyphen.Pyphen(lang='de')

# Load Frequency Data
FREQUENCY_FILE = os.path.join(os.path.dirname(__file__), '../data/german_frequency.json')
top_1000 = set()
top_5000 = set()

if os.path.exists(FREQUENCY_FILE):
    try:
        with open(FREQUENCY_FILE, 'r') as f:
            freq_list = json.load(f)
            # freq_list is ordered list of strings
            for i, word in enumerate(freq_list):
                clean = word.lower()
                if i < 1000:
                    top_1000.add(clean)
                if i < 5000:
                    top_5000.add(clean)
    except Exception as e:
        print(f"Error loading frequency list: {e}")

def analyze_word_complexity(word: str, known_words: set) -> str:
    clean_word = word.strip().lower()
    if not clean_word:
        return "ignored"
        
    # 1. Check Known Words
    if clean_word in known_words:
        return "ignored"

    # 2. NLP Analysis
    # Syllables
    syllables = dic.inserted(word).count('-') + 1
    
    # Spacy Analysis (for POS and Compounds)
    doc = nlp(word)
    token = doc[0] if len(doc) > 0 else None
    
    is_compound = len(word) > 12 # Simple heuristic for now
    
    # Function Words to Ignore (Articles, Prepositions, Conjunctions, Pronouns, Particles, Auxiliaries)
    ignored_pos = {"DET", "ADP", "CCONJ", "SCONJ", "PRON", "PART", "AUX"}
    if token and token.pos_ in ignored_pos:
        return "ignored"
        
    is_abstract = token and token.pos_ in ["ADV"]
    
    # 3. Logic
    color = "red" # Default to complex
    
    if clean_word in top_1000:
        color = "green"
        # Exception: Long words are never green
        if syllables > 3:
            color = "yellow"
    elif clean_word in top_5000:
        color = "yellow"
    
    # Overrides
    if is_abstract and clean_word not in top_1000:
        color = "yellow"
    
    if syllables >= 4:
        color = "red"
        
    if is_compound:
         # Long compounds are red
         if len(word) > 15:
             color = "red"
         else:
             color = "yellow"

    return color
