import { useState, useEffect } from "react";
import { FaBell, FaCog, FaTrashAlt } from "react-icons/fa";
import useScrollDirection from "../../../hooks/useScrollDirection";
import { useTheme } from "../../../context/ThemeContext";

const filters = ["All", "Mentions", "Likes", "Comments", "Follows"];

const NotificationHeader = ({ setFilter, activeFilter, markAllAsRead }) => {
  const { darkMode } = useTheme();
  const isHidden = useScrollDirection();
  
  return (
    <div
      className={`px-6 py-4 border-b sticky top-[50px] sm:top-[80px] lg:top-[80px] bottom-0 transition-all duration-150 ease-in-out ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } ${
        isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className={`md:text-2xl font-semibold flex items-center gap-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          <FaBell className={darkMode ? "text-gray-300" : "text-gray-600"} size={20} />
          Notifications
        </h1>
        <button
          className={`px-4 py-2 rounded hover:bg-opacity-90 ${
            darkMode ? "bg-blue-600 text-white" : "bg-black text-white"
          }`}
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </div>
      <div className="mt-4 flex space-x-2 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            className={`px-4 py-2 rounded transition-colors ${
              activeFilter === filter 
                ? darkMode 
                  ? "bg-blue-600 text-white" 
                  : "bg-black text-white"
                : darkMode 
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

const NotificationItem = ({ user, action, time, message, img, postImg, onDelete }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`p-6 flex justify-between ${
      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
    }`}>
      <div className="flex">
        <img className="h-12 w-12 rounded-full" src={img} alt={user} />
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <span className={`font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>{user}</span>
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}> {action}</span>
            </div>
            <span className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>{time}</span>
          </div>
          {message && (
            <div className={`mt-2 text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}>{message}</div>
          )}
          {postImg && (
            <div className="mt-2">
              <img 
                className="h-24 w-32 object-cover rounded border" 
                src={postImg} 
                alt="Post" 
              />
            </div>
          )}
        </div>
      </div>
      <button 
        onClick={onDelete} 
        className={darkMode ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-600"}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

const NotificationList = ({ notifications, deleteNotification }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`divide-y ${
      darkMode ? "divide-gray-700 border-gray-700" : "divide-gray-200 border-gray-200"
    } border-b`}>
      {notifications.length > 0 ? (
        notifications.map((item, index) => (
          <NotificationItem 
            key={index} 
            {...item} 
            onDelete={() => deleteNotification(index)} 
          />
        ))
      ) : (
        <p className={`text-center p-4 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}>
          No new notifications
        </p>
      )}
    </div>
  );
};

const NotificationFooter = ({ clearAll }) => {
  const { darkMode } = useTheme();
  const isHidden = useScrollDirection();
  
  return (
    <div
      className={`px-6 py-5 border-t sticky bottom-[50px] sm:bottom-[60px] md:bottom-0 transition-all duration-150 ease-in-out ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
      } ${
        isHidden ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex justify-between">
        <button className={`text-sm flex items-center ${
          darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
        }`}>
          <FaCog className="mr-2" />
          Notification Settings
        </button>
        <button 
          onClick={clearAll} 
          className={`text-sm flex items-center ${
            darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
          }`}
        >
          <FaTrashAlt className="mr-2" />
          Clear All
        </button>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const { darkMode } = useTheme();
  const [activeFilter, setFilter] = useState("All");
  const [notifications, setNotifications] = useState([
    {
      user: "rajat dalal",
      action: "liked your post about organic farming techniques",
      time: "2m ago",
      message: `"Great insights on sustainable farming practices! Would love to learn more..."`,
      img: "./src/assets/images/tomato.png",
      type: "Likes",
    },
    {
      user: "vikash",
      action: "commented on your crop rotation post",
      time: "1h ago",
      message: `"I've been using a similar system on my farm. The results are amazing!"`,
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      postImg: "./src/assets/images/tomato.png",
      type: "Comments",
    },
    {
      user: "pappu",
      action: "started following you",
      time: "3h ago",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Follows",
    },
    {
      user: "deepak seth",
      action: "mentioned you in a comment",
      time: "5h ago",
      message: `"Hey @JohnDoe, what do you think about these new irrigation techniques?"`,
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      type: "Mentions",
    },
    {
      user: "dhanna moulavi",
      action: "liked your post about organic farming techniques",
      time: "2m ago",
      message: `"Great insights on sustainable farming practices! Would love to learn more..."`,
      img: "./src/assets/images/tomato.png",
      type: "Likes",
    },
    {
      user: "deepak seth",
      action: "commented on your crop rotation post",
      time: "1h ago",
      message: `"I've been using a similar system on my farm. The results are amazing!"`,
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      postImg: "./src/assets/images/tomato.png",
      type: "Comments",
    },
    {
      user: "vikash",
      action: "started following you",
      time: "3h ago",
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Follows",
    },
    {
      user: "deepak seth",
      action: "mentioned you in a comment",
      time: "5h ago",
      message: `"Hey @JohnDoe, what do you think about these new irrigation techniques?"`,
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Mentions",
    },
    {
      user: "dhanna moulavi",
      action: "liked your post about organic farming techniques",
      time: "2m ago",
      message: `"Great insights on sustainable farming practices! Would love to learn more..."`,
      img: "./src/assets/images/tomato.png",
      type: "Likes",
    },
    {
      user: "pappu farmer",
      action: "commented on your crop rotation post",
      time: "1h ago",
      message: `"I've been using a similar system on my farm. The results are amazing!"`,
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      postImg: "./src/assets/images/tomato.png",
      type: "Comments",
    },
    {
      user: "mota punjabi",
      action: "started following you",
      time: "3h ago",
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Follows",
    },
    {
      user: "deepak seth",
      action: "mentioned you in a comment",
      time: "5h ago",
      message: `"Hey @deepak, what do you think about these new irrigation techniques?"`,
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Mentions",
    },
    {
      user: "deepak seth",
      action: "liked your post about organic farming techniques",
      time: "2m ago",
      message: `"Great insights on sustainable farming practices! Would love to learn more..."`,
      img: "./src/assets/images/tomato.png",
      type: "Likes",
    },
    {
      user: "deppak seth",
      action: "commented on your crop rotation post",
      time: "1h ago",
      message: `"I've been using a similar system on my farm. The results are amazing!"`,
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      postImg: "./src/assets/images/tomato.png",
      type: "Comments",
    },
    {
      user: "deppak seth",
      action: "started following you",
      time: "3h ago",
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Follows",
    },
    {
      user: "deppak seth",
      action: "mentioned you in a comment",
      time: "5h ago",
      message: `"Hey @JohnDoe, what do you think about these new irrigation techniques?"`,
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Mentions",
    },
    {
      user: "deppak seth",
      action: "liked your post about organic farming techniques",
      time: "2m ago",
      message: `"Great insights on sustainable farming practices! Would love to learn more..."`,
      img: "./src/assets/images/tomato.png",
      type: "Likes",
    },
    {
      user: "deppak seth",
      action: "commented on your crop rotation post",
      time: "1h ago",
      message: `"I've been using a similar system on my farm. The results are amazing!"`,
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      postImg: "./src/assets/images/tomato.png",
      type: "Comments",
    },
    {
      user: "deppak seth",
      action: "started following you",
      time: "3h ago",
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Follows",
    },
    {
      user: "deppak seth",
      action: "mentioned you in a comment",
      time: "5h ago",
      message: `"Hey @deepak, what do you think about these new irrigation techniques?"`,
      img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      type: "Mentions",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications([]);
  };

  const deleteNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications =
    activeFilter === "All"
      ? notifications
      : notifications.filter((item) => item.type === activeFilter);

  return (
    <div className={darkMode ? "bg-transparent" : "bg-gray-50"}>
      <main className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}>
        <div className={`rounded-lg shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <NotificationHeader
            setFilter={setFilter}
            activeFilter={activeFilter}
            markAllAsRead={markAllAsRead}
          />
          <NotificationList 
            notifications={filteredNotifications} 
            deleteNotification={deleteNotification} 
          />
          <NotificationFooter clearAll={clearAll}/>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;