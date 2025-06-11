import { useState} from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';  
import LoginPage from '../components/pages/loginPage.jsx';
import SignupPage from '../components/pages/signupPage.jsx';
import ResetPassword from '../components/pages/forgotPassword.jsx';
import Video from '../components/MainApp/Dashboard/Video.jsx';
import {Home} from '../components/MainApp/Dashboard/Home.jsx';
// import {UserProfile} from '../components/MainApp/Dashboard/NewProfile.jsx';
import NotFound from '../components/pages/NotFound.jsx';
import AgriLinkLayout from '../components/MainApp/Dashboard/DashBoard.jsx';
import CreatePost from '../components/MainApp/Dashboard/CreatePost.jsx';
import Messenger from '../components/Messenger/Messenger.jsx';
import Calling from '../components/Messenger/Calling.jsx';
import MediaEditor from '../hooks/MediaEditor.jsx';
import Notification from '../components/MainApp/Dashboard/Notification.jsx';
import FieldMartLayout from '../components/FieldMart/FieldMartLayout.jsx'
import MyListings from '../components/FieldMart/MyListings.jsx';
import FieldMartDashboard from '../components/FieldMart/Dashboard.jsx'
import waitLoading from "../assets/json/waitLoading.json"; 
import Lottie from "lottie-react";
import { LandDetails,PostLand } from '../components/FieldMart/Dashboard.jsx';
import Setting from '../components/MainApp/Dashboard/Setting.jsx';


const AppRouters = () => {
  const { authToken, login } = useAuth();
  const location = useLocation();
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     login(token);
  //   }
  //   setIsAuthLoaded(true);
  // }, [login]);

  // if (!isAuthLoaded) {
  //   return <div className="flex justify-center my-auto items-center"> 
  //       <Lottie animationData={waitLoading} loop={true} style={{ height: 500 }} />
  //   </div>;
  // }

  // const isLoginOrSignupPage = ["/","/login", "/signup", "/resetPassword"].includes(location.pathname);

  // if (!authToken && location.pathname === "/") {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!authToken && !isLoginOrSignupPage) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (authToken && isLoginOrSignupPage) {
  //   return <Navigate to="/home" replace />;
  // }

  return (
    <Routes>
      {authToken ? (
        <>
          <Route element={<AgriLinkLayout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/video" element={<Video />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/settings">
              <Route index element={<Setting />} />
              <Route path=":section" element={<Setting />} />
              <Route path=":section/:subSection" element={<Setting />} />
            </Route>
          </Route>
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/messenger/calling/:type" element={<Calling />} />
          {/* <Route path="/profile/:userId" element={<UserProfile CurrentUserId={1}/>} /> */}
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-media" element={<MediaEditor />} />


          <Route path="/field-mart/" element={<FieldMartLayout />}>
            <Route index element={<Navigate to="Dashboard" replace />} />
            <Route path="Dashboard" element={<FieldMartDashboard />} />
            <Route path="my-listings" element={<MyListings/>} />
            <Route path="post-your-land" element={<PostLand/>} />
            <Route path="view-details" element={<LandDetails/>} />
            {/* <Route path="GovtSchemes" element={<GovtSchemes />} /> */}
          </Route>
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </>
       )}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouters;
