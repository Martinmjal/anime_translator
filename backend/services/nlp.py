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
    
    # Function Words to Ignore (Articles, Prepositions, Conjunctions, Pronouns, Particles, Auxiliaries)
    ignored_pos = {"DET", "ADP", "CCONJ", "SCONJ", "PRON", "PART", "AUX"}
    if token and token.pos_ in ignored_pos:
        return "ignored"
        
    is_abstract = token and token.pos_ in ["ADV"]
    is_compound = len(word) > 12 # Simple heuristic for now
    
    # 3. Logic
    color = "red" # Default to complex
    
    # Check word itself or its lemma
    lemma = get_lemma(word)
    
    # 1. Check Known Words (Check both word and lemma)
    if clean_word in known_words or lemma in known_words:
        return "ignored"
    
    target_word = clean_word
    if clean_word not in top_5000 and lemma in top_5000:
        target_word = lemma
        
    if target_word in top_1000:
        color = "green"
        # Exception: Long words are never green
        if syllables > 3:
            color = "yellow"
    elif target_word in top_5000:
        color = "yellow"
    
    # Overrides
    if is_abstract and target_word not in top_1000:
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

def get_lemma(word: str) -> str:
    clean_word = word.strip().lower()
    doc = nlp(word)
    token = doc[0] if len(doc) > 0 else None
    
    if not token:
        return clean_word
        
    lemma = token.lemma_.lower()
    
    # Heuristic for 2nd person singular (ends in 'st')
    # Spacy often fails "kommst" -> "kommsen".
    # Try converting "kommst" -> "kommt" and use "er" context.
    if clean_word.endswith("st"):
        candidate = clean_word[:-2] + "t"
        doc_er = nlp(f"er {candidate}")
        if len(doc_er) > 1:
            lemma_er = doc_er[1].lemma_.lower()
            # If this lemma is in top_5000, it's a winner.
            if lemma_er in top_5000:
                return lemma_er
            # If not, keep it as a strong candidate if the original lemma was just the word itself
            if lemma == clean_word:
                lemma = lemma_er

    # If lemma is still not in list, try "wir" context (good for infinitives/plurals)
    if lemma not in top_5000:
         doc_verb = nlp(f"wir {word}")
         if len(doc_verb) > 1:
             lemma_verb = doc_verb[1].lemma_.lower()
             if lemma_verb in top_5000:
                 return lemma_verb
             # If we still haven't found a top_5000 word, but we found a different lemma via context,
             # and we haven't already found a "better" one via the 'st' heuristic...
             # Actually, 'st' heuristic result (lemma) is probably better than 'wir' result ("kommsen")
             # so only update if we didn't change it yet?
             if lemma == clean_word and lemma_verb != clean_word:
                 lemma = lemma_verb
                 
    return lemma
