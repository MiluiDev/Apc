import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import './Budgetcontent.css';
import axios from "axios";
import starIcon from '../../assets/budgetcontent_assets/icons/starIcon.svg';
import trashIcon from '../../assets/budgetcontent_assets/icons/trashIcon.svg';
import threeDotsIcon from '../../assets/budgetcontent_assets/icons/threeDotsIcon.svg';

function Budgetcontent() {
    // Estado para manejar la selección de todos los elementos
    const [selectAll, setSelectAll] = useState(false);
    // Estado para manejar la lista de elementos seleccionados
    const [selectedItems, setSelectedItems] = useState([]);
    // Estado para manejar el panel de detalles
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // Estado para manejar el panel de creación
    const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false);
    const [newProject, setNewProject] = useState({ project_name: '', client_description: '', project_type: '', client_name: '' });
    // Estado para manejar los cambios en el formulario de edición
    const [editProject, setEditProject] = useState({ project_name: '', client_description: '', project_type: '', client_name: '' });
    // Estado para manejar la lista de proyectos de presupuesto obtenidos de la base de datos
    const [projects, setProjects] = useState([]);
    // Estado para manejar la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para manejar los mensajes de error
    const [errors, setErrors] = useState({});

    const detailPanelRef = useRef(null);
    const createPanelRef = useRef(null);

    // Fetch de proyectos desde la API al montar el componente
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/projects/');
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    // Actualiza el estado de selectAll basado en los elementos seleccionados
    useEffect(() => {
        setSelectAll(selectedItems.length === projects.length);
    }, [selectedItems, projects]);

    // Maneja clicks fuera de los paneles para cerrarlos
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailPanelRef.current && !detailPanelRef.current.contains(event.target) && isPanelOpen) {
                setIsPanelOpen(false);
            }
            if (createPanelRef.current && !createPanelRef.current.contains(event.target) && isCreatePanelOpen) {
                setIsCreatePanelOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPanelOpen, isCreatePanelOpen]);

    // Función para manejar la selección/des-selección de todos los elementos
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
            const allProjectIds = projects.map(project => project.project_id);
            setSelectedItems(allProjectIds);
        } else {
            setSelectedItems([]);
        }
    };

    // Función para manejar la selección/des-selección de un elemento individual
    const handleSelectItem = (event, projectId) => {
        const isChecked = event.target.checked;
        setSelectedItems((prevSelectedItems) => {
            if (isChecked) {
                return [...prevSelectedItems, projectId];
            } else {
                return prevSelectedItems.filter(item => item !== projectId);
            }
        });
    };

    // Función para alternar el panel de detalles y establecer el proyecto seleccionado
    const togglePanel = (item) => {
        setIsPanelOpen(!isPanelOpen);
        setSelectedItem(item);
        if (item) {
            const project = projects.find(project => project.project_name === item);
            setEditProject({ ...project });
        }
    };

    // Función para alternar el panel de creación
    const toggleCreatePanel = () => {
        setIsCreatePanelOpen(!isCreatePanelOpen);
    };

    // Función para validar los campos de entrada
    const validateInput = (name, value) => {
        let error = '';
        if (name === 'project_name') {
            if (!value) {
                error = 'Project name is required';
            } else if (value.length < 6) {
                error = 'Project name must be at least 6 characters';
            } else if (value.length > 36) {
                error = 'Project name must be less than 36 characters';
            }
        } else if (name === 'client_description') {
            if (value.length > 56) {
                error = 'Client description must be less than 56 characters';
            }
        }
        return error;
    };

    // Función para manejar los cambios en los inputs de creación y edición
    const handleInputChange = (e, setFunction) => {
        const { name, value } = e.target;
        setFunction(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: validateInput(name, value) }));
    };

    // Función para crear un nuevo proyecto
    const handleCreateProject = async () => {
        const projectErrors = {};
        Object.keys(newProject).forEach(key => {
            const error = validateInput(key, newProject[key]);
            if (error) {
                projectErrors[key] = error;
            }
        });
        if (Object.keys(projectErrors).length > 0) {
            setErrors(projectErrors);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/create_project/', newProject);
            setProjects([...projects, response.data]);
            setNewProject({ project_name: '', client_description: '', project_type: '', client_name: '' });
            setIsCreatePanelOpen(false);
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    // Función para eliminar proyectos seleccionados
    const handleDeleteProject = async () => {
        try {
            for (const projectId of selectedItems) {
                await axios.delete(`http://localhost:5000/delete_project/${projectId}`);
            }
            setProjects(projects.filter(project => !selectedItems.includes(project.project_id)));
            setSelectedItems([]);
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    // Función para actualizar un proyecto existente
    const handleUpdateProject = async () => {
        const projectErrors = {};
        Object.keys(editProject).forEach(key => {
            const error = validateInput(key, editProject[key]);
            if (error) {
                projectErrors[key] = error;
            }
        });
        if (Object.keys(projectErrors).length > 0) {
            setErrors(projectErrors);
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/update_project/${editProject.project_id}`, editProject);
            setProjects(projects.map(project => (project.project_id === editProject.project_id ? response.data : project)));
            setIsPanelOpen(false);
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    // Función para manejar los cambios en la barra de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtrar proyectos según el término de búsqueda
    const filteredProjects = projects.filter(project => 
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="projects_content" role="main">
            <div className="header">
                <h1>Budget</h1>
                <button className="create_button" onClick={toggleCreatePanel}>Create Budget</button>
            </div>

            <div className="search_section">
                <label>
                    <input 
                        type="checkbox" 
                        className="select_all" 
                        checked={selectAll} 
                        onChange={handleSelectAll} />
                    Select all
                </label>
                {selectedItems.length === 0 ? (
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
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                ) : (
                    <div className="actions">
                        <span>{selectedItems.length} Selected</span>
                        <button className="action_button" title="Mark as favorite">
                            <img src={starIcon} alt="Mark as favorite" className="action-icon"/>
                        </button>
                        <button className="action_button" title="Delete project" onClick={handleDeleteProject}>
                            <img src={trashIcon} alt="Delete project" className="action-icon"/>
                        </button>
                    </div>
                )}
            </div>

            <div className="budget_list">
                {filteredProjects.map(project => (
                    <div key={project.project_id} className="budget_item">
                        <div className="left_section">
                            <input
                                type="checkbox"
                                className="select_project"
                                checked={selectedItems.includes(project.project_id)}
                                onChange={e => handleSelectItem(e, project.project_id)}
                            />
                            <div className="project_details">
                                <div className="project_name">
                                    <Link to="/budgetproject">{project.project_name}</Link>
                                    <div className="three_dots" onClick={() => togglePanel(project.project_name)}>
                                        <img src={threeDotsIcon} alt="Options" className="three-dots-icon"/>
                                    </div>
                                </div>
                                <div className="client_name">{project.client_name}</div>
                            </div>
                        </div>
                        <div className="right_section">
                            <div className="project_meta">
                                <div className="project_status">{project.client_description}</div>
                                <div className="project_type">{project.project_type}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div ref={detailPanelRef} className={`detail_panel ${isPanelOpen ? 'open' : ''}`}>
                <h2>Edit Project</h2>
                <label>
                    Project Name:
                    <input 
                        type="text" 
                        name="project_name" 
                        value={editProject.project_name} 
                        onChange={(e) => handleInputChange(e, setEditProject)} 
                        onBlur={(e) => setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: validateInput(e.target.name, e.target.value) }))}
                    />
                    {errors.project_name && <p className="error">{errors.project_name}</p>}
                </label>
                <label>
                    Client Description:
                    <input 
                        type="text" 
                        name="client_description" 
                        value={editProject.client_description} 
                        onChange={(e) => handleInputChange(e, setEditProject)} 
                        onBlur={(e) => setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: validateInput(e.target.name, e.target.value) }))}
                    />
                    {errors.client_description && <p className="error">{errors.client_description}</p>}
                </label>
                <label>
                    Project Type:
                    <input 
                        type="text" 
                        name="project_type" 
                        value={editProject.project_type} 
                        onChange={(e) => handleInputChange(e, setEditProject)} 
                    />
                </label>
                <label>
                    Client Name:
                    <input 
                        type="text" 
                        name="client_name" 
                        value={editProject.client_name} 
                        onChange={(e) => handleInputChange(e, setEditProject)} 
                    />
                </label>
                <button onClick={handleUpdateProject}>Update Project</button>
            </div>

            <div ref={createPanelRef} className={`create_panel ${isCreatePanelOpen ? 'open' : ''}`}>
                <h2>Create New Project</h2>
                <label>
                    Project Name:
                    <input 
                        type="text" 
                        name="project_name" 
                        value={newProject.project_name} 
                        onChange={(e) => handleInputChange(e, setNewProject)} 
                        onBlur={(e) => setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: validateInput(e.target.name, e.target.value) }))}
                    />
                    {errors.project_name && <p className="error">{errors.project_name}</p>}
                </label>
                <label>
                    Client Description:
                    <input 
                        type="text" 
                        name="client_description" 
                        value={newProject.client_description} 
                        onChange={(e) => handleInputChange(e, setNewProject)} 
                        onBlur={(e) => setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: validateInput(e.target.name, e.target.value) }))}
                    />
                    {errors.client_description && <p className="error">{errors.client_description}</p>}
                </label>
                <label>
                    Project Type:
                    <input 
                        type="text" 
                        name="project_type" 
                        value={newProject.project_type} 
                        onChange={(e) => handleInputChange(e, setNewProject)} 
                    />
                </label>
                <label>
                    Client Name:
                    <input 
                        type="text" 
                        name="client_name" 
                        value={newProject.client_name} 
                        onChange={(e) => handleInputChange(e, setNewProject)} 
                    />
                </label>
                <button onClick={handleCreateProject}>Create Project</button>
            </div>
        </section>
    );
}

export default Budgetcontent;
