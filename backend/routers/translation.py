from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import os
import requests

router = APIRouter()

class TranslateRequest(BaseModel):
    words: List[str]
    targetLang: str

@router.post("/translate")
def translate(req: TranslateRequest):
    api_key = os.getenv("VITE_GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API Key not configured on server.")

    url = "https://translation.googleapis.com/language/translate/v2"
    
    # Google API expects 'q' parameter repeated for multiple words
    params = {
        "key": api_key,
        "target": req.targetLang,
        "q": req.words
    }
    
    try:
        response = requests.post(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        translations = {}
        if "data" in data and "translations" in data["data"]:
            for i, item in enumerate(data["data"]["translations"]):
                translations[req.words[i]] = item["translatedText"]
        
        return translations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
