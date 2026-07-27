import json
import re
import ollama

# ======================================================
# OLLAMA MODEL
# ======================================================

MODEL_NAME = "llama3.2"

# ======================================================
# GENERATE TEXT
# ======================================================

def generate_text(prompt: str) -> str:
    """
    Sends a prompt to Ollama and returns the generated text.
    """

    try:

        response = ollama.chat(

            model=MODEL_NAME,

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]

        )

        return response["message"]["content"].strip()

    except Exception as e:

        print("Ollama Error:", e)

        raise Exception(f"Ollama Error: {e}")

# ======================================================
# CLEAN JSON RESPONSE
# ======================================================

def clean_json(text: str) -> str:
    """
    Removes markdown formatting if present.
    """

    text = text.replace("```json", "")
    text = text.replace("```", "")

    return text.strip()

# ======================================================
# EXTRACT JSON
# ======================================================

def extract_json(text: str):
    """
    Extracts the first valid JSON object from the AI response.
    """

    text = clean_json(text)

    try:
        return json.loads(text)

    except Exception:

        match = re.search(r"\{.*\}", text, re.DOTALL)

        if match:

            try:
                return json.loads(match.group())

            except Exception:
                pass

        raise Exception("Unable to parse JSON response from AI.")

# ======================================================
# GENERATE JSON RESPONSE
# ======================================================

def generate_json(prompt: str):

    try:

        response = ollama.chat(

            model=MODEL_NAME,

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            format="json",

            options={
                "temperature": 0.2,
                "num_predict": 500
            }

        )

        content = response["message"]["content"]

        print("\n========== AI RESPONSE ==========")
        print(content)
        print("=================================\n")


        return json.loads(content)


    except Exception as e:

        print("JSON Generation Error:", e)

        raise Exception(
            f"AI JSON generation failed: {e}"
        )