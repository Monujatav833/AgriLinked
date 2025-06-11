import { useState } from "react";
import {
  FaCheck,
  FaStore,
  FaThumbsUp,
  FaComment,
  FaImage,
  FaSmile,
  FaPoll,
  FaChevronDown,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      avatar: "https://example.com/avatar1.jpg",
      name: "Sarah Johnson",
      role: "Expert",
      roleClass: "bg-green-100 text-green-700",
      time: "2 hours ago",
      text: "The recent rainfall patterns have been quite favorable for wheat cultivation...",
      likes: 24,
      replies: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        avatar: `https://example.com/avatar-reply${i + 1}.jpg`,
        name: `User ${i + 1}`,
        role: "User",
        roleClass: "bg-gray-100 text-gray-700",
        time: `${i + 1} hours ago`,
        text: `This is reply ${i + 1}`,
        likes: 0,
        replies: [],
        image: null,
      })),
      image: null,
    },
    {
      id: 2,
      avatar: "https://example.com/avatar2.jpg",
      name: "Robert Chen",
      role: "Wholesaler",
      roleClass: "bg-yellow-100 text-yellow-700",
      time: "4 hours ago",
      text: "Looking to purchase large quantities of organic tomatoes. Current market price: $2.50/kg 🍅",
      likes: 12,
      replies: [],
      image: "https://example.com/tomatoes.jpg",
    },
  ]);

  const [replyingTo, setReplyingTo] = useState(null);
  const [focusedComment, setFocusedComment] = useState(null); 

  const addComment = (newComment, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === parentId ? { ...c, replies: [...c.replies, newComment] } : c
        )
      );
    } else {
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };

  return (
    <div className="w-2xl mx-auto px-4 py-8 relative">
      {focusedComment ? (

         <ReplySection
          comment={focusedComment}
          onBack={() => setFocusedComment(null)}
          addComment={addComment}
          setReplyingTo={setReplyingTo}
          replyingTo={replyingTo}
        />
      ) : (
        <>
          <Header commentCount={comments.length} />
          <CommunityGuidelines />
          <CommentsList
            comments={comments}
            addComment={addComment}
            setReplyingTo={setReplyingTo}
            setFocusedComment={setFocusedComment}
          />
        </>
      )}
      <CommentInput
        addComment={addComment}
        replyingTo={replyingTo}
        setReplyingTo={setReplyingTo}
        focusedComment={focusedComment}
      />
    </div>
  );
};

const Header = ({ commentCount }) => (
  <div className="flex items-center justify-between mb-6 relative top-0 bg-white py-4 z-10 shadow-md px-4">
    <h2 className="text-xl font-semibold text-gray-900">Comments ({commentCount})</h2>
    <select className="border-gray-200 rounded-lg text-sm p-1">
      <option>Most Recent</option>
      <option>Most Relevant</option>
      <option>Most Liked</option>
      <option>Expert Responses</option>
    </select>
  </div>
);

const CommunityGuidelines = () => (
  <div className="text-center text-gray-600 text-sm mb-4 px-4">
    Please keep discussions respectful and relevant to agricultural topics.{" "}
    <a href="#" className="text-blue-500">See our Community Guidelines.</a>
  </div>
);

const CommentsList = ({ comments, addComment, setReplyingTo, setFocusedComment }) => (
  <div className="space-y-6 mb-10">
    {comments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        addComment={addComment}
        setReplyingTo={setReplyingTo}
        setFocusedComment={setFocusedComment}
      />
    ))}
  </div>
);

const Comment = ({ comment, addComment, setReplyingTo, setFocusedComment }) => {
  const visibleReplies = comment.replies.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-4">
        <AvatarWithBadge avatar={comment.avatar} role={comment.role} />
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold">{comment.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${comment.roleClass}`}>
              {comment.role}
            </span>
            <span className="text-gray-500 text-sm">{comment.time}</span>
          </div>
          <p className="text-gray-700 mb-2 text-justify break-words">{comment.text}</p>
          {comment.image && (
            <img
              src={comment.image}
              alt="Comment"
              className="rounded-lg mt-2 max-w-full h-auto"
            />
          )}
          <ActionButtons
            likes={comment.likes}
            onReply={() => setReplyingTo(comment.id)}
          />
          {comment.replies.length > 0 && (
            <div className="mt-4 ml-2 md:ml-10 border-l-2 border-gray-300 pl-4 space-y-4">
              {visibleReplies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  addComment={addComment}
                  setReplyingTo={setReplyingTo}
                  setFocusedComment={setFocusedComment}
                />
              ))}
              {comment.replies.length > 3 && (
                <button
                  onClick={() => setFocusedComment(comment)}
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  <FaChevronDown className="text-sm" />
                  View more replies ({comment.replies.length - 3})
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReplySection = ({ comment, onBack, addComment, setReplyingTo, replyingTo }) => {
  return (
    <div className="bg-white">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-4"
      >
        <FaArrowLeft />
        Back to comments
      </button>
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex gap-4">
          <AvatarWithBadge avatar={comment.avatar} role={comment.role} />
          <div className="flex-1 overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold">{comment.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${comment.roleClass}`}>
                {comment.role}
              </span>
              <span className="text-gray-500 text-sm">{comment.time}</span>
            </div>
            <p className="text-gray-700 text-justify mb-2 break-words">{comment.text}</p>
            {comment.image && (
              <img
                src={comment.image}
                alt="Comment"
                className="rounded-lg mt-2 max-w-full h-auto"
              />
            )}
            <ActionButtons
              likes={comment.likes}
              onReply={() => setReplyingTo(comment.id)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 ml-4 md:ml-10 border-l border-gray-300 pl-4 space-y-4">
        {comment.replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            addComment={addComment}
            setReplyingTo={setReplyingTo}
            setFocusedComment={() => {}} 
          />
        ))}
      </div>
    </div>
  );
};

const AvatarWithBadge = ({ avatar, role }) => (
  <div className="relative flex-shrink-0">
    <img
      src={avatar}
      className="w-10 h-10 rounded-full object-cover"
      alt="Avatar"
    />
    {role === "Expert" && (
      <FaCheck className="absolute -top-1 -right-1 text-green-600" />
    )}
    {role === "Wholesaler" && (
      <FaStore className="absolute -top-1 -right-1 text-yellow-600" />
    )}
  </div>
);

const ActionButtons = ({ likes, onReply }) => (
  <div className="flex items-center gap-4 md:gap-6 text-sm text-gray-600">
    <button className="flex items-center gap-2 hover:text-blue-500">
      <FaThumbsUp /> {likes} Likes
    </button>
    <button
      onClick={onReply}
      className="flex items-center gap-2 hover:text-blue-500"
    >
      <FaComment /> Reply
    </button>
  </div>
);

const CommentInput = ({ addComment, replyingTo, setReplyingTo, focusedComment }) => {
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState(null);

  const handlePostComment = () => {
    if (!commentText.trim() && !commentImage) return;

    const newComment = {
      id: Date.now(),
      avatar: "https://example.com/avatar-user.jpg",
      name: "You",
      role: "User",
      roleClass: "bg-gray-100 text-gray-700",
      time: "Just now",
      text: commentText,
      likes: 0,
      replies: [],
      image: commentImage,
    };

    addComment(newComment, !!replyingTo, replyingTo || focusedComment?.id);
    setCommentText("");
    setCommentImage(null);
    setReplyingTo(null); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCommentImage(imageUrl);
    }
  };

  return (
    <div className="fixed right-0 bottom-0 w-full bg-white p-4 border-t shadow-md flex gap-4 items-center">
      {commentImage && (
        <img
          src={commentImage}
          alt="Preview"
          className="w-10 h-10 rounded-lg object-cover"
        />
      )}
      <label className="cursor-pointer">
        <FaImage className="text-gray-500 text-2xl" />
        <input type="file" className="hidden" onChange={handleImageChange} />
      </label>
      <FaSmile className="text-gray-500 text-2xl cursor-pointer" />
      <FaPoll className="text-gray-500 text-2xl cursor-pointer" />
      <textarea
        className="w-full border p-2 rounded-lg resize-none"
        placeholder={
          replyingTo || focusedComment
            ? `Replying to ${focusedComment?.name || "comment"}...`
            : "Share your thoughts..."
        }
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={1}
      ></textarea>
      {(replyingTo || focusedComment) && (
        <button
          onClick={() => {
            setReplyingTo(null);
            setFocusedComment(null);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      )}
      <button
        onClick={handlePostComment}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {replyingTo || focusedComment ? "Reply" : "Post"}
      </button>
    </div>
  );
};

export default CommentSection;