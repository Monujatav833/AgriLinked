import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

import { 
  FaPlus, FaUserCircle, FaSearch, 
  FaBars, FaTimes,
  FaHome, FaList, FaLandmark,
} from 'react-icons/fa';

const FieldMartNavbar = () => {
  const navigate = useNavigate();
  const { darkMode} = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} border-gray-700 shadow-[0_0_10px_rgba(255,255,255,0.5)] fixed w-full z-50`}>
      <div className="relative max-w-8xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img className="h-8 w-auto" src="../src/assets/images/tomatoLogo.png" alt="" />
              <span className={`ml-2 text-xl font-semibold ${darkMode ? 'text-white' : 'text-custom'}`}>
                Field<span className="text-[#FF6347]">Mart</span>
              </span>
            </NavLink>
            <div className={`${isMobileMenuOpen ? 'absolute flex-col space-y-3 py-6 px-3 top-16 left-0 right-0' : 'hidden'} 
                   ${darkMode ? 'bg-gray-900' : 'bg-white'} 
                  md:ml-8 md:flex md:space-x-6`}>
              <NavLink 
                to="/field-mart/dashboard"
                className={({ isActive }) => 
                  isActive ? 
                  `${darkMode ? 'text-blue-400' : 'text-blue-500'} px-3 py-2 text-sm font-medium flex items-center` : 
                  `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-custom'} px-3 py-2 text-sm font-medium flex items-center`}
              >
                <FaHome className="mr-2" /> Dashboard
              </NavLink>
              <NavLink 
                to="/field-mart/my-listings"
                className={({ isActive }) => 
                  isActive ? 
                  `${darkMode ? 'text-blue-400' : 'text-blue-500'} px-3 py-2 text-sm font-medium flex items-center` : 
                  `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-custom'} px-3 py-2 text-sm font-medium flex items-center`}
              >
                <FaList className="mr-2" /> My Listings
              </NavLink>
              <NavLink 
                to="/field-mart/search-land"
                className={({ isActive }) => 
                  isActive ? 
                  `${darkMode ? 'text-blue-400' : 'text-blue-500'} px-3 py-2 text-sm font-medium flex items-center` : 
                  `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-custom'} px-3 py-2 text-sm font-medium flex items-center`}
              >
                <FaSearch className="mr-2" /> Search Land
              </NavLink>
              <NavLink 
                to="/field-mart/govt-schemes"
                className={({ isActive }) => 
                  isActive ? 
                  `${darkMode ? 'text-blue-400' : 'text-blue-500'} px-3 py-2 text-sm font-medium flex items-center` : 
                  `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-custom'} px-3 py-2 text-sm font-medium flex items-center`}
              >
                <FaLandmark className="mr-2" /> Govt Schemes
              </NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button  
              onClick={() => navigate('/field-mart/post-your-land')}
              className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'} 
                text-white rounded-lg px-4 py-2 text-[10px] lg:text-sm font-medium transition-colors`}
            >
              <FaPlus className="mr-2 inline" /> Post Your Land
            </button>
          
            <div className="relative">
              <button className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-custom'}`}>
                <FaUserCircle className="text-2xl" />
              </button>
            </div>
            <button 
              className={`md:hidden ${darkMode ? 'text-gray-300' : 'text-gray-600'} focus:outline-none`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FieldMartNavbar;