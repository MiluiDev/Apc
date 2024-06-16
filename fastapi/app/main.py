from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Añadir el directorio de fastapi al PYTHONPATH para que podamos ejecutar 
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

#FastAPI
app = FastAPI()

#CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


#Rutas
@app.get("/")
async def read_root():
    return {"Hello": "World"}
