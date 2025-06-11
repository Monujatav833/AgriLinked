import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext";
import { 
  FaCheckCircle, FaShieldAlt, FaStar, FaMapMarkerAlt, FaCity, 
  FaDirections, FaExpand, FaSeedling, FaWater, FaSun, 
  FaRulerCombined, FaFileAlt, FaFileContract, FaFileSignature, 
  FaMap, FaEye, FaPhoneAlt, FaCalendarAlt, FaWhatsapp, 
  FaHandshake, FaUserCheck, FaHeadset, FaTractor, FaRoad, 
  FaBolt, FaTree, FaImages, FaVideo, FaRupeeSign, FaRegComment,
  FaUserCircle, FaSearch, FaThLarge, FaMapMarkedAlt, FaMoneyCheck,
  FaTint, FaUpload, FaTimes, FaFilter, FaRegBookmark, FaEnvelope, 
  FaThumbsUp, FaReply, FaRegEnvelope, FaList, FaEllipsisH, 
  FaRegHeart, FaBookmark, FaPhone, FaInfoCircle, FaHeart, 
  FaShare, FaClock, FaChevronDown, FaPlay, FaCameraRetro, 
  FaUserShield, FaLeaf, FaMoneyBillWave, FaUserTie,
  FaChevronLeft, FaChevronRight, FaRegStar, FaCloudRain,    
  FaHorse, FaWarehouse, FaPenAlt
} from 'react-icons/fa';

export const HeroSection = ({ onFilterClick }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`${darkMode ? 'bg-gray-700' : 'bg-black'}`}>
      <div className=" max-w-8xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center">
          <h1 className={`text-2xl md:text-4xl font-bold mb-4 md:mb-6 ${darkMode ? 'text-white' : 'text-white'}`}>
            Find Your Perfect Agricultural Land
          </h1>
          <div className="max-w-3xl mx-auto">
            <div className={`flex flex-col md:flex-row rounded-lg shadow-lg p-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex-1 flex items-center px-4 py-2 md:py-0">
                <FaSearch className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input 
                  type="text" 
                  placeholder="Search by location, land type..." 
                  className={`w-full border-0 outline-none focus:ring-0 text-sm md:text-base ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900'}`}
                />
                <button 
                  onClick={onFilterClick}
                  className={`md:hidden ml-2 rounded-lg px-3 py-1 flex items-center ${darkMode ? 'bg-gray-700 text-white' : 'bg-black text-white'}`}
                >
                  <FaFilter className="mr-1" />
                  <span>Filters</span>
                </button>
              </div>
              <button className={`rounded-lg px-4 py-2 md:px-6 font-medium text-sm md:text-base mt-2 md:mt-0 ${darkMode ? 'bg-gray-700 text-white' : 'bg-black text-white'}`}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FilterSection = ({ isOpen, onClose, onApply }) => {
  const { darkMode } = useTheme();
  const [filters, setFilters] = useState({
    landType: 'Agricultural',
    minPrice: '',
    maxPrice: '',
    landSize: '0-5 Acres',
    soilType: 'Black Soil'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const renderFilterContent = () => (
    <>
      <div className="flex justify-between items-center mb-4 md:hidden ">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
        <button onClick={onClose} className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
          <FaTimes size={20} />
        </button>
      </div>
      
      <h3 className={`font-semibold mb-4 hidden md:block ${darkMode ? 'text-white' : 'text-gray-900'}`}>Filters</h3>
      
      <div className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Land Type</label>
          <select 
            name="landType"
            value={filters.landType}
            onChange={handleChange}
            className={`w-full rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option className={darkMode ? 'bg-gray-700' : ''}>Irrigated Land</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>Non-Irrigated Land</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>Horticulture Land</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>Pasture/Grazing Land</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>Organic Farming Land</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>Polyhouse/Greenhouse Land</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price Range</label>
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min" 
              className={`w-full rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
            <span className={darkMode ? 'text-gray-300' : ''}>-</span>
            <input 
              type="text" 
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max" 
              className={`w-full rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            />
          </div>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Land Size</label>
          <select 
            name="landSize"
            value={filters.landSize}
            onChange={handleChange}
            className={`w-full rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option className={darkMode ? 'bg-gray-700' : ''}>0-5 Acres</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>5-10 Acres</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>10+ Acres</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Soil Type</label>
          <select 
            name="soilType"
            value={filters.soilType}
            onChange={handleChange}
            className={`w-full rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option className={darkMode ? 'bg-gray-700' : ''}>Black Soil</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>Red Soil</option>
            <option className={darkMode ? 'bg-gray-700' : ''}>Sandy Soil</option>
          </select>
        </div>
      </div>
      
      <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3 md:hidden">
        <button
          type="button"
          onClick={onClose}
          className={`w-full border rounded-lg px-4 py-2 text-base font-medium ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleApply}
          className={`w-full border border-transparent rounded-lg px-4 py-2 text-base font-medium ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-black text-white hover:bg-opacity-90'}`}
        >
          Apply Filters
        </button>
      </div>
      
      <button 
        onClick={handleApply}
        className={`hidden md:block mt-4 w-full rounded-lg px-4 py-2 font-medium ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-black text-white hover:bg-opacity-90'}`}
      >
        Apply Filters
      </button>
    </>
  );

  return (
    <>
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className={`rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {renderFilterContent()}
        </div>
      </div>

      <div className={`${isOpen ? 'fixed' : 'hidden'} md:hidden inset-0 z-50 overflow-y-auto`}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
          </div>
          
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div className={`inline-block align-bottom rounded-t-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {renderFilterContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export const PropertyCard = ({ price, title, location, size, water, image, verified, status }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className={`rounded-lg shadow overflow-hidden relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        {image ? (
          <img src={image} className="w-full h-full object-cover" alt={title} />
        ) : (
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No Image Available</span>
        )}
      </div>

      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold ${status === "For Sale" ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
        {status}
      </div>

      <div className="absolute top-2 right-2 flex space-x-2">
        <button className={`p-2 rounded-full shadow hover:bg-gray-100 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white'}`}>
          <FaHeart className={`text-sm ${darkMode ? 'hover:text-red-400' : 'hover:text-red-500'}`} />
        </button>
        <button className={`p-2 rounded-full shadow hover:bg-gray-100 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white'}`}>
          <FaShare className={`text-sm ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-500'}`} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{price}</span>
          {verified && (
            <span className={`flex items-center text-xs px-2 py-1 rounded ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
              <FaCheckCircle className="mr-1" /> Verified
            </span>
          )}
        </div>
        
        <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        
        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <FaMapMarkerAlt className={`mr-2 inline ${darkMode ? 'text-gray-400' : ''}`} />{location}
        </p>
        
        <div className={`flex items-center justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span><FaRulerCombined className="mr-1 inline" />{size}</span>
          <span><FaTint className="mr-1 inline" />{water}</span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <img 
              className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-xs"
              src=""
              alt=""
            />
            <div className="ml-3">
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Rajat dlala</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Listed 1 months ago</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <FaPhone className="text-blue-600" />
            </button>
            <button 
              onClick={() => navigate('/field-mart/view-details')}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-full transition-colors shadow-sm ${darkMode ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              <FaInfoCircle className="mr-1.5" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedListings = () => {
  const { darkMode } = useTheme();
  const properties = [
    {
      price: "250,000 INR",
      title: "20 Acre Farmland",
      location: "Karnataka, India",
      size: "20 acres",
      water: "Water Available",
      image: "",
      verified: true,
      status: "For Sale"
    },
    {
      price: "180,000 INR",
      title: "15 Acre Farmland",
      location: "Maharashtra, India",
      size: "15 acres",
      water: "Water Available",
      image: "",
      verified: true,
      status: "For Lease"
    },
    {
      price: "320,000 INR",
      title: "25 Acre Farmland",
      location: "Punjab, India",
      size: "25 acres",
      water: "Water Available",
      image: "",
      verified: false,
      status: "For Sale"
    }
  ];

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className={`text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Featured Listings</h2>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className={`p-1 md:p-0 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-green-600'}`}>
            <FaThLarge className="text-sm md:text-base" />
          </button>
          <button className={`p-1 md:p-0 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-green-600'}`}>
            <FaMapMarkedAlt className="text-sm md:text-base" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>

      <div className="my-4 mx-auto text-center">
        <button className={`px-6 py-3 rounded-full text-sm font-medium transition-colors shadow-sm inline-flex items-center ${darkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
          View More Listings
          <FaChevronDown className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const LandDetails = () => {
  const { darkMode } = useTheme();
  const media = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D', 
    title: 'Full Land View', description: '5 Bigha fertile land with clear boundaries', featured: true },
    { id: 2, type: 'video', url: 'https://videos.pexels.com/video-files/2848072/2848072-sd_640_360_30fps.mp4', title: '360° Land Tour', description: 'Complete walkthrough of the property', featured: true },
    { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D',
     title: 'Soil Quality', description: 'Black cotton soil - ideal for farming' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D',
     title: 'Water Source', description: 'Bore well with good water output' },
    { id: 5, type: 'video', url: 'https://videos.pexels.com/video-files/2839596/2839596-sd_640_360_30fps.mp4',
     title: 'Crop Potential', description: 'See what grows well here' },
    { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFncmljdWx0dXJlfGVufDB8fDB8fHww',
     title: 'Access Road', description: 'Convenient approach to the property' },
  ];

  const [selectedMedia, setSelectedMedia] = useState(media[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showBidding, setShowBidding] = useState(false);
  const [activeTab, setActiveTab] = useState('offers');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const [savedBids, setSavedBids] = useState([]);
  const [shareModal, setShareModal] = useState(false);
  const [newBid, setNewBid] = useState({
    amount: '',
    message: ''
  });
  const [replyContent, setReplyContent] = useState({});
  
  const [currentUser] = useState({
    id: 'user-123',
    name: 'Current User',
    profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
    verified: true
  });
  
  const [bids, setBids] = useState([
    { 
      id: 1, 
      user: { 
        id: 'user-456',
        name: 'rajat dalal', 
        profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
        verified: true 
      }, 
      amount: 2700000, 
      message: 'I\'m very interested in this property. Would you consider ₹27,00,000 per bigha?',
      timestamp: '2023-05-15T10:30:00', 
      accepted: false,
      likes: 2,
      liked: false,
      replies: [
        {
          id: 101,
          user: {
            id: 'user-789',
            name: 'Property Owner',
            profilePic: 'https://randomuser.me/api/portraits/men/10.jpg',
            verified: true
          },
          message: 'Can you make it ₹27,50,000? We have other offers at that price point.',
          timestamp: '2023-05-15T11:45:00'
        }
      ],
      showReply: false
    },
    { 
      id: 2, 
      user: { 
        id: 'user-987',
        name: 'sulkeha dhakad', 
        profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
        verified: false 
      }, 
      amount: 2600000, 
      message: 'I can offer ₹26,00,000. Let me know if you\'re interested.',
      timestamp: '2023-05-14T15:45:00', 
      accepted: false,
      likes: 0,
      liked: false,
      replies: [],
      showReply: false
    },
  ]);
  
  const isOwner = true; 

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedBids')) || [];
    setSavedBids(saved);
  }, []);

  const toggleSaveBid = (bidId) => {
    const updatedSavedBids = savedBids.includes(bidId)
      ? savedBids.filter(id => id !== bidId)
      : [...savedBids, bidId];
    
    setSavedBids(updatedSavedBids);
    localStorage.setItem('savedBids', JSON.stringify(updatedSavedBids));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageContent) return;
    
    // In a real app, this would send to your backend
    console.log(`Message to ${messageRecipient.name}: ${messageContent}`);
    
    // Close modal and reset
    setShowMessageModal(false);
    setMessageContent('');
    setMessageRecipient(null);
    
    // Show confirmation
    alert(`Message sent to ${messageRecipient.name}!`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
    setShareModal(false);
  };

  const handlePlaceBid = (e) => {
    e.preventDefault();
    if (!newBid.amount || !newBid.message) return;
    
    const bid = {
      id: bids.length + 1,
      user: currentUser,
      amount: parseInt(newBid.amount),
      message: newBid.message,
      timestamp: new Date().toISOString(),
      accepted: false,
      likes: 0,
      liked: false,
      replies: [],
      showReply: false
    };
    
    setBids([bid, ...bids]);
    setNewBid({ amount: '', message: '' });
  };

  const handleAcceptBid = (bidId) => {
    setBids(bids.map(bid => ({
      ...bid,
      accepted: bid.id === bidId
    })));
  };

  const handleLike = (bidId) => {
    setBids(bids.map(bid => {
      if (bid.id === bidId) {
        return {
          ...bid,
          likes: bid.liked ? bid.likes - 1 : bid.likes + 1,
          liked: !bid.liked
        };
      }
      return bid;
    }));
  };

  const toggleReply = (bidId) => {
    setBids(bids.map(bid => {
      if (bid.id === bidId) {
        return {
          ...bid,
          showReply: !bid.showReply
        };
      }
      return bid;
    }));
    setReplyContent({ ...replyContent, [bidId]: '' });
  };

  const handleReply = (bidId, e) => {
    e.preventDefault();
    if (!replyContent[bidId]) return;
    
    const reply = {
      id: Date.now(),
      user: isOwner ? {
        name: 'Property Owner',
        profilePic: 'https://randomuser.me/api/portraits/men/10.jpg',
        verified: true
      } : currentUser,
      message: replyContent[bidId],
      timestamp: new Date().toISOString()
    };
    
    setBids(bids.map(bid => {
      if (bid.id === bidId) {
        return {
          ...bid,
          replies: [...bid.replies, reply],
          showReply: false
        };
      }
      return bid;
    }));
    
    setReplyContent({ ...replyContent, [bidId]: '' });
  };

  return (
    <div className={`md:mt-8 rounded-xl shadow-xl p-4 md:p-8 ${darkMode ? 'bg-gray-800' : 'bg-white' }`} id="land-details">
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-2xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>5 Bigha Fertile Agricultural Land in Indore</h1>
            <p className={`text-sm md:text-base mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Listed by: GreenEarth Properties • Last updated: 2 days ago</p>
          </div>
          <div className="flex items-center mt-3 md:mt-0 space-x-2">
            <span className={`px-3 py-1 rounded-full flex items-center text-sm md:text-base font-medium ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
              <FaCheckCircle className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} /> Verified Listing
            </span>
            <span className={`px-3 py-1 rounded-full flex items-center text-sm md:text-base font-medium ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
              <FaShieldAlt className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} /> Legal Clearance
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <img 
              className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-xs"
              src="https://randomuser.me/api/portraits/men/10.jpg"
              alt="Owner"
            />
            <div className="ml-3">
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>GreenEarth Properties</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Listed 1 months ago</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <FaPhone className="text-blue-600" />
            </button>
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <FaWhatsapp className="text-green-500 text-xl" />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className={`text-2xl md:text-3xl font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            ₹25,00,000 <span className={`text-base md:text-lg font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>per Bigha</span>
            <span className={`ml-2 text-sm md:text-base px-2 py-1 rounded-full ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>Negotiable</span>
          </div>
          <div className={`mt-2 md:mt-0 flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaStar className="text-yellow-400 mr-1" />
            <span className="font-medium">4.8</span>
            <span className="mx-1">•</span>
            <span>12 Reviews</span>
          </div>
        </div>
      </div>
      
      <div className={`mb-6 md:mb-8 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
        <h3 className={`text-lg md:text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Key Highlights</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center">
            <FaTractor className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : ''}`}>Ready for Farming</span>
          </div>
          <div className="flex items-center">
            <FaRoad className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : ''}`}>Main Road Access</span>
          </div>
          <div className="flex items-center">
            <FaBolt className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : ''}`}>Electricity Available</span>
          </div>
          <div className="flex items-center">
            <FaTree className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : ''}`}>Mature Trees Present</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6 md:mb-8">
        <div>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className={`text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Location Details</h2>
            <button className={`flex items-center ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              <FaDirections className="mr-1" /> Get Directions
            </button>
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-start">
              <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                <FaMapMarkerAlt className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Village: Betma</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>5km from Indore Bypass</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                <FaCity className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>District: Indore</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Madhya Pradesh</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative h-48 md:h-56 rounded-xl overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  className="absolute inset-0"
                ></iframe>
                <div className={`absolute bottom-2 right-2 px-2 py-1 rounded-md shadow-sm text-xs ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}>
                  <FaExpand className="inline mr-1" /> View Larger
                </div>
              </div>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Approximate location shown</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className={`text-xl md:text-2xl font-semibold mb-3 md:mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Land Information</h2>
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-start">
              <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-green-100'}`}>
                <FaSeedling className={`${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Soil Type: Black Cotton Soil</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Excellent water retention properties</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                <FaWater className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Water Source: Bore Well + Canal</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Year-round water availability</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-yellow-100'}`}>
                <FaSun className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Suitable Crops: Cotton, Wheat, Soybean</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>High yield potential</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-purple-100'}`}>
                <FaRulerCombined className={`${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dimensions: 200m × 100m</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Regular shape, easy to cultivate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 className={`text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Land Documentation</h2>
          <button className={`flex items-center ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            <FaEye className="mr-1" /> View All Documents
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {[
            { icon: FaFileAlt, title: "Land Registry", verified: true },
            { icon: FaFileContract, title: "7/12 Extract", verified: true },
            { icon: FaFileSignature, title: "Title Clear", verified: true },
            { icon: FaMap, title: "Survey Map", verified: false }
          ].map((doc, index) => (
            <div key={index} className={`p-3 md:p-4 border rounded-xl hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <doc.icon className={`text-2xl ${doc.verified ? (darkMode ? 'text-green-400' : 'text-green-500') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`} />
                {doc.verified && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                    Verified
                  </span>
                )}
              </div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{doc.title}</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {doc.verified ? "Available for review" : "Under verification"}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6 md:mb-8">
        <h2 className={`text-xl md:text-2xl font-semibold mb-3 md:mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>What Buyers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "deepak seth", rating: 5, comment: "The land quality is excellent as described. Smooth transaction process." },
            { name: "dhanna moulavi", rating: 4, comment: "Good fertile land with proper documentation. Happy with my purchase." }
          ].map((testimonial, index) => (
            <div key={index} className={`p-4 border rounded-xl ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${i < testimonial.rating ? 'text-yellow-400' : (darkMode ? 'text-gray-500' : 'text-gray-300')} mr-1`} />
                  ))}
                </div>
                <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>{testimonial.name}</span>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8 md:mb-10">
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <FaCameraRetro className={`mr-3 ${darkMode ? 'text-green-400' : 'text-green-600'}`} /> Property Visuals
        </h2>
        
        <div 
          className={`relative rounded-xl overflow-hidden shadow-lg mb-4 cursor-pointer hover:shadow-xl transition-all ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          onClick={() => setLightboxOpen(true)}
        >
          {selectedMedia.type === 'image' ? (
            <img 
              src={selectedMedia.url} 
              alt={selectedMedia.title}
              className="w-full h-64 md:h-96 object-cover"
              loading="lazy"
            />
          ) : (
            <video 
              src={selectedMedia.url} 
              className="w-full h-64 md:h-96 object-cover"
              controls
              poster={`/thumb-${selectedMedia.id}.jpg`}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
            <h3 className="text-white text-lg md:text-xl font-bold">{selectedMedia.title}</h3>
            <p className="text-white/90 text-sm md:text-base">{selectedMedia.description}</p>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full">
            {selectedMedia.type === 'image' ? <FaExpand /> : <FaPlay />}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {media.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${selectedMedia.id === item.id ? (darkMode ? 'ring-4 ring-green-500' : 'ring-4 ring-green-600') : (darkMode ? 'hover:ring-2 hover:ring-gray-500' : 'hover:ring-2 hover:ring-gray-300')}`}
              onClick={() => setSelectedMedia(item)}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-24 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-24 bg-gray-200">
                  <video 
                    src={item.url}
                    className="w-full h-full object-cover"
                    poster={`/thumb-${item.id}.jpg`}
                    muted
                  />
                  <FaPlay className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/80 text-xl" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs p-1 truncate">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className={`flex items-center px-4 py-2 rounded-full ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-50 text-green-800'}`}>
            <FaCheckCircle className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
            <span className="text-sm font-medium">Verified Media</span>
          </div>
          <div className={`flex items-center px-4 py-2 rounded-full ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-800'}`}>
            <FaCalendarAlt className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <span className="text-sm font-medium">Recent Photos</span>
          </div>
          <div className={`flex items-center px-4 py-2 rounded-full ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-50 text-purple-800'}`}>
            <FaUserShield className={`mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
            <span className="text-sm font-medium">Owner Verified</span>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setLightboxOpen(false)}
          >
            <FaTimes />
          </button>
          <div className="max-w-4xl w-full">
            {selectedMedia.type === 'image' ? (
              <img 
                src={selectedMedia.url} 
                alt={selectedMedia.title}
                className="w-full max-h-screen object-contain"
              />
            ) : (
              <video 
                src={selectedMedia.url}
                className="w-full"
                controls
                autoPlay
              />
            )}
            <div className="text-white text-center mt-2">
              <h3 className="text-xl font-bold">{selectedMedia.title}</h3>
              <p>{selectedMedia.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className={`flex flex-col sm:flex-row justify-between items-center rounded-xl p-4 md:p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="mb-3 sm:mb-0">
          <h3 className={`text-lg md:text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Interested in this property?</h3>
          <p className={`text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Contact us for more details or to schedule a visit</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <button className={`border-2 px-6 py-2 rounded-lg flex items-center justify-center font-medium ${darkMode ? 'bg-gray-800 border-green-500 text-green-500 hover:bg-gray-700' : 'bg-white border-green-600 text-green-600 hover:bg-gray-100'}`}>
            <FaPhoneAlt className="mr-2" /> Call Now
          </button>
          <button className={`border-2 px-6 py-2 rounded-lg flex items-center justify-center font-medium ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
            <FaCalendarAlt className="mr-2" /> Schedule Visit
          </button>
          <button className={`border-2 px-6 py-2 rounded-lg flex items-center justify-center font-medium ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
            <FaWhatsapp className="mr-2 text-green-500" /> WhatsApp
          </button>
          <button 
            className={`border-2 px-6 py-2 rounded-lg flex items-center justify-center font-medium ${darkMode ? 'bg-gray-800 border-green-500 text-green-500 hover:bg-gray-700' : 'bg-white border-green-600 text-green-600 hover:bg-gray-100'}`}
            onClick={() => setShowBidding(!showBidding)}
          >
            <FaMoneyCheck className="mr-2" /> {showBidding ? 'Hide Bidding' : 'Show Bidding'}
          </button>
        </div>
      </div>

      {showBidding && (
        <div className={`mt-6 border-t pt-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4">

            <h2 className={`text-xl lg:text-2xl font-bold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <FaRegComment className="mr-2" /> Property Negotiations
            </h2>
            
            <div className="flex space-x-2">
              <button 
                className={`px-4 py-2 rounded-lg ${activeTab === 'offers' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black') : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700')}`}
                onClick={() => setActiveTab('offers')}
              >
                All Offers
              </button>
              <button 
                className={`px-4 py-2 rounded-lg ${activeTab === 'negotiations' ? (darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black') : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700')}`}
                onClick={() => setActiveTab('negotiations')}
              >
                My Negotiations
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-50 text-blue-800'}`}>
              <p className="text-sm">Total Offers</p>
              <p className="text-2xl font-bold">{bids.length}</p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900 text-green-100' : 'bg-green-50 text-green-800'}`}>
              <p className="text-sm">Highest Offer</p>
              <p className="text-2xl font-bold">
                {bids.length > 0 ? `₹${Math.max(...bids.map(b => b.amount)).toLocaleString()}` : 'N/A'}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-yellow-900 text-yellow-100' : 'bg-yellow-50 text-yellow-800'}`}>
              <p className="text-sm">Avg. Offer</p>
              <p className="text-2xl font-bold">
                {bids.length > 0 ? `₹${Math.round(bids.reduce((a, b) => a + b.amount, 0) / bids.length).toLocaleString()}` : 'N/A'}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900 text-purple-100' : 'bg-purple-50 text-purple-800'}`}>
              <p className="text-sm">Active Negotiations</p>
              <p className="text-2xl font-bold">
                {bids.filter(b => b.replies.length > 0).length}
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl mb-6 shadow-sm border ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-100'}`}>
            <h3 className={`text-lg font-semibold mb-3 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <FaMoneyCheck className={`mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} /> Make Your Offer
            </h3>
            <form onSubmit={handlePlaceBid} className="space-y-3">
              <div className="flex items-start space-x-3">
                <img 
                  src={currentUser.profilePic} 
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Offer Amount (₹)</label>
                      <div className="relative">
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>₹</span>
                        <input
                          type="number"
                          value={newBid.amount}
                          onChange={(e) => setNewBid({...newBid, amount: e.target.value})}
                          className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                          placeholder="25,00,000"
                          min="2500000"
                          step="50000"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price Per Bigha</label>
                      <div className="relative">
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>₹</span>
                        <input
                          type="number"
                          value={newBid.amount ? Math.round(newBid.amount / 5) : ''}
                          readOnly
                          className={`w-full pl-8 pr-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300'}`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Your Message</label>
                    <textarea
                      value={newBid.message}
                      onChange={(e) => setNewBid({...newBid, message: e.target.value})}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                      placeholder="Explain your offer (e.g., payment terms, conditions)"
                      rows="3"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Minimum bid: ₹25,00,000 (₹5,00,000 per bigha)
                    </div>
                    <button
                      type="submit"
                      className={`px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 flex items-center ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      <FaMoneyCheck className="mr-2" /> Submit Offer
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {activeTab === 'offers' ? 'All Offers' : 'Your Negotiations'}
              </h3>
              <div className="flex items-center space-x-2">
                <button 
                  className={`p-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setShareModal(true)}
                >
                  <FaShare />
                </button>
                <select className={`border rounded-lg px-2 py-1 text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}>
                  <option>Newest First</option>
                  <option>Highest Amount</option>
                  <option>Most Active</option>
                </select>
              </div>
            </div>
            
            {bids.length === 0 ? (
              <div className="text-center py-10">
                <FaRegComment className={`mx-auto text-4xl mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No offers yet. Be the first to make an offer!</p>
              </div>
            ) : (
              bids
                .filter(bid => activeTab === 'offers' || bid.user.id === currentUser.id || bid.replies.some(r => r.user.id === currentUser.id))
                .map((bid) => (
                <div 
                  key={bid.id} 
                  className={`border rounded-xl p-4 transition-all ${bid.accepted ? (darkMode ? 'border-green-500 bg-green-900/30' : 'border-green-500 bg-green-50') : (darkMode ? 'border-gray-700 hover:border-gray-600 bg-gray-800' : 'border-gray-200 hover:border-gray-300')} ${bid.user.id === currentUser.id ? (darkMode ? 'bg-blue-900/20' : 'bg-blue-50/50') : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img 
                          src={bid.user.profilePic} 
                          alt={bid.user.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-white"
                        />
                        {bid.user.verified && (
                          <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full">
                            <FaCheckCircle className="text-xs" />
                          </span>
                        )}
                      </div>
                      <div>
                        <p className={`font-medium flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {bid.user.name}
                          {bid.user.id === currentUser.id && (
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                              You
                            </span>
                          )}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(bid.timestamp)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                        onClick={() => {
                          setMessageRecipient(bid.user);
                          setShowMessageModal(true);
                        }}
                      >
                        <FaRegEnvelope />
                      </button>
                      <button 
                        className={`${savedBids.includes(bid.id) ? 'text-yellow-500' : (darkMode ? 'text-gray-400 hover:text-yellow-500' : 'text-gray-400 hover:text-yellow-500')}`}
                        onClick={() => toggleSaveBid(bid.id)}
                      >
                        {savedBids.includes(bid.id) ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                      <div className="relative">
                        <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                          <FaEllipsisH />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pl-13">
                    <div className={`p-3 rounded-lg border shadow-xs ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
                      <p className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>₹{bid.amount.toLocaleString()}</p>
                      <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{bid.message}</p>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-4">
                      <button 
                        className={`flex items-center space-x-1 ${bid.liked ? 'text-red-500' : (darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')}`}
                        onClick={() => handleLike(bid.id)}
                      >
                        {bid.liked ? <FaHeart /> : <FaRegHeart />}
                        <span>{bid.likes}</span>
                      </button>
                      
                      <button 
                        className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => toggleReply(bid.id)}
                      >
                        <FaReply />
                        <span>Reply</span>
                      </button>
                      
                      {isOwner && !bid.accepted && (
                        <button
                          onClick={() => handleAcceptBid(bid.id)}
                          className={`ml-auto px-3 py-1 rounded-lg text-sm hover:bg-opacity-90 flex items-center ${darkMode ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-green-500 text-white hover:bg-green-600'}`}
                        >
                          <FaThumbsUp className="mr-1" /> Accept Offer
                        </button>
                      )}
                      
                      {bid.accepted && (
                        <span className={`ml-auto inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                          <FaThumbsUp className="mr-1" /> Accepted
                        </span>
                      )}
                    </div>
                    
                    {bid.showReply && (
                      <form 
                        onSubmit={(e) => handleReply(bid.id, e)}
                        className="mt-4 flex items-start space-x-3"
                      >
                        <img 
                          src={isOwner 
                            ? 'https://randomuser.me/api/portraits/men/10.jpg' 
                            : currentUser.profilePic} 
                          alt="User"
                          className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                        <div className="flex-1">
                          <textarea
                            value={replyContent[bid.id] || ''}
                            onChange={(e) => setReplyContent({
                              ...replyContent,
                              [bid.id]: e.target.value
                            })}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                            placeholder={`Reply to ${bid.user.name}...`}
                            rows="2"
                            required
                          />
                          <div className="flex justify-end mt-2 space-x-2">
                            <button
                              type="button"
                              className={`px-3 py-1 border rounded-lg text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                              onClick={() => toggleReply(bid.id)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className={`px-4 py-1 border rounded-lg text-sm flex items-center ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                            >
                              <FaReply className="mr-1" /> Send Reply
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                    
                    {bid.replies.length > 0 && (
                      <div className={`mt-4 space-y-4 pl-6 border-l-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                        {bid.replies.map(reply => (
                          <div key={reply.id} className="flex space-x-3 group">
                            <div className="relative flex-shrink-0">
                              <img 
                                src={reply.user.profilePic} 
                                alt={reply.user.name}
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                              />
                              {reply.user.verified && (
                                <span className="absolute top-5 left-5 bg-blue-500 text-white p-0.5 rounded-full">
                                  <FaCheckCircle className="text-xs" />
                                </span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {reply.user.name}
                                  {reply.user.id === currentUser.id && (
                                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                                      You
                                    </span>
                                  )}
                                </p>
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(reply.timestamp)}</span>
                              </div>
                              <div className={`p-3 rounded-lg border shadow-xs mt-1 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-100'}`}>
                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reply.message}</p>
                              </div>
                              <div className="mt-1 flex items-center space-x-4">
                                <button className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                                  <FaRegHeart />
                                </button>
                                <button 
                                  className={`flex items-center space-x-1 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                                  onClick={() => {
                                    setMessageRecipient(reply.user);
                                    setShowMessageModal(true);
                                  }}
                                >
                                  <FaRegEnvelope />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showMessageModal && messageRecipient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`border-b p-4 flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Message {messageRecipient.name}
              </h3>
              <button onClick={() => setShowMessageModal(false)} className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="p-4">
              <div className="mb-4">
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                  placeholder={`Write your message to ${messageRecipient.name}...`}
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className={`px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setShowMessageModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 border rounded-lg flex items-center ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                  <FaEnvelope className="mr-2" /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {shareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl w-full max-w-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`border-b p-4 flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Share This Property</h3>
              <button onClick={() => setShareModal(false)} className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}>
                <FaTimes />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-4 gap-3 mb-4">
                <button className={`p-3 rounded-lg flex flex-col items-center ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                  <FaWhatsapp className="text-xl mb-1" />
                  <span className="text-xs">WhatsApp</span>
                </button>
                <button className={`p-3 rounded-lg flex flex-col items-center ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-50 text-blue-400'}`}>
                  <FaEnvelope className="text-xl mb-1" />
                  <span className="text-xs">Email</span>
                </button>
                <button className={`p-3 rounded-lg flex flex-col items-center ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  <FaShare className="text-xl mb-1" />
                  <span className="text-xs">Other Apps</span>
                </button>
                <button 
                  className={`p-3 rounded-lg flex flex-col items-center ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                  onClick={copyToClipboard}
                >
                  <FaRegBookmark className="text-xl mb-1" />
                  <span className="text-xs">Copy Link</span>
                </button>
              </div>
              <div className={`border-t pt-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Or share via:</p>
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'}`}
                  onClick={(e) => e.target.select()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`mt-6 md:mt-8 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center justify-center">
            <FaShieldAlt className="text-blue-500 mr-2" />
            <span className="text-sm md:text-base">100% Legal Assurance</span>
          </div>
          <div className="flex items-center justify-center">
            <FaHandshake className="text-green-500 mr-2" />
            <span className="text-sm md:text-base">Transparent Dealings</span>
          </div>
          <div className="flex items-center justify-center">
            <FaUserCheck className="text-purple-500 mr-2" />
            <span className="text-sm md:text-base">Verified Sellers</span>
          </div>
          <div className="flex items-center justify-center">
            <FaHeadset className="text-orange-500 mr-2" />
            <span className="text-sm md:text-base">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostLand = () => {
  const { darkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [purpose, setPurpose] = useState('sell');
  const [selectedCategory, setSelectedCategory] = useState('Irrigated Land');
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [landmark, setLandmark] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [landSize, setLandSize] = useState('');
  const [landUnit, setLandUnit] = useState('Bigha');

  const landDescriptions = {
    "Irrigated Land": {
      note: "Irrigated Land 🌊 – Land with a proper water supply through tube wells, canals, or other irrigation systems. Suitable for year-round farming.",
      details: "water availability, soil type, and crops grown"
    },
    "Non-Irrigated Land": {
      note: "Non-Irrigated Land 🌧 – Rain-dependent farmland without a fixed water source. Best for seasonal crops that rely on monsoon rainfall.",
      details: "rainfall dependency, soil fertility, and crop types"
    },
    "Horticulture Land": {
      note: "Horticulture Land 🌱 – Specifically used for growing fruits, vegetables, and gardens. Ideal for commercial horticulture and high-value crops.",
      details: "types of fruits/vegetables, irrigation method, and soil quality"
    },
    "Pasture/Grazing Land": {
      note: "Pasture/Grazing Land 🐄 – Open land mainly used for livestock grazing, dairy farming, and cattle rearing. Best for animal husbandry.",
      details: "grass type, water sources, and livestock suitability"
    },
    "Organic Farming Land": {
      note: "Organic Farming Land 🍃 – Land cultivated without chemical fertilizers or pesticides, suitable for organic food production. Preferred for eco-friendly farming.",
      details: "soil health, organic certifications, and previous crops"
    },
    "Polyhouse/Greenhouse Land": {
      note: "Polyhouse/Greenhouse Land 🏡 – Advanced farming land with controlled environments (greenhouses, polyhouses) for high-tech farming of exotic crops, flowers, or vegetables.",
      details: "climate control system, crop variety, and infrastructure details"
    },
    "agricultural": {
      note: "Agricultural Land 🌾 – General farmland suitable for various crops and cultivation. Describe the specific features of your land.",
      details: "soil type, water availability, and potential uses"
    }
  };

  const getDescription = (category) => {
    return landDescriptions[category] || {
      note: "Describe your land in detail (soil quality, features, etc.)",
      details: "key features and specifications"
    };
  };

  const seller = {
    name: "rajat dalal",
    rating: 4.5,
    listings: 12,
    memberSince: "2020",
    avatar: "/seller-avatar.jpg"
  };

  useEffect(() => {
    if (mapModalOpen && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, [mapModalOpen]);

  useEffect(() => {
    if (mapModalOpen && window.google) {
      initMap();
    }
  }, [mapModalOpen]);

  useEffect(() => {
    if (totalPrice && landSize) {
      const calculatedPrice = (parseFloat(totalPrice) / parseFloat(landSize)).toFixed(2);
      setPricePerUnit(calculatedPrice);
    } else {
      setPricePerUnit('');
    }
  }, [totalPrice, landSize]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file)
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocs = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      name: file.name
    }));
    setUploadedDocuments([...uploadedDocuments, ...newDocs]);
  };

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.7196, lng: 75.8577 },
      zoom: 12
    });

    const input = document.getElementById('pac-input');
    const searchBox = new window.google.maps.places.SearchBox(input);

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    let marker = null;

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      if (marker) {
        marker.setMap(null);
      }

      const place = places[0];
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      marker = new window.google.maps.Marker({
        map,
        position: place.geometry.location
      });

      setSelectedLocation({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });

      extractLandmark(place);
    });

    map.addListener('click', (e) => {
      if (marker) {
        marker.setMap(null);
      }

      marker = new window.google.maps.Marker({
        position: e.latLng,
        map: map
      });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: e.latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setSelectedLocation({
            address: results[0].formatted_address,
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          });
          extractLandmark(results[0]);
        }
      });
    });
  };

  const extractLandmark = (place) => {
    const landmarkTypes = ['point_of_interest', 'establishment', 'natural_feature'];
    let extractedLandmark = '';
    
    if (place.address_components) {
      for (let component of place.address_components) {
        if (component.types.some(type => landmarkTypes.includes(type))) {
          extractedLandmark = component.long_name;
          break;
        }
      }
    }
    
    if (!extractedLandmark) {
      const localityTypes = ['locality', 'sublocality', 'neighborhood'];
      for (let component of place.address_components || []) {
        if (component.types.some(type => localityTypes.includes(type))) {
          extractedLandmark = component.long_name;
          break;
        }
      }
    }
    
    setLandmark(extractedLandmark || '');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  return (
    <div className={` ${darkMode ?'bg-gray-900':''} w-full mx-auto px-4 py-8 md:py-12 `}>
      <div className={`rounded-2xl shadow-lg mb-8 p-6 flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="relative mr-4">
          {seller.avatar ? (
            <img 
              src={seller.avatar} 
              alt={seller.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-green-500"
            />
          ) : (
            <FaUserCircle className={`text-5xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          )}
          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full">
            <FaCheckCircle className="text-xs" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{seller.name}</h2>
          <div className="flex items-center mt-1">
            <div className="flex mr-2">
              {renderStars(seller.rating)}
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{seller.rating} ({seller.listings} listings)</span>
          </div>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Member since {seller.memberSince}</p>
        </div>
        <div className={`hidden md:block px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-800'}`}>
          <p className="font-medium">Verified Seller</p>
        </div>
      </div>

      <div className={`rounded-2xl shadow-lg mb-8 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            className={`flex-1 py-4 font-medium text-lg ${purpose === 'sell' ? (darkMode ? 'text-green-400 border-b-2 border-green-500' : 'text-green-600 border-b-2 border-green-600') : (darkMode ? 'text-gray-500' : 'text-gray-500')}`}
            onClick={() => setPurpose('sell')}
          >
            <FaMoneyBillWave className="inline mr-2" /> Sell Land
          </button>
          <button
            className={`flex-1 py-4 font-medium text-lg ${purpose === 'lease' ? (darkMode ? 'text-green-400 border-b-2 border-green-500' : 'text-green-600 border-b-2 border-green-600') : (darkMode ? 'text-gray-500' : 'text-gray-500')}`}
            onClick={() => setPurpose('lease')}
          >
            <FaCalendarAlt className="inline mr-2" /> Lease Land
          </button>
        </div>
      </div>

      <form className={`shadow-2xl rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="bg-gray-100 h-2.5">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500" 
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>

        <div className={`p-6 md:p-8 border-b ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-700' : 'bg-gradient-to-r from-green-50 to-blue-50 border-gray-200'}`}>
          <h1 className={`text-2xl md:text-3xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {purpose === 'sell' ? (
              <><FaMoneyBillWave className="inline mr-2 text-green-400" /> List Your Land for Sale</>
            ) : (
              <><FaCalendarAlt className="inline mr-2 text-blue-400" /> List Your Land for Lease</>
            )}
          </h1>
          <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Complete this form to {purpose === 'sell' ? 'sell' : 'lease'} your land quickly and securely</p>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          <div className="flex justify-between items-center mb-6">
            {[1, 2, 3, 4, 5].map(step => (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(step)}
                className={`flex flex-col items-center ${currentStep === step ? (darkMode ? 'text-green-400 font-bold' : 'text-green-600 font-bold') : (darkMode ? 'text-gray-500' : 'text-gray-500')}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all ${currentStep === step ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md' : (darkMode ? 'bg-gray-700' : 'bg-gray-100')}`}>
                  {step}
                </div>
                <span className="text-xs">
                  {['Basic Info', 'Location', 'Documents', 'Media', 'Contact'][step-1]}
                </span>
              </button>
            ))}
          </div>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-lg mr-3 text-white">
                  <FaLeaf className="text-xl" />
                </div>
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Land Details</h2>
              </div>

              <div>
               <div className={`p-4 rounded-lg border h-32 overflow-y-auto ${darkMode ? 'bg-indigo-900/30 border-indigo-800' : 'bg-indigo-50/50 border-indigo-100'}`}>
                 <div className="flex items-start gap-3">
                      <FaPenAlt className={`text-lg mt-0.5 shrink-0 ${darkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                        <div>
                        <p className={`font-medium mb-1 ${darkMode ? 'text-indigo-300' : 'text-indigo-800'}`}>Important Note:</p>
                          <p className={`text-lg text-justify hyphens-auto tracking-tight break-words ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                             {getDescription(selectedCategory).note}
                          </p>
                          </div>
                       </div>
                </div>

                 <label className={`block text-sm font-medium my-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Land Category*</label>
                  <div className="flex overflow-x-auto md:overflow-x-visible pb-2 gap-3 md:grid md:grid-cols-6 md:w-full">
                    {[
                     { value: 'Irrigated Land', icon: <FaTint />, label: 'Irrigated Land' },
                     { value: 'Non-Irrigated Land', icon: <FaCloudRain />, label: 'Non-Irrigated Land' },
                     { value: 'Horticulture Land', icon: <FaSeedling />, label: 'Horticulture Land' },
                     { value: 'Pasture/Grazing Land', icon: <FaHorse />, label: 'Pasture/Grazing Land' },
                     { value: 'Organic Farming Land', icon: <FaLeaf />, label: 'Organic Farming Land' },
                     { value: 'Polyhouse/Greenhouse Land', icon: <FaWarehouse />, label: 'Polyhouse/Greenhouse Land' },
                   ].map((cat) => (
                     <button
                       key={cat.value}
                       type="button"
                         onClick={() => setSelectedCategory(cat.value)}
                        className={`flex-shrink-0 md:flex-shrink p-3 rounded-xl border flex flex-col items-center transition-all ${selectedCategory === cat.value ? (darkMode ? 'border-green-500 bg-gray-700 text-green-400 shadow-sm' : 'border-green-600 bg-green-50 text-green-600 shadow-sm') : (darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400')}`}
                      >
                        <span className="text-xl mb-1">{cat.icon}</span>
                        <span className="text-sm">{cat.label}</span>
                     </button>
                    ))}
                  </div>
                </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title*</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`} 
                    placeholder="e.g. 5 Bigha Fertile Land in Indore"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Land Type*</label>
                  <select className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}>
                    <option value="">Select land type</option>
                    <option>Farm Land</option>
                    <option>Orchard</option>
                    <option>Plot</option>
                    <option>Commercial Plot</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Size*</label>
                  <div className="flex space-x-3">
                    <input 
                      type="number" 
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`} 
                      placeholder="e.g. 5"
                      required
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                    />
                    <select 
                      className={`w-32 border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                      value={landUnit}
                      onChange={(e) => setLandUnit(e.target.value)}
                    >
                      <option>Bigha</option>
                      <option>Acres</option>
                      <option>Hectares</option>
                      <option>Sq. Ft.</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Soil Type*</label>
                  <select className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}>
                    <option value="">Select soil type</option>
                    <option>Black Cotton Soil</option>
                    <option>Red Soil</option>
                    <option>Sandy Soil</option>
                    <option>Loamy Soil</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description*</label>
                  <textarea 
                    className={`w-full border rounded-xl px-4 py-3 h-32 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`} 
                    placeholder={`Describe your land in detail (${getDescription(selectedCategory).details}, etc.)`}
                    required
                  ></textarea>
                </div>
              </div>

              {purpose === 'lease' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Lease Duration*</label>
                    <div className="flex space-x-3">
                      <input 
                        type="number" 
                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`} 
                        placeholder="e.g. 5"
                        required
                      />
                      <select className={`w-32 border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}>
                        <option>Years</option>
                        <option>Months</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Lease Type*</label>
                    <select className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}>
                      <option value="">Select lease type</option>
                      <option>Agricultural Lease</option>
                      <option>Commercial Lease</option>
                      <option>Residential Lease</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-lg mr-3 text-white">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Location & Pricing</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Village/Town*</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                    placeholder="e.g. Betma"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>District*</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                    placeholder="e.g. Indore"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>State*</label>
                  <select className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`} required>
                    <option value="">Select state</option>
                    <option>Madhya Pradesh</option>
                    <option>Maharashtra</option>
                    <option>Rajasthan</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>PIN Code</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                    placeholder="6-digit PIN code"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Location on Map*</label>
                  <button
                    type="button"
                    onClick={() => setMapModalOpen(true)}
                    className={`w-full border rounded-xl px-4 py-3 text-left focus:ring-2 focus:border-transparent flex justify-between items-center ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    {selectedLocation ? (
                      <span className="truncate">{selectedLocation.address}</span>
                    ) : (
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-400'}>Click to select location on map</span>
                    )}
                    <FaMapMarkerAlt className={darkMode ? 'text-green-400' : 'text-green-600'} />
                  </button>
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Landmark</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                    placeholder="Nearby prominent location"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                  <p className={`mt-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>We've tried to auto-detect a landmark from the location. Please edit if needed.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-lg mr-3 text-white">
                    <FaRupeeSign className="text-xl" />
                  </div>
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {purpose === 'sell' ? 'Selling Price' : 'Lease Rate'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {purpose === 'sell' ? 'Total Price*' : 'Annual Lease Rate*'}
                    </label>
                    <div className="relative">
                      <span className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>₹</span>
                      <input 
                        type="number" 
                        className={`w-full border rounded-xl pl-8 pr-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`} 
                        placeholder={`Enter ${purpose === 'sell' ? 'total price' : 'annual rate'}`}
                        required
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {purpose === 'sell' ? 'Price Per Unit*' : 'Monthly Rate*'}
                    </label>
                    <div className="relative">
                      <span className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>₹</span>
                      <input 
                        type="text" 
                        className={`w-full border rounded-xl pl-8 pr-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300'}`} 
                        placeholder="Auto-calculated"
                        readOnly
                        value={pricePerUnit ? `₹${pricePerUnit} per ${landUnit}` : ''}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="negotiable"
                      className={`w-5 h-5 rounded focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                    />
                    <label htmlFor="negotiable" className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Price is negotiable
                    </label>
                  </div>

                  {purpose === 'lease' && (
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="securityDeposit"
                        className={`w-5 h-5 rounded focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                      />
                      <label htmlFor="securityDeposit" className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Security deposit required
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-lg mr-3 text-white">
                  <FaFileContract className="text-xl" />
                </div>
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Document Verification</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Khasra/Khatauni Number*</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`} 
                    placeholder="Enter land record number"
                    required
                  />
                  <p className={`mt-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>We'll verify this automatically with government records</p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Upload Documents*</label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center hover:border-green-500 transition-colors cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-700' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <FaUpload className={`text-3xl mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Click to upload or drag & drop</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Supported formats: PDF, JPG, PNG (Max 5MB each)</p>
                      <input 
                        id="document-upload" 
                        type="file" 
                        className="hidden" 
                        multiple
                        onChange={handleDocumentUpload}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                </div>

                {uploadedDocuments.length > 0 && (
                  <div className="space-y-2">
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Uploaded Documents:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {uploadedDocuments.map(doc => (
                        <div key={doc.id} className={`flex items-center justify-between p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-center">
                            <FaFileContract className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm truncate max-w-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doc.name}</span>
                          </div>
                          <button type="button" className={darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-700'}>
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-100'}`}>
                  <div className="flex items-start">
                    <FaCheckCircle className={`mt-1 mr-2 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Why document verification matters</h4>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                        Verified listings get 3x more views and sell 50% faster. We ensure all documents are 
                        authentic before publishing your listing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-lg mr-3 text-white">
                  <FaImages className="text-xl" />
                </div>
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Media Upload</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Upload Photos* (5-10 images)</label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center hover:border-green-500 transition-colors cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-700' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <FaImages className={`text-3xl mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Click to upload or drag & drop</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Supported formats: JPG, PNG (Max 5MB each)</p>
                      <input 
                        id="image-upload" 
                        type="file" 
                        className="hidden" 
                        multiple
                        onChange={handleImageUpload}
                        accept=".jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                </div>

                {uploadedImages.length > 0 && (
                  <div>
                    <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preview ({uploadedImages.length}/10):</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {uploadedImages.map(image => (
                        <div key={image.id} className="relative group">
                          <img 
                            src={image.preview} 
                            alt="Land preview" 
                            className="w-full h-32 object-cover rounded-lg shadow-sm"
                          />
                          <button 
                            type="button" 
                            className={`absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'bg-gray-600/80 text-white hover:bg-gray-500' : 'bg-white/80 hover:bg-white'}`}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Upload Video (Optional)</label>
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center hover:border-green-500 transition-colors cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-700' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <FaVideo className={`text-3xl mx-auto mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Click to upload or drag & drop</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Supported formats: MP4, MOV (Max 20MB)</p>
                      <input 
                        id="video-upload" 
                        type="file" 
                        className="hidden"
                        accept=".mp4,.mov"
                      />
                    </label>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-100'}`}>
                  <div className="flex items-start">
                    <FaCheckCircle className={`mt-1 mr-2 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>Tips for great media</h4>
                      <ul className={`text-sm mt-1 list-disc list-inside space-y-1 ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                        <li>Take photos in daylight with good lighting</li>
                        <li>Show all boundaries and important features</li>
                        <li>Include close-ups of soil and crops</li>
                        <li>Pan slowly in videos to show the entire property</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-lg mr-3 text-white">
                  <FaUserTie className="text-xl" />
                </div>
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Contact Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name*</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mobile Number*</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                      <span className="absolute left-3 top-3 text-gray-500">+91</span>
                      <input 
                        type="tel" 
                        className={`w-full border rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                        placeholder="9876543210"
                        required
                      />
                    </div>
                    <button 
                      type="button" 
                      className={`px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap hover:bg-opacity-90 transition-colors shadow-sm ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                    >
                      Verify with OTP
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                  <input 
                    type="email" 
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="whatsapp-contact"
                      className={`w-5 h-5 rounded focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                    />
                    <label htmlFor="whatsapp-contact" className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FaWhatsapp className="inline mr-1 text-green-500" /> Enable WhatsApp contact
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="call-contact"
                      className={`w-5 h-5 rounded focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                      defaultChecked
                    />
                    <label htmlFor="call-contact" className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FaPhoneAlt className="inline mr-1 text-blue-500" /> Enable phone calls
                    </label>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-yellow-900/30 border-yellow-800' : 'bg-yellow-50 border-yellow-100'}`}>
                  <div className="flex items-start">
                    <FaCheckCircle className={`mt-1 mr-2 flex-shrink-0 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <div>
                      <h4 className={`font-medium ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>Your privacy matters</h4>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>
                        We never share your contact details publicly. Buyers will contact you through our secure 
                        system until you choose to share your details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className={`px-6 py-2 border rounded-xl font-medium flex items-center shadow-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                <FaChevronLeft className="mr-1" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className={`px-6 py-2 border rounded-xl font-medium flex items-center shadow-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Next <FaChevronRight className="ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-800 flex items-center shadow-lg"
                >
                <FaCheckCircle className="mr-2" /> Submit Listing
              </button>
            )}
          </div>
        </div>
      </form>

      {mapModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className={`flex flex-col rounded-2xl w-full max-w-4xl h-[80vh] ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Select Land Location</h3>
              <button 
                onClick={() => setMapModalOpen(false)}
                className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <input
                id="pac-input"
                type="text"
                className={`w-full border rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:border-transparent ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-500' : 'border-gray-300 focus:ring-green-600'}`}
                placeholder="Search for location..."
              />
              <div id="map" className="flex-1 h-[60vh] rounded-lg border border-gray-300"></div>
            </div>
            <div className={`p-4 border-t flex justify-end space-x-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={() => setMapModalOpen(false)}
                className={`px-4 py-2 border rounded-lg font-medium ${darkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedLocation) {
                    setMapModalOpen(false);
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium ${selectedLocation ? (darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700') : (darkMode ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-400 text-gray-200 cursor-not-allowed')}`}
                disabled={!selectedLocation}
              >
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className={`rounded-2xl p-8 max-w-md text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
            <FaCheckCircle className={`text-4xl ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Listing Submitted!</h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your land listing has been submitted for verification. We'll notify you once it's approved and published.
          </p>
          <button className={`w-full py-3 rounded-xl font-medium ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            View Your Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export const RecentListings = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const listings = [
    {
      id: 1,
      title: "12 Acre Farmland with Water Source",
      price: "150,000 INR",
      location: "Nashik, Maharashtra",
      size: "12 Acres",
      water: "Water Available",
      soil: "Black Soil",
      description: "Perfect for organic farming with natural water source and rich soil quality. Complete documentation available.",
      purpose: "For Sale", 
      status: "Verified",  
      seller: {
        name: "deepak seth",
        image: "",
        listed: "2 days ago"
      },
      image: ""
    },
    {
      id: 2,
      title: "18 Acre Premium Agricultural Land",
      price: "280,000 INR",
      location: "Amritsar, Punjab",
      size: "18 Acres",
      water: "Canal Irrigation",
      soil: "Alluvial Soil",
      description: "Prime location with excellent connectivity. Suitable for all types of crops. Modern irrigation system installed.",
      purpose: "For Lease",
      status: "Pending",   
      seller: {
        name: "dhanna moulavi",
        image: "",
        listed: "5 days ago"
      },
      image: ""
    },
    {
      id: 3,
      title: "8 Acre Orchard Land with Farmhouse",
      price: "120,000 INR",
      location: "Himachal Pradesh",
      size: "8 Acres",
      water: "Natural Spring",
      soil: "Loamy Soil",
      description: "Established fruit orchard with apple and peach trees. Includes small farmhouse with mountain views.",
      purpose: "For Sale", 
      status: "Verified",  
      seller: {
        name: "deepak seth",
        image: "",
        listed: "1 day ago"
      },
      image: ""
    },
    {
      id: 4,
      title: "25 Acre Commercial Farm Land",
      price: "350,000 INR",
      location: "Andhra Pradesh",
      size: "25 Acres",
      water: "Borewell & Drip",
      soil: "Red Soil",
      description: "Fully equipped commercial farm with packing facility and cold storage. Ready for immediate operation.",
      purpose: "For Lease", 
      status: "Verified",  
      seller: {
        name: "sulekha",
        image: "",
        listed: "1 week ago"
      },
      image: ""
    }
  ];

  return (
    <div className={`rounded-xl shadow-sm p-4 md:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Listings</h2>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Discover premium agricultural properties</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-xs ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <FaList className="mr-2" />
            <span className="hidden sm:inline">List View</span>
          </button>
          <button className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-xs ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
            <FaMapMarkerAlt className="mr-2" />
            <span className="hidden sm:inline">Map View</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div 
            key={listing.id} 
            className={`rounded-xl border overflow-hidden hover:shadow-md transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200'}`}
          >
          <div className="relative">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            {listing.image ?( <img 
                src={listing.image} 
                className="w-full h-48 sm:h-56 object-cover"
                alt={listing.title}
              />
            ): (<span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No Image Available</span>
            )}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className={`p-2 rounded-full shadow-sm hover:bg-opacity-90 transition-colors ${darkMode ? 'bg-gray-700/90 backdrop-blur-sm text-gray-300 hover:bg-gray-600' : 'bg-white/90 backdrop-blur-sm hover:bg-white'}`}>
                  <FaHeart className={darkMode ? 'hover:text-red-400' : 'hover:text-red-500'} />
                </button>
                <button className={`p-2 rounded-full shadow-sm hover:bg-opacity-90 transition-colors ${darkMode ? 'bg-gray-700/90 backdrop-blur-sm text-gray-300 hover:bg-gray-600' : 'bg-white/90 backdrop-blur-sm hover:bg-white'}`}>
                  <FaShare className={darkMode ? 'hover:text-blue-400' : 'hover:text-blue-500'} />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 flex space-x-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium shadow-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'}`}>
                  {listing.size}
                </span>
                <span className={`px-2 py-1 rounded-md text-xs font-medium shadow-xs ${listing.purpose === "For Sale" ? (darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800') : (darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800')}`}>
                  {listing.purpose}
                </span>
              </div>
            </div>

            </div>

            <div className="p-4 sm:p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-bold line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{listing.title}</h3>
                <span className={`text-lg font-bold whitespace-nowrap ml-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{listing.price}</span>
              </div>
              
              <div className={`flex items-center mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <FaMapMarkerAlt className="mr-1.5 flex-shrink-0" />
                <span className="text-sm truncate">{listing.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                  <FaWater className="mr-1" /> {listing.water}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                  <FaSeedling className="mr-1" /> {listing.soil}
                </span>
                {listing.status === "Verified" && (
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-emerald-900 text-emerald-300' : 'bg-emerald-100 text-emerald-800'}`}>
                    <FaCheckCircle className="mr-1" /> Verified
                  </span>
                )}
                {listing.status === "Pending" && (
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>
                    <FaClock className="mr-1" /> Pending
                  </span>
                )}
              </div>
              
              <p className={`text-sm mb-5 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{listing.description}</p>
              
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center">
                  <img 
                    className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-xs"
                    src={listing.seller.image}
                    alt={listing.seller.name}
                  />
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{listing.seller.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Listed {listing.seller.listed}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    <FaPhone className="text-blue-600" />
                  </button>
                  <button 
                  onClick={() => navigate('/field-mart/view-details')}
                   className={`flex items-center px-3 py-2 text-sm font-medium rounded-full transition-colors shadow-sm ${darkMode ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                    <FaInfoCircle className="mr-1.5" />
                    <span>Details</span>
                  </button>
                </div>
            </div>

            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className={`px-6 py-3 rounded-full text-sm font-medium transition-colors shadow-sm inline-flex items-center ${darkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
          View More Properties
          <FaChevronDown className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const { darkMode } = useTheme();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    console.log("Applied filters:", filters);
  };

  return (
    <div className={`h-[100vh]  font-sans min-h-screen  ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <main className="">
        <HeroSection onFilterClick={handleFilterClick} />
        
        <div className={`max-w-8xl mx-auto px-4 py-4 md:py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 ">
            <FilterSection 
              isOpen={isFilterOpen} 
              onClose={handleFilterClose} 
              onApply={handleApplyFilters}
            />
            <FeaturedListings />
          </div>

          <RecentListings/>
  
        </div>        
      </main>
    </div>
  );
};

export default App;