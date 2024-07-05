import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidemenu from '../Sidemenu/Sidemenu'; // Assegúrate de ajustar las rutas de importación según sea necesario
import Homecontent from '../Homecontent/Homecontent';
import Budgetcontent from '../Budgetcontent/Budgetcontent';

function App() {
  return (
  <div className="App">
    <Router>
    <Sidemenu/>
      <Routes>
        <Route path="/" element={<Homecontent/>}/>
        <Route path="/budgetcontent" element={<Budgetcontent/>}/>
      </Routes>
    </Router>
  </div>);
}

export default App;