import sys
import os

# Agrega el directorio que contiene 'fastapi_app' al PYTHONPATH
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from threading import Lock
from fastapi_app.models.budget_content.budget_content import Base, BudgetProject, Supply

# Patrón de diseño Singleton: Metaclass para hacer la lógica de la conexión de la base de datos.
class DatabaseConnectionMeta(type):
    _instances = {}
    _lock: Lock = Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
        return cls._instances[cls]

class DatabaseConnection(metaclass=DatabaseConnectionMeta):
    def __init__(self, db_url):
        self._engine = create_engine(db_url)
        Base.metadata.create_all(self._engine)
        self._session_maker = sessionmaker(bind=self._engine)

    def get_engine(self):
        return self._engine

    def get_session(self):
        return self._session_maker()

def initialize_database():
    db_connection = DatabaseConnection('sqlite:///mydb.db')
    session = db_connection.get_session()
    Base.metadata.create_all(db_connection.get_engine())  # Asegurarse de que las tablas se creen

    # Aquí se puede agregar la inicialización de datos si es necesario en el futuro

    session.close()

# Esto se debe ejecutar manualmente si es necesario inicializar la base de datos
if __name__ == "__main__":
    initialize_database()
