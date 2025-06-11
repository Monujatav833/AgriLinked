import React, { useState, useEffect } from 'react'; 
import { FaStar, FaRegStar, FaTrash, FaRegImage, FaEdit, FaCamera, FaRegCommentDots, FaLink } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import getUserData from '../../../api/getUserData';

function Profile({ currentUserId }) {
  // const { userId } = useParams();
  // const [viewingUser, setViewingUser] = useState(null);
  // const [modalImage, setModalImage] = useState(null);
  // const [rating, setRating] = useState(false);

  // useEffect(() => {
  //   if (userId) {
  //     getUserData(userId).then((data) => setViewingUser(data));
  //   }
  // }, [userId]);

  // if (!viewingUser) {
  //   return <div>User not found</div>;
  // }

  // const isOwnProfile = currentUserId === viewingUser._id;

  return (
    <div className="flex justify-center items-center flex-wrap overflow-hidden">
      <div className="w-full max-w-[700px] rounded-lg flex flex-col gap-4">
        {/* <CoverImage 
          coverImage={viewingUser.coverImage} 
          setModalImage={setModalImage} 
          profileImage={viewingUser.profileImage} 
          fullName={viewingUser.fullName} 
          location={viewingUser.location} 
          connections={viewingUser.connections}
        /> */}
        
        {/* {modalImage && (
          <ImageModal 
            modalImage={modalImage} 
            setModalImage={setModalImage} 
            isOwnProfile={isOwnProfile} 
            handleEditProfile={() => console.log("Edit Profile Clicked")} 
            handleDeleteProfile={() => console.log("Delete Profile Clicked")}
          />
        )} */}

        {/* {!isOwnProfile && <ActionButtons />} */}

        <RatingSection rating={viewingUser.rating} setRating={setRating} />
        <AboutSection about={viewingUser.about} />
      </div>
    </div>
  );
}

// function CoverImage({ coverImage, setModalImage, profileImage, fullName, location, connections }) {
//   return (
//     <div className="relative w-full">
//       <img 
//         src={coverImage || '/path/to/default-cover.jpg'} 
//         alt="backprofile" 
//         className="absolute w-full h-[120px] object-cover"
//         onClick={() => setModalImage(coverImage)}
//       />
//       <div className="relative ml-4">
//         <img 
//           src={profileImage || '/path/to/default-profile.jpg'} 
//           alt="profile-img" 
//           className="relative w-[120px] rounded-full mt-[60px] border-2 border-wheat bg-white"
//           onClick={() => setModalImage(profileImage)}
//         />
//         <h2 className="text-lg font-bold">{fullName}</h2>
//         <p className="text-gray-500 mt-1">{location || "Location not available"}</p>
//         <p className="text-blue-700 font-semibold">{connections || "0"} Connections</p>
//       </div>
//     </div>
//   );
// }

// function ImageModal({ modalImage, setModalImage, isOwnProfile, handleEditProfile, handleDeleteProfile }) {
//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50" onClick={() => setModalImage(null)}>
//       <div className="relative bg-white p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
//         <span onClick={() => setModalImage(null)} className="absolute top-[-10px] right-4 text-3xl text-white cursor-pointer bg-red-500 rounded-full w-9 h-9 flex items-center justify-center">&times;</span>
//         <img src={modalImage} alt="Zoomed" className="max-w-[90%] max-h-[100%] rounded-xl ml-5" />
//         {isOwnProfile && (
//           <div className="flex justify-around items-center mt-4">
//             <Button icon={<FaEdit />} label="Edit" onClick={handleEditProfile} />
//             <Button icon={<FaCamera />} label="Add photo" />
//             <Button icon={<FaRegImage />} label="Frames" />
//             <Button icon={<FaTrash />} label="Delete" onClick={handleDeleteProfile} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Button({ icon, label, onClick }) {
//   return (
//     <button onClick={onClick} className="flex flex-col items-center py-2 px-4 text-lg text-white bg-black border-none rounded-lg gap-2">
//       {icon} {label}
//     </button>
//   );
// }

function ActionButtons() {
  return (
    <div className="flex justify-around items-center gap-8 py-4">
      <ActionButton icon={<FaRegCommentDots />} label="Message" />
      <ActionButton icon={<FaLink />} label="Connect" />
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="flex items-center justify-center text-lg border-2 border-blue-600 text-blue-600 rounded-lg w-[200px] gap-2 py-2">
      {icon} {label}
    </button>
  );
}

function RatingSection({ rating, setRating }) {
  return (
    <div className="flex justify-between items-center py-4 px-6">
      <p className="flex">
        {[...Array(rating)].map((_, index) => (
          <FaStar key={index} className="text-gold text-xl mr-5" />
        ))}
        {[...Array(5 - rating)].map((_, index) => (
          <FaRegStar key={index} className="text-gray-300 text-xl" />
        ))}
      </p>
      <button onClick={() => setRating(!rating)} className="bg-blue-700 text-white py-2 px-4 rounded-lg cursor-pointer">
        See rating...
      </button>
    </div>
  );
}

function AboutSection({ about }) {
  return (
    <div className="min-w-full flex flex-col relative overflow-auto">
      <h3 className="ml-4 mb-2 text-lg font-semibold">About</h3>
      <p className="ml-4 text-sm text-gray-700 max-h-[100px] overflow-auto text-justify pr-2">{about || "No information available."}</p>
    </div>
  );
}

export default Profile;
