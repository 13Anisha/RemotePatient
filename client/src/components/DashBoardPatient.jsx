import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineRobot, AiOutlineEye } from 'react-icons/ai'; 
import WeeklyReport from './WeeklyReport'; 

const DashboardPatient = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('personal-details'); 
  const [isVitalsDropdownOpen, setIsVitalsDropdownOpen] = useState(false); 
  const [imageSrc, setImageSrc] = useState(''); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const toggleChatbot = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleVitalsDropdown = () => {
    setIsVitalsDropdownOpen(!isVitalsDropdownOpen);
  };

  const navigateToRun = () => {
    navigate('/run');
  };

  const handleCameraClick = async () => {
  
    const confirmCameraAccess = window.confirm("Do you allow this site to access your camera?");
    if (!confirmCameraAccess) {
      return; 
    }
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
  
     
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        setImageSrc(canvas.toDataURL('image/png')); 
        stream.getTracks().forEach(track => track.stop()); 
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="flex items-center justify-between p-4 bg-[#378f68]">
        <h1 className="text-xl font-bold">
          Patient's Dashboard
          <button onClick={handleCameraClick} className="ml-2 text-white">
            <AiOutlineEye size={24} />
          </button>
        </h1>
        <button 
          onClick={handleLogout} 
          className="bg-white text-[#207258] px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1 p-4">
        <aside className="w-1/4 p-4 bg-gray-800 shadow-lg rounded-md">
          <h2 className="text-lg font-semibold mb-2">Navigation</h2>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveSection('personal-details')} 
                className={`text-[#378f68]  ${activeSection === 'personal-details' ? 'font-bold' : ''}`}
              >
                Personal Details
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('reports')} 
                className={`text-[#378f68]  ${activeSection === 'reports' ? 'font-bold' : ''}`}
              >
                Reports
              </button>
            </li>
            <li>
              <button 
                onClick={toggleVitalsDropdown} 
                className={`text-[#378f68]  ${activeSection === 'vitals' ? 'font-bold' : ''}`}
              >
                Vitals
              </button>
              {isVitalsDropdownOpen && (
                <ul className="ml-4 mt-2 space-y-1">
                  <li>
                    <button 
                      onClick={() => { setActiveSection('vitals'); navigateToRun(); }} 
                      className={`text-[#378f68] `}
                    >
                      EEG
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveSection('vitals'); navigateToRun(); }} 
                      className={`text-[#378f68] `}
                    >
                      ECG
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveSection('vitals'); navigateToRun(); }} 
                      className={`text-[#378f68] `}
                    >
                      Blood Pressure
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setActiveSection('vitals'); navigateToRun(); }} 
                      className={`text-[#378f68] `}
                    >
                      Pulse Rate
                    </button>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button 
                onClick={() => setActiveSection('medical-inventory')} 
                className={`text-[#378f68] ${activeSection === 'medical-inventory' ? 'font-bold' : ''}`}
              >
                Medical Inventory
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('settings')} 
                className={`text-[#378f68]  ${activeSection === 'settings' ? 'font-bold' : ''}`}
              >
                Settings
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-4 space-y-6">
          {/* Conditional Rendering Based on Active Section */}
          {activeSection === 'personal-details' && (
            <section id="personal-details" className="p-4 bg-gray-800 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-2">Personal Details</h2>
              <p>Here you can view and edit your personal details.</p>
              <div className="space-y-2">
                <p><strong>Name:</strong> Vrisha Parikh</p>
                <p><strong>Email:</strong> abc@gmail.com</p>
                <p><strong>Phone:</strong> +919265513616</p>
              </div>
              {imageSrc && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">Captured Image:</h3>
                  <img src={imageSrc} alt="Captured" className="mt-2 w-full h-auto rounded-md" />
                </div>
              )}
              
              {/* Medical History Section */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Medical History</h3>
                <div className="space-y-2">
                  <p><strong>Blood Pressure:</strong> 120/80 mmHg</p>
                  <p><strong>Pulse Rate:</strong> 72 bpm</p>
                  <p><strong>Allergies:</strong> None reported</p>
                  <p><strong>Chronic Conditions:</strong> Hypertension</p>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'reports' && (
            <section id="reports" className="p-4 bg-gray-800 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-2">Reports</h2>
              <br />
              <WeeklyReport /> {/* Show the WeeklyReport component */}
              <br />
              <br />

              <WeeklyReport />
            </section>
          )}

          {activeSection === 'vitals' && (
            <section id="vitals" className="p-4 bg-gray-800 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-2">Vitals</h2>
              <p>Access your vitals information here.</p>
            </section>
          )}

        {activeSection === 'medical-inventory' && (
            <section id="medical-inventory" className="p-4 bg-gray-800 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-2">Medical Inventory</h2>
              <p>Based on your diagnosis, we recommend the following medicines:</p>
              <div className="space-y-2">
                <div>
                  <strong>Diagnosis:</strong> Hypertension
                  <p><strong>Recommended Medicine:</strong> Amlodipine</p>
                </div>
                <div>
                  <strong>Diagnosis:</strong> Diabetes
                  <p><strong>Recommended Medicine:</strong> Metformin</p>
                </div>
                <div>
                  <strong>Diagnosis:</strong> Anxiety
                  <p><strong>Recommended Medicine:</strong> Sertraline</p>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'settings' && (
            <section id="settings" className="p-4 bg-gray-800 shadow-lg rounded-md">
              <h2 className="text-lg font-semibold mb-2">Settings</h2>
              <p>Manage your account settings here.</p>
              <div className="space-y-2">
                <p><strong>Change Password:</strong></p>
                <button className="text-[#378f68] hover:underline">Change Password</button>
                <p><strong>Notification Preferences:</strong></p>
                <button className="text-[#378f68] hover:underline">Update Preferences</button>
              </div>
            </section>
          )}
        </main>

        <div className="fixed bottom-4 right-4">
          <button 
            onClick={toggleChatbot} 
            className="bg-[#378f68] p-3 rounded-full shadow-lg text-white"
          >
            <AiOutlineRobot size={24} />
          </button>

          {isChatOpen && (
            <div className="mt-2 p-4 w-96 h-[500px] bg-white shadow-lg rounded-md">
              <h3 className="text-lg font-semibold mb-2 text-[#378f68]">Chatbot</h3>
              <div className="h-[420px] overflow-y-auto">
                <iframe 
                  src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=bc7fa335-3665-4b70-ac51-894972ab9c70" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  title="Botpress Chatbot"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPatient;
