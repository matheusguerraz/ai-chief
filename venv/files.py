import os
from dotenv import load_dotenv
# Acessar as constantes definidas no arquivo .env
load_dotenv()

api_key = os.getenv("API_KEY")

print("API Key:", api_key)  
