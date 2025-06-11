import { useState, useEffect, useRef } from "react";
import { Outlet,useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import getUserById from "../../../api/getUserData.js";
import  jwtDecode  from "jwt-decode";
import waitLoading from "/src/assets/json/waitLoading.json"; 
import Lottie from "lottie-react";
import HomeRightWidget from './HomeRightWidget';
import { useTheme } from "../../../context/ThemeContext.jsx";

import { 
  FaHome, FaBell, FaShoppingCart, FaSignOutAlt, FaCommentDots, 
  FaUserCircle, FaSearch, FaMapMarkedAlt, FaCog, FaUserFriends, 
  FaPlayCircle, FaTimesCircle, FaTimes, FaChevronDown, FaUser,
  FaSun,FaMoon,FaBookmark, FaRegBookmark, FaRegEnvelope, FaEllipsisH, FaFeatherAlt,
  FaCompass, FaHeart, FaPlusSquare
} from "react-icons/fa";
import useScrollDirection from "../../../hooks/useScrollDirection.jsx";

function AgriLinkedDashboard() {
  const isHidden = useScrollDirection();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const searchRef = useRef(null);
  const { darkMode, toggleDarkMode } = useTheme();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Organic Tomatoes",
    "Farming Equipment",
    "Hydroponic Systems"
  ]);
  const [trendingSearches, setTrendingSearches] = useState([
    { query: "Summer Harvest 2023", posts: "12.5K" },
    { query: "Pesticide Alternatives", posts: "8.2K" },
    { query: "Vertical Farming", posts: "15.7K" }
  ]);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const fetchUser = async () => {
        try {
          const userData = await getUserById(userId);
          setCurrentUser(userData);
          if (Math.random() > 0.5) setIsNotificationActive(true);
        } catch (err) {
          console.error("Error fetching user:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } catch (err) {
      console.error("Error decoding token:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showSearchModal && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearchModal]);

  const handleNavigation = (path) => {
    navigate(path);
    setShowRightMenu(false);
    if (path === "/notifications") setIsNotificationActive(false);
    setShowSearchSidebar(false);
  };

  

  const getActiveClass = (path) =>
  location.pathname === path
  ? `font-bold  ${darkMode ? 'hover:text-black bg-gray-600' : 'text-black bg-gray-300'}`
  : ` ${darkMode ? 'text-gray-100 hover:bg-gray-500' : 'text-gray-700 hover:bg-gray-300'}`;

const getMobileActiveClass = (path) =>
  location.pathname === path
    ? `font-semibold scale-110 ${darkMode ? 'text-green-400' : 'text-green-600'}`
    : `${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-500'}`;
        
  const handleLogout = (e) => {
    e.preventDefault();
    logout();      
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches].slice(0, 5));
      }
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearchModal(false);
      setShowSearchSidebar(false);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const removeRecentSearch = (index) => {
    setRecentSearches(recentSearches.filter((_, i) => i !== index));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-white"> 
      <Lottie 
        animationData={waitLoading} 
        loop={true} 
        className="w-64 h-64" 
      />
    </div>
  );


  let RightWidget = null;

  if (location.pathname.includes("home")) {
    RightWidget =  <HomeRightWidget 
             currentUser={{ username: 'User' }}
             trendingSearches={trendingSearches}
             setSearchQuery={setSearchQuery}
             setShowSearchSidebar={setShowSearchSidebar}
            />;
  }

  return (
    <>
         <header className={`md:hidden fixed top-0 w-full z-50 transition-all duration-300 ease-in-out  backdrop-blur-sm ${
         isHidden ? "-translate-y-full lg:translate-y-0" : "translate-y-0"
         } ${
           darkMode 
             ? 'bg-neutral-900 border-gray-700  shadow-[0_0_10px_rgba(255,255,255,0.2)]  text-gray-100' 
             : 'bg-white text-gray-800'
         }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
       <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => handleNavigation("/home")}
       >
      <img 
        src="src/assets/images/tomatoLogo.png"
        width="36px"
        className="transition-transform duration-300 animate-spin"
        alt="AgriLinked Logo"
      />
      <h1 className="font-bold text-xl bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
        Agri<span className="text-orange-500">Linked</span>
      </h1>
    </div>

    <div className="flex items-center space-x-4">
      <button 
        className={`p-2 hover:text-green-600 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
        onClick={() => setShowSearchModal(true)}
      >
        <FaSearch className="text-xl" />
      </button>

      <div 
        className={`relative p-2 hover:text-green-600 cursor-pointer ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
        onClick={() => handleNavigation("/messenger")}
      >
        <FaCommentDots className="text-xl" />
        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          3
        </span>
      </div>

      <div className="relative">
        <button
          className="flex items-center space-x-1 focus:outline-none group"
          onClick={() => setShowRightMenu(!showRightMenu)}
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold group-hover:ring-2 group-hover:ring-green-300 transition-all">
            <FaUser/> 
          </div>
          <FaChevronDown className={`text-xs transition-transform ${
            showRightMenu ? "rotate-180" : ""
          } ${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          }`} />
        </button>

        {showRightMenu && (
          <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-xl py-1 z-50 border divide-y ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 divide-gray-600' 
              : 'bg-white border-gray-100 divide-gray-100'
          }`}>
            <div className="px-4 py-3">
              <p className={`text-sm font-semibold ${
                darkMode ? 'text-gray-100' : 'text-gray-700'
              }`}>{currentUser?.username || "User"}</p>
              <p className={`text-xs ${
                darkMode ? 'text-gray-300' : 'text-gray-500'
              }`}>{currentUser?.email || "user@example.com"}</p>
            </div>
            <div className="py-1">
              <div 
                className={`px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                  darkMode 
                    ? 'text-gray-200 hover:bg-gray-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
              >
                <FaUserCircle className={`mr-3 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                Profile
              </div>
              <div 
                className={`px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                  darkMode 
                    ? 'text-gray-200 hover:bg-gray-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation("/friends")}
              >
                <FaUserFriends className={`mr-3 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                Friends
              </div>
              <div 
                className={`px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                  darkMode 
                    ? 'text-gray-200 hover:bg-gray-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation("/settings")}
              >
                <FaCog className={`mr-3 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                Settings
              </div>
              <div 
                className={`px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                  darkMode 
                    ? 'text-gray-200 hover:bg-gray-600' 
                    : 'text-gray-700 hover:bg-gray-50'            
                   }`}
                onClick={toggleDarkMode}
              >
                 {darkMode ? (<FaSun className={`mr-3 ${
                  darkMode ? 'text-yellow-400' : 'text-gray-500'
                  }`} />  ) : (  <FaMoon className="mr-3"/>
                 )}    
                 {darkMode ? 'Light Mode' : 'Dark Mode'}
              </div>
            </div>
            <div className="py-1">
              <div 
                className={`px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center ${
                  darkMode ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-gray-50'
                }`}
                onClick={handleLogout}
              >
                <FaSignOutAlt className={`mr-3 ${
                  darkMode ? 'text-red-400' : 'text-red-500'
                }`} />
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</header>
{showSearchModal && (
  <div className={`md:hidden fixed inset-0 z-50 pt-16 ${
    darkMode ? 'bg-gray-900' : 'bg-white'
  }`}>
    <div className="container mx-auto px-4">
      <div className="relative mb-6">
        <form onSubmit={handleSearch}>
          <div className={`flex items-center rounded-lg px-4 py-3 shadow-inner border focus-within:border-green-400 ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 focus-within:border-green-500' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <button 
              type="button"
              className={`mr-2 ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setShowSearchModal(false)}
            >
              <FaTimes className="text-xl" />
            </button>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search farmers, products, hashtags..."
              className={`flex-1 bg-transparent border-none outline-none ${
                darkMode 
                  ? 'text-white placeholder-gray-400' 
                  : 'text-gray-700 placeholder-gray-400'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            {searchQuery && (
              <button 
                type="button"
                className={`ml-2 ${
                  darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                }`}
                onClick={() => setSearchQuery("")}
              >
                <FaTimesCircle />
              </button>
            )}
          </div>
        </form>
      </div>

      {!searchQuery ? (
        <div className="space-y-6">
          {recentSearches.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-semibold ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Recent Searches
                </h3>
                <button 
                  onClick={clearRecentSearches}
                  className={`text-sm ${
                    darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${
                      darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSearchQuery(search);
                      searchRef.current.focus();
                    }}
                  >
                    <div className="flex items-center">
                      <FaSearch className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={`ml-3 ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {search}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(index);
                      }}
                      className={`p-1 ${
                        darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className={`font-semibold mb-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Trending Now
            </h3>
            <div className="space-y-2">
              {trendingSearches.map((trend, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSearchQuery(trend.query);
                    searchRef.current.focus();
                  }}
                >
                  <FaSearch className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                  <span className={`ml-3 ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {trend.query}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            Search results will appear here
          </p>
        </div>
      )}
    </div>
  </div>
)}

      <div className={`md:hidden pt-12 pb-20 w-full 
         ${darkMode ? 'bg-black/90' : 'bg-white'}
         `}>
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </div>

      <nav className={`md:hidden  fixed -bottom-[1px] left-0 right-0
      ${darkMode ? 'bg-neutral-900 border-gray-700 shadow-[0_0_10px_rgba(255,255,255,0.2)]' : 'bg-white border-gray-100'} 
       border-t z-40 transition-all duration-300 ease-in-out ${
      showSearchModal ? "hidden" : ""
      }`}>
     <div className="flex justify-around py-3">
    <div
      onClick={() => handleNavigation("/home")}
      className={`flex flex-col items-center cursor-pointer ${getMobileActiveClass("/home")}`}
    >
      <div className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
        <FaHome className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
      </div>
      <span className={`text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Home</span>
    </div>

    <div
      onClick={() => handleNavigation("/video")}
      className={`flex flex-col items-center cursor-pointer ${getMobileActiveClass("/video")}`}
    >
      <div className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
        <FaPlayCircle className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
      </div>
      <span className={`text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Video</span>
    </div>

    <div
      onClick={() => handleNavigation("/notifications")}
      className={`flex flex-col items-center cursor-pointer relative ${getMobileActiveClass("/notifications")}`}
    >
      <div className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
        <FaBell className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
        {isNotificationActive && (
          <span className="absolute top-0 right-4 bg-red-500 text-white text-xs rounded-full h-3 w-3"></span>
        )}
      </div>
      <span className={`text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Alerts</span>
    </div>

    <div
      onClick={() => handleNavigation("/market/dashboard")}
      className={`flex flex-col items-center cursor-pointer ${getMobileActiveClass("/market/dashboard")}`}
    >
      <div className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
        <FaShoppingCart className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
      </div>
      <span className={`text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Market</span>
    </div>

    <div
      onClick={() => handleNavigation("/field-mart/dashboard")}
      className={`flex flex-col items-center cursor-pointer ${getMobileActiveClass("/field-mart/dashboard")}`}
    >
      <div className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
        <FaMapMarkedAlt className={`text-xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
      </div>
      <span className={`text-xs font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>FieldMart</span>
    </div>
     </div>
     </nav>

          <div className={`hidden md:flex min-h-screen max-w-7xl mx-auto overflow-hidden mr-0
             ${darkMode ? 'bg-black/90' : 'bg-white'}
            `}>
        
        <aside className={`fixed left-0 top-0 h-full w-64 flex flex-col border-r border-gray-200 z-30
          ${darkMode ? 'bg-black' : 'bg-white'}
          `}>
          <div className="flex-1 overflow-y-scroll px-6 py-8">
           <div 
             className="flex items-center space-x-3 cursor-pointer mb-10"
             onClick={() => handleNavigation("/home")}
              >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white">
                  <img 
                 src="src/assets/images/tomatoLogo.png"
                 width="36px"
                 className="transition-transform duration-300 animate-spin"
                alt="AgriLinked Logo"
               />  
              </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
           AgriLinked
          </h1>
      </div>

    <div className="space-y-4">
      <button
        onClick={() => handleNavigation("/home")}
        className={`p-3 ml-1 flex items-center rounded-lg w-full text-lg transition-all ${getActiveClass("/home")}
           ${darkMode ? 'text-white ' : ''}
        `}
      >
        <FaHome className={`mr-4 text-xl ${location.pathname === "/home" ? "text-black" : "text-gray-600"}
          ${darkMode ? 'text-white' : ''}`} />
        <span className="font-medium">Home</span>
      </button>
      

      <button
         onClick={() => setShowSearchSidebar(true)}
         className={`relative p-3 flex items-center rounded-lg w-full text-lg transition-all duration-300 group
         ${showSearchSidebar 
         ? darkMode ? "font-bold text-white": "font-bold text-black"
         : darkMode ? "text-white hover:text-white": "text-gray-600 hover:text-black"
         }
         ${showSearchSidebar ? "after:content-[''] after:absolute after:left-2 after:right-2 after:-bottom-1 after:h-[3px] after:rounded-full after:bg-gradient-to-r after:from-green-400 after:to-blue-500 after:animate-pulse" : ""}
        hover:scale-[1.02] hover:tracking-wide
        `}
        >

        <FaSearch className={`mr-4 text-xl
              ${darkMode ? 'text-white' : ''}
        `} />
        <span className="font-medium">Search</span>
    </button>

      <button
        onClick={() => handleNavigation("/video")}
        className={`p-3 flex items-center rounded-lg w-full text-lg transition-all ${getActiveClass("/video")}
        ${darkMode ? 'text-white' : ''}
        `}
      >
        <FaCompass className={`mr-4 text-xl ${location.pathname === "/video" ? "text-black" : "text-gray-600"}
          ${darkMode ? 'text-white' : ''}
         `} />
        <span className="font-medium">Video</span>
      </button>



        <button
        onClick={() => handleNavigation("/field-mart/dashboard")}
        className={`p-3 flex items-center rounded-lg w-full text-lg transition-all ${getActiveClass("/explore")}
          ${darkMode ? 'text-white' : ''}
        `}
      >
        <FaMapMarkedAlt className={`mr-4 text-xl ${location.pathname === "/field-mart/dashboard" ? "text-black" : "text-gray-600"}
           ${darkMode ? 'text-white' : ''}
        `} />
        <span className="font-medium">FieldMart</span>
      </button>

      <button
        onClick={() => handleNavigation("/notifications")}
        className={`p-3 flex items-center rounded-lg w-full text-lg transition-all relative ${getActiveClass("/notifications")}
         ${darkMode ? 'text-white' : ''}
        `}
      >
        <FaHeart className={`mr-4 text-xl ${location.pathname === "/notifications" ? "text-black" : "text-gray-600"}
         ${darkMode ? 'text-white' : ''}
        `} />
        <span className="font-medium">Notifications</span>
        {isNotificationActive && (
          <span className="absolute left-8 top-3 bg-red-500 text-white text-xs rounded-full h-2 w-2"></span>
        )}
      </button>

      <button
        onClick={() => handleNavigation("/messenger")}
        className={`p-3 flex items-center rounded-lg w-full text-lg transition-all ${getActiveClass("/messages")}
         ${darkMode ? 'text-white' : ''}
        `}
      >
        <FaRegEnvelope className={`mr-4 text-xl ${location.pathname === "/messages" ? "text-black" : "text-gray-600"}
         ${darkMode ? 'text-white' : ''}
        `} />
        <span className="font-medium">Messages</span>
      </button>

      <button
        onClick={() => handleNavigation("/bookmarks")}
        className={`p-3 flex items-center rounded-lg w-full text-lg transition-all ${getActiveClass("/bookmarks")}
         ${darkMode ? 'text-white' : ''}
        `}
      >
        <FaRegBookmark className={`mr-4 text-xl ${location.pathname === "/bookmarks" ? "text-black" : "text-gray-600"}
         ${darkMode ? 'text-white' : ''}
         `} />
        <span className="font-medium">Bookmarks</span>
      </button>

      <button
        onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
        className={`p-3 flex items-center rounded-lg w-full text-lg transition-all ${getActiveClass(`/profile/${currentUser?._id}`)}
         ${darkMode ? 'text-white' : ''}
         `}
        >
        <FaUserCircle className={`mr-4 text-xl ${location.pathname === `/profile/${currentUser?._id}` ? "text-black" : "text-gray-600"}
         ${darkMode ? 'text-white' : ''}
         `}/>
        <span className="font-medium">Profile</span>
      </button>

      <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg p-3 w-full font-bold text-lg shadow-lg transform transition hover:scale-[1.02] mt-6 mb-8">
        <FaPlusSquare className="inline mr-2" />
        Create Post
      </button>
    </div>
  </div>

  <div className="p-6 border-t border-gray-200 "
  >
    <button
      className={`flex items-center justify-between p-3 rounded-lg w-full  transition-all
        ${darkMode ? 'hover:bg-slate-500' : 'hover:bg-gray-100'}`}
      onClick={() => setShowRightMenu(!showRightMenu)}
    >
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white">
          <FaUser className="text-gray-100" />
        </div>
        <div className="ml-3 text-left">
          <p className={`font-semibold text-gray-900
             ${darkMode ? 'text-white' : ''}
            `}>
            {currentUser?.username || "User"}</p>
          <p className={`text-gray-500 text-sm
             ${darkMode ? 'text-white/85' : ''}
            `}>@{currentUser?.username?.toLowerCase() || "user"}</p>
        </div>
      </div>
      <FaEllipsisH className={`text-gray-500
         ${darkMode ? 'text-white' : ''}
        `} />
    </button>

{showRightMenu && (
  <div className={`absolute bottom-20 left-6 w-60 rounded-xl shadow-lg py-2 z-50 border divide-y ${darkMode ? "bg-gray-800 border-gray-700 divide-gray-700" : "bg-white border-gray-100 divide-gray-100"} backdrop-blur-sm`}>
    <div className="py-1">
      <div 
        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center transition-colors duration-200 rounded-lg mx-2 ${darkMode ? "hover:bg-gray-700 text-white" : "text-gray-900"}`}
        onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
      >
        <FaUserCircle className={`text-2xl mr-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
        <div>
          <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{currentUser?.username || "User"}</p>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>@{currentUser?.username?.toLowerCase() || "user"}</p>
        </div>
      </div>
    </div>
    
    <div className="py-1">
      <div 
        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center transition-colors duration-200 rounded-lg mx-2 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "text-gray-700"}`}
        onClick={() => handleNavigation("/settings")}
      >
        <FaCog className={`mr-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
        Settings
      </div>
      <div 
        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center transition-colors duration-200 rounded-lg mx-2 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "text-gray-700"}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <FaSun className={`mr-2 text-xl ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}/>
        ) : (
          <FaMoon className="mr-2 text-xl text-gray-600"/>
        )}        
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </div>
      
      <div 
        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center transition-colors duration-200 rounded-lg mx-2 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "text-gray-700"}`}
        onClick={() => handleNavigation("/saved")}
      >
        <FaBookmark className={`mr-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
        Saved
      </div>
    </div>
    
    <div className="py-1">
      <div 
        className={`px-4 py-3 hover:bg-red-50 cursor-pointer flex items-center transition-colors duration-200 rounded-lg mx-2 ${darkMode ? "text-red-400 hover:bg-gray-700" : "text-red-500"}`}
        onClick={handleLogout}
      >
        <FaSignOutAlt className={`mr-3 ${darkMode ? "text-red-400" : ""}`} />
        Log out
      </div>
    </div>
  </div>
)}
  </div>

   </aside>

     {showSearchSidebar && (
  <aside className={`slideLeft fixed left-64 top-0 h-full w-80 border-r z-20 shadow-lg ${
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  }`}>
    <div className={`p-4 border-b py-8 mb-10 ${
      darkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Search
        </h2>
        <button 
          onClick={() => setShowSearchSidebar(false)}
          className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}
        >
          <FaTimes className="text-xl" />
        </button>
      </div>
      <form onSubmit={handleSearch} className="relative">
        <div className={`flex items-center rounded-lg px-4 py-2 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <FaSearch className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
          <input
            type="text"
            placeholder="Search AgriLinked"
            className={`flex-1 bg-transparent border-none outline-none ml-2 ${
              darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
            autoFocus
          />
        </div>
      </form>
    </div>

    <div className={`overflow-y-auto h-full pb-20 ${
      darkMode ? 'text-gray-200' : 'text-gray-700'
    }`}>
      {searchQuery ? (
        <div className="p-4">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            Search results for "{searchQuery}"
          </p>
        </div>
      ) : (
        <>
          <div className={`p-4 border-b ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-semibold ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Recent searches
              </h3>
              {recentSearches.length > 0 && (
                <button 
                  onClick={clearRecentSearches}
                  className={`text-sm ${
                    darkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  Clear all
                </button>
              )}
            </div>
            {recentSearches.length > 0 ? (
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSearchQuery(search);
                      searchRef.current?.focus();
                    }}
                  >
                    <div className="flex items-center">
                      <FaSearch className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                      <span className={`ml-3 ${
                        darkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {search}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(index);
                      }}
                      className={`p-1 ${
                        darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                No recent searches
              </p>
            )}
          </div>

          <div className="p-4">
            <h3 className={`font-semibold mb-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Trending now
            </h3>
            <div className="space-y-4">
              {trendingSearches.map((trend, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSearchQuery(trend.query);
                    searchRef.current?.focus();
                  }}
                >
                  <p className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Agriculture · Trending
                  </p>
                  <p className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {trend.query}
                  </p>
                  <p className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {trend.posts} posts
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  </aside>
)}

        <main className={`flex-1 min-h-screen transition-all duration-300 ${
          showSearchSidebar ? "ml-[calc(32rem)]" : "ml-56"
        }`}>
          <div className="max-w-2xl mx-auto p-6 pt-8">
            <Outlet/>
          </div>
        </main>

        {RightWidget && !showSearchSidebar && (
          <aside className="hidden lg:block w-80 p-6">
            <div className="sticky top-6 space-y-6">
              {RightWidget}
            </div>
          </aside>
       )}
      </div>
    </>
  );
}

export default AgriLinkedDashboard;

