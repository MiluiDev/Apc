import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.budget_content import budgetContent_controller
# Añadir el directorio de fastapi al PYTHONPATH para que podamos ejecutar 
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# FastAPI
app = FastAPI()
app.include_router(budgetContent_controller.router)

# CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Rutas
@app.get("/")
async def read_root():
    return {"Hello": "Github!"}