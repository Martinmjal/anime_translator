from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
from services.nlp import analyze_word_complexity
from services.storage import load_known_words

router = APIRouter()

class ComplexityRequest(BaseModel):
    words: List[str]

@router.post("/complexity")
def analyze_complexity(req: ComplexityRequest):
    results = {}
    known_words = load_known_words()
    
    for word in req.words:
        results[word] = analyze_word_complexity(word, known_words)
        
    return results
