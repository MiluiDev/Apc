import React from 'react';
import './PlanModal.css';
import { useNavigate } from 'react-router-dom';

function PlanModal() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Navigate to the previous route
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>X</button>
        <h2>Choose your plan</h2>
        <div className="plans">
          <div className="plan">
            <h3>Basic</h3>
            <p className="price">Free</p>
            <ul>
              <li>✅Create supply list</li>
              <li>✅Access to create Budget projects</li>
              <li>❌ Access to General Items</li>
              <li>❌ Access to Items</li>
              <li>❌ Access to Budget</li>
            </ul>
            <div className="current-plan">Current Plan</div>
          </div>
          <div className="plan">
            <h3>Advanced</h3>
            <p className="price">$29/month</p>
            <ul>
              <li>✅Create supply list</li>
              <li>✅Access to create Budget projects</li>
              <li>✅ Access to General Items</li>
              <li>✅ Access to Items</li>
              <li>✅ Access to Budget</li>
            </ul>
            <button className="plan-button">Soon</button>
          </div>
          <div className="plan">
            <h3>Premium</h3>
            <p className="price">$49/month</p>
            <ul>
              <li>✅Access to all tabs</li>
              <li>✅Online database</li>
              <li>✅Get updates before others</li>
              <li>✅Advanced Analytics</li>
              <li>✅Dedicated 24/7 support and data recovery</li>
            </ul>
            <button className="plan-button">Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanModal;
