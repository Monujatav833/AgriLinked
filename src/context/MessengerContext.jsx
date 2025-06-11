// MessengerContext.jsx
import { createContext, useState, useContext } from 'react';

 const chatData = [
  {
    id: 1,
    name: "Rajat Dalal",
    time: "2m ago",
    role: "Broker",
    message: "Latest market prices for wheat...",
    image: "./src/assets/images/wheat.png",
    status: "online",
    lastActive: "",
    messages: [
      { type: "received", text: "Hi! I've checked the current market rates for wheat.", time: "10:30 AM" },
      { type: "received", text: "Would you like to discuss the pricing?", time: "10:31 AM" },
      { type: "sent", text: "Yes, please share the latest rates.", time: "10:32 AM" },
      { type: "sent", text: "I have 2 tons of premium quality wheat ready for sale.", time: "10:32 AM" },
      { type: "received", text: "Check this link for reference: https://marketprices.com/wheat", time: "10:33 AM" }
    ]
  },
  {
    id: 2,
    name: "deepak seth",
    time: "10m ago",
    role: "Farmer",
    message: "I have fresh tomatoes ready for dispatch.",
    image: "./src/assets/images/tomato.png",
    status: "online",
    lastActive: "",
    messages: [
      { type: "received", text: "Hello, my tomatoes are ready for harvest.", time: "9:15 AM" },
      { type: "sent", text: "What's your expected price per kg?", time: "9:20 AM" },
      { type: "received", text: "₹25/kg for bulk purchase (100kg+).", time: "9:22 AM" },
      { type: "received", text: "Here's my farm location: https://maps.google.com/?q=12.3456,78.9012", time: "9:23 AM" }
    ]
  },
  {
    id: 3,
    name: "dhanna moulavi",
    time: "1h ago",
    role: "Wholesaler",
    message: "Looking to buy onions in bulk.",
    image: "./src/assets/images/onion.png",
    status: "offline",
    lastActive: "3h",
    messages: [
      { type: "received", text: "Need 500kg onions for my shop.", time: "8:45 AM" },
      { type: "sent", text: "We can supply at ₹30/kg.", time: "8:50 AM" },
      { type: "received", text: "Can you do ₹28/kg for 1000kg?", time: "8:55 AM" },
      { type: "sent", text: "Here's our product catalog: https://agriproducts.com/catalog", time: "8:56 AM" }
    ]
  }
];

const MessengerContext = createContext();

export const MessengerProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    isExpanded: false,
    selectedChat: null,
    searchQuery: "",
    unreadCount: 3,
    chats: chatData
  });

  const actions = {
    openMessenger: () => setState(prev => ({ ...prev, isOpen: true })),
    closeMessenger: () => setState(prev => ({ ...prev, isOpen: false, isExpanded: false, selectedChat: null })),
    toggleExpand: () => setState(prev => ({ ...prev, isExpanded: !prev.isExpanded })),
    selectChat: (chat) => setState(prev => ({ ...prev, selectedChat: chat })),
    setSearchQuery: (query) => setState(prev => ({ ...prev, searchQuery: query })),
    markAsRead: () => setState(prev => ({ ...prev, unreadCount: 0 })),
      addMessage: (chatId, message) => {
      setState(prev => ({
        ...prev,
        chats: prev.chats.map(chat => 
          chat.id === chatId 
            ? { ...chat, messages: [...chat.messages, message] }
            : chat
        )
      }));
    }
  };

  return (
    <MessengerContext.Provider value={{ ...state, ...actions }}>
      {children}
    </MessengerContext.Provider>
  );
};

export const useMessenger = () => useContext(MessengerContext);
