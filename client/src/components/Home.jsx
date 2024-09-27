import React from 'react';
import chinguImage from '../assets/Chingu.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="flex flex-col items-start justify-start h-screen bg-black"> {/* Align items to the start */}
      {/* Header Section */}
      <div className="flex items-center p-4">
        {/* Heart Icon */}
        <FontAwesomeIcon icon={faHeart} className="text-green-500 text-3xl" />
        <h1 className="text-white text-3xl ml-2">TINGDING</h1>
      </div>

      {/* Banner Section */}
      <div className="flex w-full max-w-6xl p-8 bg-black shadow-lg rounded-lg mt-4">
        {/* Left Column */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-9xl font-bold" style={{ fontFamily: 'Italianno, cursive' }}>
            <span className="text-white">Chi</span>
            <span className="text-green-500">ngu</span>
          </h1>
          
          {/* Wrapping the paragraphs in a container for proper stacking */}
          <div className="text-center">
            <p className="text-white text-5xl mt-4" style={{ fontFamily: 'Italianno, cursive' }}>Your Lifeline to Health</p>
            <p className="text-white text-xl">and Safety, Anytime, Anywhere</p>
            {/* Login and Signup Buttons */}
            <div className="mt-8">
              <a 
                href="/login" 
                className="bg-[#378f68] text-white py-2 px-4 rounded hover:bg-opacity-80 transition duration-300 mx-2"
              >
                Login
              </a>
              <a 
                href="/signup" 
                className="bg-[#378f68] text-white py-2 px-4 rounded hover:bg-opacity-80 transition duration-300 mx-2"
              >
                Signup
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex-1 flex items-center justify-center">
          <img 
            src={chinguImage} 
            alt="Chingu" 
            className="transition-transform duration-300 transform hover:scale-105" // Add scaling effect
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
