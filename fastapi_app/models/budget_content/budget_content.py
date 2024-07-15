from __future__ import annotations
from abc import ABC, abstractmethod, ABCMeta
from typing import Optional, Annotated
from pydantic import BaseModel, Field
from sqlalchemy.orm import declarative_base, DeclarativeMeta
from sqlalchemy import Column, Integer, CHAR, Float, ForeignKey
from sqlalchemy.orm import relationship


"""
LÓGICA DE TODOS LOS BASEMODELS QUE ESTAN EN LA SESION BUDGETCONTENT 
"""

class ProjectCreateBaseModel(BaseModel):
    project_name: Annotated[str, Field(max_length=36, min_length=6)]
    client_description: Annotated[str, Field(max_length=56)]
    project_type: Annotated[str, Field(max_length=50)]
    client_name: Annotated[str, Field(max_length=50)]

class SupplyCreateBaseModel(BaseModel):
    supply_name: Annotated[str, Field(max_length=50)]
    supply_code: Annotated[str, Field(max_length=50)]
    price_per_unit: float
    description: Annotated[str,Field(max_length=50)]

# Definir la metaclase combinada
class CombinedMeta(DeclarativeMeta, ABCMeta):
    pass

Base = declarative_base(metaclass=CombinedMeta)

"""
Patron composite para hacer multiples tablas. 
"""
class BudgetComponent(ABC):
    @property
    def parent(self) -> Optional[BudgetComponent]:
        return self._parent

    @parent.setter
    def parent(self, parent: BudgetComponent):
        self._parent = parent

    def add(self, component: BudgetComponent) -> None:
        pass

    def remove(self, component: BudgetComponent) -> None:
        pass

    def is_composite(self) -> bool:
        return False

    @abstractmethod
    def operation(self) -> str:
        pass


#Clase padre del arbol binarario de clases de COMPOSITE
class BudgetProject(Base, BudgetComponent):
    __tablename__ = "budgetproject"
    project_id = Column(Integer, primary_key=True)
    project_name = Column(CHAR, nullable=False)
    client_description = Column(CHAR, nullable=True)
    project_type = Column(CHAR, nullable=False)
    client_name = Column(CHAR, nullable=False)

    def __init__(self, project_name, client_description, project_type, client_name):
        self.project_name = project_name
        self.client_description = client_description
        self.project_type = project_type
        self.client_name = client_name

    def add(self, component: BudgetComponent) -> None:
        pass

    def remove(self, component: BudgetComponent) -> None:
        pass

    def is_composite(self) -> bool:
        return True

    def operation(self) -> str:
        return f"Project: {self.project_name}"



"""
Zona de Insumos con el patron Composite. ESTO SE CAMBIARÁ A OTRO ARCHIVO, PERO TENEMOS LA LÓGICA POR LO MENOS. 
"""
class Supply(Base, BudgetComponent):
    __tablename__ = "supply"
    supply_id = Column(Integer, primary_key=True)
    supply_name = Column(CHAR, nullable=False)
    supply_code = Column(CHAR, nullable=False)
    price_per_unit = Column(Float, nullable=True)
    description= Column(CHAR, nullable=True)


    def __init__(self, supply_name, supply_code, price_per_unit, description):
        self.supply_name = supply_name
        self.supply_code = supply_code
        self.price_per_unit = price_per_unit
        self.description= description 
    
    def add(self, component: BudgetComponent) -> None:
        pass

    def remove(self, component: BudgetComponent) -> None:
        pass

    def operation(self) -> str:
        return f"Supply: {self.supply_name}, Type: {self.supply_type}, Price: {self.price_per_unit}"
