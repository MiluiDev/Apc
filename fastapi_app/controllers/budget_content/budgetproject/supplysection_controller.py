import sys
import os
from fastapi import APIRouter, HTTPException
from fastapi_app.models.database.database import DatabaseConnection
from fastapi_app.models.budget_content.budget_content import Supply, SupplyCreateBaseModel

router = APIRouter()

# Conexión a la base de datos, se cambiará en un futuro.
db_url = 'sqlite:///mydb.db'
db_connection = DatabaseConnection(db_url)

# Muestra todos los insumos.
@router.get("/supplies")
async def read_supplies():
    session = db_connection.get_session()
    try:
        supplies = session.query(Supply).all()
        supply_list = [{"supply_code": supply.supply_code, "supply_name": supply.supply_name, "price_per_unit": supply.price_per_unit, "description": supply.description} for supply in supplies]
        return supply_list
    finally:
        session.close()

# Crea un nuevo insumo.
@router.post("/create_supply")
async def create_supply(supply: SupplyCreateBaseModel):
    session = db_connection.get_session()
    try:
        new_supply = Supply(
            supply_name=supply.supply_name,
            supply_code=supply.supply_code,
            price_per_unit=supply.price_per_unit,
            description=supply.description,
        )
        session.add(new_supply)
        session.commit()
        session.refresh(new_supply)
        return {
            "supply_id": new_supply.supply_id,
            "supply_name": new_supply.supply_name,
            "supply_code": new_supply.supply_code,
            "price_per_unit": new_supply.price_per_unit,
            "description": new_supply.description
        }
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()


@router.delete("/delete_supply/{supply_code}")
async def delete_supply(supply_code: str):
    session = db_connection.get_session()
    try:
        supply = session.query(Supply).filter(Supply.supply_code == supply_code).first()
        if supply is None:
            raise HTTPException(status_code=404, detail="Supply not found")
        session.delete(supply)
        session.commit()
        return {"message": "Supply deleted successfully"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()