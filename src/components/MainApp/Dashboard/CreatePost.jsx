import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FaImage,
  FaVideo,
  FaFilePdf,
  FaGlobeAmericas,
  FaUsers,
  FaShare,
  FaComment,
  FaTimes,
  FaEdit,
  FaClock,
  FaThumbsUp,
} from "react-icons/fa";

import useMediaUpload from "../../../hooks/useMediaUpload";

const CreatePost = () => {
  const [postText, setPostText] = useState("");

  const [posts, setPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [visibility, setVisibility] = useState("Anyone can see");
  const [showVisibilityPopup, setShowVisibilityPopup] = useState(false);
  const {handleMediaPicker, handleMediaClear,handleMediaUpload} = useMediaUpload();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const media = params.get("media");
  const mediaType = params.get("type");

  const handlePost = () => {
    if (editIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = { text: postText, media, mediaType, visibility };
      setPosts(updatedPosts);
      setEditIndex(null);
    } else {
      setPosts([{ text: postText, media, mediaType, visibility }, ...posts]);
    }

    setPostText("");
    handleMediaClear();
    setVisibility("Anyone can see");
  };

  const handleSaveDraft = () => {
    setDrafts([{ text: postText, media, mediaType, visibility }, ...drafts]);
    setPostText("");
    handleMediaClear();
    setVisibility("Anyone can see");
    alert("Post saved as draft!");
  };

  const handleDelete = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setPostText(posts[index].text);
    setMedia(posts[index].media);
    setMediaType(posts[index].mediaType);
    setVisibility(posts[index].visibility);
    setEditIndex(index);
  };

  const handleLike = (index) => {
    setLikes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleComment = (index) => {
    const comment = prompt("Add a comment:");
    if (comment) {
      setComments((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), comment],
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-semibold">Create a Farm Post</h1>
        <button className="text-gray-400 hover:text-gray-600">
          <FaTimes className="text-xl" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/src/assets/images/onion.png"
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">Farmer John</h2>
            <div className="relative">
              <button
                className="flex items-center gap-2 text-sm text-gray-600 border px-3 py-1 mt-1 rounded-lg hover:bg-gray-50"
                onClick={() => setShowVisibilityPopup(!showVisibilityPopup)}
              >
                {visibility === "Anyone can see" ? (
                  <FaGlobeAmericas />
                ) : (
                  <FaUsers />
                )}
                {visibility}
                <FaTimes className="ml-1" />
              </button>

              {showVisibilityPopup && (
                <div className="absolute mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setVisibility("Anyone can see");
                      setShowVisibilityPopup(false);
                    }}
                  >
                    <FaGlobeAmericas />
                    Anyone can see
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setVisibility("Connections only");
                      setShowVisibilityPopup(false);
                    }}
                  >
                    <FaUsers />
                    Connections only
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <textarea
            className="w-full border-0 focus:ring-0 text-lg"
            rows="5"
            placeholder="Share your farming updates, crop status, or agricultural tips..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>

        {media && (
          <div className="mb-6 relative">
            {mediaType === "image" && (
              <img
                src={media}
                alt="Media Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            {mediaType === "video" && (
              <video
                src={media}
                controls
                className="w-full h-48 rounded-lg"
              />
            )}
            {mediaType === "pdf" && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <a
                  href={media}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View PDF
                </a>
              </div>
            )}
            <button
              onClick={handleMediaClear}

              className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full text-xs hover:bg-gray-700"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <button
            className="flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50 border px-3 py-2 rounded-lg"
            onClick={() => handleMediaPicker("image")}
          >
            <FaImage />
            Photo
          </button>
          <button
            className="flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50 border px-3 py-2 rounded-lg"
            onClick={() => handleMediaPicker("video")}
          >
            <FaVideo />
            Video
          </button>
          <button
            className="flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50 border px-3 py-2 rounded-lg"
            onClick={() => handleMediaPicker("pdf")}
          >
            <FaFilePdf />
            PDF
          </button>
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
        <button
          onClick={handleSaveDraft}
          className="text-sm text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg"
        >
          <FaClock className="mr-2" />
          Save as draft
        </button>
        <button
          onClick={handlePost}
          disabled={!postText && !media}
          className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 font-medium rounded-lg disabled:bg-gray-400"
        >
          Post
        </button>
      </div>

      <div className="p-4">
        {posts.map((post, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/onion.png"
                  alt="User Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">Farmer John</h2>
                  <p className="text-sm text-gray-500">
                    {post.visibility === "Anyone can see" ? (
                      <FaGlobeAmericas />
                    ) : (
                      <FaUsers />
                    )}{" "}
                    {post.visibility}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <p className="mt-3">{post.text}</p>

            {post.media && (
              <div className="mt-3">
                {post.mediaType === "image" && (
                  <img
                    src={post.media}
                    alt="Media"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                {post.mediaType === "video" && (
                  <video
                    src={post.media}
                    controls
                    className="w-full h-48 rounded-lg"
                  />
                )}
                {post.mediaType === "pdf" && (
                  <a
                    href={post.media}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => handleLike(index)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
              >
                <FaThumbsUp className={likes[index] ? "text-blue-600" : ""} />
                {likes[index] ? "Liked" : "Like"}
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <FaShare />
                Share
              </button>
              <button
                onClick={() => handleComment(index)}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <FaComment />
                Comment
              </button>
            </div>

            {comments[index] && (
              <div className="mt-4">
                <h3 className="font-semibold">Comments:</h3>
                {comments[index].map((comment, i) => (
                  <p key={i} className="text-sm text-gray-600">
                    {comment}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;



