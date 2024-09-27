import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import yourImage from '../assets/image.png'; // Adjust the path and filename

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    general: '',
  });

  const navigate = useNavigate();

  const validateData = () => {
    const { name, email, password } = formData;
    let valid = true;

    if (!/^[A-Za-z\s]+$/.test(name)) {
      setError(prev => ({ ...prev, name: 'Name should only contain letters and spaces.' }));
      valid = false;
    } else {
      setError(prev => ({ ...prev, name: '' }));
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      valid = false;
    } else {
      setError(prev => ({ ...prev, email: '' }));
    }

    if (password.length < 8) {
      setError(prev => ({ ...prev, password: 'Password must be at least 8 characters long.' }));
      valid = false;
    } else {
      setError(prev => ({ ...prev, password: '' }));
    }

    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateData()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      console.log('Signup Successful:', response.data);

      // Navigate based on the selected role
      if (formData.role === 'Patient') {
        navigate('/doctor'); // Navigate to the patient dashboard
      } else if (formData.role === 'Doctor') {
        navigate('/doctor'); // Navigate to the doctor dashboard
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError(prev => ({ ...prev, general: 'Signup failed. Please try again.' }));
    }


    
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Left Column for Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={yourImage} // Use the imported image here
          alt="Background"
          className="object-cover h-3/4" // Make the image cover the entire column
        />
      </div>

      {/* Right Column for Signup Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        
        {error.general && <p className="text-red-500 text-center">{error.general}</p>}

        {/* Chingu Text */}
        <div className="text-center mb-4 text-6xl" style={{ fontFamily: 'Italianno, cursive' }}>
          <span className="text-white">Chi</span>
          <span className="text-[#378f68]">ngu</span>
        </div>

        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-black mb-2">Sign Up</h2>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#378f68] focus:border-[#378f68]"
                  placeholder="Your Name"
                />
                {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#378f68] focus:border-[#378f68]"
                  placeholder="Email address"
                />
                {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#378f68] focus:border-[#378f68]"
                  placeholder="Password"
                />
                {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
              </div>
              <div className="mt-4">
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    <input
                      id="patient"
                      name="role"
                      type="radio"
                      value="Patient"
                      checked={formData.role === 'Patient'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#378f68] border-gray-300 focus:ring-[#378f68]"
                    />
                    <label htmlFor="patient" className="ml-2 block text-sm text-gray-700">
                      Patient
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="doctor"
                      name="role"
                      type="radio"
                      value="Doctor"
                      checked={formData.role === 'Doctor'}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#378f68] border-gray-300 focus:ring-[#378f68]"
                    />
                    <label htmlFor="doctor" className="ml-2 block text-sm text-gray-700">
                      Doctor
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white bg-[#378f68] hover:bg-opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-[#378f68]"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Log In Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#378f68] font-semibold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
