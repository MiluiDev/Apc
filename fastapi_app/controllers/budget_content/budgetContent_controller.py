import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))
from fastapi_app.models.budget_content.budget_content import BudgetProject
from fastapi import APIRouter, HTTPException
from fastapi_app.models.database.database import DatabaseConnection
from fastapi_app.models.budget_content.budget_content import ProjectCreateBaseModel

# Añadir el directorio de fastapi al PYTHONPATH para que podamos ejecutar 
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# FastAPI ROUTER
router = APIRouter()


#Conexion a la base de datos, se cambiará en un futuro.
db_url = 'sqlite:///mydb.db'
db_connection = DatabaseConnection(db_url)


# Muestra todos los proyectos.
@router.get("/projects")
async def read_projects():
    session = db_connection.get_session()
    try:
        projects = session.query(BudgetProject).all()
        project_list = [{"project_name": project.project_name, "project_id": project.project_id, "client_description": project.client_description, "project_type": project.project_type, "client_name": project.client_name} for project in projects]
        return project_list
    finally:
        session.close()


@router.post("/create_project")
async def create_project(project: ProjectCreateBaseModel):
    session = db_connection.get_session()
    try:
        new_project = BudgetProject(
            project_name=project.project_name,
            client_description=project.client_description,
            project_type=project.project_type,
            client_name=project.client_name
)
        session.add(new_project)
        session.commit()
        session.refresh(new_project)
        return {
            "project_name": new_project.project_name,
            "project_id": new_project.project_id,
            "client_description": new_project.client_description,
            "project_type": new_project.project_type,
            "client_name": new_project.client_name
        }
    
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()



# Elimina un proyecto por su ID.
@router.delete("/delete_project/{project_id}")
async def delete_project(project_id: int):
    session = db_connection.get_session()
    try:
        project = session.query(BudgetProject).filter(BudgetProject.project_id == project_id).first()
        if project is None:
            raise HTTPException(status_code=404, detail="Project not found")
        session.delete(project)
        session.commit()
        return {"message": "Project deleted successfully"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()

# Actualiza un proyecto por su ID.
@router.put("/update_project/{project_id}")
async def update_project(project_id: int, project: ProjectCreateBaseModel):
    session = db_connection.get_session()
    try:
        existing_project = session.query(BudgetProject).filter(BudgetProject.project_id == project_id).first()
        if existing_project is None:
            raise HTTPException(status_code=404, detail="Project not found")
        
        existing_project.project_name = project.project_name
        existing_project.client_description = project.client_description
        existing_project.project_type = project.project_type
        existing_project.client_name = project.client_name

        session.commit()
        session.refresh(existing_project)
        return {
            "project_name": existing_project.project_name,
            "project_id": existing_project.project_id,
            "client_description": existing_project.client_description,
            "project_type": existing_project.project_type,
            "client_name": existing_project.client_name
        }
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()