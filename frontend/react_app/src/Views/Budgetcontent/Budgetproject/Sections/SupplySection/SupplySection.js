import React, { useState, useEffect, useRef, useReducer } from 'react';
import axios from 'axios';
import './SupplySection.css';
import trashIcon from '../../../../../assets/budgetcontent_assets/icons/trashIcon.svg';

// Reducer for managing the creation form state
const supplyReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'RESET':
            return {
                supply_code: '',
                supply_name: '',
                price_per_unit: '',
                description: ''
            };
        default:
            return state;
    }
};

function SupplySection() {
    const [supplies, setSupplies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedSupplies, setSelectedSupplies] = useState([]);
    const [newSupply, dispatch] = useReducer(supplyReducer, {
        supply_code: '',
        supply_name: '',
        price_per_unit: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const panelRef = useRef(null);

    useEffect(() => {
        const fetchSupplies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/supplies');
                setSupplies(response.data);
            } catch (error) {
                console.error('Error fetching supplies:', error);
            }
        };

        fetchSupplies();
    }, []);

    const filteredSupplies = supplies.filter(supply =>
        (typeof supply.supply_name === 'string' && supply.supply_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof supply.supply_code === 'string' && supply.supply_code.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const validateInput = (name, value) => {
        let error = '';
        if (name === 'supply_code') {
            if (!value) {
                error = 'Supply code is required';
            } else if (value.length < 4) {
                error = 'Supply code must be at least 4 characters';
            } else if (value.length > 10) {
                error = 'Supply code must be less than 10 characters';
            }
        } else if (name === 'supply_name') {
            if (!value) {
                error = 'Supply name is required';
            } else if (value.length < 3) {
                error = 'Supply name must be at least 3 characters';
            } else if (value.length > 20) {
                error = 'Supply name must be less than 20 characters';
            }
        } else if (name === 'price_per_unit') {
            if (!value) {
                error = 'Price per unit is required';
            } else if (isNaN(value) || Number(value) <= 0) {
                error = 'Price per unit must be a positive number';
            }
        } else if (name === 'description') {
            if (value.length > 50) {
                error = 'Description must be less than 50 characters';
            }
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'UPDATE_FIELD', field: name, value });
        setErrors(prevErrors => ({ ...prevErrors, [name]: validateInput(name, value) }));
    };

    const handleCreateSupply = async () => {
        const supplyErrors = {};
        Object.keys(newSupply).forEach(key => {
            const error = validateInput(key, newSupply[key]);
            if (error) {
                supplyErrors[key] = error;
            }
        });
        if (Object.keys(supplyErrors).length > 0) {
            setErrors(supplyErrors);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/create_supply', newSupply);
            dispatch({ type: 'RESET' });
            setIsPanelOpen(false);
            setSupplies([...supplies, response.data]); // Add the new supply to the list
        } catch (error) {
            console.error('Error creating supply:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (panelRef.current && !panelRef.current.contains(event.target)) {
            setIsPanelOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelectSupply = (supply_code) => {
        setSelectedSupplies(prevSelectedSupplies =>
            prevSelectedSupplies.includes(supply_code)
                ? prevSelectedSupplies.filter(code => code !== supply_code)
                : [...prevSelectedSupplies, supply_code]
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allSupplyCodes = filteredSupplies.map(supply => supply.supply_code);
            setSelectedSupplies(allSupplyCodes);
        } else {
            setSelectedSupplies([]);
        }
    };

    const handleDeleteSupplies = async () => {
        try {
            for (const supply_code of selectedSupplies) {
                await axios.delete(`http://localhost:5000/delete_supply/${supply_code}`);
            }
            setSupplies(supplies.filter(supply => !selectedSupplies.includes(supply.supply_code)));
            setSelectedSupplies([]);
        } catch (error) {
            console.error('Error deleting supplies:', error);
        }
    };

    return (
        <div className="supplies-section">
            <div className="header">
                <h1>Supplies</h1>
                <button className="create-button" onClick={() => setIsPanelOpen(true)}>Create Supply</button>
            </div>
            <div className="search-section">
                {selectedSupplies.length === 0 ? (
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search supplies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                ) : (
                    <div className="actions">
                        <span>{selectedSupplies.length} Selected</span>
                        <button className="action_button" title="Delete supplies" onClick={handleDeleteSupplies}>
                            <img src={trashIcon} alt="Delete supplies" className="action-icon"/>
                        </button>
                    </div>
                )}
            </div>
            <div className="table-container">
                <table className="supply-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectedSupplies.length === filteredSupplies.length && filteredSupplies.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>Supply Code</th>
                            <th>Supply Name</th>
                            <th>Price per Unit</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSupplies.map((supply, index) => (                                                                  
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedSupplies.includes(supply.supply_code)}
                                        onChange={() => handleSelectSupply(supply.supply_code)}
                                    />
                                </td>
                                <td>{supply.supply_code}</td>
                                <td>{supply.supply_name}</td>
                                <td>${supply.price_per_unit}</td>
                                <td>{supply.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={`create-panel ${isPanelOpen ? 'open' : ''}`} ref={panelRef}>
                <h2>Create New Supply</h2>
                <label>
                    Supply Code:
                    <input
                        type="text"
                        name="supply_code"
                        value={newSupply.supply_code}
                        onChange={handleInputChange}
                    />
                    {errors.supply_code && <p className="error">{errors.supply_code}</p>}
                </label>
                <label>
                    Supply Name:
                    <input
                        type="text"
                        name="supply_name"
                        value={newSupply.supply_name}
                        onChange={handleInputChange}
                    />
                    {errors.supply_name && <p className="error">{errors.supply_name}</p>}
                </label>
                <label>
                    Price per Unit:
                    <input
                        type="text"
                        name="price_per_unit"
                        value={newSupply.price_per_unit}
                        onChange={handleInputChange}
                    />
                    {errors.price_per_unit && <p className="error">{errors.price_per_unit}</p>}
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={newSupply.description}
                        onChange={handleInputChange}
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </label>
                <button className="create-button" onClick={handleCreateSupply}>Create Supply</button>
            </div>
        </div>
    );
}

export default SupplySection;
