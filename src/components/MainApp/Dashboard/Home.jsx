import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MessageButton from "./MessageButton.jsx";
import { MessengerWidget } from "../../Messenger/Messenger.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

import {
  FaHeart,
  FaThumbsDown,
  FaComment,
  FaShare,
  FaVolumeMute,
  FaVolumeUp,
  FaUserPlus,
  FaPlay,
  FaPause,
} from "react-icons/fa";
import postsData from "./posts.json";
import usersData from "./users.json";
import { RatingStars } from "./newProfile.jsx";
import PDFViewer from "./PDFViewer.jsx";
import CommentSection from "./CommentSection.jsx"; 
import Modal from "./PopUpModal.jsx";
import StatusPage from "./StatusPage.jsx";
import { CreatePostButton, StatsInfo } from "./NewProfile.jsx";

const ProfileImage = ({ src, onClick }) => {
  const { darkMode } = useTheme();
  
  return (
    <img
      src={src}
      alt="Profile"
      className={`w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border ${darkMode ? 'border-gray-600' : 'border-gray-400'} mb-4`}
      onClick={onClick}
      onError={(e) => (e.target.src = "./src/assets/images/tomato.png")}
    />
  );
};

const getUserRating = (userId) => {
  const user = usersData.find((u) => u.id === userId);
  return user ? user.rating : 0;
};

const PostHeader = ({ post, handleProfileClick }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex items-center justify-between mb-3 whitespace-wrap overflow-hidden">
      <ProfileImage src={post.profileImg} onClick={() => handleProfileClick(post.userId)} />
      <div className="flex-grow ml-2 md:ml-3">
        <p className={`font-bold text-sm md:text-base ${darkMode ? 'text-gray-200' : 'text-gray-800'} whitespace-nowrap overflow-hidden text-ellipsis max-w-[15ch] md:max-w-[18ch] inline-block cursor-default hover:overflow-visible hover:whitespace-normal hover:text-clip ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-white'} hover:relative hover:p-1.5`}>
          {post.channel}
        </p>
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{post.roletype}</p>
      </div>
      <RatingStars className="mb-8 mr-2 hidden md:block" rating={getUserRating(post.id)} />
      <button className="bg-blue-600 text-white border-none px-2 py-1 md:px-2.5 md:py-1.5 text-xs md:text-sm rounded flex items-center gap-1 mb-6 hover:bg-blue-700">
        <FaUserPlus className="text-xs md:text-sm" /> <span className="hidden sm:inline">Connect</span>
      </button>
    </div>
  );
};

const VideoPost = ({ src, videoRef, togglePlayPause, index, playingVideoIndex, muted, toggleMute }) => (
  <div className="relative w-full max-h-[400px] md:max-h-[500px] overflow-hidden rounded-lg">
    <video
      ref={videoRef}
      src={src}
      loop={false}
      muted={muted}
      className="w-full rounded-lg cursor-pointer overflow-hidden object-cover"
      onClick={() => togglePlayPause(index)}
    />
    <button 
      className="absolute bottom-2 left-2 bg-black/60 text-white border-none p-1.5 md:p-2 rounded-full cursor-pointer hover:bg-black/80"
      onClick={() => togglePlayPause(index)}
    >
      {playingVideoIndex === index ? <FaPause size={12} /> : <FaPlay size={12} />}
    </button>
    <button 
      className="absolute bottom-2 right-2 bg-black/60 text-white border-none p-1.5 md:p-2 rounded-full cursor-pointer hover:bg-black/80"
      onClick={toggleMute}
    >
      {muted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
    </button>
  </div>
);

const PostContent = ({ description, hashtags, postedAt, expanded, toggleExpand, index }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="py-2 md:py-3 flex flex-col gap-1 md:gap-2">
      <p 
        className={`text-xs md:text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-1 md:max-h-[5.7em] overflow-hidden`} 
        style={{ maxHeight: expanded ? "none" : undefined }}
      >
        {description}
      </p>
      {description.length > 100 && (
        <button 
          className={`bg-none border-none text-blue-600 text-xs cursor-default mt-0 md:mt-1 text-left hover:underline`}
          onClick={() => toggleExpand(index)}
        >
          {expanded ? "...View Less" : "...View More"}
        </button>
      )}
      <p className="text-blue-600 text-xs">{hashtags}</p>
      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{postedAt}</p>
    </div>
  );
};

const PostActions = ({ index, liked, disliked, likes, dislikes, handleLike, handleDislike, handleComment }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`flex justify-around py-2 md:py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
      <button 
        className={`bg-none border-none ${darkMode ? 'text-gray-200' : 'text-black'} text-xs md:text-sm cursor-pointer flex flex-col items-center gap-1 ${liked ? "text-red-500" : ""}`}
        onClick={() => handleLike(index)}
      >
        <FaHeart size={14} style={{ color: liked ? "red" : "" }} /> {likes}
      </button>
      <button 
        className={`bg-none border-none ${darkMode ? 'text-gray-200' : 'text-black'} text-xs md:text-sm cursor-pointer flex flex-col items-center gap-1 ${disliked ? "text-red-500" : ""}`}
        onClick={() => handleDislike(index)}
      >
        <FaThumbsDown size={14} style={{ color: disliked ? "red" : "" }} /> {dislikes}
      </button>
      <button 
        className={`bg-none border-none ${darkMode ? 'text-gray-200' : 'text-black'} text-xs md:text-sm cursor-pointer flex flex-col items-center gap-1`}
        onClick={handleComment}
      >
        <FaComment size={14} /> Comment
      </button>
      <button className={`bg-none border-none ${darkMode ? 'text-gray-200' : 'text-black'} text-xs md:text-sm cursor-pointer flex flex-col items-center gap-1`}>
        <FaShare size={14} /> Share
      </button>
    </div>
  );
};

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(postsData);
  const [likes, setLikes] = useState(postsData.map((p) => p.likes));
  const [dislikes, setDislikes] = useState(postsData.map((p) => p.dislikes));
  const [liked, setLiked] = useState(Array(postsData.length).fill(false));
  const [disliked, setDisliked] = useState(Array(postsData.length).fill(false));
  const [muted, setMuted] = useState(true);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [expanded, setExpanded] = useState(Array(postsData.length).fill(false));
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const videoRefs = useRef([]);
  const { darkMode } = useTheme();

  const handleLike = (index) => {
    const newLikes = [...likes];
    const newLiked = [...liked];
    const newDisliked = [...disliked];
    const newDislikes = [...dislikes];

    if (!newLiked[index]) {
      newLikes[index] += 1;
      newLiked[index] = true;
      if (newDisliked[index]) {
        newDisliked[index] = false;
        newDislikes[index] -= 1;
      }
    } else {
      newLikes[index] -= 1;
      newLiked[index] = false;
    }

    setLikes(newLikes);
    setLiked(newLiked);
    setDisliked(newDisliked);
    setDislikes(newDislikes);
  };

  const handleDislike = (index) => {
    const newDislikes = [...dislikes];
    const newDisliked = [...disliked];
    const newLiked = [...liked];
    const newLikes = [...likes];

    if (!newDisliked[index]) {
      newDislikes[index] += 1;
      newDisliked[index] = true;
      if (newLiked[index]) {
        newLiked[index] = false;
        newLikes[index] -= 1;
      }
    } else {
      newDislikes[index] -= 1;
      newDisliked[index] = false;
    }

    setDislikes(newDislikes);
    setDisliked(newDisliked);
    setLiked(newLiked);
    setLikes(newLikes);
  };

  const toggleMute = () => {
    setMuted(!muted);
    videoRefs.current.forEach((video) => {
      if (video) video.muted = !muted;
    });
  };

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video && video.paused) {
      videoRefs.current.forEach((el, i) => {
        if (i !== index && el && !el.paused) {
          el.pause();
        }
      });
      video.play();
      setPlayingVideoIndex(index);
    } else if (video) {
      video.pause();
      setPlayingVideoIndex(null);
    }
  };

  const toggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleComment = (postId) => {
    setSelectedPostId(postId);
    setShowCommentPopup(true);
  };

  const closeCommentPopup = () => {
    setShowCommentPopup(false);
    setSelectedPostId(null);
  };

  return (
    <div className={`flex flex-col items-center justify-center pb-[50px] md:pb-5 flex-wrap mt-3 md:mt-5 ${darkMode ? '' : 'bg-white'}`}>
      {posts.map((post, index) => (
        <div 
          key={post.id} 
          className={`w-full max-w-[96vw] md:w-[625px] rounded-lg ${darkMode ? ' border-gray-700 shadow-[0_0_10px_rgb(209,213,219,0.2)]'  : 'bg-white border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)]'} border p-3 md:p-4 mb-3 md:mb-4 word-wrap overflow-hidden flex flex-col flex-wrap`}
        >
          <PostHeader post={post} handleProfileClick={handleProfileClick} />
          {post.url && post.url.match(/\.(mp4|webm|avi|mov)$/i) ? (
            <VideoPost
              src={post.url}
              videoRef={(el) => (videoRefs.current[index] = el)}
              togglePlayPause={togglePlayPause}
              index={index}
              playingVideoIndex={playingVideoIndex}
              muted={muted}
              toggleMute={toggleMute}
            />
          ) : post.url && post.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
            <img src={post.url} alt="Post" className="w-full rounded-lg object-cover" />
          ) : post.url && post.url.match(/\.pdf$/i) ? (
            <PDFViewer pdfUrl={post.url} />
          ) : null}
          <PostContent
            description={post.description}
            hashtags={post.hashtags}
            postedAt={post.postedAt}
            expanded={expanded[index]}
            toggleExpand={toggleExpand}
            index={index}
          />
          <PostActions
            index={index}
            liked={liked[index]}
            disliked={disliked[index]}
            likes={likes[index]}
            dislikes={dislikes[index]}
            handleLike={handleLike}
            handleDislike={handleDislike}
            handleComment={() => handleComment(post.id)}
          />
        </div>
      ))}

      <Modal isOpen={showCommentPopup} onClose={closeCommentPopup}>
        <CommentSection postId={selectedPostId} />
      </Modal>
    </div>
  );
};

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'bg-transparent' : 'bg-white'}>
      <StatusPage className={darkMode ? 'bg-gray-800 lg:max-w-[50vw] mx-auto' : 'bg-white lg:max-w-[50vw] mx-auto'}/>
      <div className="max-w-6xl mx-auto">
        <CreatePostButton className="lg:max-w-[46vw] mx-auto" />
      </div>
      <Feed/>
      <MessageButton />
      <MessengerWidget />
    </div>
  );
};

export {
  ProfileImage,
  PostHeader,
  VideoPost,
  PostContent,
  PostActions,
  Home,
  getUserRating,
};