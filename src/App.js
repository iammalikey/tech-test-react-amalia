import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './Pages/EmployeeList';
import AddEmployee from './Pages/AddEmployee';
import EditEmployee from './Pages/EditEmployee';
import EmployeeDetail from './Pages/EmployeeDetail';
import 'flowbite/dist/flowbite.css';
import { Layout } from './Layout/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
