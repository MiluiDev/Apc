import React, { useState } from 'react';
import './BudgetTabs.css';

const BudgetTabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs">
            <div className="tab-list">
                {children.map((child, index) => (
                    <button
                        key={index}
                        className={`tab ${activeTab === index ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.label}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {children[activeTab]}
            </div>
        </div>
    );
};

export const Tab = ({ children }) => {
    return (
        <div className="tab-content-inner">
            {children}
        </div>
    );
};

export default BudgetTabs;
