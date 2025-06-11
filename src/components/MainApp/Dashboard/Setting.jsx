import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCamera, FaSpinner, FaCheck } from "react-icons/fa";
import { useTheme } from '../../../context/ThemeContext';

import {
  FaUserCircle, FaBell, FaBriefcase,
  FaChevronRight, FaSignOutAlt, FaEye, FaEyeSlash, FaDatabase,
  FaUserShield, FaPalette, FaArrowLeft,
  FaGlobe, FaCreditCard, FaFileInvoice, FaUsers, FaChartLine,
  FaEnvelope, FaLockOpen, FaHistory, FaCheckCircle, FaTimesCircle,
  FaClock,
} from 'react-icons/fa';

const Setting = () => {
  const navigate = useNavigate();
  const { section, subSection } = useParams();
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { darkMode } = useTheme();

  const [user, setUser] = useState({
    name: "Rajat Dalal",
    email: "rajat.dalal@example.com",
    role: "Broker",
    verificationStatus: "pending",
    profileImage: "/src/assets/images/tomatoLogo.png"
  });

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const newBreadcrumbs = [];

    let accumulatedPath = '';

    pathParts.forEach((part, index) => {
      accumulatedPath += `/${part}`;
      const isLast = index === pathParts.length - 1;

      newBreadcrumbs.push({
        title: getSectionTitle(part),
        path: isLast ? null : accumulatedPath
      });
    });

    setBreadcrumbs(newBreadcrumbs);
  }, [location]);

  const getSectionTitle = (section) => {
    const titles = {
      'settings': 'Settings',
      'personal-information': 'Personal Information',
      'login-security': 'Login & Security',
      'change-password': 'Change Password',
      'reset-password': 'Reset Password',
      'notifications': 'Notifications',
      'data-privacy': 'Data & Privacy',
      'language-region': 'Language & Region',
      'appearance': 'Appearance',
      'verification': 'Account Verification',
      'business-information': 'Business Information',
      'team-members': 'Team Members',
      'billing-payments': 'Billing & Payments',
      'tax-documents': 'Tax Documents',
      'business-analytics': 'Business Analytics',
      'email-forwarding': 'Email Forwarding',
      'api-access': 'API Access',
      'activity-log': 'Activity Log'
    };
    return titles[section] || 'Settings';
  };

  const renderContent = () => {
    if (subSection) {
      const nestedComponents = {
        'login-security/change-password': <PasswordChange />,
      };

      const key = `${section}/${subSection}`;
      return nestedComponents[key] || <div>Subsection not found</div>;
    }

    const mainComponents = {
      'personal-information': <PersonalInfo user={user} />,
      'login-security': <SecuritySettings />,
      'notifications': <NotificationSettings />,
      'data-privacy': <DataPrivacySettings />,
      'language-region': <LanguageRegionSettings />,
      'appearance': <AppearanceSettings />,
      'verification': <VerificationSettings />,
      'business-information': <BusinessInformation />,
    };

    return mainComponents[section] || <SettingsMenu user={user} />;
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 mt-6 md:mt-20 lg:mt-0 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      <nav className={`text-md ml-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {breadcrumbs.map((crumb, index) => (
          <span key={index}>
            {crumb.path ? (
              <Link to={crumb.path} className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} hover:underline`}>
                {crumb.title}
              </Link>
            ) : (
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{crumb.title}</span>
            )}
            {index < breadcrumbs.length - 1 && " > "}
          </span>
        ))}
      </nav>
      {renderContent()}
    </div>
  );
};

const SettingsMenu = ({ user }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`p-4 max-w-x4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`flex flex-col items-center mb-8 p-6 rounded-lg shadow-sm 
      ${darkMode ? 'bg-gray-800' : 'bg-white'}
      `}>
        <div className="relative mb-4">
          <img 
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md" 
            src={user.profileImage} 
            alt="Profile" 
          />
        </div>
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
        <div className="flex items-center mt-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.role === 'Farmer' ? 'bg-green-100 text-green-800' : 
            user.role === 'Broker' ? 'bg-blue-100 text-blue-800' : 
            'bg-purple-100 text-purple-800'
          }`}>
            {user.role}
          </span>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium flex items-center ${
            user.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
            user.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {user.verificationStatus === 'verified' ? (
              <FaCheckCircle className="mr-1" />
            ) : user.verificationStatus === 'pending' ? (
              <FaClock className="mr-1" />
            ) : (
              <FaTimesCircle className="mr-1" />
            )}
            {user.verificationStatus === 'verified' ? 'Verified' : 
             user.verificationStatus === 'pending' ? 'Pending Verification' : 'Not Verified'}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className={`ml-5 text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Settings</h2>
        <div className={`rounded-lg shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wider px-6 py-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
            Account Settings
          </h3>
          <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <MenuItem 
              icon={<FaUserCircle />}
              title="Personal Information"
              path="personal-information"
            />
            <MenuItem 
              icon={<FaUserShield />}
              title="Login & Security"
              path="login-security"
            />
            <MenuItem 
              icon={<FaBell />}
              title="Notifications"
              path="notifications"
              count={3}
            />
            <MenuItem 
              icon={<FaDatabase />}
              title="Data & Privacy"
              path="data-privacy"
            />
          </div>
        </div>

        <div className={`rounded-lg shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wider px-6 py-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
            Preferences
          </h3>
          <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <MenuItem 
              icon={<FaGlobe />}
              title="Language & Region"
              path="language-region"
            />
            <MenuItem 
              icon={<FaPalette />}
              title="Appearance"
              path="appearance"
            />
          </div>
        </div>

        <div className={`rounded-lg shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xs font-semibold uppercase tracking-wider px-6 py-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-500'}`}>
            Verification
          </h3>
          <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <MenuItem 
              icon={<FaUsers />}
              title="Account Verification"
              path="verification"
              badge={user.verificationStatus}
            />
          </div>
        </div>

        <div className={`rounded-lg shadow-sm overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <AdvancedSetting />
        </div>

        <div className="pt-4">
          <button 
            onClick={() => console.log('Sign out clicked')}
            className={`flex items-center justify-center w-full p-3 rounded-lg cursor-pointer transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <FaSignOutAlt className="text-red-500 mr-3 text-lg" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AdvancedSetting = () => {
  const { darkMode } = useTheme();
  const menuItems = [
    {
      title: "Business Settings",
      items: [
        { icon: <FaBriefcase />, title: "Business Information", path: "business-information" },
        { icon: <FaUsers />, title: "Team Members", path: "team-members" },
        { icon: <FaCreditCard />, title: "Billing & Payments", path: "billing-payments" },
        { icon: <FaFileInvoice />, title: "Tax Documents", path: "tax-documents" },
        { icon: <FaChartLine />, title: "Business Analytics", path: "business-analytics" },
      ]
    },
    {
      title: "Advanced",
      items: [
        { icon: <FaEnvelope />, title: "Email Forwarding", path: "email-forwarding" },
        { icon: <FaLockOpen />, title: "API Access", path: "api-access" },
        { icon: <FaHistory />, title: "Activity Log", path: "activity-log" },
      ]
    }
  ];

  return (
    <div className={`p-4 max-w-4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Other Settings</h2>
      
      {menuItems.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
            {group.title}
          </h3>
          <div className="space-y-1">
            {group.items.map((item, itemIndex) => (
              <MenuItem
                key={itemIndex}
                icon={item.icon}
                title={item.title}
                path={item.path}
                count={item.count}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const MenuItem = ({ icon, title, path, count, badge }) => {
  const { darkMode } = useTheme();
  
  return (
    <Link
      to={`/settings/${path}`}
      className={`flex items-center p-4 cursor-pointer transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-50 text-gray-700'}`}
    >
      <span className={`mr-3 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{icon}</span>
      <span className="font-medium flex-grow">{title}</span>
      {badge === 'pending' && (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Pending
        </span>
      )}
      {count && !badge && (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
      <FaChevronRight className={`ml-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
    </Link>
  );
};

const PersonalInfo = ({ user }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    fullName: user.name,
    email: user.email,
    phone: "+91 (555) 123-4567",
    aadhar: "1234 5678 9012",
    role: user.role,
    address: "123 Business Street, Market Area, City - 100001"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`p-6 max-w-4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className={`mr-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <FaArrowLeft className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Personal Information</h2>
      </div>
      
      <div className={`rounded-lg shadow-sm p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img 
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg" 
              src={user.profileImage} 
              alt="Profile" 
            />
            <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors">
              <FaCamera className="h-5 w-5" />
            </button>
          </div>
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
          <div className="flex items-center mt-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              user.role === 'Farmer' ? 'bg-green-100 text-green-800' : 
              user.role === 'Broker' ? 'bg-blue-100 text-blue-800' : 
              'bg-purple-100 text-purple-800'
            }`}>
              {user.role}
            </span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium flex items-center ${
              user.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' :
              user.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {user.verificationStatus === 'verified' ? (
                <>
                  <FaCheckCircle className="mr-1" />
                  Verified
                </>
              ) : user.verificationStatus === 'pending' ? (
                <>
                  <FaClock className="mr-1" />
                  Pending Verification
                </>
              ) : (
                <>
                  <FaTimesCircle className="mr-1" />
                  Not Verified
                </>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label htmlFor="aadhar" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Aadhar Number</label>
            <input 
              type="text" 
              id="aadhar" 
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
          </div>

          <div>
            <label htmlFor="role" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
            <select 
              id="role" 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              <option>Farmer</option>
              <option>Broker</option>
              <option>Buyer</option>
              <option>Wholesaler</option>
              <option>other</option>
            </select>
          
            {formData.role === "other" && (
              <input
                type="text"
                name="customRole"
                value={formData.customRole || ""}
                onChange={handleChange}
                placeholder="Type your role here..."
                className={`mt-2 w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
            <textarea 
              id="address" 
              name="address"
              rows="3" 
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
          </div>
        </div>
      </div>

      <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account Verification</h3>
          {user.verificationStatus === 'verified' ? (
            <span className="flex items-center text-sm text-green-600">
              <FaCheckCircle className="mr-1" /> Verified
            </span>
          ) : (
            <Link 
              to="/settings/verification"
              className={`text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : ''}`}
            >
              Complete Verification <FaChevronRight className="ml-1 text-xs" />
            </Link>
          )}
        </div>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Verify your account with your Aadhar number and other details to access all features.
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              user.verificationStatus === 'verified' ? 'bg-green-600' :
              user.verificationStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-600'
            }`} 
            style={{ width: user.verificationStatus === 'verified' ? '100%' : '50%' }}
          ></div>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3 mb-20">
        <button 
          onClick={() => navigate('/settings')}
          className={`px-6 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
        >
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const BusinessInformation = () => {
  const { darkMode } = useTheme();
  
  return (
    <section className="max-w-4xl mx-auto">
      <div className={`shadow sm:rounded-md sm:overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`py-6 px-4 space-y-6 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div>
            <h2 id="business-info-heading" className={`text-lg leading-6 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Business Information</h2>
            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your business details and preferences.</p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="license" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Business License Number</label>
              <input 
                type="text" 
                name="license" 
                id="license" 
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} 
                defaultValue="BUS12345678" 
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="category" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Trade Category</label>
              <select 
                id="category" 
                name="category" 
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} 
                defaultValue="Agricultural Products"
              >
                <option>Agricultural Products</option>
                <option>Dairy Products</option>
                <option>Organic Farming</option>
              </select>
            </div>

            <div className="col-span-6">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Business Hours</label>
              <div className="mt-1 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="opening" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Opening Time</label>
                  <input 
                    type="time" 
                    name="opening" 
                    id="opening" 
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} 
                    defaultValue="09:00" 
                  />
                </div>
                <div>
                  <label htmlFor="closing" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Closing Time</label>
                  <input 
                    type="time" 
                    name="closing" 
                    id="closing" 
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} 
                    defaultValue="18:00" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`px-4 py-3 text-right sm:px-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <button type="submit" className="!rounded-button bg-blue-600 border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save changes
          </button>
        </div>
      </div>
    </section>
  );
};

const VerificationSettings = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [verificationData, setVerificationData] = useState({
    aadharNumber: '',
    panNumber: '',
    addressProof: null,
    selfie: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/settings/personal-information');
  };

  return (
    <div className={`p-6 max-w-4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className={`mr-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <FaArrowLeft className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account Verification</h2>
      </div>

      <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="mb-6">
          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Complete Your Verification</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Verify your identity to access all features. This helps us ensure the security of your account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="aadharNumber" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={verificationData.aadharNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                placeholder="Enter 12-digit Aadhar number"
                required
              />
            </div>

            <div>
              <label htmlFor="panNumber" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                PAN Number
              </label>
              <input
                type="text"
                id="panNumber"
                name="panNumber"
                value={verificationData.panNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                placeholder="Enter PAN number"
                required
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Address Proof
              </label>
              <div className="mt-1 flex items-center">
                <label className="cursor-pointer">
                  <span className={`px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    Upload Document
                  </span>
                  <input
                    type="file"
                    name="addressProof"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf"
                    required
                  />
                </label>
                {verificationData.addressProof && (
                  <span className={`ml-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {verificationData.addressProof.name}
                  </span>
                )}
              </div>
              <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Upload a clear photo of your address proof (Aadhar, Voter ID, etc.)
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Selfie with Document
              </label>
              <div className="mt-1 flex items-center">
                <label className="cursor-pointer">
                  <span className={`px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    Take Selfie
                  </span>
                  <input
                    type="file"
                    name="selfie"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                    required
                  />
                </label>
                {verificationData.selfie && (
                  <span className={`ml-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {verificationData.selfie.name}
                  </span>
                )}
              </div>
              <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Take a selfie while holding your ID document
              </p>
            </div>

            <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-end space-x-3 mb-16">
                <button 
                  type="button"
                  onClick={() => navigate('/settings')}
                  className={`px-6 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit for Verification
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const LanguageRegionSettings = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [settings, setSettings] = useState({
    language: 'English',
    region: 'India',
    timezone: 'IST (UTC+5:30)',
    currency: 'INR'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`p-6 max-w-5xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className={`mr-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <FaArrowLeft className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Language & Region</h2>
      </div>

      <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="language" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Language
            </label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Marathi</option>
              <option>Bengali</option>
              <option>Tamil</option>
            </select>
          </div>

          <div>
            <label htmlFor="region" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Region
            </label>
            <select
              id="region"
              name="region"
              value={settings.region}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>

          <div>
            <label htmlFor="timezone" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Timezone
            </label>
            <select
              id="timezone"
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              <option>IST (UTC+5:30)</option>
              <option>EST (UTC-5:00)</option>
              <option>GMT (UTC+0:00)</option>
            </select>
          </div>

          <div>
            <label htmlFor="currency" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>GBP (£)</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button 
            onClick={() => navigate('/settings')}
            className={`px-6 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const AppearanceSettings = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    density: 'normal'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={`p-6 max-w-4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className={`mr-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <FaArrowLeft className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h2>
      </div>

      <div className={`rounded-lg shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Theme
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={settings.theme === 'light'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Light</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={settings.theme === 'dark'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Dark</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={settings.theme === 'system'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>System Default</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="fontSize" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Font Size
            </label>
            <select
              id="fontSize"
              name="fontSize"
              value={settings.fontSize}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label htmlFor="density" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Display Density
            </label>
            <select
              id="density"
              name="density"
              value={settings.density}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="comfortable">Comfortable</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button 
            onClick={() => navigate('/settings')}
            className={`px-6 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome on Windows", location: "indore, india", time: "Just now", current: true },
    { id: 2, device: "Safari on iPhone", location: "shivprui, india", time: "2 days ago", current: false }
  ]);

  const endSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return (
    <div className={`p-6 max-w-4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className={`mr-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <FaArrowLeft className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login & Security</h2>
      </div>
      
      <div className="space-y-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'}`}>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Password</h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Last changed 3 months ago</p>
          <button className={`px-4 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-blue-500 text-blue-400 hover:bg-gray-600' : 'bg-white border-blue-500 text-blue-600 hover:bg-blue-50'}`}
            onClick={() => navigate('/settings/login-security/change-password')}
          >
            Change Password
          </button>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Two-Factor Authentication</h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Add an extra layer of security to your account</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Enable 2FA
            </button>
            <button className={`px-4 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              Learn More
            </button>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Active Sessions</h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>These are the devices currently logged into your account</p>
          
          <div className="space-y-4">
            {sessions.map(session => (
              <div key={session.id} className={`flex items-center justify-between p-3 border-b last:border-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div>
                  <div className="flex items-center">
                    <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{session.device}</p>
                    {session.current && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{session.location} • {session.time}</p>
                </div>
                {!session.current && (
                  <button 
                    onClick={() => endSession(session.id)}
                    className={`text-sm font-medium ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}`}
                  >
                    Sign out
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'}`}>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>Advanced Security</h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>These actions are irreversible</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <button className={`px-4 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-red-500 text-red-400 hover:bg-gray-600' : 'bg-white border-red-500 text-red-600 hover:bg-red-50'}`}>
              Deactivate Account
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Delete Account
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => navigate('/settings')}
            className={`px-6 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Back to Settings
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState({
    priceAlerts: true,
    marketUpdates: true,
    newsletter: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    orderUpdates: true,
    messages: true,
    promotions: false
  });

  const toggleEmailNotification = (key) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePushNotification = (key) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={`p-6 max-w-4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className={`mr-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <FaArrowLeft className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notification Settings</h2>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="price-alerts" 
                  type="checkbox" 
                  checked={emailNotifications.priceAlerts}
                  onChange={() => toggleEmailNotification('priceAlerts')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="price-alerts" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price alerts</label>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Get notified when prices change significantly.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="market-updates" 
                  type="checkbox" 
                  checked={emailNotifications.marketUpdates}
                  onChange={() => toggleEmailNotification('marketUpdates')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="market-updates" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Market updates</label>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Receive daily market trend updates.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="newsletter" 
                  type="checkbox" 
                  checked={emailNotifications.newsletter}
                  onChange={() => toggleEmailNotification('newsletter')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="newsletter" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Newsletter</label>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Get our weekly newsletter with tips and insights.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Push Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="order-updates" 
                  type="checkbox" 
                  checked={pushNotifications.orderUpdates}
                  onChange={() => togglePushNotification('orderUpdates')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="order-updates" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Order updates</label>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Get notified about order status changes.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="messages" 
                  type="checkbox" 
                  checked={pushNotifications.messages}
                  onChange={() => togglePushNotification('messages')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="messages" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Messages</label>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Notify me about new messages.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="promotions" 
                  type="checkbox" 
                  checked={pushNotifications.promotions}
                  onChange={() => togglePushNotification('promotions')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="promotions" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Promotions</label>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Notify me about special offers and promotions.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="notification-frequency" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Frequency</label>
              <select 
                id="notification-frequency" 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
              >
                <option>Immediately</option>
                <option>Daily Digest</option>
                <option>Weekly Summary</option>
              </select>
            </div>
            <div>
              <label htmlFor="quiet-hours" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quiet Hours</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select 
                  id="quiet-hours-start" 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                >
                  <option value="">Off</option>
                  <option value="22:00">10:00 PM</option>
                  <option value="23:00">11:00 PM</option>
                </select>
                <select 
                  id="quiet-hours-end" 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                >
                  <option value="">Off</option>
                  <option value="06:00">6:00 AM</option>
                  <option value="07:00">7:00 AM</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pb-16">
          <button 
            onClick={() => navigate('/settings')}
            className={`px-6 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Cancel
          </button>
          <button className="ml-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

const PasswordChange = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const startResendTimer = () => {
    setResendTimer(30);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'otp') {
      if (/^\d{0,6}$/.test(value)) {
        setOtp(value);
      }
      return;
    }
    
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (forgotPasswordMode) {
      if (!otpVerified && otp.length !== 6) {
        newErrors.otp = 'Please enter a valid 6-digit OTP';
      }
    } else {
      if (!passwords.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }
    }
    
    if (!passwords.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwords.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (forgotPasswordMode && !otpVerified) {
        console.log('OTP verified:', otp);
        setOtpVerified(true);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        console.log('Password change submitted:', passwords);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendOtp = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      startResendTimer();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setOtp('');
    setOtpSent(false);
    setOtpVerified(false);
    setForgotPasswordMode(false);
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordMode(true);
    setPasswords(prev => ({ ...prev, currentPassword: '' }));
    setErrors(prev => ({ ...prev, currentPassword: '' }));
    sendOtp();
  };

  const resendOtp = () => {
    sendOtp();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-4xl mx-auto p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}
        >
          <button 
            onClick={() => navigate('/settings/login-security')}
            className={`mr-4 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <FaArrowLeft className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          {forgotPasswordMode ? 'Reset Password' : 'Update Password'}
        </motion.h2>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
          {forgotPasswordMode 
            ? 'Secure your account with OTP verification' 
            : 'Change your account password'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!forgotPasswordMode ? (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-1">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
              <button 
                type="button"
                onClick={handleForgotPassword}
                className={`text-sm hover:underline focus:outline-none ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} ${errors.currentPassword ? 'border-red-500' : ''}`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showCurrentPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-500"
              >
                {errors.currentPassword}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <>
            {!otpVerified && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    We've sent a 6-digit OTP to your registered email and mobile number
                  </p>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Enter OTP</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="otp"
                      value={otp}
                      onChange={handleChange}
                      maxLength="6"
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} ${errors.otp ? 'border-red-500' : ''}`}
                      placeholder="Enter 6-digit OTP"
                    />
                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={resendTimer > 0 || isSubmitting}
                      className={`whitespace-nowrap px-3 py-3 text-sm rounded-md ${resendTimer > 0 || isSubmitting ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                    </button>
                  </div>
                  {errors.otp && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.otp}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: forgotPasswordMode ? (otpVerified ? 0.3 : 0.4) : 0.4 }}
        >
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} ${errors.newPassword ? 'border-red-500' : ''}`}
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {showNewPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
          {errors.newPassword && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.newPassword}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: forgotPasswordMode ? (otpVerified ? 0.4 : 0.5) : 0.5 }}
        >
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Re-enter new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.confirmPassword}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: forgotPasswordMode ? (otpVerified ? 0.5 : 0.6) : 0.6 }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                {forgotPasswordMode && !otpVerified ? 'Verifying...' : 'Updating...'}
              </span>
            ) : (
              forgotPasswordMode 
                ? (otpVerified ? 'Update Password' : 'Verify OTP') 
                : 'Update Password'
            )}
          </button>
        </motion.div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 bg-green-100 text-green-700 rounded-lg flex items-center"
          >
            <FaCheck className="w-5 h-5 mr-2" />
            {forgotPasswordMode 
              ? (otpVerified 
                  ? 'OTP verified! Set your new password' 
                  : 'OTP sent to your registered email and mobile number')
              : 'Password updated successfully!'}
          </motion.div>
        )}
      </form>

      <div className={`mt-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <p>Make sure it's at least 8 characters including a number and a special character.</p>
        {forgotPasswordMode && (
          <button
            onClick={resetForm}
            className={`mt-2 hover:underline focus:outline-none ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            Remember your password? Back
          </button>
        )}
      </div>
    </motion.div>
  );
};

const DataPrivacySettings = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [dataSharing, setDataSharing] = useState({
    analytics: true,
    personalizedAds: true
  });

  const toggleDataSharing = (key) => {
    setDataSharing(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={`p-6 max-w-4xl mx-auto overflow-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className={`mr-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <FaArrowLeft className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data & Privacy</h2>
      </div>
      
      <div className="space-y-6">
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Data Sharing</h3>
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input 
                id="analytics" 
                type="checkbox" 
                checked={dataSharing.analytics}
                onChange={() => toggleDataSharing('analytics')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="analytics" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Share analytics data</label>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Help us improve our services by sharing anonymous usage data.</p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Personalization</h3>
          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input 
                id="personalized-ads" 
                type="checkbox" 
                checked={dataSharing.personalizedAds}
                onChange={() => toggleDataSharing('personalizedAds')}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="personalized-ads" className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Personalized recommendations</label>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Get product and content recommendations based on your activity.</p>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Data Export & Deletion</h3>
          <div className="mt-4 space-y-4 space-x-2">
            <button className={`text-sm px-2 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-blue-500 text-blue-400 hover:bg-gray-600' : 'bg-white border-blue-500 text-blue-600 hover:bg-blue-50'}`}>
              Export My Data
            </button>
            <button className={`text-sm px-2 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-red-500 text-red-400 hover:bg-gray-600' : 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'}`}>
              Delete My Account
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => navigate('/settings')}
            className={`px-6 py-2 border rounded-lg transition-colors ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            Back to Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;