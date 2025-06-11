import { FaFacebookMessenger } from "react-icons/fa";
import { useMessenger } from "../../../context/MessengerContext";
import { useTheme } from "../../../context/ThemeContext.jsx";

const recentChats = [
  { id: 1, img: "https://i.pravatar.cc/24?img=1" },
  { id: 2, img: "https://i.pravatar.cc/24?img=2" },
  { id: 3, img: "https://i.pravatar.cc/24?img=3" },
];

const MessageButton = () => {
  const { isOpen, unreadCount, openMessenger, closeMessenger } = useMessenger();
    const { darkMode} = useTheme();
  

    if (isOpen) return null;

  return (
    <div
      onClick={isOpen ? closeMessenger : openMessenger}
      className={`hidden lg:flex fixed bottom-4 right-10 z-50  items-center gap-2  border backdrop-blur-md px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer
        ${darkMode ? 'bg-black' : 'bg-white'}`}
    >
      <div className="relative">
        <FaFacebookMessenger className={`
         ${darkMode ? 'text-white' : 'text-black'}
        `}
         size={18} />
        {!isOpen && unreadCount > 0 && (
          <span className={`absolute -top-2 -right-2 bg-red-500  text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse
           ${darkMode ? 'text-white' : 'text-black'}
          `}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>

      <span className={`font-medium text-md
         ${darkMode ? 'text-white' : 'text-black'}
        `}>Messages</span>

      <div className="flex -space-x-2 ml-2">
        {recentChats.map((chat) => (
          <img
            key={chat.id}
            src={chat.img}
            alt="chat"
            className={`h-6 w-6 rounded-full border-2  object-cover
               ${darkMode ? 'border-white' : 'border-black'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageButton;
