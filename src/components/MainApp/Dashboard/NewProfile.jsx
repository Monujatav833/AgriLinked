import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaCamera, FaEdit, FaTrash, FaRegImage, FaCheckCircle, FaImage, FaShare, FaStar, FaMapMarkerAlt, FaUserPlus, FaComment, FaHeart } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBookmark, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";
import { twMerge } from "tailwind-merge";
import { useTheme } from '../../../context/ThemeContext';

const reviews = [
    {
        id: 1,
        name: "raju farmer",
        date: "3 days ago",
        rating: 2.5,
        review: "Excellent quality produce! The tomatoes were fresh and delicious. Rajat Dalal is very professional and reliable. Will definitely buy again!",
        image: "/src/assets/images/tomato.png"
    },
    {
        id: 2,
        name: "Rajat dalal",
        date: "1 week ago",
        rating: 4,
        review: "Great communication and service. The produce was fresh and delivery was on time. Looking forward to our next order!",
        image: "/src/assets/images/onion.png"
    }
];

function ImageModal({ modalImage, setModalImage, isOwnProfile, handleEditProfile, handleDeleteProfile }) {
    const { darkMode } = useTheme();
    
    return (
        <div className={`fixed top-0 left-0 w-full h-full ${darkMode ? 'bg-black/90' : 'bg-black/80'} flex justify-center items-center z-50`} onClick={() => setModalImage(null)}>
            <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg`} onClick={(e) => e.stopPropagation()}>
                <span 
                    onClick={() => setModalImage(null)} 
                    className={`absolute top-[-10px] right-4 text-3xl cursor-pointer ${darkMode ? 'bg-red-600' : 'bg-red-500'} rounded-full w-9 h-9 flex items-center justify-center`}
                >
                    &times;
                </span>
                <img src={modalImage} alt="Zoomed" className="max-w-[90%] max-h-[100%] rounded-xl ml-5" />
                {isOwnProfile && (
                    <div className="flex justify-around items-center mt-4">
                        <Button icon={<FaEdit />} label="Edit" onClick={handleEditProfile} />
                        <Button icon={<FaCamera />} label="Add photo" />
                        <Button icon={<FaRegImage />} label="Frames" />
                        <Button icon={<FaTrash />} label="Delete" onClick={handleDeleteProfile} />
                    </div>
                )}
            </div>
        </div>
    );
}

const CoverPhoto = ({ coverImage, setModalImage, profileImage, fullName, role, location, reviews, rating, isVerified, isOwnProfile }) => {
    const { darkMode } = useTheme();
    
    return (
        <div className="relative">
            <img
                className="w-full h-40 md:h-80 object-cover"
                src={"/src/assets/images/tomatoLogo.png"}
                alt="Farm Cover Photo"
                onClick={() => setModalImage('/src/assets/images/tomatoLogo.png')}
            />
            
            <div className={`px-4 md:absolute md:bottom-0 md:left-0 md:right-0 md:py-4 ${darkMode ? 'md:bg-gradient-to-t md:from-black/80 md:to-transparent' : 'md:bg-gradient-to-t md:from-black/60 md:to-transparent'}`}>
                <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className={`relative z-10 pointer-events-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-full -mt-16 md:mt-2`}>
                        <img
                            className="h-28 w-28 md:h-40 md:w-40 rounded-full border-4 border-white"
                            src={"/src/assets/images/onion.png"}
                            alt="Profile Picture"
                            onClick={() => setModalImage('/src/assets/images/onion.png')}
                        />
                    </div>

                    <div className="flex-1 w-full lg:mt-16 md:text-white overflow-auto">
                        <div className="flex flex-col space-y-2">
                            <div className="flex flex-row flex-wrap space-x-1 md:items-center space-y-1 md:space-y-0 md:space-x-3">
                                <div className="flex flex-wrap items-center space-x-2">
                                    <h1 className={`text-2xl font-bold text-ellipsis ${darkMode ? 'text-white' : 'text-black lg:text-white'}`}>{fullName} </h1>
                                </div>
                                {isVerified && (
                                    <div className="flex items-center justify-center px-1 space-x-1">
                                        <span>
                                            <FaCheckCircle className="text-blue-400 text-xl" title="Verified" />
                                        </span>
                                        <span className={`px-3 py-1 ${darkMode ? 'bg-gray-700 text-white' : 'bg-black text-white'} text-sm rounded-full w-fit`}>
                                            Verified Farmer
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className='flex text-justify text-xl text-pretty'>
                                <h1 className={`font-extralight ${darkMode ? 'text-white/80' : 'text-black lg:text-white'}`}>
                                    Farmer | soyabean | tomato | onion
                                </h1>
                            </div>
                            
                            <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${darkMode ? 'text-white/80' : 'text-black lg:text-white'}`}>
                                <span className="flex items-center">
                                    <FaStar className="text-yellow-400" />
                                    <span className="ml-1">{rating}</span>
                                </span>
                                <span className="hidden md:inline">•</span>
                                <span>{reviews.length} Reviews</span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center">
                                    <FaMapMarkerAlt className="mr-1" />
                                    <span>{location}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {!isOwnProfile && (
                        <div className="w-full md:w-auto md:ml-auto">
                            <ActionButtons darkMode={darkMode} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatsInfo = ({ className = "" }) => {
    const { darkMode } = useTheme();
    
    return (
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow p-6 ${className}`}>
            <h2 className="text-lg font-semibold mb-4">Stats & Info</h2>
            <div className="space-y-4">
                {[
                    { label: "Posts", value: "1,234" },
                    { label: "Followers", value: "5,678" },
                    { label: "Following", value: "892" },
                    { label: "Products Sold", value: "456" },
                    { label: "Success Rate", value: "98%" },
                ].map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.label}</span>
                        <span className="font-bold">{item.value}</span>
                    </div>
                ))}
            </div>
            <hr className={`my-6 ${darkMode ? 'border-t-4 border-gray-700' : 'border-t-4 border-black/40'}`} />
            <h2 className="text-lg font-semibold mb-4">Business Details</h2>
            <div className="space-y-4">
                {[
                    { label: "Experience", value: "25 years in farming" },
                    { label: "Specialization", value: "Organic Vegetables, Corn, Soybeans" },
                    { label: "Business Hours", value: "Mon-Sat: 7AM - 6PM" },
                    { label: "Contact", value: "+91 (555) 123-4567" },
                ].map((item, index) => (
                    <div key={index}>
                        <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.label}</label>
                        <p className="font-medium">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const About = ({ className = "" }) => {
    const { darkMode } = useTheme();
    
    return (
        <div className={`my-4 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-200'} border-2 rounded-lg shadow p-6 ${className}`}>
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <div className="space-y-4">
               <p className={`text-justify text-ellipsis ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                no information available
               </p>
            </div>
        </div>
    );
};

const Posts = () => {
    const { darkMode } = useTheme();
    
    return (
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow mb-6`}>
            <div className={`p-4 ${darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                <div className="flex space-x-4">
                    {["Posts", "Products", "Reviews"].map((tab, index) => (
                        <button 
                            key={index} 
                            className={`px-4 py-2 font-medium ${tab === "Posts" ? 
                                `${darkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-custom border-b-2 border-custom'}` : 
                                `${darkMode ? 'text-gray-400' : 'text-gray-500'}`}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <h2 className={`text-xl font-semibold mt-3 ${darkMode ? 'text-white' : 'text-black'}`}>Recent Posts</h2>
                <CreatePostButton />
            </div>
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { img: "/src/assets/images/onion.png", text: "Fresh harvest ready for market! 🌾", likes: 234, comments: 45 },
                        { img: "/src/assets/images/tomato.png", text: "New farming technology at work 🚜", likes: 189, comments: 32 },
                    ].map((post, index) => (
                        <div key={index} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} rounded-lg border`}>
                            <img className="w-full h-48 object-cover rounded-t-lg" src={post.img} alt="Farm Post" />
                            <div className="p-4">
                                <p className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{post.text}</p>
                                <div className="mt-2 flex justify-between items-center text-sm">
                                    <div className="flex space-x-4">
                                        <button className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                                            <FaHeart className="mr-2" /> {post.likes}
                                        </button>
                                        <button className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                                            <FaComment className="mr-2" /> {post.comments}
                                        </button>
                                        <button className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                                            <FaShare className="mr-2" /> Share
                                        </button>
                                    </div>
                                    <button className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CreatePostButton = ({ className = "" }) => {
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    
    return (
        <div className={`m-3 ${className}`}>
            <div
                className={`flex items-center justify-between p-2 md:p-4 cursor-pointer ${darkMode ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-gray-100 border-gray-200'} rounded-lg border`}
                onClick={() => navigate("/create-post")}
            >
                <div className="flex items-center space-x-2 md:space-x-4">
                    <img
                        className={`h-8 w-8 md:h-10 md:w-10 rounded-full border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                        src="/src/assets/images/onion.png"
                        alt="Your Profile"
                    />
                    <div className="flex-1">
                        <div className={`p-2 md:p-3 rounded-full text-sm md:text-base ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            What's on your mind, Rajat Dalal?
                        </div>
                    </div>
                </div>
                <button className={`flex items-center ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                    <FaImage className="text-base md:text-lg" />
                </button>
            </div>
        </div>
    );
};

const RatingBar = ({ category, percentage, score }) => {
    const { darkMode } = useTheme();
    
    return (
        <div className={`mt-3 border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'} rounded-lg shadow p-6`}>
            <h2 className="text-xl font-semibold mb-6">Rating & Reviews</h2>
            <div className="flex items-center mb-6">
                <div className={`text-5xl font-bold ${darkMode ? 'text-blue-400' : 'text-custom'}`}>4.5</div>
                <div className="ml-4">
                    <div className="flex items-center text-yellow-400">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalfAlt} />
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>Based on 128 reviews</div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center">
                    <div className={`w-24 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{category}</div>
                    <div className={`flex-1 h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full`}>
                        <div className={`h-2 ${darkMode ? 'bg-blue-400' : 'bg-black'} rounded-full`} style={{ width: "50%" }}></div>
                    </div>
                    <div className={`w-12 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} text-right`}>{score}</div>
                </div>
            </div>
        </div>
    );
};

const RatingStars = ({ rating, className }) => {
    return (
        <div className={twMerge("flex items-center text-yellow-400 my-1", className)}>
            {[...Array(5)].map((_, i) => {
                if (rating >= i + 1) {
                    return <FontAwesomeIcon key={i} icon={faStar} />;
                } else if (rating > i && rating < i + 1) {
                    return <FontAwesomeIcon key={i} icon={faStarHalfAlt} />;
                } else {
                    return <FontAwesomeIcon key={i} icon={faRegStar} />;
                }
            })}
        </div>
    );
};

const ReviewCard = ({ name, date, rating, review, image }) => {
    const { darkMode } = useTheme();
    
    return (
        <div className="flex space-x-4">
            <img className={`w-12 h-12 rounded-full ${darkMode ? 'border-gray-600' : 'border-gray-300'} border`} src={image} alt={name} />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{name}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date}</div>
                </div>
                <RatingStars rating={rating} />
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{review}</p>
            </div>
        </div>
    );
};

const RecentReviews = () => {
    const { darkMode } = useTheme();
    
    return (
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow p-6`}>
            <h2 className="text-xl font-semibold mb-6">Recent Reviews</h2>
            <div className="space-y-6">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} {...review} />
                ))}
            </div>
        </div>
    );
};

function Button({ icon, label, onClick }) {
    const { darkMode } = useTheme();
    
    return (
        <button 
            onClick={onClick} 
            className={`flex flex-col items-center py-2 px-4 text-sm lg:text-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-black hover:bg-gray-800'} text-white border-none rounded-lg gap-2`}
        >
            {icon} {label}
        </button>
    );
}

function ActionButtons({ darkMode }) {
    return (
        <div className="flex space-x-3 pb-4">
            <button className={`flex items-center ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'} text-white px-4 py-2 font-bold rounded-lg`}>
                <FaUserPlus className="mr-2" /> Follow
            </button>
            <button className={`flex items-center ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-100'} px-4 py-2 font-bold rounded-lg`}>
                <FaComment className="mr-2" /> Message
            </button>
        </div>
    );
}

const UserProfile = ({ currentUserId }) => {
    const { darkMode } = useTheme();
    const { userId } = useParams();
    const [viewingUser, setviewingUser] = useState(null);
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        if (userId) {
            // getUserData(userId).then((data) => setviewingUser(data));
            setviewingUser({
                coverImage: "/src/assets/images/onion.jpg",
                profileImage: "/src/assets/images/tomato.jpg",
                fullName: "Rajat Dalal",
                location: "village atara",
                reviews: reviews,
                rating: 4.8,
                isVerified: true
            });
        }
    }, [userId]);

    if (!viewingUser) {
        return <div className={`p-4 ${darkMode ? 'text-white' : 'text-black'}`}>User not found</div>;
    }

    const isOwnProfile = currentUserId === viewingUser._id;

    return (
        <div className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <main className="Lg:max-w-8xl mx-auto lg:px-8">
                <CoverPhoto
                    coverImage={viewingUser.coverImage}
                    setModalImage={setModalImage}
                    profileImage={viewingUser.profileImage}
                    fullName={viewingUser.fullName}
                    location={viewingUser.location}
                    reviews={viewingUser.reviews}
                    rating={viewingUser.rating}
                    isVerified={viewingUser.isVerified}
                    isOwnProfile={isOwnProfile}
                />
                {modalImage && (
                    <ImageModal
                        modalImage={modalImage}
                        setModalImage={setModalImage}
                        isOwnProfile={isOwnProfile}
                        handleEditProfile={() => console.log("Edit Profile Clicked")}
                        handleDeleteProfile={() => console.log("Delete Profile Clicked")}
                    />
                )}

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-0 lg:gap-6">
                    <div className="col-span-1 w-full">
                        <StatsInfo />
                        <RatingBar />
                        <About/>
                    </div>
                    <div className="col-span-3">
                        <Posts />
                        <RecentReviews />
                    </div>
                </div>
            </main>
        </div>
    );
};

export { UserProfile, CoverPhoto, StatsInfo, Posts, CreatePostButton, RatingBar, RatingStars, ReviewCard };