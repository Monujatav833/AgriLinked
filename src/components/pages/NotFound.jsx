import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "/src/assets/json/404ErrorJson.json"; // Ensure the correct path

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex items-center justify-center h-screen w-screen bg-white"
      onClick={() => navigate("/home")} 
    >
      <Lottie animationData={notFoundAnimation} loop={true} className="w-full h-full" />
    </div>
  );
};

export default NotFound;
