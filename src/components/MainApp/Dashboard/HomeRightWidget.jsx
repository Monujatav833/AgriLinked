import { useState, useEffect } from 'react';
import { FaUserCircle, FaUser, FaEllipsisH } from 'react-icons/fa';
import { useTheme } from "../../../context/ThemeContext.jsx";

const Sidebar = ({ currentUser, trendingSearches, setSearchQuery, setShowSearchSidebar }) => {
  const { darkMode } = useTheme();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 630);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${darkMode ? "text-gray-200" : ""}`}>
      <div className="flex items-center">
        <div className={`h-14 w-14 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white mr-4`}>
          <FaUserCircle className="text-2xl" />
        </div>
        <div>
          <p className="font-semibold">{currentUser?.username || "User"}</p>
          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>@{currentUser?.username?.toLowerCase() || "user"}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <p className={darkMode ? "text-gray-400 font-semibold" : "text-gray-500 font-semibold"}>Suggestions For You</p>
          <button className={`text-sm font-semibold ${darkMode ? "text-blue-400" : "text-gray-800"}`}>See All</button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-300 to-blue-300 flex items-center justify-center text-white mr-3">
                  <FaUser className="text-gray-100" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Suggested User {item}</p>
                  <p className={darkMode ? "text-gray-400 text-xs" : "text-gray-500 text-xs"}>Suggested for you</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-blue-500 hover:text-blue-600">Follow</button>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-6 rounded-xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className={`font-bold text-lg mb-3 ${darkMode ? "text-gray-200" : ""}`}>Trending in Agriculture</h3>
        {trendingSearches.map((trend, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg cursor-pointer ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
            onClick={() => {
              setSearchQuery(trend.query);
              setShowSearchSidebar(true);
            }}
          >
            <div className="flex justify-between">
              <div>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>#{index + 1} Trending</p>
                <p className={`font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{trend.query}</p>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{trend.posts} posts</p>
              </div>
              <button className={darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}>
                <FaEllipsisH />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-6 ml-1  ${isSticky ? 'fixed -top-4  right-5 ' : ''} text-xs ${darkMode ? "text-gray-500" : "text-gray-400"} space-y-3`}>
        <div className="flex flex-wrap gap-2">
          <span className="font-semibold">Product:</span>
          <span className="hover:underline cursor-pointer">AgriLinked</span>
          <span className="hover:underline cursor-pointer">AgriPe</span>
          <span className="hover:underline cursor-pointer">FieldMart</span>
          <span className="hover:underline cursor-pointer">AgriShop</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="font-semibold">Company:</span>
          <span className="hover:underline cursor-pointer">About</span>
          <span className="hover:underline cursor-pointer">Press</span>
          <span className="hover:underline cursor-pointer">Jobs</span>
          <span className="hover:underline cursor-pointer">Contact</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="font-semibold">Support:</span>
          <span className="hover:underline cursor-pointer">Help</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Locations</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="font-semibold">Resources:</span>
          <span className="hover:underline cursor-pointer">Govt Schemes</span>
          <span className="hover:underline cursor-pointer">Crop Calendar</span>
          <span className="hover:underline cursor-pointer">Agri Tips</span>
          <span className="hover:underline cursor-pointer">Blog</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="font-semibold">Connect:</span>
          <span className="hover:underline cursor-pointer">Instagram</span>
          <span className="hover:underline cursor-pointer">LinkedIn</span>
          <span className="hover:underline cursor-pointer">WhatsApp</span>
        </div>

        <p className="pt-2">© 2025 AGRI LINKED</p>
      </div>
    </div>
  );
};

export default Sidebar;