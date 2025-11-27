import os
import json

KNOWN_WORDS_FILE = os.path.join(os.path.dirname(__file__), '../known_words.json')

def load_known_words() -> set:
    known_words = set()
    if os.path.exists(KNOWN_WORDS_FILE):
        try:
            with open(KNOWN_WORDS_FILE, 'r') as f:
                known_words = set(json.load(f))
        except Exception as e:
            print(f"Error loading known words: {e}")
    return known_words

def save_known_word(word: str):
    known_words = load_known_words()
    known_words.add(word)
    try:
        with open(KNOWN_WORDS_FILE, 'w') as f:
            json.dump(list(known_words), f)
    except Exception as e:
        raise Exception(f"Failed to save: {e}")
    return known_words
