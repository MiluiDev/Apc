import React from 'react';
import './PlanModal.css';
import { useNavigate } from 'react-router-dom';

function PlanModal() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Navega a la ruta anterior
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
              <li>1 Website</li>
              <li>10 GB Disk Space</li>
              <li>Free Email Address</li>
              <li>Basic Web Builder</li>
              <li>No SSL Certificate</li>
              <li>Limited Support</li>
            </ul>
            <div className="current-plan">Current Plan</div>
          </div>
          <div className="plan">
            <h3>Advanced</h3>
            <p className="price">$29/month</p>
            <ul>
              <li>100 Websites</li>
              <li>50 GB Disk Space</li>
              <li>Free Email Address</li>
              <li>Advanced Web Builder</li>
              <li>Free SSL Certificate</li>
              <li>Unlimited Support</li>
            </ul>
            <button className="plan-button">Soon</button>
          </div>
          <div className="plan">
            <h3>Premium</h3>
            <p className="price">$49/month</p>
            <ul>
              <li>100 Websites</li>
              <li>100 GB Disk Space</li>
              <li>Free Email Address</li>
              <li>Advanced Web Builder</li>
              <li>Free SSL Certificate</li>
              <li>Unlimited Support</li>
            </ul>
            <button className="plan-button">Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanModal;
