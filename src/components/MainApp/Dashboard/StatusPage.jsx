import { useState, useEffect, useRef } from 'react';
import { 
  FaPlus, 
  FaChevronLeft, 
  FaChevronRight, 
  FaCheck, 
  FaStar, 
  FaHeart, 
  FaRegHeart, 
  FaComment, 
  FaRegComment, 
  FaRegPaperPlane, 
  FaRegBookmark, 
  FaTimes,
  FaEllipsisH,
  FaSmile,
} from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeContext';

const users = [
  {
    name: 'Your Story',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    statuses: [
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  },
  {
    name: 'rajat dalal',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Farmer',
    isVerified: true,
    statuses: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  },
  {
    name: 'dhanna moulavi',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Expert',
    isFeatured: true,
    statuses: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  },
  {
    name: 'deepak seth',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'Broker',
    statuses: [
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  },
  {
    name: 'vikash ',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    role: 'Farmer',
    statuses: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ]
  },
];

const Story = ({ user, isVerified, isFeatured, isActive, role, onClick, statusCount }) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-col items-center min-w-[70px] sm:min-w-[80px] cursor-pointer" onClick={onClick}>
      <div className="relative">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] ${
          isActive ? 
          'bg-gradient-to-r from-[#000000] via-blue-500 to-purple-500' : 
          'bg-gray-300 $darkMode{bg-gray-600}'
          
        }`}>
          {user === 'Your Story' ? (
            <div className={`w-full h-full rounded-full $darkMode{bg-gray-800} bg-white flex items-center justify-center`}>
              <FaPlus className={`text-[#000000] $darkMode{text-white}`} />
            </div>
          ) : (
            <div className="w-full h-full rounded-full bg-white $darkMode{bg-gray-800} p-[2px]">
              <img 
                src={users.find(u => u.name === user)?.image || 'https://via.placeholder.com/150'} 
                className="w-full h-full object-cover rounded-full" 
                alt={user} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
            </div>
          )}
        </div>
        {isVerified && (
          <span className="absolute -bottom-1 right-0 bg-[#000000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            <FaCheck className="text-[10px]" />
          </span>
        )}
        {isFeatured && (
          <span className="absolute -bottom-1 right-0 bg-[#000000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            <FaStar className="text-[10px]" />
          </span>
        )}
        {statusCount > 1 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {statusCount}
          </span>
        )}
      </div>
      <span className={`mt-2 text-xs sm:text-sm font-medium   truncate max-w-full px-1
        ${darkMode ? 'text-white' : 'text-gray-900'}
      `}>
        {user}</span>
      {role && <span className={`text-xs  
          ${darkMode ? 'text-gray-300' : 'text-gray-500'}
        `}>{role}</span>}
    </div>
  );
};

const Stories = ({ setShowOverlay, setCurrentStatus }) => {
  const { darkMode } = useTheme();

  const handleStatusClick = (user) => {
    const userIndex = users.findIndex(u => u.name === user);
    setCurrentStatus({
      currentUserIndex: userIndex,
      currentImageIndex: 0,
      users: users
    });
    setShowOverlay(true);
  };

  return (
    <div className={`mt-4  lg:mt-0 sm:mt-6 rounded-lg  p-4  ${
      darkMode ? 'bg-neutral-900 ' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className={`text-lg sm:text-xl font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Recent Stories</h2>
        <div className="flex space-x-2">
          <button className={`${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#000000]'
          } transition-colors`}>
            <FaChevronLeft />
          </button>
          <button className={`${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#000000]'
          } transition-colors`}>
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 sm:space-x-6 overflow-x-auto p-1 sm:pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {users.map((user, index) => (
          <Story 
            key={index}
            user={user.name}
            isVerified={user.isVerified}
            isFeatured={user.isFeatured}
            isActive={index % 2 === 0}
            role={user.role}
            onClick={() => handleStatusClick(user.name)}
            statusCount={user.statuses.length}
          />
        ))}
      </div>
    </div>
  );
};

const StatusOverlay = ({ showOverlay, setShowOverlay, currentStatus }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(currentStatus?.currentUserIndex || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(currentStatus?.currentImageIndex || 0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressInterval = useRef(null);
  const progressTimeout = useRef(null);
  const [pausedProgress, setPausedProgress] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentStatus) {
      setCurrentUserIndex(currentStatus.currentUserIndex);
      setCurrentImageIndex(currentStatus.currentImageIndex);
      setComments(getStatusComments(currentStatus.users[currentStatus.currentUserIndex].name));
      setIsLiked(false);
      setComment('');
      setShowComments(!isMobile);
      setIsPaused(false);
      setPausedProgress(0);
      setProgress(0);
      startProgressTimer();
    }

    return () => {
      clearInterval(progressInterval.current);
      clearTimeout(progressTimeout.current);
    };
  }, [currentStatus, isMobile]);

  const startProgressTimer = () => {
    clearInterval(progressInterval.current);
    clearTimeout(progressTimeout.current);
    
    if (!isPaused) {
      const startProgress = pausedProgress > 0 ? pausedProgress : 0;
      setProgress(startProgress);
      
      const remainingTime = 5000 - (startProgress * 50);
      
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval.current);
            goToNextStatus();
            return 0;
          }
          return prev + (100 / 100);
        });
      }, 50);
      
      progressTimeout.current = setTimeout(() => {
        goToNextStatus();
      }, remainingTime);
    }
  };

  const togglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      startProgressTimer();
    } else {
      setIsPaused(true);
      setPausedProgress(progress);
      clearInterval(progressInterval.current);
      clearTimeout(progressTimeout.current);
    }
  };

  const goToNextStatus = () => {
    clearInterval(progressInterval.current);
    clearTimeout(progressTimeout.current);
    
    const currentUser = currentStatus.users[currentUserIndex];
    
    if (currentImageIndex < currentUser.statuses.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setProgress(0);
      setPausedProgress(0);
      setIsPaused(false);
      startProgressTimer();
    } else if (currentUserIndex < currentStatus.users.length - 1) {
      const nextUserIndex = currentUserIndex + 1;
      setCurrentUserIndex(nextUserIndex);
      setCurrentImageIndex(0);
      setComments(getStatusComments(currentStatus.users[nextUserIndex].name));
      setProgress(0);
      setPausedProgress(0);
      setIsPaused(false);
      startProgressTimer();
    } else {
      setShowOverlay(false);
    }
  };

  const goToPrevStatus = () => {
    clearInterval(progressInterval.current);
    clearTimeout(progressTimeout.current);
    
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setProgress(0);
      setPausedProgress(0);
      setIsPaused(false);
      startProgressTimer();
    } else if (currentUserIndex > 0) {
      const prevUserIndex = currentUserIndex - 1;
      const prevUser = currentStatus.users[prevUserIndex];
      setCurrentUserIndex(prevUserIndex);
      setCurrentImageIndex(prevUser.statuses.length - 1);
      setComments(getStatusComments(prevUser.name));
      setProgress(0);
      setPausedProgress(0);
      setIsPaused(false);
      startProgressTimer();
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, {
        user: 'You',
        text: comment,
        time: 'Just now',
        isYou: true
      }]);
      setComment('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  const handleImageClick = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const imageWidth = e.target.offsetWidth;
    const imageThird = imageWidth / 3;
    
    if (clickX < imageThird) {
      goToPrevStatus();
    } else if (clickX > imageThird * 2) {
      goToNextStatus();
    } else {
      togglePause();
    }
  };

  const currentUser = currentStatus?.users[currentUserIndex];

  return (
    <div 
      id="status-overlay" 
      className={`fixed inset-0 bg-black bg-opacity-75 z-50 ${showOverlay ? 'flex' : 'hidden'} items-center justify-center p-0`}
      onClick={(e) => e.target.id === 'status-overlay' && setShowOverlay(false)}
    >
      <div className={`relative w-full h-full ${isMobile ? 'flex flex-col' : 'max-w-6xl flex flex-row'}`}>
        <div className={`${isMobile ? (showComments ? 'h-1/2' : 'h-full') : 'w-2/3'} bg-black relative transition-all duration-300`}>
          {currentUser && (
            <div className="absolute top-0 left-0 right-0 h-1 flex z-10">
              {currentUser.statuses.map((_, index) => (
                <div key={index} className="h-full flex-1 mx-1 bg-gray-600 bg-opacity-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${index < currentImageIndex ? 'bg-white' : index === currentImageIndex ? 'bg-white' : 'bg-transparent'}`}
                    style={{ width: index === currentImageIndex ? `${progress}%` : index < currentImageIndex ? '100%' : '0%' }}
                  />
                </div>
              ))}
            </div>
          )}
          
          {currentUser && (
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-black bg-opacity-50 rounded-full pr-3 py-1">
              <img 
                src={currentUser.image} 
                className="w-8 h-8 rounded-full border-2 border-white" 
                alt={currentUser.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <div className="text-white">
                <p className="font-medium text-sm">{currentUser.name}</p>
                <p className="text-xs opacity-75">Just now</p>
              </div>
            </div>
          )}
          
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white z-10 bg-black bg-opacity-50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevStatus();
            }}
          >
            <FaChevronLeft className="text-xl sm:text-2xl" />
          </button>
          
          {currentUser && (
            <div className="w-full h-full flex items-center justify-center" onClick={handleImageClick}>
              <img 
                src={currentUser.statuses[currentImageIndex]} 
                className="w-full h-full object-contain" 
                alt="Status" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500x500?text=Image+Not+Found';
                }}
              />
            </div>
          )}
          
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white z-10 bg-black bg-opacity-50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              goToNextStatus();
            }}
          >
            <FaChevronRight className="text-xl sm:text-2xl" />
          </button>
          
          <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-4 bg-black bg-opacity-50 rounded-full px-3 py-2">
            <button 
              className={`${isLiked ? 'text-red-500' : 'text-white'} hover:text-red-400`}
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button className="text-white hover:text-gray-300">
              <FaRegPaperPlane />
            </button>
            <button className="text-white hover:text-gray-300">
              <FaRegBookmark />
            </button>
            {isMobile && (
              <button 
                className={`text-white hover:text-gray-300 ${showComments ? 'text-blue-400' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowComments(!showComments);
                }}
              >
                {showComments ? <FaComment /> : <FaRegComment />}
              </button>
            )}
          </div>
          
          <button 
            className="absolute top-4 right-4 text-white z-10 bg-black bg-opacity-50 rounded-full p-2 md:hidden"
            onClick={() => setShowOverlay(false)}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>
        
        {!isMobile && currentUser && (
          <div className={`w-1/3 flex flex-col border-l ${
            darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <button 
              className={`absolute top-4 right-4 z-10 ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setShowOverlay(false)}
            >
              <FaTimes />
            </button>
            
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className={`font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Comments ({comments.length})</h3>
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <img 
                      src={users.find(u => u.name === comment.user)?.image || 'https://via.placeholder.com/150'} 
                      className="w-8 h-8 rounded-full flex-shrink-0" 
                      alt={comment.user} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className={`font-medium text-sm truncate ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{comment.user}</p>
                        <span className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-400'
                        } whitespace-nowrap`}>{comment.time}</span>
                        {comment.isYou && (
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                          }`}>You</span>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>{comment.text}</p>
                      <div className="mt-1 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className={`text-xs ${
                          darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#000000]'
                        }`}>Like</button>
                        <button className={`text-xs ${
                          darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#000000]'
                        }`}>Reply</button>
                      </div>
                    </div>
                    <button className={`${
                      darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-300 hover:text-gray-500'
                    } opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <FaEllipsisH className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`border-t p-4 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-2">
                <button className={`${
                  darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
                }`}>
                  <FaSmile />
                </button>
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className={`flex-1 border-none focus:ring-0 text-sm placeholder-gray-400 ${
                    darkMode ? 'bg-gray-800 text-white' : 'text-gray-700'
                  }`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className={`text-sm font-medium ${
                    comment ? (
                      darkMode ? 'text-blue-400' : 'text-[#000000]'
                    ) : (
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    )
                  }`}
                  onClick={handleAddComment}
                  disabled={!comment}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
        
        {isMobile && showComments && currentUser && (
          <Comments
            isMobile={isMobile}
            showComments={showComments}
            currentUser={currentUser}
            comments={comments}
            users={users}
            comment={comment}
            setShowComments={setShowComments}
            setComment={setComment}
            handleKeyPress={handleKeyPress}
            handleAddComment={handleAddComment}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export const Comments = ({
  isMobile,
  showComments,
  currentUser,
  comments,
  users,
  comment,
  setShowComments,
  setComment,
  handleKeyPress,
  handleAddComment,
  darkMode
}) => {
  if (!isMobile || !showComments || !currentUser) return null;

  return (
    <div className={`h-1/2 rounded-t-2xl overflow-hidden flex flex-col ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className={`p-4 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      } flex items-center justify-between`}>
        <h3 className={`font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Comments ({comments.length})</h3>
        <button 
          className={`${
            darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={() => setShowComments(false)}
        >
          <FaTimes />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3">
              <img 
                src={users.find(u => u.name === comment.user)?.image || 'https://via.placeholder.com/150'} 
                className="w-8 h-8 rounded-full flex-shrink-0" 
                alt={comment.user} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className={`font-medium text-sm truncate ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{comment.user}</p>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-400'
                  } whitespace-nowrap`}>{comment.time}</span>
                  {comment.isYou && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                    }`}>You</span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{comment.text}</p>
                <div className="mt-1 flex items-center space-x-3">
                  <button className={`text-xs ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#000000]'
                  }`}>Like</button>
                  <button className={`text-xs ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#000000]'
                  }`}>Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={`border-t p-4 ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center space-x-2">
          <button className={`${
            darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
          }`}>
            <FaSmile />
          </button>
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className={`flex-1 border-none focus:ring-0 text-sm placeholder-gray-400 ${
              darkMode ? 'bg-gray-800 text-white' : 'text-gray-700'
            }`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className={`text-sm font-medium ${
              comment ? (
                darkMode ? 'text-blue-400' : 'text-[#000000]'
              ) : (
                darkMode ? 'text-gray-500' : 'text-gray-400'
              )
            }`}
            onClick={handleAddComment}
            disabled={!comment}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const getStatusComments = (user) => {
  const baseComments = [
    {
      user: 'User123',
      text: 'Looking great! What variety is this? The color is amazing!',
      time: '2m'
    },
    {
      user: 'AgriExpert22',
      text: 'Excellent work! What was your yield per acre this season compared to last year?',
      time: '5m'
    }
  ];

  if (user === 'John Smith') {
    return [...baseComments, {
      user: 'FarmHelper',
      text: 'The wheat looks amazing this season! Perfect timing for harvest too.',
      time: '10m'
    }];
  }

  return baseComments;
};

const StatusPage = ({className=""}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const { darkMode } = useTheme();

  return (
    <div className={`${className} ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`max-w-6xl mx-auto ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <Stories setShowOverlay={setShowOverlay} setCurrentStatus={setCurrentStatus} />
        <StatusOverlay 
          showOverlay={showOverlay} 
          setShowOverlay={setShowOverlay} 
          currentStatus={currentStatus} 
        />
      </div>
    </div>
  );
};

export default StatusPage;