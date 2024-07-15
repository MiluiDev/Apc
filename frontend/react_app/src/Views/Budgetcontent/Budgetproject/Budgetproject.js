import React from 'react';
import './Budgetproject.css';
import BudgetTabs, { Tab } from '../BudgetTabs/BudgetTabs';
import SpreadsheetTab from '../SpreadsheetTab/SpreadSheetTab'; // Importa el componente SpreadsheetTab (más adelante lo importaré.)
import SupplySection from './Sections/SupplySection/SupplySection';
function Budgetproject() {
    return (
        <section className="budget_project_content" role="main">
            <BudgetTabs>
                <Tab label="Supply">
                    <SupplySection />{/*pienso que el contenido esté en otro componente.*/}
                </Tab>
                <Tab label="General Items">
                    <div>Contenido de Partidas </div>
                </Tab>
                <Tab label="Items">
                    <div>Contenido de Partidas</div>
                </Tab>
                <Tab label="Budget">
                    <div>Contenido de Presupuesto</div>
                </Tab>
            </BudgetTabs>
        </section>
    );
}

export default Budgetproject;
