import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardDoctor = () => {
  const navigate = useNavigate();
  
    
  const [patients] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
  ]);

  const handlePatientClick = (patientId) => {
    
    navigate(`/patient/${patientId}`);
  };

  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="flex items-center justify-between p-4 bg-[#378f68]">
        <h1 className="text-xl font-bold">Doctor's Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="bg-white text-[#207258] px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1 p-4">
        <main className="flex-1 p-4 space-y-6">
          <h2 className="text-lg font-semibold mb-2">Patient List</h2>
          <table className="min-w-full bg-white text-black rounded-lg shadow-lg">
            <thead>
              <tr className="bg-[#378f68] text-white">
                <th className="py-2 px-4">SNo.</th>
                <th className="py-2 px-4">Patient Name</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id} className="hover:bg-gray-200">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4 text-center">
                    <button 
                      onClick={() => handlePatientClick(patient.id)} 
                      className="text-[#378f68] hover:underline"
                    >
                      {patient.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default DashboardDoctor;
