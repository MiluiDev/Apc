import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from controllers.budget_content import budgetContent_controller
from controllers.login_content import loginContent_controller

# Añadir el directorio de fastapi al PYTHONPATH para que podamos ejecutar 
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))






# FastAPI
app = FastAPI()
app.include_router(budgetContent_controller.router)


# CORS CONFIGURATION
app.add_middleware(SessionMiddleware, secret_key="some-random-string")  # Cambia "some-random-string" por una clave secreta segura
app.add_middleware(CORSMiddleware,
                   allow_origins=['http://localhost:3000'],
                   allow_credentials=True,
                   allow_methods=['*'],
                   allow_headers=['*'])

# Rutes
@app.get("/")
async def read_root():
    return {"Hello": "Github!"}