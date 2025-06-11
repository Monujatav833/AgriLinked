import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCrop,
  FaPencilAlt,
  FaTextHeight,
  FaMagic,
  FaSun,
  FaAdjust,
  FaSmile,
  FaPaperPlane,
} from "react-icons/fa";

import useMediaUpload from "./useMediaUpload";


const Header = ({ onClose, onDone }) => (
  <header className="bg-white py-4 px-6 flex items-center justify-between border-b border-gray-200">
    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
      <FaArrowLeft className="text-xl" />
    </button>
    <h1 className="text-lg font-semibold">Edit Media</h1>
    <button onClick={onDone} className="text-custom font-medium rounded-button">
      Done
    </button>
  </header>
);

const Toolbar = () => (
  <div className="absolute top-0 left-0 right-0 bg-white z-10 border-b border-gray-200">
    <div className="flex items-center px-4 py-3 overflow-x-auto space-x-6">
      <button className="flex flex-col items-center text-gray-600 hover:text-custom">
        <FaCrop className="text-xl" />
        <span className="text-xs mt-1">Crop</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-custom">
        <FaPencilAlt className="text-xl" />
        <span className="text-xs mt-1">Draw</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-custom">
        <FaTextHeight className="text-xl" />
        <span className="text-xs mt-1">Text</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-custom">
        <FaMagic className="text-xl" />
        <span className="text-xs mt-1">Filters</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-custom">
        <FaSun className="text-xl" />
        <span className="text-xs mt-1">Brightness</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-custom">
        <FaAdjust className="text-xl" />
        <span className="text-xs mt-1">Contrast</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-custom">
        <FaSmile className="text-xl" />
        <span className="text-xs mt-1">Stickers</span>
      </button>
    </div>
  </div>
);

const MediaPreview = ({ media, mediaType }) => {
  if (!media) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-900 pt-16">
        <p className="text-white">No media selected</p>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-gray-900 pt-16">
      {mediaType === "image" ? (
        <img src={media} className="max-h-full w-auto object-contain" alt="Preview" />
      ) : mediaType === "video" ? (
        <video src={media} controls className="max-h-full w-auto object-contain" />
      ) : mediaType === "pdf" ? (
        <embed src={media} type="application/pdf" className="w-full h-96" />
      ) : (
        <p className="text-white">Unsupported file type</p>
      )}
    </div>
  );
};


const CaptionInput = ({ onSend }) => { 
    console.log("onSend function in CaptionInput:", onSend); 

    if (!onSend) {
        console.error("onSend function is not passed!");
      }
 const { media, mediaType, handleMediaPicker, handleMediaClear,handleMediaUpload,handleSendMedia} = useMediaUpload();
  const [caption, setCaption] = React.useState("");

  const handleInputChange = (e) => {
    setCaption(e.target.value);
  };


  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex items-center space-x-3">
        <button className="text-gray-600 hover:text-gray-800">
          <FaSmile className="text-xl" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Add a caption..."
            className="w-full py-2 px-4 bg-gray-100 rounded-full border-none focus:ring-2 focus:ring-custom"
            value={caption}
            onChange={handleInputChange}
          />
          <span className="absolute right-14 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
            {caption.length}/2200
          </span>
        </div>
<button onClick={() => {
    if (typeof onSend === "function") {
        onSend("create-post");
    } else {
        console.error("onSend is not a function:", onSend);
    }
}}>
          <FaPaperPlane className="text-xl" />
        </button>
      </div>
    </div>
  );
};

const PaginationDots = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 flex space-x-1">
    <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
    <div className="w-2 h-2 rounded-full bg-white"></div>
    <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
  </div>
);

const MediaEditor = ({onClose, onDone, onSend }) => {    
    const location = useLocation();
    const navigate = useNavigate();
      const {handleMediaPicker, handleMediaClear,handleMediaUpload,handleSendMedia} = useMediaUpload();
    
  
    const media = location.state?.media;
    const mediaType = location.state?.mediaType;

    if (!media) {
        return <p>No media found. Please upload again.</p>;
      }

  return (
    <div className="bg-gray-100 h-screen flex flex-col font-sans">
      <Header onClose={onClose} onDone={onDone} />
      <div className="flex-1 relative overflow-hidden">
        <Toolbar />
        <MediaPreview media={media} mediaType={mediaType} />
        <CaptionInput onSend={handleSendMedia} />
        <PaginationDots />
      </div>
    </div>
  );
};

export default MediaEditor;