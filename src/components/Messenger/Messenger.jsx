import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams} from "react-router-dom";
import { useMessenger } from "../../context/MessengerContext";
import { useTheme } from "../../context/ThemeContext";

import {
  FaUsers, FaArrowLeft, FaEdit, FaSearch, FaPhone, FaVideo, FaFilePdf,
  FaInfoCircle, FaPlus, FaTimes, FaExpand, FaImage, FaMicrophone, 
  FaPaperPlane, FaFileAlt, FaMapMarkerAlt, FaFile, FaEllipsisV, 
  FaComments, FaLink
} from "react-icons/fa";

import useMediaUpload from "../../hooks/useMediaUpload";
import { useDebounce } from "../../hooks/useDebounce";

// SearchInput Component
const SearchInput = ({ value, onChange, placeholder = "Search messages..." }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className={darkMode ? "text-gray-400" : "text-gray-500"} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
          darkMode 
            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:border-blue-500 placeholder-gray-400"
            : "border border-gray-200 focus:ring-blue-200 focus:border-blue-500"
        }`}
      />
    </div>
  );
};

// RoleBadge Component
const RoleBadge = ({ role }) => {
  const { darkMode } = useTheme();
  
  return (
    <span className={`text-xs px-2 py-0.5 rounded ${
      role === "Farmer" 
        ? darkMode ? "bg-green-900 text-green-200" : "bg-green-100 text-green-800"
        : role === "Broker" 
          ? darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-800"
          : darkMode ? "bg-purple-900 text-purple-200" : "bg-purple-100 text-purple-800"
    }`}>
      {role}
    </span>
  );
};

// OnlineStatus Component
const OnlineStatus = ({ isOnline, lastActive, className = "" }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`text-xs flex items-center ${className}`}>
      <span className={`w-2 h-2 rounded-full mr-1 ${
        isOnline ? "bg-green-500" : darkMode ? "bg-gray-500" : "bg-gray-400"
      }`}></span>
      <span className={isOnline ? "text-green-500" : darkMode ? "text-gray-400" : "text-gray-500"}>
        {isOnline ? "Online" : `Active ${lastActive} ago`}
      </span>
    </div>
  );
};

// UserAvatar Component
const UserAvatar = ({ src, alt, size = "md", status, onClick }) => {
  const { darkMode } = useTheme();
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };
  
  return (
    <div className="relative" onClick={onClick}>
      <img 
        src={src} 
        className={`${sizes[size]} rounded-full object-cover ${darkMode ? "border-gray-600" : "border-gray-200"} border`} 
        alt={alt} 
      />
      {status && (
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
          darkMode ? "border-gray-800" : "border-white"
        } ${
          status === "online" ? "bg-green-500" : "bg-gray-400"
        }`}></div>
      )}
    </div>
  );
};

// ActiveUser Component
const ActiveUser = ({ name, img }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex flex-col items-center space-y-1 flex-shrink-0">
      <UserAvatar src={img} alt={name} size="md" status="online" />
      <span className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-700"} font-medium truncate w-14 text-center`}>
        {name.split(" ")[0]}
      </span>
    </div>
  );
};

// Popup Component
const Popup = ({ onClose }) => {
  const { darkMode } = useTheme();
  const { handleMediaPicker } = useMediaUpload();
  
  const mediaOptions = [
    { icon: FaImage, color: "blue", label: "Photo", type: "image" },
    { icon: FaVideo, color: "purple", label: "Video", type: "video" },
    { icon: FaFile, color: "red", label: "Document", type: "pdf" },
    { icon: FaMapMarkerAlt, color: "green", label: "Location", type: "location" }
  ];

  return (
    <div className={`absolute bottom-16 left-4 rounded-lg shadow-xl p-4 w-64 ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"
    }`}>
      <div className="grid grid-cols-2 gap-4">
        {mediaOptions.map((option, index) => (
          <button 
            key={index}
            className={`flex flex-col items-center ${darkMode ? "text-gray-200 hover:text-blue-400" : "text-gray-700 hover:text-blue-500"} transition-colors`}
            onClick={() => {
              if (option.type !== "location") {
                handleMediaPicker(option.type);
              }
              onClose();
            }}
          >
            <div className={`${darkMode ? `bg-${option.color}-900` : `bg-${option.color}-50`} p-3 rounded-full mb-1`}>
              <option.icon className={`text-xl ${darkMode ? `text-${option.color}-300` : `text-${option.color}-500`}`} />
            </div>
            <span className="text-xs">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const MessageInput = ({ value, onChange, onSend, isWidget = false, className="" }) => {
  const { darkMode } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className={`relative p-3  border-t flex items-center gap-3 ${isWidget ? 'p-2' : ''} ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    } ${className}`}>
      <button 
        className={`${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"} transition-colors relative`}
        onClick={() => setShowPopup(!showPopup)}
      >
        <FaPlus />
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </button>
      
      <input
        type="text"
        placeholder="Type a message..."
        className={`flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-2 transition-all ${isWidget ? 'py-1 text-sm' : ''} ${
          darkMode 
            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-600 focus:border-blue-500 placeholder-gray-400"
            : "border border-gray-200 focus:ring-blue-200 focus:border-blue-500"
        }`}
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      
      <button
        className={`p-2 rounded-full transition-colors ${isWidget ? 'p-1' : ''} ${
          inputValue.trim() 
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : darkMode 
              ? "bg-gray-700 text-gray-400 hover:bg-gray-600"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
        onClick={handleSend}
      >
        {inputValue.trim() ? <FaPaperPlane /> : <FaMicrophone />}
      </button>
    </div>
  );
};

// Message Component
const Message = ({ type, text, time, image, isWidget = false }) => {
  const { darkMode } = useTheme();
  const containsLink = text?.match(/(https?:\/\/[^\s]+)/g);
  
  return (
    <div className={`flex ${type === "sent" ? "justify-end" : "justify-start"}`}>
      <div className={`flex ${isWidget ? 'max-w-xs' : 'max-w-xs md:max-w-md lg:max-w-lg'} ${type === "sent" ? "flex-row-reverse" : ""}`}>
        {type === "received" && image && (
          <UserAvatar src={image} alt="Sender" size="sm" className="mr-2 mt-1" />
        )}
        <div className={`p-3 rounded-2xl ${
          type === "sent" 
            ? darkMode 
              ? "bg-blue-700 text-white rounded-tr-none" 
              : "bg-blue-500 text-white rounded-tr-none"
            : darkMode 
              ? "bg-gray-700 text-gray-100 rounded-tl-none"
              : "bg-white text-gray-800 rounded-tl-none shadow-sm"
        }`}>
          <p className={`${isWidget ? 'text-xs' : 'text-sm'}`}>
            {containsLink ? (
              <>
                {text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => 
                  part.match(/^https?:\/\//) ? (
                    <a 
                      key={i} 
                      href={part} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${darkMode ? "text-blue-300" : "text-blue-600"} underline break-all`}
                    >
                      {part}
                    </a>
                  ) : (
                    part
                  )
                )}
              </>
            ) : (
              text
            )}
          </p>
          <div className={`text-xs mt-1 flex ${
            type === "sent" 
              ? darkMode ? "justify-end text-blue-200" : "justify-end text-blue-100"
              : darkMode ? "justify-start text-gray-400" : "justify-start text-gray-500"
          }`}>
            {time}
          </div>
        </div>
      </div>
    </div>
  );
};

// ChatItem Component
const ChatItem = ({ chat, onChatClick, onProfileClick, isWidget }) => {
  const { darkMode } = useTheme();
  
  return (
    <div 
      className={`p-3 cursor-pointer transition-colors ${isWidget ? 'p-2' : ''} ${
        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
      }`}
      onClick={() => onChatClick(chat)}
    >
      <div className="flex items-center space-x-3">
        <div onClick={(e) => { e.stopPropagation(); onProfileClick(chat); }}>
          <UserAvatar 
            src={chat.image} 
            alt={chat.name} 
            size={isWidget ? "sm" : "md"} 
            status={chat.status}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`${isWidget ? 'text-sm' : ''} font-semibold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            } truncate`}>
              {chat.name}
            </h4>
            <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} whitespace-nowrap`}>
              {chat.time}
            </span>
          </div>
          <div className="flex items-center">
            <RoleBadge role={chat.role} />
            <p className={`${isWidget ? 'text-xs' : 'text-sm'} ${
              darkMode ? "text-gray-400" : "text-gray-500"
            } truncate`}>
              {chat.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ChatList Component
const ChatList = ({ searchQuery, onChatClick, onProfileClick, isWidget = false }) => {
  const { darkMode } = useTheme();
  const { chats } = useMessenger();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredChats = chats?.filter(chat =>
    chat?.name?.toLowerCase().includes(debouncedSearch?.toLowerCase()) ||
    chat?.role?.toLowerCase().includes(debouncedSearch?.toLowerCase()) ||
    chat?.message?.toLowerCase().includes(debouncedSearch?.toLowerCase())
  ) || [];

  return (
    <div className={`${darkMode ? "divide-gray-700" : "divide-gray-100"} divide-y`}>
      {filteredChats.length > 0 ? (
        filteredChats.map(chat => (
          <ChatItem
            key={chat?.id}
            chat={chat}
            onChatClick={onChatClick}
            onProfileClick={onProfileClick}
            isWidget={isWidget}
          />
        ))
      ) : (
        <EmptyState 
          icon={FaSearch} 
          title="No chats found" 
          description="Try a different search term" 
        />
      )}
    </div>
  );
};

// EmptyState Component
const EmptyState = ({ icon: Icon, title, description }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <Icon className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-2xl mb-2`} />
      <h4 className={`${darkMode ? "text-gray-300" : "text-gray-500"} font-medium`}>{title}</h4>
      <p className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-sm mt-1`}>{description}</p>
    </div>
  );
};

// ChatHeader Component
const ChatHeader = ({ chat, onBack, onProfileClick, isWidget }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`border-b p-3 flex items-center justify-between ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
    }`}>
      <div className="flex items-center">
        <button 
          className={`mr-2 ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} ${
            isWidget ? '' : 'md:hidden'
          }`}
          onClick={onBack}
        >
          <FaArrowLeft size={18} />
        </button>
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => onProfileClick(chat)}
        >
          <UserAvatar 
            src={chat?.image} 
            alt={chat?.name} 
            size={isWidget ? "sm" : "md"} 
            status={chat?.status}
          />
          <div className="flex flex-col">
            <div className="flex items-center flex-wrap space-x-2">
              <h3 className={`${isWidget ? 'text-sm' : ''} font-semibold ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}>
                {chat?.name}
              </h3>
              <RoleBadge role={chat?.role} />
            </div>
            <OnlineStatus 
              isOnline={chat?.status === "online"} 
              lastActive={chat?.lastActive} 
              className="mt-0.5"
            />
          </div>
        </div>
      </div>
      {!isWidget && (
        <div className="flex items-center space-x-4">
          <button 
            className={darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"}
            onClick={() => navigate("/messenger/calling/audio")}
          >
            <FaPhone />
          </button>
          <button 
            className={darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"}
            onClick={() => navigate("/messenger/calling/video")}
          >
            <FaVideo />
          </button>
          <button className={darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"}>
            <FaInfoCircle />
          </button>
        </div>
      )}
    </div>
  );
};

// ChatWindow Component
const ChatWindow = ({ selectedChat, onBack, onProfileClick, onSendMessage, isWidget = false }) => {
  const { darkMode } = useTheme();
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  if (!selectedChat) {
    return (
      <EmptyState 
        icon={FaComments} 
        title="Select a chat" 
        description="Choose a conversation from the sidebar to start messaging" 
      />
    );
  }

  return (
    <div className={`flex-1 flex flex-col ${isWidget ? '' : 'h-full'}`}>
      <ChatHeader 
        chat={selectedChat} 
        onBack={onBack} 
        onProfileClick={onProfileClick} 
        isWidget={isWidget}
      />
      
      <div className={`flex-1 overflow-y-auto p-4 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <div className="space-y-3">
          {selectedChat.messages?.map((msg, index) => (
            <Message 
              key={index}
              type={msg.type}
              text={msg.text}
              time={msg.time}
              image={msg.type === "received" ? selectedChat.image : null}
              isWidget={isWidget}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <MessageInput 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSend={handleSend}
        isWidget={isWidget}
      />
    </div>
  );
};

// SidebarHeader Component
const SidebarHeader = ({ search, setSearch }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`p-4 border-b ${
      darkMode ? "border-gray-700" : "border-gray-200"
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="./src/assets/images/tomatoLogo.png" 
            alt="AgriLink" 
            className="h-8 w-8 rounded-full object-cover border" 
          />
          <h1 className={`ml-2 font-semibold text-lg ${
            darkMode ? "text-white" : "text-gray-800"
          }`}>
            Agri<span className="text-[#FF6347]">Chat</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className={darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"}>
            <FaUsers />
          </button>
          <button className={darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"}>
            <FaEdit />
          </button>
          <button className={darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-500"}>
            <FaEllipsisV />
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
    </div>
  );
};

// ActiveUsersList Component
const ActiveUsersList = () => {
  const { darkMode } = useTheme();
  const { chats } = useMessenger();

  return (
    <>
      <div className={`px-4 py-2 ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}>
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}>
          Active Now
        </h3>
      </div>
      <div className={`px-4 py-2 flex space-x-3 overflow-x-auto pb-3 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}>
        {chats?.filter(c => c.status === "online").map(user => (
          <ActiveUser key={user.id} name={user.name} img={user.image} />
        ))}
      </div>
    </>
  );
}; 

// Sidebar Component
const Sidebar = ({ search, setSearch, onChatClick, onProfileClick }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`w-full md:w-80 lg:w-96 border-r flex flex-col h-full ${
      darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    }`}>
      <SidebarHeader search={search} setSearch={setSearch} />
      
      <div className="flex-1 overflow-y-auto">
        <ActiveUsersList />
        <ChatList 
          searchQuery={search} 
          onChatClick={onChatClick} 
          onProfileClick={onProfileClick} 
        />
      </div>
    </div>
  );
};

// SharedMediaTabs Component
const SharedMediaTabs = ({ activeTab, setActiveTab }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`flex border-b ${
      darkMode ? "border-gray-700" : "border-gray-200"
    }`}>
      <button
        className={`flex-1 py-2 text-sm font-medium ${
          activeTab === "images" 
            ? darkMode 
              ? "text-blue-400 border-b-2 border-blue-400" 
              : "text-blue-500 border-b-2 border-blue-500"
            : darkMode 
              ? "text-gray-400 hover:text-gray-300" 
              : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("images")}
      >
        Media
      </button>
      <button
        className={`flex-1 py-2 text-sm font-medium ${
          activeTab === "documents" 
            ? darkMode 
              ? "text-blue-400 border-b-2 border-blue-400" 
              : "text-blue-500 border-b-2 border-blue-500"
            : darkMode 
              ? "text-gray-400 hover:text-gray-300" 
              : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("documents")}
      >
        Files
      </button>
      <button
        className={`flex-1 py-2 text-sm font-medium ${
          activeTab === "links" 
            ? darkMode 
              ? "text-blue-400 border-b-2 border-blue-400" 
              : "text-blue-500 border-b-2 border-blue-500"
            : darkMode 
              ? "text-gray-400 hover:text-gray-300" 
              : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("links")}
      >
        Links
      </button>
    </div>
  );
};

// MediaGrid Component
const MediaGrid = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {[200, 201, 202, 203, 204, 205].map((id) => (
        <img 
          key={id}
          src={`https://picsum.photos/${id}`} 
          className="w-full h-24 object-cover rounded" 
          alt="Shared" 
        />
      ))}
    </div>
  );
};

// DocumentItem Component
const DocumentItem = ({ icon: Icon, color, title, size, time }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`flex items-center p-3 rounded-lg cursor-pointer ${
      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
    }`}>
      <div className={`${darkMode ? `bg-${color}-900` : `bg-${color}-100`} p-2 rounded-lg mr-3`}>
        <Icon className={`${darkMode ? `text-${color}-300` : `text-${color}-500`}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-medium ${
          darkMode ? "text-gray-100" : "text-gray-800"
        } truncate`}>{title}</h4>
        <p className={`text-xs ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}>{size} • {time}</p>
      </div>
    </div>
  );
};

// LinkItem Component
const LinkItem = ({ url, time, type }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`p-3 rounded-lg ${
      darkMode ? "hover:bg-gray-700 border-gray-700" : "hover:bg-gray-50 border-gray-100"
    } border`}>
      <div className="flex items-start">
        <div className={`${darkMode ? "bg-blue-900" : "bg-blue-100"} p-2 rounded-lg mr-3`}>
          <FaLink className={`${darkMode ? "text-blue-300" : "text-blue-500"}`} />
        </div>
        <div className="flex-1 min-w-0">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-sm font-medium ${
              darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"
            } underline break-all`}
          >
            {url}
          </a>
          <p className={`text-xs ${
            darkMode ? "text-gray-400" : "text-gray-500"
          } mt-1`}>{time} • {type === "received" ? "Received" : "Sent"}</p>
        </div>
      </div>
    </div>
  );
};

// SharedMedia Component
const SharedMedia = ({ selectedChat, onBack }) => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("images");

  const extractLinks = () => {
    if (!selectedChat) return [];
    
    const links = [];
    selectedChat.messages?.forEach(msg => {
      const urlMatches = msg.text?.match(/(https?:\/\/[^\s]+)/g);
      if (urlMatches) {
        urlMatches.forEach(url => {
          links.push({
            url,
            time: msg.time,
            type: msg.type
          });
        });
      }
    });
    
    return links;
  };

  if (!selectedChat) {
    return (
      <EmptyState 
        icon={FaImage} 
        title="No chat selected" 
        description="Select a chat to view shared media and details" 
      />
    );
  }

  return (
    <div className={`w-full md:w-80 border-l flex flex-col h-full ${
      darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    }`}>
      <div className={`p-4 border-b ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}>
        <button 
          className={`md:hidden mb-3 ${
            darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={onBack}
        >
          <FaArrowLeft size={18} />
        </button>
        
        <div className="flex flex-col items-center text-center mb-4">
          <UserAvatar src={selectedChat.image} alt={selectedChat.name} size="xl" />
          <h3 className={`font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}>{selectedChat.name}</h3>
          <RoleBadge role={selectedChat.role} />
          <OnlineStatus 
            isOnline={selectedChat.status === "online"} 
            lastActive={selectedChat.lastActive} 
            className="mt-1"
          />
        </div>
        
        <SharedMediaTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className={`flex-1 overflow-y-auto p-4 ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      }`}>
        {activeTab === "images" && <MediaGrid />}
        
        {activeTab === "documents" && (
          <div className="space-y-3">
            <DocumentItem 
              icon={FaFilePdf} 
              color="red" 
              title="Market_Report_2023.pdf" 
              size="2.4 MB" 
              time="3 days ago" 
            />
            <DocumentItem 
              icon={FaFileAlt} 
              color="blue" 
              title="Price_List.xlsx" 
              size="1.2 MB" 
              time="1 week ago" 
            />
          </div>
        )}
        
        {activeTab === "links" && (
          <div className="space-y-3">
            {extractLinks().length > 0 ? (
              extractLinks().map((link, index) => (
                <LinkItem 
                  key={index}
                  url={link.url}
                  time={link.time}
                  type={link.type}
                />
              ))
            ) : (
              <EmptyState 
                icon={FaLink} 
                title="No shared links" 
                description="" 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const MessengerWidget = () => {
  const {
    isOpen,
    selectedChat,
    searchQuery,
    closeMessenger,
    selectChat,
    setSearchQuery,
    addMessage,
  } = useMessenger();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [localMessage, setLocalMessage] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const handleSendMessage = (messageText) => {
    if (!selectedChat || !messageText.trim()) return;
    
    const newMessage = {
      type: "sent",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    addMessage(selectedChat.id, newMessage);
    
    selectChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage]
    });
    
    setLocalMessage('');
  };

  const handleExpand = () => {
    if (selectedChat) {
      navigate(`/messenger?chatId=${selectedChat.id}`);
    } else {
      navigate('/messenger');
    }
    closeMessenger();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeMessenger();
      setIsClosing(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed top-12 
      ${isOpen ? 'right-6' : '-right-[500px]'} 
      w-80 lg:w-90 h-96 lg:h-[500px] 
      rounded-t-lg shadow-xl 
      flex flex-col border z-40
      transition-all duration-1000 animate-slideUp ease-in-out
      ${isClosing ? 'duration-1000 transform translate-y-[100vh]' : ''}
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      <div className={`p-3 rounded-t-lg flex justify-between items-center ${
        darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
      }`}>
        <h3 className="font-semibold text-lg">Messages</h3>
        <div className="flex space-x-6">
          <button 
            onClick={handleExpand}
            aria-label="Expand to full view"
            className={darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"}
          >
            <FaExpand size={20} />
          </button>
          <button 
            onClick={handleClose}  
            aria-label="Close"
            className={darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"}
          >
            <FaTimes size={22} />
          </button>
        </div>
      </div>
      
      {selectedChat ? (
        <div className="flex-1 flex flex-col h-full">
          <ChatHeader 
            chat={selectedChat} 
            onBack={() => selectChat(null)}
            onProfileClick={() => selectChat(selectedChat)}
            isWidget={true}
          />
          
          <div className={`flex-1 overflow-y-auto p-4 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}>
            <div className="space-y-3">
              {selectedChat.messages.map((msg, index) => (
                <Message 
                  key={index}
                  type={msg.type}
                  text={msg.text}
                  time={msg.time}
                  image={msg.type === "received" ? selectedChat.image : null}
                  isWidget={true}
                />
              ))}
              <div ref={(el) => el?.scrollIntoView()} />
            </div>
          </div>
          
          <MessageInput 
            value={localMessage}
            onChange={(e) => setLocalMessage(e.target.value)}
            onSend={handleSendMessage}
            isWidget={true}
            className="rounded-lg"

          />
        </div>
      ) : (
        <>
          <div className={`p-3 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            <SearchInput 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ChatList 
              searchQuery={searchQuery}
              onChatClick={(chat) => {
                selectChat(chat);
              }}
              onProfileClick={selectChat}
              isWidget={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

// Main AgriLinkMessenger Component
const AgriLinkMessenger = () => {
  const [searchParams] = useSearchParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showChat, setShowChat] = useState(false);
  const [showSharedMedia, setShowSharedMedia] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState([]);
  const { chats, selectChat } = useMessenger();
  const { darkMode } = useTheme();

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    if (isMobile) {
      setShowChat(true);
      setShowSharedMedia(false);
    }
  };

  const handleProfileClick = (chat) => {
    setSelectedChat(chat);
    if (isMobile) {
      setShowSharedMedia(true);
      setShowChat(false);
    }
  };

  const handleBack = () => {
    setShowChat(false);
    setShowSharedMedia(false);
  };

  const handleSendMessage = (message) => {
    if (!selectedChat || !message.trim()) return;
    
    const newMessage = {
      type: "sent",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessage(prevChats => 
      prevChats.map(chat => 
        chat.id === selectedChat.id 
          ? { ...chat, messages: [...(chat.messages || []), newMessage] } 
          : chat
      )
    );
    
    setSelectedChat(prev => ({
      ...prev,
      messages: [...(prev.messages || []), newMessage]
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const chatId = searchParams.get('chatId');
    if (chatId) {
      const chat = chats.find(c => c.id === chatId);
      if (chat) {
        selectChat(chat);
        if (isMobile) {
          setShowChat(true);
          setShowSharedMedia(false);
        }
      }
    }
  }, [searchParams, chats, selectChat, isMobile]);

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      {(!isMobile || (!showChat && !showSharedMedia)) && (
        <Sidebar 
          search={search} 
          setSearch={setSearch} 
          onChatClick={handleChatClick} 
          onProfileClick={handleProfileClick} 
        />
      )}
      
      {(!isMobile || showChat) && !showSharedMedia && (
        <ChatWindow 
          selectedChat={selectedChat} 
          onBack={handleBack} 
          onProfileClick={handleProfileClick}
          onSendMessage={handleSendMessage}
        />
      )}
      
      {(!isMobile || showSharedMedia) && (
        <SharedMedia 
          selectedChat={selectedChat} 
          onBack={handleBack} 
        />
      )}
    </div>
  );
};

export default AgriLinkMessenger;