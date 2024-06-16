
//CONFIGURANDO LA EXPANSIÓN DE EL SIDEBAR

let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');


btn.onclick = function(){
    sidebar.classList.toggle("active");
}



// TOOLTIP CONFIGURATION
document.addEventListener('DOMContentLoaded', () => {
    let tooltipTimer;

    // Selecciona todos los elementos de lista y los tooltips
    const navItems = document.querySelectorAll('.nav_list li');

    navItems.forEach(item => {
        const tooltip = item.querySelector('.tooltip');

        item.addEventListener('mouseover', () => {
            tooltipTimer = setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 600); //Cuando el mouse lleve en hover 600 milisegundos
        });

        item.addEventListener('mouseout', () => {
            clearTimeout(tooltipTimer);
            tooltip.style.opacity = '0';
        });
    });
});

