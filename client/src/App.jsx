// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import DashBoardPatient from './components/DashBoardPatient';
import DashBoardDoctor from './components/DashBoardDoctor';
import RunPythonScript from './components/RunPythonScript';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Add route for the homepage */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor" element={<DashBoardDoctor />} />
          <Route path="/patient/:id" element={<DashBoardPatient />} />
          <Route path="/run" element={<RunPythonScript />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
