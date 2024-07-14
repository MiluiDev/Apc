import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidemenu from '../Sidemenu/Sidemenu';
import Homecontent from '../Homecontent/Homecontent';
import Budgetcontent from '../Budgetcontent/Budgetcontent';
import Budgetproject from '../Budgetcontent/Budgetproject/Budgetproject';
import PlanModal from '../PlanModal/PlanModal';
import PrivateRoute from '../LoginContent/PrivateRoute';
import LoginContent from '../LoginContent/LoginContent';
import Cookies from 'js-cookie';

function App() {
  const token = Cookies.get('token');

  return (
    <div className="App">
      <Router>
        {!token && <LoginContent />} {/* Mostrar LoginContent solo si no hay token */}
        <PrivateRoute>
          <Sidemenu />
          <Routes>
            <Route path="/" element={<Homecontent />} />
            <Route path="/budgetcontent" element={<Budgetcontent />} />
            <Route path="/budgetproject" element={<Budgetproject />} />
            <Route path="/plan-modal" element={<PlanModal />} />
          </Routes>
        </PrivateRoute>
      </Router>
    </div>
  );
}

export default App;
