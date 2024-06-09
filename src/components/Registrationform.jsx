import React, { useState } from 'react';
import axios from 'axios';

function Registrationform() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'endUser'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      userType: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    try {
      const response = await axios.post('http://localhost:3002/user', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      });
      if (response.status === 201 || response.status === 200) {
        
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          userType: 'endUser'
        });
      } else {
        console.error('Registration failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-8 text-4xl font-semibold text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <span className="block mb-2 text-sm font-medium text-gray-600">User Type</span>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="userType"
                value="endUser"
                checked={formData.userType === 'endUser'}
                onChange={handleRadioChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-600">End-User</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="techSupport"
                checked={formData.userType === 'techSupport'}
                onChange={handleRadioChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-600">Tech Support</label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registrationform;
