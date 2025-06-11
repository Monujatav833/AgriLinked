import { useState, useRef, useEffect } from "react";
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
import videos from "./videos.json";
import { Comments } from "./StatusPage";

const Reels = () => {
  const [likes, setLikes] = useState(videos.map((v) => v.likes));
  const [dislikes, setDislikes] = useState(videos.map((v) => v.dislikes));
  const [liked, setLiked] = useState(Array(videos.length).fill(false));
  const [disliked, setDisliked] = useState(Array(videos.length).fill(false));
  const [muted, setMuted] = useState(false);
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);
  const [showControls, setShowControls] = useState(false);
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = muted;
      }
    });
  }, [muted]);

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
    setMuted((prevMuted) => !prevMuted);
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !muted;
      }
    });
  };

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) {
      video.play();
      setPlayingVideoIndex(index);
    } else {
      video.pause();
      setPlayingVideoIndex(null);
    }
    scrollToVideo(index);
    showPlayPauseButton();
  };

  const scrollToVideo = (index) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      videoElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleVideoEnd = (index) => {
    const nextIndex = (index + 1) % videos.length;
    togglePlayPause(nextIndex);
    scrollToVideo(nextIndex);
  };

  useEffect(() => {
    scrollToVideo(0);
  }, []);

  const showPlayPauseButton = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  return (
    <div className="relative w-[360px] h-screen bg-black overflow-hidden flex justify-center mx-auto">
      <div className="overflow-y-scroll snap-y snap-mandatory h-full w-[390px] bg-black relative">
        {videos.map((video, index) => (
          <div key={video.id} className="h-screen flex justify-center items-center relative snap-start w-full">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.url}
              loop
              playsInline
              className="w-full h-full object-cover"
              onClick={() => togglePlayPause(index)}
              onEnded={() => handleVideoEnd(index)}
            />

            {showControls && (
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => togglePlayPause(index)}
              >
                {playingVideoIndex === index ? <FaPause className="text-white text-4xl" /> : <FaPlay className="text-white text-4xl" />}
              </div>
            )}

            <div className="absolute bottom-20 right-5 flex flex-col gap-4 text-white">
              <button className={`flex flex-col items-center cursor-pointer ${liked[index] ? "text-red-500" : "text-white"}`} onClick={() => handleLike(index)}>
                <FaHeart className="text-3xl" /> {likes[index]}
              </button>
              <button className={`flex flex-col items-center cursor-pointer ${disliked[index] ? "text-gray-800" : "text-white"}`} onClick={() => handleDislike(index)}>
                <FaThumbsDown className="text-3xl" /> {dislikes[index]}
              </button>
              <button className="flex flex-col items-center cursor-pointer"
               onClick={<Comments/>}>
                <FaComment className="text-3xl" /> 5
              </button>
              <button className="flex flex-col items-center cursor-pointer">
                <FaShare className="text-3xl" /> Share
              </button>
              <button className="flex flex-col items-center cursor-pointer z-10" onClick={toggleMute}>
                {muted ? <FaVolumeMute className="text-3xl" /> : <FaVolumeUp className="text-3xl" />}
              </button>
            </div>

            <div className="absolute bottom-8 left-5 text-white w-80">
              <div className="flex items-center gap-3">
                <img src={video.profileImg} alt="Channel" className="w-10 h-10 rounded-full border border-white" />
                <p className="font-bold">{video.channel}</p>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer">
                  <FaUserPlus /> Follow
                </button>
              </div>
              <p className="mt-2 text-sm">{video.description}</p>
              <p className="text-xs text-gray-400">{video.views} Views</p>
              <p className="text-sm text-blue-400">{video.hashtags}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;


