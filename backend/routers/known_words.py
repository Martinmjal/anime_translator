from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from services.storage import load_known_words, save_known_word

from services.nlp import get_lemma

router = APIRouter()

class KnownWordRequest(BaseModel):
    word: str

@router.get("/known-words")
def get_known_words():
    return list(load_known_words())

@router.post("/known-words")
def add_known_word(req: KnownWordRequest):
    raw_word = req.word.strip()
    if raw_word:
        # Save the lemma instead of the raw word
        lemma = get_lemma(raw_word)
        try:
            save_known_word(lemma)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
            
    return {"status": "success", "word": lemma}
