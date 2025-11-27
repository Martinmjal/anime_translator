from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from services.storage import load_known_words, save_known_word

router = APIRouter()

class KnownWordRequest(BaseModel):
    word: str

@router.get("/known-words")
def get_known_words():
    return list(load_known_words())

@router.post("/known-words")
def add_known_word(req: KnownWordRequest):
    word = req.word.lower().strip()
    if word:
        try:
            save_known_word(word)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
            
    return {"status": "success", "word": word}
