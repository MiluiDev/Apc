import React, { useState, useEffect } from "react";
import './Budgetcontent.css';
import starIcon from '../../assets/budgetcontent_assets/icons/starIcon.svg'
import trashIcon from '../../assets/budgetcontent_assets/icons/trashIcon.svg'


function Budgetcontent() {
    // Estado para manejar la selección de todos los elementos
    const [selectAll, setSelectAll] = useState(false);
    // Estado para manejar la lista de elementos seleccionados
    const [selectedItems, setSelectedItems] = useState([]);
    // Lista de nombres de proyectos
    const items = ['Customer Success', 'Dev / Directions']; // Agrega todos los nombres de los proyectos aquí SE AGREGARÁ UNA LÓGICA EN LA BASE DE DATOS QUE BUSQUE TODAS LAS INFORMACIONES.

    // useEffect para actualizar el estado de 'selectAll' basado en los elementos seleccionados
    useEffect(() => {
        setSelectAll(selectedItems.length === items.length);
    }, [selectedItems]);

    // Función para manejar la selección/des-selección de todos los elementos
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
            setSelectedItems(items); // Seleccionar todos los elementos
        } else {
            setSelectedItems([]); // Deseleccionar todos los elementos
        }
    };

    // Función para manejar la selección/des-selección de un elemento individual
    const handleSelectItem = (event, itemName) => {
        const isChecked = event.target.checked;
        setSelectedItems((prevSelectedItems) => {
            if (isChecked) {
                return [...prevSelectedItems, itemName]; // Agregar el elemento a la lista de seleccionados
            } else {
                return prevSelectedItems.filter(item => item !== itemName); // Eliminar el elemento de la lista de seleccionados
            }
        });
    };

    return (
        <section className="projects_content" role="main">
            <div className="header">
                <h1>Budget</h1>
                <button className="create_button">Create Budget</button>
            </div>

            <div className="search_section">
                <label>
                    {/* Checkbox para seleccionar o deseleccionar todos los elementos */}
                    <input 
                        type="checkbox" 
                        className="select_all" 
                        checked={selectAll} 
                        onChange={handleSelectAll} 
                    />
                    Select all
                </label>
                {selectedItems.length === 0 ? (
                    // Mostrar filtros si no hay elementos seleccionados
                    <div className="filters">
                        <select className="group_by">
                            <option value="none">Group by: None</option>
                        </select>
                        <select className="filter">
                            <option value="active">Filter: Active</option>
                        </select>
                        <input 
                            type="text" 
                            className="search_input" 
                            placeholder="Search budgets.." 
                        />
                    </div>
                ) : (
                    // Mostrar acciones si hay elementos seleccionados
                    <div className="actions">
                        <span>{selectedItems.length} Selected</span>
                        <button className="action_button" title="Mark as favorite">
                            <img src={starIcon} alt="Mark as favorite" className="action-icon"/>
                        </button>
                        <button className="action_button" title="Mark as favorite">
                            <img src={trashIcon} alt="Delete project" className="action-icon"/>
                        </button>

                    </div>
                )}
            </div>

            <div className="budget_list">
                {/* Mapear sobre los elementos para crear la lista de proyectos */}
                {items.map(item => (
                    <div key={item} className="budget_item">
                        {/* Checkbox para seleccionar o deseleccionar un elemento individual */}
                        <input 
                            type="checkbox" 
                            className="select_project" 
                            checked={selectedItems.includes(item)} 
                            onChange={(e) => handleSelectItem(e, item)} 
                        />
                        <div className="project_details">
                            <div className="project_name">{item}</div> {/*Aquí se va agregar la lógica de que se debe buscar en la base de datos todos los proyectos y mostrarlos. */}
                            <div className="client_name">Everhour</div>
                        </div>
                        <div className="project_meta">
                            <div className="project_status"> asdsa dasdsadasdsa3578hsssssss4800hsadas (75%)</div> {/* Esta es la descripcion. La descripcion de proyecto como maximo puede tener 46 caracteres */}
                            <div className="project_type">Hourly</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Budgetcontent;
