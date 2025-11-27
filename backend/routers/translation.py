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
    
    # Google API limit is 128 segments. We use 100 to be safe.
    CHUNK_SIZE = 100
    
    all_translations = {}
    
    # Helper to chunk list
    def chunk_list(lst, n):
        for i in range(0, len(lst), n):
            yield lst[i:i + n]
            
    chunks = list(chunk_list(req.words, CHUNK_SIZE))
    
    try:
        for chunk in chunks:
            # Google API expects 'q' parameter repeated for multiple words
            params = {
                "key": api_key,
                "target": req.targetLang,
                "q": chunk
            }
            
            response = requests.post(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if "data" in data and "translations" in data["data"]:
                for i, item in enumerate(data["data"]["translations"]):
                    all_translations[chunk[i]] = item["translatedText"]
        
        return all_translations
    except Exception as e:
        print(f"Translation error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
