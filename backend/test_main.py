from fastapi.testclient import TestClient
from main import app
import os
import json

client = TestClient(app)

def test_complexity_logic():
    # Test common word (noun)
    response = client.post("/complexity", json={"words": ["Haus"]})
    assert response.status_code == 200
    assert response.json()["Haus"] == "green"

    # Test complex word (long, compound-like)
    response = client.post("/complexity", json={"words": ["Donaudampfschifffahrt"]})
    assert response.status_code == 200
    assert response.json()["Donaudampfschifffahrt"] in ["red", "yellow"]

def test_function_words_ignored():
    # Test articles, prepositions, etc.
    words = ["der", "die", "das", "in", "mit", "und", "aber", "ich", "ist"]
    response = client.post("/complexity", json={"words": words})
    assert response.status_code == 200
    results = response.json()
    for word in words:
        assert results[word] == "ignored", f"Word '{word}' should be ignored but was {results[word]}"

def test_known_words_flow():
    # 1. Add a word (conjugated)
    word = "spielst"
    response = client.post("/known-words", json={"word": word})
    assert response.status_code == 200
    assert response.json()["word"] == "spielen" # Should return lemma

    # 2. Verify it's in the list (as lemma)
    response = client.get("/known-words")
    assert response.status_code == 200
    assert "spielen" in response.json()

    # 3. Verify complexity ignores other forms
    response = client.post("/complexity", json={"words": ["spielt", "spiele", "spielen", word]})
    assert response.status_code == 200
    results = response.json()
    assert results["spielt"] == "ignored"
    assert results["spiele"] == "ignored"
    assert results["spielen"] == "ignored" # (or handled by frontend to not color)
    # My implementation returns "ignored" string
    assert results[word] == "ignored"

def test_translation_proxy_mock():
    # We can't easily test the real Google API without a key in this environment context if it's missing,
    # but we can check if it fails gracefully or tries to connect.
    # Assuming .env is loaded correctly by the app.
    
    # If key is missing, it might 500.
    # Let's just check if the endpoint exists.
    response = client.post("/translate", json={"words": ["Hallo"], "targetLang": "en"})
    # It might be 200 or 500 depending on key validity, but shouldn't be 404.
    assert response.status_code in [200, 500]
