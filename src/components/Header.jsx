import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../common/Authentication';

function Header() {
  const location = useLocation();
  const { auth, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white py-5 fixed w-full top-0 z-10">
    <div className="container mx-auto flex justify-between items-center px-4">
      <div className="text-xl font-bold"></div>
      <nav className="space-x-4">
        {auth.isAuthenticated ? (
          <>
            <span className="text-gray-300">{auth.user.email}</span>
            <button onClick={logout} className="text-gray-300 hover:text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className={`text-gray-300 hover:text-white ${
                location.pathname === '/' ? 'text-blue-500' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/login"
              className={`text-gray-300 hover:text-white ${
                location.pathname === '/login' ? 'text-blue-500' : ''
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`text-gray-300 hover:text-white  ${
                location.pathname === '/register' ? 'text-blue-500' : ''
              }`}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  </header>
  );
}

export default Header;
