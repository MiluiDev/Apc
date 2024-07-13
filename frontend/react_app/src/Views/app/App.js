import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidemenu from '../Sidemenu/Sidemenu';
import Homecontent from '../Homecontent/Homecontent';
import Budgetcontent from '../Budgetcontent/Budgetcontent';
import Budgetproject from '../Budgetcontent/Budgetproject/Budgetproject';
import PlanModal from '../PlanModal/PlanModal'; // Importa el componente PlanModal

function App() {
  return (
    <div className="App">
      <Router>
        <Sidemenu />
        <Routes>
          <Route path="/" element={<Homecontent />} />
          <Route path="/budgetcontent" element={<Budgetcontent />} />
          <Route path="/budgetproject" element={<Budgetproject />} />
          <Route path="/plan-modal" element={<PlanModal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
