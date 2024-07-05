import React,{ useEffect } from 'react';
import './Sidemenu.css'
import profileimg from '../../assets/img/foto-test.png'
import { Link } from 'react-router-dom';


function Sidemenu() {
  //SCRIPTS PARA EL SIDEMENU
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
        <li>
          <a href="#">
            <i className='bx bx-cog'></i>
            <span className="links_name">Settings</span>
          </a>
          <span className="tooltip">Settings</span>
        </li>
      </ul>
      
      {/*  EN ESTA ZONA EL PERFIL Y LA INFORMACION ACERCA DE SU PLAN ESTARÁ DISPONIBLE */}
      <div className="profile_content">
        <div className="profile">
          <div className="profile_details">
            <img src={profileimg} alt="profile-img"/>
            <div className="name_job">
              <div className="name">LuisM</div>
              <div className="job">Plan actual: Basic</div>
            </div>
          </div>
          <i className='bx bxs-bolt' style={{color: '#484646'}} id="log_out"></i>
        </div>
      </div>
    </div>
  );
}


  export default Sidemenu;