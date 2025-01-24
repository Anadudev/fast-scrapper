import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.environ.get("GEMINI_API_KEY")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

# response = model.generate_content("Explain how AI works")
# print(response.text)
# print("Working")
