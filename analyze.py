import os
import sys
import json
import re
from google import genai
from dotenv import load_dotenv
from PIL import Image

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def run_analysis(image_path, style, accessories_json):
    try:
        img = Image.open(image_path)

        accessories = []
        try:
            accessories = json.loads(accessories_json)
        except Exception:
            pass

        accessories_line = (
            f"The user is also wearing these accessories: {', '.join(accessories)}."
            if accessories
            else "The user has not specified any accessories."
        )

        prompt = f"""Analyze this outfit photo for styling feedback.

The user's target style is: {style}.
{accessories_line}

Return ONLY valid JSON in this exact shape:
{{
  "summary": "string",
  "visible_items": ["string"],
  "color_palette": ["string"],
  "strengths": ["string"],
  "improvements": ["string"],
  "accessory_suggestions": ["string"],
  "layering_suggestions": ["string"],
  "confidence_notes": "string"
}}

Rules:
- Only comment on visible outfit and styling elements.
- Do not guess age, ethnicity, gender identity, or body-related sensitive traits.
- Keep suggestions practical and fashion-focused.
- Do not include markdown fences.""".strip()

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, img]
        )

        text = response.text.strip()
        # Strip markdown fences if the model wraps the output
        text = re.sub(r'^```(?:json)?\s*', '', text)
        text = re.sub(r'\s*```$', '', text).strip()

        parsed = json.loads(text)
        print(json.dumps(parsed))

    except Exception as e:
        fallback = {
            "summary": "Analysis failed.",
            "visible_items": [],
            "color_palette": [],
            "strengths": [],
            "improvements": [],
            "accessory_suggestions": [],
            "layering_suggestions": [],
            "confidence_notes": str(e),
        }
        print(json.dumps(fallback))

if __name__ == "__main__":
    if len(sys.argv) > 3:
        run_analysis(sys.argv[1], sys.argv[2], sys.argv[3])
    else:
        print(json.dumps({"error": "Usage: analyze.py <image_path> <style> <accessories_json>"}))