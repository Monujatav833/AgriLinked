// import React, { useState, useEffect } from 'react';
// import { FaStar, FaRegStar, FaTrash, FaRegImage, FaEdit, FaCamera, FaRegCommentDots, FaLink } from 'react-icons/fa';
// import { useParams } from 'react-router-dom';
// import getUserData from '../../../api/getUserData';
// import styles from './profile.module.css';

// function Profile({ currentUserId }) {
//   const { userId } = useParams(); 
//   const [viewingUser, setViewingUser] = useState(null);
//   const [modalImage, setModalImage] = useState(null);
//   const [rating, setRating] = useState(false);

//   useEffect(() => {
//     if (userId) {
//       getUserData(userId).then((data) => setViewingUser(data));
//     }
//   }, [userId]);

//   if (!viewingUser) {
//     return <div>User not found</div>;
//   }

//   const isOwnProfile = currentUserId === viewingUser._id;

//   const handleEditProfile = () => {
//     console.log("Edit Profile Clicked");
//   };

//   const handleDeleteProfile = () => {
//     console.log("Delete Profile Clicked");
//   };

//   return (
//     <div className={styles['profileContainer']}>
//       <div className={styles["profile-card"]}>
//         <div className={styles["profile-header"]}>
//           <img
//             src={viewingUser.coverImage || '/path/to/default-cover.jpg'}
//             alt="backprofile"
//             className={styles['back-profile-img']}
//             onClick={() => setModalImage(viewingUser.coverImage)}
//           />
//           <div className={styles["user-profile-info"]}>
//             <img
//               src={viewingUser.profileImage || '/path/to/default-profile.jpg'}
//               alt="profile-img"
//               className={styles['user-profile-img']}
//               onClick={() => setModalImage(viewingUser.profileImage)}
//             />
//             <h2 className={styles['user-profile-name']}>{viewingUser.fullName}</h2>
//             <p className={styles.location}>{viewingUser.location || "Location not available"}</p>
//             <p className={styles.connections}>{viewingUser.connections || "0"} Connections</p>
//           </div>

//           {modalImage && (
//             <div className={styles.modal} onClick={() => setModalImage(null)}>
//               <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
//                 <span onClick={() => setModalImage(null)} className={styles["close"]}>&times;</span>
//                 <img src={modalImage} alt="Zoomed" className={styles["modal-image"]} />
//                 {isOwnProfile && (
//                   <div className={styles["model-btn-container"]}>
//                     <button onClick={handleEditProfile}><FaEdit className={styles['model-btn-icons']} /> Edit</button>
//                     <button><FaCamera className={styles['model-btn-icons']} /> Add photo</button>
//                     <button><FaRegImage className={styles['model-btn-icons']} /> Frames</button>
//                     <button onClick={handleDeleteProfile}><FaTrash className={styles['model-btn-icons']} /> Delete</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {!isOwnProfile && (
//           <div className={styles['contact']}>
//             <button className={styles["message-btn"]}><FaRegCommentDots /> Message</button>
//             <button className={styles["connect-btn"]}><FaLink /> Connect</button>
//           </div>
//         )}

//         <div className={styles["rating-container"]}>
//           <p className={styles.rating}>
//             {[...Array(viewingUser.rating)].map((_, index) => (
//               <FaStar key={index} className={styles["gold-star"]} />
//             ))}
//             {[...Array(5 - viewingUser.rating)].map((_, index) => (
//               <FaRegStar key={index} className={styles["p-empty-star"]} />
//             ))}
//           </p>
//           <button onClick={() => setRating(!rating)} className={styles["rating-btn"]}>
//             See rating...
//           </button>
//         </div>

//         <div className={styles["about-container"]}>
//           <h3 className={styles["about-title"]}>About</h3>
//           <p className={styles.about}>{viewingUser.about || "No information available."}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

















































// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext.jsx";
// import getUserById from "../../../api/getUserData.js";
// import * as jwt_decode from "jwt-decode";
// import waitLoading from "/src/assets/json/waitLoading.json"; 
// import Lottie from "lottie-react";
// import {FaTimes, FaChevronDown,FaUser } from "react-icons/fa";
// import {
//   FaHome,
//   FaBell,
//   FaShoppingCart,
//   FaSignOutAlt,
//   FaCommentDots,
//   FaUserCircle,
//   FaSearch,
//   FaMapMarkedAlt,
//   FaCog,
//   FaUserFriends,
//   FaPlayCircle,
//   FaTimesCircle
// } from "react-icons/fa";
// import useScrollDirection from "../../../hooks/useScrollDirection.jsx";

// function AgriLinkedDashboard() {
//   const isHidden = useScrollDirection();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAuth();
//   const searchRef = useRef(null);

//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showRightMenu, setShowRightMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isNotificationActive, setIsNotificationActive] = useState(false);
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([
//     "Organic Tomatoes",
//     "Farming Equipment",
//     "Hydroponic Systems"
//   ]);
//   const [trendingSearches, setTrendingSearches] = useState([
//     "Summer Harvest 2023",
//     "Pesticide Alternatives",
//     "Vertical Farming"
//   ]);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const decodedToken = jwt_decode(token);
//       const userId = decodedToken.userId;

//       const fetchUser = async () => {
//         try {
//           const userData = await getUserById(userId);
//           setCurrentUser(userData);
//           if (Math.random() > 0.5) setIsNotificationActive(true);
//         } catch (err) {
//           console.error("Error fetching user:", err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUser();
//     } catch (err) {
//       console.error("Error decoding token:", err);
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (showSearchModal && searchRef.current) {
//       searchRef.current.focus();
//     }
//   }, [showSearchModal]);

//   const handleNavigation = (path) => {
//     navigate(path);
//     setShowRightMenu(false);
//     if (path === "/notifications") setIsNotificationActive(false);
//   };

//   const getActiveClass = (path) =>
//     location.pathname === path 
//       ? "text-green-600 scale-110 font-semibold" 
//       : "text-gray-600 hover:text-green-500";

//   const handleLogout = (e) => {
//     e.preventDefault();
//     logout();      
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       if (!recentSearches.includes(searchQuery)) {
//         setRecentSearches([searchQuery, ...recentSearches].slice(0, 5));
//       }
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setShowSearchModal(false);
//     }
//   };

//   const clearRecentSearches = () => {
//     setRecentSearches([]);
//   };

//   const removeRecentSearch = (index) => {
//     setRecentSearches(recentSearches.filter((_, i) => i !== index));
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-white"> 
//       <Lottie 
//         animationData={waitLoading} 
//         loop={true} 
//         className="w-64 h-64" 
//       />
//     </div>
//   );

//   return (
//     <>
//       <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white shadow-sm backdrop-blur-sm  ${
//         isHidden ? "-translate-y-full lg:translate-y-0" : "translate-y-0"
//       }`}>
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div 
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => handleNavigation("/home")}
//           >
//             <img 
//               src="src/assets/images/tomatoLogo.png"
//               width="36px"
//               className="transition-transform duration-300 animate-spin"
//               alt="AgriLinked Logo"
//             />
//             <h1 className="font-bold text-xl bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
//               Agri<span className="text-orange-500">Linked</span>
//             </h1>
//           </div>

//           {/* Search Bar - Desktop */}
//           <div className="hidden md:flex flex-1 max-w-xl mx-4">
//             <form 
//               onSubmit={handleSearch}
//               className="w-full relative"
//             >
//               <div 
//                 className="flex items-center bg-gray-50 rounded-full px-4 py-2 shadow-inner transition-all duration-300 focus-within:ring-2 focus-within:ring-green-400 focus-within:shadow-md cursor-text"
//                 onClick={() => setShowSearchModal(true)}
//               >
//                 <FaSearch className="text-gray-400 mr-2" />
//                 <span className="text-gray-400">Search farmers, products...</span>
//               </div>
//             </form>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button 
//               className="md:hidden p-2 text-gray-600 hover:text-green-600"
//               onClick={() => setShowSearchModal(true)}
//             >
//               <FaSearch className="text-xl" />
//             </button>

//             <div 
//               className="relative p-2 text-gray-600 hover:text-green-600 cursor-pointer"
//               onClick={() => handleNavigation("/messenger")}
//             >
//               <FaCommentDots className="text-xl" />
//               <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 3
//               </span>
//             </div>

//             <div className="relative">
//               <button
//                 className="flex items-center space-x-1 focus:outline-none group"
//                 onClick={() => setShowRightMenu(!showRightMenu)}
//               >
//                 <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold group-hover:ring-2 group-hover:ring-green-300 transition-all">
//                <FaUser/> 
//                 </div>
//                 <FaChevronDown className={`text-gray-500 text-xs transition-transform ${showRightMenu ? "rotate-180" : ""}`} />
//               </button>

//               {showRightMenu && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100 divide-y divide-gray-100">
//                   <div className="px-4 py-3">
//                     <p className="text-sm font-semibold text-gray-700">{currentUser?.username || "User"}</p>
//                     <p className="text-xs text-gray-500">{currentUser?.email || "user@example.com"}</p>
//                   </div>
//                   <div className="py-1">
//                     <div 
//                       className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
//                     >
//                       <FaUserCircle className="mr-3 text-gray-500" />
//                       Profile
//                     </div>
//                     <div 
//                       className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={() => handleNavigation("/friends")}
//                     >
//                       <FaUserFriends className="mr-3 text-gray-500" />
//                       Friends
//                     </div>
//                     <div 
//                       className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={() => handleNavigation("/settings")}
//                     >
//                       <FaCog className="mr-3 text-gray-500" />
//                       Settings
//                     </div>
//                   </div>
//                   <div className="py-1">
//                     <div 
//                       className="px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={handleLogout}
//                     >
//                       <FaSignOutAlt className="mr-3 text-red-500" />
//                       Logout
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {showSearchModal && (
//         <div className="fixed inset-0 z-50 bg-white pt-16">
//           <div className="container mx-auto px-4">
//             <div className="relative mb-6">
//               <form onSubmit={handleSearch}>
//                 <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 shadow-inner border border-gray-200 focus-within:border-green-400">
//                   <button 
//                     type="button"
//                     className="mr-2 text-gray-500"
//                     onClick={() => setShowSearchModal(false)}
//                   >
//                     <FaTimes className="text-xl" />
//                   </button>
//                   <input
//                     ref={searchRef}
//                     type="text"
//                     placeholder="Search farmers, products, hashtags..."
//                     className="flex-1 bg-transparent border-none outline-none placeholder-gray-400 text-gray-700"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     autoComplete="off"
//                   />
//                   {searchQuery && (
//                     <button 
//                       type="button"
//                       className="ml-2 text-gray-400 hover:text-gray-600"
//                       onClick={() => setSearchQuery("")}
//                     >
//                       <FaTimesCircle />
//                     </button>
//                   )}
//                 </div>
//               </form>
//             </div>

//             {!searchQuery ? (
//               <div className="space-y-6">
//                 {recentSearches.length > 0 && (
//                   <div>
//                     <div className="flex justify-between items-center mb-3">
//                       <h3 className="font-semibold text-gray-700">Recent Searches</h3>
//                       <button 
//                         onClick={clearRecentSearches}
//                         className="text-sm text-green-600 hover:text-green-800"
//                       >
//                         Clear all
//                       </button>
//                     </div>
//                     <div className="space-y-2">
//                       {recentSearches.map((search, index) => (
//                         <div 
//                           key={index}
//                           className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
//                           onClick={() => {
//                             setSearchQuery(search);
//                             searchRef.current.focus();
//                           }}
//                         >
//                           <div className="flex items-center">
//                             <FaSearch className="text-gray-400 mr-3" />
//                             <span className="text-gray-700">{search}</span>
//                           </div>
//                           <button 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               removeRecentSearch(index);
//                             }}
//                             className="text-gray-400 hover:text-gray-600 p-1"
//                           >
//                             <FaTimes />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <h3 className="font-semibold text-gray-700 mb-3">Trending Now</h3>
//                   <div className="space-y-2">
//                     {trendingSearches.map((search, index) => (
//                       <div 
//                         key={index}
//                         className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
//                         onClick={() => {
//                           setSearchQuery(search);
//                           searchRef.current.focus();
//                         }}
//                       >
//                         <FaSearch className="text-gray-400 mr-3" />
//                         <span className="text-gray-700">{search}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-10">
//                 <p className="text-gray-500">Search results will appear here</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <nav className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 md:hidden z-40 transition-all duration-300 ease-in-out ${
//         showSearchModal ? "hidden" : ""
//       }`}>
//         <div className="flex justify-around py-3">
//           <div
//             onClick={() => handleNavigation("/home")}
//             className={`flex flex-col items-center cursor-pointer ${getActiveClass("/home")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaHome className="text-xl" />
//             </div>
//             <span className="text-xs font-medium">Home</span>
//           </div>

//           <div
//             onClick={() => handleNavigation("/video")}
//             className={`flex flex-col items-center cursor-pointer ${getActiveClass("/video")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaPlayCircle className="text-xl" />
//             </div>
//             <span className="text-xs font-medium">Video</span>
//           </div>

//           <div
//             onClick={() => handleNavigation("/notifications")}
//             className={`flex flex-col items-center cursor-pointer relative ${getActiveClass("/notifications")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaBell className="text-xl" />
//               {isNotificationActive && (
//                 <span className="absolute top-0 right-4 bg-red-500 text-white text-xs rounded-full h-3 w-3"></span>
//               )}
//             </div>
//             <span className="text-xs font-medium">Alerts</span>
//           </div>

//           <div
//             onClick={() => handleNavigation("/market/dashboard")}
//             className={`flex flex-col items-center cursor-pointer ${getActiveClass("/market/dashboard")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaShoppingCart className="text-xl" />
//             </div>
//             <span className="text-xs font-medium">Market</span>
//           </div>

//           <div
//             onClick={() => handleNavigation("/field-mart/dashboard")}
//             className={`flex flex-col items-center cursor-pointer ${getActiveClass("/field-mart/dashboard")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaMapMarkedAlt className="text-xl" />
//             </div>
//             <span className="text-xs font-medium">FieldMart</span>
//           </div>
//         </div>
//       </nav>

//       <aside className={`hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-20 space-y-8 bg-white shadow-lg z-30 ${
//         showSearchModal ? "hidden" : ""
//       }`}>
//         <div
//           onClick={() => handleNavigation("/home")}
//           className={`flex flex-col items-center cursor-pointer group ${getActiveClass("/home")}`}
//         >
//           <div className="p-3 rounded-lg group-hover:bg-green-50 transition-colors">
//             <FaHome className="text-xl" />
//           </div>
//           <span className="text-xs font-medium mt-1">Home</span>
//         </div>

//         <div
//           onClick={() => handleNavigation("/video")}
//           className={`flex flex-col items-center cursor-pointer group ${getActiveClass("/video")}`}
//         >
//           <div className="p-3 rounded-lg group-hover:bg-green-50 transition-colors">
//             <FaPlayCircle className="text-xl" />
//           </div>
//           <span className="text-xs font-medium mt-1">Video</span>
//         </div>

//         <div
//           onClick={() => handleNavigation("/notifications")}
//           className={`flex flex-col items-center cursor-pointer group relative ${getActiveClass("/notifications")}`}
//         >
//           <div className="p-3 rounded-lg group-hover:bg-green-50 transition-colors">
//             <FaBell className="text-xl" />
//             {isNotificationActive && (
//               <span className="absolute top-2 right-4 bg-red-500 text-white text-xs rounded-full h-3 w-3"></span>
//             )}
//           </div>
//           <span className="text-xs font-medium mt-1">Alerts</span>
//         </div>

//         <div
//           onClick={() => handleNavigation("/market/dashboard")}
//           className={`flex flex-col items-center cursor-pointer group ${getActiveClass("/market/dashboard")}`}
//         >
//           <div className="p-3 rounded-lg group-hover:bg-green-50 transition-colors">
//             <FaShoppingCart className="text-xl" />
//           </div>
//           <span className="text-xs font-medium mt-1">Market</span>
//         </div>

//         <div
//           onClick={() => handleNavigation("/field-mart/dashboard")}
//           className={`flex flex-col items-center cursor-pointer group ${getActiveClass("/field-mart/dashboard")}`}
//         >
//           <div className="p-3 rounded-lg group-hover:bg-green-50 transition-colors">
//             <FaMapMarkedAlt className="text-xl" />
//           </div>
//           <span className="text-xs font-medium mt-1">FieldMart</span>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default AgriLinkedDashboard;













// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext.jsx";
// import getUserById from "../../../api/getUserData.js";
// import * as jwt_decode from "jwt-decode";
// import waitLoading from "/src/assets/json/waitLoading.json"; 
// import Lottie from "lottie-react";
// import { Outlet } from "react-router-dom";

// import { 
//   FaHome, FaBell, FaShoppingCart, FaSignOutAlt, FaCommentDots, 
//   FaUserCircle, FaSearch, FaMapMarkedAlt, FaCog, FaUserFriends, 
//   FaPlayCircle, FaTimesCircle, FaTimes, FaChevronDown, FaUser,
//   FaHashtag, FaRegBookmark, FaRegEnvelope, FaEllipsisH, FaFeatherAlt
// } from "react-icons/fa";
// import { RiLeafLine } from "react-icons/ri";
// import useScrollDirection from "../../../hooks/useScrollDirection.jsx";

// function AgriLinkedDashboard() {
//   const isHidden = useScrollDirection();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAuth();
//   const searchRef = useRef(null);

//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showRightMenu, setShowRightMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isNotificationActive, setIsNotificationActive] = useState(false);
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([
//     "Organic Tomatoes",
//     "Farming Equipment",
//     "Hydroponic Systems"
//   ]);
//   const [trendingSearches, setTrendingSearches] = useState([
//     { query: "Summer Harvest 2023", posts: "12.5K" },
//     { query: "Pesticide Alternatives", posts: "8.2K" },
//     { query: "Vertical Farming", posts: "15.7K" }
//   ]);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const decodedToken = jwt_decode(token);
//       const userId = decodedToken.userId;

//       const fetchUser = async () => {
//         try {
//           const userData = await getUserById(userId);
//           setCurrentUser(userData);
//           if (Math.random() > 0.5) setIsNotificationActive(true);
//         } catch (err) {
//           console.error("Error fetching user:", err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUser();
//     } catch (err) {
//       console.error("Error decoding token:", err);
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (showSearchModal && searchRef.current) {
//       searchRef.current.focus();
//     }
//   }, [showSearchModal]);

//   const handleNavigation = (path) => {
//     navigate(path);
//     setShowRightMenu(false);
//     if (path === "/notifications") setIsNotificationActive(false);
//   };

//   const getActiveClass = (path) =>
//     location.pathname === path 
//       ? "font-bold text-black dark:text-white" 
//       : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800";

//   const handleLogout = (e) => {
//     e.preventDefault();
//     logout();      
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       if (!recentSearches.includes(searchQuery)) {
//         setRecentSearches([searchQuery, ...recentSearches].slice(0, 5));
//       }
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setShowSearchModal(false);
//     }
//   };

//   const clearRecentSearches = () => {
//     setRecentSearches([]);
//   };

//   const removeRecentSearch = (index) => {
//     setRecentSearches(recentSearches.filter((_, i) => i !== index));
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen bg-black dark:bg-gray-900"> 
//       <Lottie 
//         animationData={waitLoading} 
//         loop={true} 
//         className="w-64 h-64" 
//       />
//     </div>
//   );

//   return (
//     <>
//       {/* Header - Mobile */}
//       <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 md:hidden ${
//         isHidden ? "-translate-y-full" : "translate-y-0"
//       }`}>
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div 
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => handleNavigation("/home")}
//           >
//             <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
//               <RiLeafLine className="text-lg" />
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button 
//               className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-500"
//               onClick={() => setShowSearchModal(true)}
//             >
//               <FaSearch className="text-xl" />
//             </button>

//             <button
//               className="flex items-center space-x-1 focus:outline-none"
//               onClick={() => setShowRightMenu(!showRightMenu)}
//             >
//               <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300">
//                 <FaUser /> 
//               </div>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Search Modal */}
//       {showSearchModal && (
//         <div className="fixed inset-0 z-50 bg-white dark:bg-black pt-16">
//           <div className="container mx-auto px-4">
//             <div className="relative mb-6">
//               <form onSubmit={handleSearch}>
//                 <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-3">
//                   <button 
//                     type="button"
//                     className="mr-2 text-gray-500 dark:text-gray-400"
//                     onClick={() => setShowSearchModal(false)}
//                   >
//                     <FaTimes className="text-xl" />
//                   </button>
//                   <input
//                     ref={searchRef}
//                     type="text"
//                     placeholder="Search AgriLinked"
//                     className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     autoComplete="off"
//                   />
//                   {searchQuery && (
//                     <button 
//                       type="button"
//                       className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                       onClick={() => setSearchQuery("")}
//                     >
//                       <FaTimesCircle />
//                     </button>
//                   )}
//                 </div>
//               </form>
//             </div>

//             {!searchQuery ? (
//               <div className="space-y-6">
//                 {recentSearches.length > 0 && (
//                   <div>
//                     <div className="flex justify-between items-center mb-3">
//                       <h3 className="font-bold text-gray-900 dark:text-white">Recent searches</h3>
//                       <button 
//                         onClick={clearRecentSearches}
//                         className="text-sm text-green-500 hover:text-green-600"
//                       >
//                         Clear all
//                       </button>
//                     </div>
//                     <div className="space-y-2">
//                       {recentSearches.map((search, index) => (
//                         <div 
//                           key={index}
//                           className="flex justify-between items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
//                           onClick={() => {
//                             setSearchQuery(search);
//                             searchRef.current.focus();
//                           }}
//                         >
//                           <div className="flex items-center">
//                             <FaSearch className="text-gray-500 dark:text-gray-400 mr-3" />
//                             <span className="text-gray-900 dark:text-white">{search}</span>
//                           </div>
//                           <button 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               removeRecentSearch(index);
//                             }}
//                             className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
//                           >
//                             <FaTimes />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <h3 className="font-bold text-gray-900 dark:text-white mb-3">Trends for you</h3>
//                   <div className="space-y-4">
//                     {trendingSearches.map((trend, index) => (
//                       <div 
//                         key={index}
//                         className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
//                         onClick={() => {
//                           setSearchQuery(trend.query);
//                           searchRef.current.focus();
//                         }}
//                       >
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <p className="text-xs text-gray-500">Agriculture · Trending</p>
//                             <p className="font-bold text-gray-900 dark:text-white">{trend.query}</p>
//                             <p className="text-xs text-gray-500">{trend.posts} posts</p>
//                           </div>
//                           <button className="text-gray-400 hover:text-green-500">
//                             <FaEllipsisH />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-10">
//                 <p className="text-gray-500 dark:text-gray-400">Search results will appear here</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Mobile Bottom Navigation */}
//       <nav className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 md:hidden z-40 transition-all duration-300 ease-in-out ${
//         showSearchModal ? "hidden" : ""
//       }`}>
//         <div className="flex justify-around py-3">
//           <div
//             onClick={() => handleNavigation("/home")}
//             className={`flex flex-col items-center cursor-pointer ${getActiveClass("/home")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaHome className="text-2xl" />
//             </div>
//           </div>

//           <div
//             onClick={() => handleNavigation("/explore")}
//             className={`flex flex-col items-center cursor-pointer ${getActiveClass("/explore")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaHashtag className="text-2xl" />
//             </div>
//           </div>

//           <div
//             onClick={() => handleNavigation("/notifications")}
//             className={`flex flex-col items-center cursor-pointer relative ${getActiveClass("/notifications")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaBell className="text-2xl" />
//               {isNotificationActive && (
//                 <span className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full h-2 w-2"></span>
//               )}
//             </div>
//           </div>

//           <div
//             onClick={() => handleNavigation("/messages")}
//             className={`flex flex-col items-center cursor-pointer ${getActiveClass("/messages")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaRegEnvelope className="text-2xl" />
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Desktop Layout */}
//       <div className="hidden md:flex min-h-screen max-w-7xl mx-auto">
//         {/* Left Sidebar */}
//         <aside className={`fixed left-0 top-0 h-full w-64 flex flex-col items-start px-4 py-4 space-y-2 border-r border-gray-200 dark:border-gray-800 z-30 ${
//           showSearchModal ? "hidden" : ""
//         }`}>
//           <div 
//             className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer mb-4"
//             onClick={() => handleNavigation("/home")}
//           >
//             <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
//               <RiLeafLine className="text-xl" />
//             </div>
//           </div>

//           <button
//             onClick={() => handleNavigation("/home")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/home")}`}
//           >
//             <FaHome className="mr-4" />
//             <span className="text-xl">Home</span>
//           </button>

//           <button
//             onClick={() => handleNavigation("/explore")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/explore")}`}
//           >
//             <FaHashtag className="mr-4" />
//             <span className="text-xl">Explore</span>
//           </button>

//           <button
//             onClick={() => handleNavigation("/notifications")}
//             className={`flex items-center p-3 rounded-full w-full text-xl relative ${getActiveClass("/notifications")}`}
//           >
//             <FaBell className="mr-4" />
//             <span className="text-xl">Notifications</span>
//             {isNotificationActive && (
//               <span className="absolute left-8 top-3 bg-red-500 text-white text-xs rounded-full h-2 w-2"></span>
//             )}
//           </button>

//           <button
//             onClick={() => handleNavigation("/messages")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/messages")}`}
//           >
//             <FaRegEnvelope className="mr-4" />
//             <span className="text-xl">Messages</span>
//           </button>

//           <button
//             onClick={() => handleNavigation("/bookmarks")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/bookmarks")}`}
//           >
//             <FaRegBookmark className="mr-4" />
//             <span className="text-xl">Bookmarks</span>
//           </button>

//           <button
//             onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass(`/profile/${currentUser?._id}`)}`}
//           >
//             <FaUserCircle className="mr-4" />
//             <span className="text-xl">Profile</span>
//           </button>

//           <button
//             onClick={() => handleNavigation("/market")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/market")}`}
//           >
//             <FaShoppingCart className="mr-4" />
//             <span className="text-xl">Market</span>
//           </button>

//           <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 w-full mt-4 font-bold text-lg shadow-lg transform transition hover:scale-105">
//             <FaFeatherAlt className="inline mr-2" />
//             Post
//           </button>

//           <div className="absolute bottom-4 w-56">
//             <button
//               className="flex items-center justify-between p-3 rounded-full w-full hover:bg-gray-100 dark:hover:bg-gray-800"
//               onClick={() => setShowRightMenu(!showRightMenu)}
//             >
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                   <FaUser className="text-gray-700 dark:text-gray-300" />
//                 </div>
//                 <div className="ml-2 text-left">
//                   <p className="font-bold text-gray-900 dark:text-white">{currentUser?.username || "User"}</p>
//                   <p className="text-gray-500 text-sm">@{currentUser?.username?.toLowerCase() || "user"}</p>
//                 </div>
//               </div>
//               <FaEllipsisH className="text-gray-500" />
//             </button>

//             {showRightMenu && (
//               <div className="absolute bottom-16 left-0 w-64 bg-white dark:bg-black rounded-xl shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
//                 <div className="py-1">
//                   <div 
//                     className="px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                     onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
//                   >
//                     <p className="font-semibold">{currentUser?.username || "User"}</p>
//                     <p className="text-sm text-gray-500">@{currentUser?.username?.toLowerCase() || "user"}</p>
//                   </div>
//                 </div>
//                 <div className="py-1">
//                   <div 
//                     className="px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                     onClick={() => handleNavigation("/settings")}
//                   >
//                     Settings
//                   </div>
//                 </div>
//                 <div className="py-1">
//                   <div 
//                     className="px-4 py-3 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                     onClick={handleLogout}
//                   >
//                     Log out
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </aside>

//         <main className="flex-1 border-r border-gray-200 dark:border-gray-800 ml-64 min-h-screen">
//           <div className="p-4">
//           <Outlet />
//           </div>
//         </main> 

//         {/* Right Sidebar */}
//         <aside className={`hidden lg:block w-80 p-4 ${showSearchModal ? "hidden" : ""}`}>
//           <div className="sticky top-4 space-y-4">
//             {/* Search Bar */}
//             <form 
//               onSubmit={handleSearch}
//               className="relative"
//             >
//               <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-3">
//                 <FaSearch className="text-gray-500 dark:text-gray-400 mr-2" />
//                 <input
//                   type="text"
//                   placeholder="Search AgriLinked"
//                   className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   autoComplete="off"
//                 />
//               </div>
//             </form>

//             {/* Trends */}
//             <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl">
//               <h3 className="font-bold text-xl p-4 text-gray-900 dark:text-white">Trends for you</h3>
//               {trendingSearches.map((trend, index) => (
//                 <div 
//                   key={index}
//                   className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
//                   onClick={() => setSearchQuery(trend.query)}
//                 >
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500">Agriculture · Trending</p>
//                       <p className="font-bold text-gray-900 dark:text-white">{trend.query}</p>
//                       <p className="text-xs text-gray-500">{trend.posts} posts</p>
//                     </div>
//                     <button className="text-gray-400 hover:text-green-500">
//                       <FaEllipsisH />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <div className="p-4 text-green-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-b-2xl">
//                 Show more
//               </div>
//             </div>

//             {/* Who to follow */}
//             <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl">
//               <h3 className="font-bold text-xl p-4 text-gray-900 dark:text-white">Who to follow</h3>
//               <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
//                   <div>
//                     <p className="font-bold text-gray-900 dark:text-white">FarmTech</p>
//                     <p className="text-sm text-gray-500">@farmtech</p>
//                   </div>
//                 </div>
//                 <button className="bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-1 font-bold text-sm">
//                   Follow
//                 </button>
//               </div>
//               <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
//                   <div>
//                     <p className="font-bold text-gray-900 dark:text-white">AgriNews</p>
//                     <p className="text-sm text-gray-500">@agrinews</p>
//                   </div>
//                 </div>
//                 <button className="bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-1 font-bold text-sm">
//                   Follow
//                 </button>
//               </div>
//               <div className="p-4 text-green-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-b-2xl">
//                 Show more
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// }

// export default AgriLinkedDashboard;













// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext.jsx";
// import getUserById from "../../../api/getUserData.js";
// import * as jwt_decode from "jwt-decode";
// import waitLoading from "/src/assets/json/waitLoading.json"; 
// import Lottie from "lottie-react";
// import { Outlet } from "react-router-dom";


// import { 
//   FaHome, FaBell, FaShoppingCart, FaSignOutAlt, FaCommentDots, 
//   FaUserCircle, FaSearch, FaMapMarkedAlt, FaCog, FaUserFriends, 
//   FaPlayCircle, FaTimesCircle, FaTimes, FaChevronDown, FaUser,
//   FaHashtag, FaRegBookmark, FaRegEnvelope, FaEllipsisH, FaFeatherAlt
// } from "react-icons/fa";
// import { RiLeafLine } from "react-icons/ri";
// import useScrollDirection from "../../../hooks/useScrollDirection.jsx";

// function AgriLinkedDashboard() {
//   const isHidden = useScrollDirection();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAuth();
//   const searchRef = useRef(null);

//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showRightMenu, setShowRightMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isNotificationActive, setIsNotificationActive] = useState(false);
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([
//     "Organic Tomatoes",
//     "Farming Equipment",
//     "Hydroponic Systems"
//   ]);
//   const [trendingSearches, setTrendingSearches] = useState([
//     { query: "Summer Harvest 2023", posts: "12.5K" },
//     { query: "Pesticide Alternatives", posts: "8.2K" },
//     { query: "Vertical Farming", posts: "15.7K" }
//   ]);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const decodedToken = jwt_decode(token);
//       const userId = decodedToken.userId;

//       const fetchUser = async () => {
//         try {
//           const userData = await getUserById(userId);
//           setCurrentUser(userData);
//           if (Math.random() > 0.5) setIsNotificationActive(true);
//         } catch (err) {
//           console.error("Error fetching user:", err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchUser();
//     } catch (err) {
//       console.error("Error decoding token:", err);
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (showSearchModal && searchRef.current) {
//       searchRef.current.focus();
//     }
//   }, [showSearchModal]);

//   const handleNavigation = (path) => {
//     navigate(path);
//     setShowRightMenu(false);
//     if (path === "/notifications") setIsNotificationActive(false);
//   };

//   const getActiveClass = (path) =>
//     location.pathname === path 
//       ? "font-bold text-black dark:text-white" 
//       : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800";

//   const getMobileActiveClass = (path) =>
//     location.pathname === path 
//       ? "text-green-600 scale-110 font-semibold" 
//       : "text-gray-600 hover:text-green-500";

//   const handleLogout = (e) => {
//     e.preventDefault();
//     logout();      
//     navigate("/");
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       if (!recentSearches.includes(searchQuery)) {
//         setRecentSearches([searchQuery, ...recentSearches].slice(0, 5));
//       }
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setShowSearchModal(false);
//     }
//   };

//   const clearRecentSearches = () => {
//     setRecentSearches([]);
//   };

//   const removeRecentSearch = (index) => {
//     setRecentSearches(recentSearches.filter((_, i) => i !== index));
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-white dark:bg-black"> 
//       <Lottie 
//         animationData={waitLoading} 
//         loop={true} 
//         className="w-64 h-64" 
//       />
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Header */}
//       <header className={`md:hidden fixed top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white shadow-sm backdrop-blur-sm ${
//         isHidden ? "-translate-y-full lg:translate-y-0" : "translate-y-0"
//       }`}>
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div 
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => handleNavigation("/home")}
//           >
//             <img 
//               src="src/assets/images/tomatoLogo.png"
//               width="36px"
//               className="transition-transform duration-300 animate-spin"
//               alt="AgriLinked Logo"
//             />
//             <h1 className="font-bold text-xl bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
//               Agri<span className="text-orange-500">Linked</span>
//             </h1>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button 
//               className="p-2 text-gray-600 hover:text-green-600"
//               onClick={() => setShowSearchModal(true)}
//             >
//               <FaSearch className="text-xl" />
//             </button>

//             <div 
//               className="relative p-2 text-gray-600 hover:text-green-600 cursor-pointer"
//               onClick={() => handleNavigation("/messenger")}
//             >
//               <FaCommentDots className="text-xl" />
//               <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 3
//               </span>
//             </div>

//             <div className="relative">
//               <button
//                 className="flex items-center space-x-1 focus:outline-none group"
//                 onClick={() => setShowRightMenu(!showRightMenu)}
//               >
//                 <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold group-hover:ring-2 group-hover:ring-green-300 transition-all">
//                   <FaUser/> 
//                 </div>
//                 <FaChevronDown className={`text-gray-500 text-xs transition-transform ${showRightMenu ? "rotate-180" : ""}`} />
//               </button>

//               {showRightMenu && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50 border border-gray-100 divide-y divide-gray-100">
//                   <div className="px-4 py-3">
//                     <p className="text-sm font-semibold text-gray-700">{currentUser?.username || "User"}</p>
//                     <p className="text-xs text-gray-500">{currentUser?.email || "user@example.com"}</p>
//                   </div>
//                   <div className="py-1">
//                     <div 
//                       className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
//                     >
//                       <FaUserCircle className="mr-3 text-gray-500" />
//                       Profile
//                     </div>
//                     <div 
//                       className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={() => handleNavigation("/friends")}
//                     >
//                       <FaUserFriends className="mr-3 text-gray-500" />
//                       Friends
//                     </div>
//                     <div 
//                       className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={() => handleNavigation("/settings")}
//                     >
//                       <FaCog className="mr-3 text-gray-500" />
//                       Settings
//                     </div>
//                   </div>
//                   <div className="py-1">
//                     <div 
//                       className="px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer flex items-center"
//                       onClick={handleLogout}
//                     >
//                       <FaSignOutAlt className="mr-3 text-red-500" />
//                       Logout
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Search Modal */}
//       {showSearchModal && (
//         <div className="md:hidden fixed inset-0 z-50 bg-white pt-16">
//           <div className="container mx-auto px-4">
//             <div className="relative mb-6">
//               <form onSubmit={handleSearch}>
//                 <div className="flex items-center bg-gray-50 rounded-lg px-4 py-3 shadow-inner border border-gray-200 focus-within:border-green-400">
//                   <button 
//                     type="button"
//                     className="mr-2 text-gray-500"
//                     onClick={() => setShowSearchModal(false)}
//                   >
//                     <FaTimes className="text-xl" />
//                   </button>
//                   <input
//                     ref={searchRef}
//                     type="text"
//                     placeholder="Search farmers, products, hashtags..."
//                     className="flex-1 bg-transparent border-none outline-none placeholder-gray-400 text-gray-700"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     autoComplete="off"
//                   />
//                   {searchQuery && (
//                     <button 
//                       type="button"
//                       className="ml-2 text-gray-400 hover:text-gray-600"
//                       onClick={() => setSearchQuery("")}
//                     >
//                       <FaTimesCircle />
//                     </button>
//                   )}
//                 </div>
//               </form>
//             </div>

//             {!searchQuery ? (
//               <div className="space-y-6">
//                 {recentSearches.length > 0 && (
//                   <div>
//                     <div className="flex justify-between items-center mb-3">
//                       <h3 className="font-semibold text-gray-700">Recent Searches</h3>
//                       <button 
//                         onClick={clearRecentSearches}
//                         className="text-sm text-green-600 hover:text-green-800"
//                       >
//                         Clear all
//                       </button>
//                     </div>
//                     <div className="space-y-2">
//                       {recentSearches.map((search, index) => (
//                         <div 
//                           key={index}
//                           className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
//                           onClick={() => {
//                             setSearchQuery(search);
//                             searchRef.current.focus();
//                           }}
//                         >
//                           <div className="flex items-center">
//                             <FaSearch className="text-gray-400 mr-3" />
//                             <span className="text-gray-700">{search}</span>
//                           </div>
//                           <button 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               removeRecentSearch(index);
//                             }}
//                             className="text-gray-400 hover:text-gray-600 p-1"
//                           >
//                             <FaTimes />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <h3 className="font-semibold text-gray-700 mb-3">Trending Now</h3>
//                   <div className="space-y-2">
//                     {trendingSearches.map((trend, index) => (
//                       <div 
//                         key={index}
//                         className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
//                         onClick={() => {
//                           setSearchQuery(trend.query);
//                           searchRef.current.focus();
//                         }}
//                       >
//                         <FaSearch className="text-gray-400 mr-3" />
//                         <span className="text-gray-700">{trend.query}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-10">
//                 <p className="text-gray-500">Search results will appear here</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Mobile Bottom Navigation */}
//       <nav className={`md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-40 transition-all duration-300 ease-in-out ${
//         showSearchModal ? "hidden" : ""
//       }`}>
//         <div className="flex justify-around py-3">
//           <div
//             onClick={() => handleNavigation("/home")}
//             className={`flex flex-col items-center cursor-pointer ${getMobileActiveClass("/home")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaHome className="text-xl" />
//             </div>
//             <span className="text-xs font-medium">Home</span>
//           </div>

//           <div
//             onClick={() => handleNavigation("/video")}
//             className={`flex flex-col items-center cursor-pointer ${getMobileActiveClass("/video")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaPlayCircle className="text-xl" />
//             </div>
//             <span className="text-xs font-medium">Video</span>
//           </div>

//           <div
//             onClick={() => handleNavigation("/notifications")}
//             className={`flex flex-col items-center cursor-pointer relative ${getMobileActiveClass("/notifications")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaBell className="text-xl" />
//               {isNotificationActive && (
//                 <span className="absolute top-0 right-4 bg-red-500 text-white text-xs rounded-full h-3 w-3"></span>
//               )}
//             </div>
//             <span className="text-xs font-medium">Alerts</span>
//           </div>

//           <div
//             onClick={() => handleNavigation("/market/dashboard")}
//             className={`flex flex-col items-center cursor-pointer ${getMobileActiveClass("/market/dashboard")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaShoppingCart className="text-xl" />
//             </div>
//             <span className="text-xs font-medium">Market</span>
//           </div>

//           <div
//             onClick={() => handleNavigation("/field-mart/dashboard")}
//             className={`flex flex-col items-center cursor-pointer ${getMobileActiveClass("/field-mart/dashboard")}`}
//           >
//             <div className="p-2 rounded-full transition-colors">
//               <FaMapMarkedAlt className="text-xl" />
//             </div>
//             <span className="text-xs font-medium">FieldMart</span>
//           </div>
//         </div>
//       </nav>

//       {/* Desktop Layout */}
//       <div className="hidden md:flex min-h-screen max-w-7xl mx-auto">
//         {/* Left Sidebar */}
//         <aside className={`fixed left-0 top-0 h-full w-64 flex flex-col items-start px-4 py-4 space-y-2 border-r border-gray-200 dark:border-gray-800 z-30`}>
//           <div 
//             className="flex items-center justify-center p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer mb-4"
//             onClick={() => handleNavigation("/home")}
//           >
//             <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white">
//               <RiLeafLine className="text-xl" />
//             </div>
//           </div>

//           <button
//             onClick={() => handleNavigation("/home")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/home")}`}
//           >
//             <FaHome className="mr-4" />
//             <span className="text-xl">Home</span>
//           </button>

//           <button
//             onClick={() => handleNavigation("/explore")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/explore")}`}
//           >
//             <FaHashtag className="mr-4" />
//             <span className="text-xl">Explore</span>
//           </button>

//           <button
//             onClick={() => handleNavigation("/notifications")}
//             className={`flex items-center p-3 rounded-full w-full text-xl relative ${getActiveClass("/notifications")}`}
//           >
//             <FaBell className="mr-4" />
//             <span className="text-xl">Notifications</span>
//             {isNotificationActive && (
//               <span className="absolute left-8 top-3 bg-red-500 text-white text-xs rounded-full h-2 w-2"></span>
//             )}
//           </button>

//           <button
//             onClick={() => handleNavigation("/messages")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/messages")}`}
//           >
//             <FaRegEnvelope className="mr-4" />
//             <span className="text-xl">Messages</span>
//           </button>

//           <button
//             onClick={() => handleNavigation("/bookmarks")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/bookmarks")}`}
//           >
//             <FaRegBookmark className="mr-4" />
//             <span className="text-xl">Bookmarks</span>
//           </button>

//           <button
//             onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass(`/profile/${currentUser?._id}`)}`}
//           >
//             <FaUserCircle className="mr-4" />
//             <span className="text-xl">Profile</span>
//           </button>

//           <button
//             onClick={() => handleNavigation("/market")}
//             className={`flex items-center p-3 rounded-full w-full text-xl ${getActiveClass("/market")}`}
//           >
//             <FaShoppingCart className="mr-4" />
//             <span className="text-xl">Market</span>
//           </button>

//           <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 w-full mt-4 font-bold text-lg shadow-lg transform transition hover:scale-105">
//             <FaFeatherAlt className="inline mr-2" />
//             Post
//           </button>

//           <div className="absolute bottom-4 w-56">
//             <button
//               className="flex items-center justify-between p-3 rounded-full w-full hover:bg-gray-100 dark:hover:bg-gray-800"
//               onClick={() => setShowRightMenu(!showRightMenu)}
//             >
//               <div className="flex items-center">
//                 <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                   <FaUser className="text-gray-700 dark:text-gray-300" />
//                 </div>
//                 <div className="ml-2 text-left">
//                   <p className="font-bold text-gray-900 dark:text-white">{currentUser?.username || "User"}</p>
//                   <p className="text-gray-500 text-sm">@{currentUser?.username?.toLowerCase() || "user"}</p>
//                 </div>
//               </div>
//               <FaEllipsisH className="text-gray-500" />
//             </button>

//             {showRightMenu && (
//               <div className="absolute bottom-16 left-0 w-64 bg-white dark:bg-black rounded-xl shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
//                 <div className="py-1">
//                   <div 
//                     className="px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                     onClick={() => handleNavigation(`/profile/${currentUser?._id}`)}
//                   >
//                     <p className="font-semibold">{currentUser?.username || "User"}</p>
//                     <p className="text-sm text-gray-500">@{currentUser?.username?.toLowerCase() || "user"}</p>
//                   </div>
//                 </div>
//                 <div className="py-1">
//                   <div 
//                     className="px-4 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                     onClick={() => handleNavigation("/settings")}
//                   >
//                     Settings
//                   </div>
//                 </div>
//                 <div className="py-1">
//                   <div 
//                     className="px-4 py-3 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
//                     onClick={handleLogout}
//                   >
//                     Log out
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 border-r border-gray-200 dark:border-gray-800 ml-64 min-h-screen">
//           {/* This is where your main content would go */}
//           <div className="p-4">  
//             <Outlet />
//           </div>
//         </main>

//         {/* Right Sidebar */}
//         <aside className="hidden lg:block w-80 p-4">
//           <div className="sticky top-4 space-y-4">
//             {/* Search Bar */}
//             <form 
//               onSubmit={handleSearch}
//               className="relative"
//             >
//               <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-3">
//                 <FaSearch className="text-gray-500 dark:text-gray-400 mr-2" />
//                 <input
//                   type="text"
//                   placeholder="Search AgriLinked"
//                   className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   autoComplete="off"
//                 />
//               </div>
//             </form>

//             {/* Trends */}
//             <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl">
//               <h3 className="font-bold text-xl p-4 text-gray-900 dark:text-white">Trends for you</h3>
//               {trendingSearches.map((trend, index) => (
//                 <div 
//                   key={index}
//                   className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
//                   onClick={() => setSearchQuery(trend.query)}
//                 >
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-xs text-gray-500">Agriculture · Trending</p>
//                       <p className="font-bold text-gray-900 dark:text-white">{trend.query}</p>
//                       <p className="text-xs text-gray-500">{trend.posts} posts</p>
//                     </div>
//                     <button className="text-gray-400 hover:text-green-500">
//                       <FaEllipsisH />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <div className="p-4 text-green-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-b-2xl">
//                 Show more
//               </div>
//             </div>

//             {/* Who to follow */}
//             <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl">
//               <h3 className="font-bold text-xl p-4 text-gray-900 dark:text-white">Who to follow</h3>
//               <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
//                   <div>
//                     <p className="font-bold text-gray-900 dark:text-white">FarmTech</p>
//                     <p className="text-sm text-gray-500">@farmtech</p>
//                   </div>
//                 </div>
//                 <button className="bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-1 font-bold text-sm">
//                   Follow
//                 </button>
//               </div>
//               <div className="p-4 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
//                   <div>
//                     <p className="font-bold text-gray-900 dark:text-white">AgriNews</p>
//                     <p className="text-sm text-gray-500">@agrinews</p>
//                   </div>
//                 </div>
//                 <button className="bg-black dark:bg-white text-white dark:text-black rounded-full px-4 py-1 font-bold text-sm">
//                   Follow
//                 </button>
//               </div>
//               <div className="p-4 text-green-500 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-b-2xl">
//                 Show more
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </>
//   );
// }

// export default AgriLinkedDashboard;

