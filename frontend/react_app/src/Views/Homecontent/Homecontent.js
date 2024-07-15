import React from "react";
import './Homecontent.css';

function Homecontent() {
    const updates = [
        {
            date: "2024-07-12",
            description: "🆕 Added a new 'Create Supply' button with green styling in the creation panel. This update enhances user experience by providing a more intuitive and visually appealing interface for creating new supplies. The button is designed to be clearly visible and easy to use, reducing user errors and increasing efficiency in creating new records."
        },
        {
            date: "2024-07-11",
            description: "✅ Implemented field validation in the supply creation form. Validation ensures that user-entered data meets specified requirements before being submitted to the server. This helps prevent errors and ensures the integrity of the stored data. Error messages provide clear and helpful feedback, assisting users in quickly correcting their inputs."
        },
        {
            date: "2024-07-09",
            description: "🔧 Improved session management in the backend to avoid SQLite database locks. This change is crucial to ensure the application runs smoothly and without interruptions. Previously, multiple simultaneous connections could cause database locks, affecting user experience. This improvement ensures greater stability and performance, allowing more reliable data access."
        }
    ];

    const features = [
        {
            title: "Budget Creation and Management",
            description: "📊 Create and manage project budgets with ease, track expenses, and ensure financial control throughout the project lifecycle."
        },
        {
            title: "Supply Tracking",
            description: "📦 Keep track of all supplies, monitor stock levels, and manage orders efficiently to avoid project delays."
        },
        {
            title: "Detailed Reporting",
            description: "📝 Generate comprehensive reports on various aspects of the project, providing valuable insights and data-driven decision-making."
        },
        {
            title: "Project Management Tools",
            description: "🛠 Utilize a suite of tools designed to streamline project planning, execution, and monitoring, ensuring projects are completed on time and within budget."
        },
        
    ];

    return (
        <section className="home_content" role="main">
            <div className="welcome-section">
                <h1>Welcome to APC Application Demo</h1>
                <p>
                    👷‍♂️ This application is designed for civil engineers, providing tools and resources to facilitate project management, supply planning, and site supervision. Our goal is to offer a comprehensive platform that supports engineers in their daily work, enhancing efficiency and accuracy at all stages of the project.
                </p>
                <p>
                    📊 Through this application, you can access features such as budget creation and management, supply tracking, and detailed reporting. We are committed to continuous improvement and welcome any suggestions or feedback that help us serve you better.
                </p>
            </div>
            <div className="features">
                <h2>Application Features</h2>
                <ul>
                    {features.map((feature, index) => (
                        <li key={index} className="feature-item">
                            <strong>{feature.title}</strong>: {feature.description}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="updates">
                <h2>Recent Updates</h2>
                <ul>
                    {updates.map((update, index) => (
                        <li key={index} className="update-item">
                            <strong>{update.date}</strong>: {update.description}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Homecontent;
