// Sidemenu.js
import React, { useEffect } from 'react';
import './Sidemenu.css';
import settings from '../../assets/sidemenu_icons/settings.svg';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

// OBTENER LAS COOKIES. 
const token = Cookies.get('token');
let payload = {};

if (token) {
  try {
    payload = jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
  }
}

function Sidemenu() {
  // SCRIPTS PARA EL SIDEMENU
  useEffect(() => {
    // CONFIGURANDO LA EXPANSIÓN DEL SIDEBAR
    const btn = document.querySelector('#btn');
    const sidebar = document.querySelector('.sidebar');

    btn.onclick = () => {
      sidebar.classList.toggle("active");
    };

    // TOOLTIP CONFIGURATION
    const navItems = document.querySelectorAll('.nav_list li');

    navItems.forEach(item => {
      const tooltip = item.querySelector('.tooltip');
      let tooltipTimer;

      item.addEventListener('mouseover', () => {
        tooltipTimer = setTimeout(() => {
          tooltip.style.opacity = '1';
        }, 600); // Cuando el mouse esté en hover 600 milisegundos
      });

      item.addEventListener('mouseout', () => {
        clearTimeout(tooltipTimer);
        tooltip.style.opacity = '0';
      });
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="logo_content">
        <div className="logo"></div>
        <i className='bx bx-book-content' id="btn"></i>
      </div>

      {/* BOTONES PARA ACCEDER A LAS SECTIONS */}
      <ul className="nav_list">
        <li>
          <Link to='/'>
            <i className='bx bx-home'></i>
            <span className="links_name">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Link to='/Budgetcontent'>
            <i className='bx bx-grid-alt'></i>
            <span className="links_name">Budget</span>
          </Link>
          <span className="tooltip">Budget</span>
        </li>
      </ul>
      
      {/*  EN ESTA ZONA EL PERFIL Y LA INFORMACION ACERCA DE SU PLAN ESTARÁ DISPONIBLE */}
      <div className="profile_content">
        <div className="profile">
          <Link to="/plan-modal" className="profile_details">
            <img src={payload.picture} alt="profile-img"/>
            <div className="name_job">
              <div className="name">{payload.given_name}</div>
              <div className="job">Plan actual: Basic</div>
            </div>
          </Link>
          <img src={settings} alt="Settings" id="log_out" />
        </div>
      </div>
    </div>
  );
}

export default Sidemenu;
