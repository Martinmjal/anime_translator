from backend.routers.translation import translate, TranslateRequest
from unittest.mock import patch, MagicMock
import os

# Mock environment variable
os.environ["VITE_GOOGLE_API_KEY"] = "fake_key"

def test_batching_logic():
    # Create a list of 250 words (should be 3 chunks: 100, 100, 50)
    words = [f"word_{i}" for i in range(250)]
    req = TranslateRequest(words=words, targetLang="en")
    
    with patch("requests.post") as mock_post:
        # Mock response for each chunk
        def side_effect(url, params):
            chunk_words = params["q"]
            return MagicMock(
                json=lambda: {
                    "data": {
                        "translations": [
                            {"translatedText": f"translated_{w}"} for w in chunk_words
                        ]
                    }
                },
                raise_for_status=lambda: None
            )
        
        mock_post.side_effect = side_effect
        
        result = translate(req)
        
        # Verify result count
        assert len(result) == 250
        assert result["word_0"] == "translated_word_0"
        assert result["word_249"] == "translated_word_249"
        
        # Verify requests count (ceil(250/100) = 3)
        assert mock_post.call_count == 3
        print("✅ Batching test passed! 3 requests made for 250 words.")

if __name__ == "__main__":
    try:
        test_batching_logic()
    except Exception as e:
        print(f"❌ Test failed: {e}")
