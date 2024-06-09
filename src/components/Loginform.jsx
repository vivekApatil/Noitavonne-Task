import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/Authentication';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null); 
    try {
      
      const response = await axios.get('http://localhost:3002/user');
      const users = response.data;

      
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        login(user);
        setSuccess('Login successful');
        if(user.userType === "techSupport"){
          navigate('/techsupporthome');
          }else if(user.userType === "Admin"){
            navigate('/adminhome');
            }else if(user.userType === "endUser"){
              navigate('/enduserhome');
              }
              
              } else {
                setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-8 text-4xl font-semibold text-center text-gray-800">Login</h2>
        {error && (
          <div className="mb-4 text-red-500 bg-red-100 border border-red-400 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-500 bg-green-100 border border-green-400 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
