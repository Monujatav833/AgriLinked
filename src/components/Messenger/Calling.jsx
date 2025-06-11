import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMicrophone,FaTimes, FaVideo, FaCamera, FaPhoneSlash, FaVolumeUp, FaImage, FaList, FaLocationArrow, FaDesktop, FaComments, FaPaperPlane, FaBars } from "react-icons/fa";
import Waveform from "./wavesurfer"; 

const CallTimer = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    return <span className="text-white text-sm">{formatTime(time)}</span>;
};

const VideoControls = ({ type }) => (
    <div className="flex items-center justify-center space-x-4 p-2 bg-black/50 rounded-lg">
        <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full">
            <FaMicrophone size={18} />
        </button>
        {type === "video" && (
            <>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full">
                    <FaVideo size={18} />
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full">
                    <FaCamera size={18} />
                </button>
            </>
        )}
        <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full">
            <FaPhoneSlash size={18} />
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full">
            <FaVolumeUp size={18} />
        </button>
    </div>
);

const QuickActions = ({ type }) => (
    <div className="grid grid-cols-2 gap-2 p-2">
        {[
            { icon: <FaImage size={16} />, text: "Photos" },
            { icon: <FaList size={16} />, text: "Price List" },
            { icon: <FaLocationArrow size={16} />, text: "Location" },
            ...(type === "video" ? [{ icon: <FaDesktop size={16} />, text: "Screen" }] : []),
        ].map((action, index) => (
            <button key={index} className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg flex items-center justify-center space-x-2">
                {action.icon} <span className="text-xs">{action.text}</span>
            </button>
        ))}
    </div>
);

const ChatSection = () => (
    <div className="p-2 bg-gray-800 rounded-lg flex flex-col h-full md:h-auto">
        <div className="flex items-center space-x-2 mb-2">
            <FaComments size={16} className="text-gray-400" />
            <h4 className="text-white font-semibold text-sm">Chat</h4>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto mb-2">
            <div className="flex space-x-2">
                <img src="https://via.placeholder.com/40" alt="John" className="w-6 h-6 rounded-full" />
                <div className="bg-gray-700 rounded-lg p-2 text-xs text-white">How's the crop quality this season?</div>
            </div>
            <div className="flex space-x-2 justify-end">
                <div className="bg-blue-600 rounded-lg p-2 text-xs text-white">The wheat looks excellent! I'll share some photos.</div>
            </div>
        </div>
        <div className="flex space-x-2">
            <input type="text" className="flex-1 bg-gray-700 border-0 rounded-lg text-white text-xs p-2" placeholder="Type a message..." />
            <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg">
                <FaPaperPlane size={14} />
            </button>
        </div>
    </div>
);

const VideoCall = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const { type } = useParams(); 

    return (
        <div className="bg-gray-900 h-screen flex flex-col">
            <div className="flex-1 flex flex-col md:flex-row">
                <main className="flex-1 relative">
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent h-16 md:h-24">
                        <div className="max-w-8xl mx-auto px-2 md:px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <div className="relative">
                                    <img src="https://via.placeholder.com/80" alt="Caller" className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="text-white">
                                    <h2 className="font-semibold text-sm md:text-lg">rajat dalal</h2>
                                    <p className="text-xs md:text-sm text-gray-300">Organic Farmer</p>
                                </div>
                            </div>
                            <div className="flex items-center mr-10 lg:mr-0 space-x-2 md:space-x-4">
                                <div className="flex items-center space-x-1 md:space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-white text-xs md:text-sm">Excellent Connection</span>
                                </div>
                                <CallTimer />
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gray-900">
                        {type === "audio" ? (
                            <div className="flex items-center justify-center h-full">
                                <Waveform audioUrl="/public/vidmeetsSong.mp3" />
                            </div>
                        ) : (
                            <img src="https://via.placeholder.com/1920x1080" alt="Remote Video" className="w-full h-full object-cover" />
                        )}
                    </div>

                    {type === "video" ? (
                        <div className="absolute bottom-16 md:bottom-24 right-2 md:right-6 w-24 h-16 md:w-64 md:h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                            <img src="https://via.placeholder.com/256x144" alt="Self View" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="absolute bottom-16 md:bottom-24 right-2 md:right-6 w-24 h-16 md:w-64 md:h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                            <Waveform audioUrl="https://ia800605.us.archive.org/32/items/MozartK545/mozart_k545_1_ortiz.mp3" />
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="max-w-8xl mx-auto px-2 md:px-4 py-2 md:py-4">
                            <VideoControls type={type} />
                        </div>
                    </div>
                </main>

                <button
                    className="md:hidden fixed top-1 right-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full z-30"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    {showSidebar ? <FaTimes size={16}/>:<FaBars size={16}/>}
                </button>

                <aside
                    className={`${showSidebar ? "block" : "hidden"} md:block w-full md:w-80 bg-gray-800 border-l border-gray-700 flex flex-col fixed md:relative inset-0 md:inset-auto z-20`}
                >
                    <div className="p-3 md:p-4 border-b border-gray-700">
                        <h3 className="text-white font-semibold text-sm md:text-base">Quick Actions</h3>
                    </div>
                    <QuickActions type={type} />
                    <ChatSection />
                </aside>
            </div>
        </div>
    );
};

export default VideoCall;
