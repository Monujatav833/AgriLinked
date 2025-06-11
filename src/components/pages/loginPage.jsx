import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../api/loginApi.js'; 
import { useAuth } from '../../context/AuthContext';
import { motion, useAnimation } from 'framer-motion';
import { FiMail, FiLock, FiUserPlus, FiAward, FiTrendingUp, FiShield, FiPlay, FiCheck, FiArrowRight } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { FaStar,FaInfoCircle,FaSpinner} from "react-icons/fa";
import { toast, Toaster } from "sonner";
import { useTheme } from '../../context/ThemeContext';

const LoginPage = () => {   
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const controls = useAnimation();
  const videoRef = useRef(null);

  useEffect(() => {
    document.title = "AgriLinked | Login";
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
  }, [controls]);

  const handleCreateAccountClick = () => navigate("/signup");
  const handleForgotPasswordClick = () => navigate("/resetPassword");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const loginData = { email, password };
      const result = await loginUser(loginData);
      
      if (result.success) {
        toast.success("Login Successful");
        login(result.token);
        navigate("/home");
      } else {
        setErrorMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Login Failed. Check your credentials.");
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVideoPlay = () => setIsVideoPlaying(!isVideoPlaying);

  return (
    <div className={`min-h-screen overflow-hidden ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      <Toaster position="top-right" richColors />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0.3,
              scale: 0.5
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              transition: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className={`absolute rounded-full ${
              darkMode ? 'bg-[#2a9d8f]/20' : 'bg-[#2a9d8f]/10'
            }`}
            style={{
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center min-h-screen">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0"
        >
          <div className="max-w-lg mx-auto relative">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center mb-8"
            >
              <motion.img
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 3, repeat: Infinity }
                }}
                className="w-16 h-16 object-contain mr-4"
                src="/src/assets/images/tomatoLogo.png"
                alt="AgriLinked Logo"
              />
              <h1 className={`text-4xl font-bold bg-gradient-to-r from-[#e76f51] to-[#2a9d8f] bg-clip-text text-transparent ${
                darkMode ? 'text-white' : ''
              }`}>
                AgriLinked
              </h1>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-3xl font-bold mb-4 leading-tight ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}
            >
              Connecting <span className={darkMode ? "text-gray-300" : "text-[#071f1c]"}>Farmers</span> with <span className="text-[#e76f51]">Buyers</span> in Real-Time
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-lg leading-relaxed mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              The modern agricultural marketplace that eliminates middlemen and connects producers directly with restaurants, retailers, and consumers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
            >
              {[
                { icon: <FiTrendingUp className="h-6 w-6" />, title: "Market Analytics", desc: "Real-time pricing data", color: "text-[#2a9d8f]" },
                { icon: <FiShield className="h-6 w-6" />, title: "Secure Payments", desc: "Escrow protection", color: "text-[#e76f51]" },
                { icon: <FiAward className="h-6 w-6" />, title: "Verified Partners", desc: "Trusted network", color: "text-[#e9c46a]" },
                { icon: <FiCheck className="h-6 w-6" />, title: "Quality Assurance", desc: "Product verification", color: "text-[#264653]" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: darkMode ? "0 10px 25px -5px rgba(0,0,0,0.3)" : "0 10px 25px -5px rgba(0,0,0,0.05)" }}
                  className={`p-5 rounded-xl flex items-start ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/90 border-gray-100'
                  } border backdrop-blur-sm`}
                >
                  <div className={`p-3 rounded-lg ${feature.color}/10 mr-4 ${
                    darkMode ? 'bg-opacity-20' : ''
                  }`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>{feature.title}</h3>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`p-6 rounded-xl border-l-4 border-[#2a9d8f] shadow-sm ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/90 border-gray-100'
              } backdrop-blur-sm`}
            >
              <div className="flex items-start">
                <img 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                  src="/src/assets/images/farmer-avatar.jpg" 
                  alt="Farmer testimonial"
                />
                <div>
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className={`italic mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>"AgriLinked helped us increase profits by 40% while reducing waste. The direct connections are game-changing."</p>
                  <p className="text-sm font-medium text-[#2a9d8f]">— Rajat Dala, Organic Farmer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 lg:pl-12"
        >
          <div className="relative max-w-md mx-auto">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className={`rounded-2xl shadow-xl overflow-hidden relative ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } border`}
            >
              <div className="bg-gradient-to-r from-[#2a9d8f] to-[#e76f51] p-6 text-center">
                <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                <p className="text-white/90 mt-1">Sign in to your AgriLinked account</p>
              </div>

              <div className="p-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className={`h-5 w-5 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={`block w-full pl-10 pr-3 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f] transition duration-200 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'border border-gray-300'
                        }`}
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={handleForgotPasswordClick}
                        className="text-sm font-medium text-[#e76f51] hover:text-[#e63946] transition duration-200"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className={`h-5 w-5 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className={`block w-full pl-10 pr-3 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-[#2a9d8f] focus:border-[#2a9d8f] transition duration-200 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'border border-gray-300'
                        }`}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </motion.div>

                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-3 rounded-lg flex items-center text-sm ${
                        darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-50 text-red-600'
                      }`}
                    >
                      <FaInfoCircle className="h-4 w-5 mr-2 text-red-500" />
                      {errorMessage}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex justify-center items-center py-3.5 px-4 rounded-lg shadow-sm text-white font-medium bg-gradient-to-r from-[#2a9d8f] to-[#e76f51] hover:from-[#21867a] hover:to-[#d65a46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2a9d8f] transition-all duration-300 ${
                        isLoading ? 'opacity-80 cursor-not-allowed' : ''
                      } ${
                        darkMode ? 'focus:ring-offset-gray-800' : ''
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                          Signing in...
                        </>
                      ) : (
                        'Sign in to AgriLinked'
                      )}
                    </button>
                  </motion.div>
                </form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative my-6"
                >
                  <div className={`absolute inset-0 flex items-center ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className={`px-2 text-sm ${
                      darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
                    }`}>
                      Don't have an account?
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    type="button"
                    onClick={handleCreateAccountClick}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2a9d8f] transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 focus:ring-offset-gray-800' 
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FiUserPlus className="h-5 w-5 text-[#e76f51]" />
                    Create your free account
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className={`mt-8 pt-6 ${
                    darkMode ? 'border-gray-700' : 'border-gray-100'
                  } border-t`}
                >
                  <h3 className={`text-sm font-medium mb-3 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>WHY JOIN AGRILINKED?</h3>
                  <ul className="space-y-2">
                    {[
                      "Direct access to verified buyers/sellers",
                      "Real-time market pricing analytics",
                      "Secure escrow payment protection",
                      "Quality assurance verification"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <FiCheck className="h-4 w-4 text-[#2a9d8f] mr-2" />
                        <span className={`text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Additional Content Section */}
      <div className={`flex flex-col md:flex-row min-h-screen overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        {/* Left Side */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden"
        >
          <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full filter blur-3xl ${
            darkMode ? 'bg-[#e76f51]/20' : 'bg-[#e76f51]/10'
          }`}></div>
          <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl ${
            darkMode ? 'bg-[#2a9d8f]/20' : 'bg-[#2a9d8f]/10'
          }`}></div>
          
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 text-[#e76f51] text-4xl opacity-70"
          >
            🌱
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/3 right-1/4 text-[#2a9d8f] text-4xl opacity-70"
          >
            🍅
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/3 text-[#e9c46a] text-4xl opacity-70"
          >
            🌾
          </motion.div>

          <div className="max-w-md mx-auto relative z-10">
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-2xl shadow-2xl ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/90 border-gray-100'
              } border backdrop-blur-sm`}
            >
              <div className="flex items-center mb-6">
                <img
                  className="w-16 h-16 object-contain mr-4"
                  src="/src/assets/images/tomatoLogo.png"
                  alt="AgriLinked Logo"
                />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#e76f51] to-[#2a9d8f] bg-clip-text text-transparent">
                  AgriLinked
                </h2>
              </div>
              
              <p className={`text-lg leading-relaxed mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                The <span className={`font-semibold ${
                  darkMode ? 'text-[#2a9d8f]' : 'text-[#2a9d8f]'
                }`}>modern marketplace</span> connecting the agricultural supply chain from farm to table.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-[#f8f9fa] border-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <FiTrendingUp className="h-6 w-6 text-[#e76f51]" />
                    <span className={`ml-2 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Market Growth</span>
                  </div>
                  <div className="text-2xl font-bold text-[#2a9d8f] mt-2">+32%</div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-[#f8f9fa] border-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <FiAward className="h-6 w-6 text-[#e76f51]" />
                    <span className={`ml-2 text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Verified Farmers</span>
                  </div>
                  <div className="text-2xl font-bold text-[#2a9d8f] mt-2">5,281+</div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    darkMode ? 'bg-[#2a9d8f]/20' : 'bg-[#2a9d8f]/10'
                  }`}>
                    <FiArrowRight className="h-5 w-5 text-[#2a9d8f]" />
                  </div>
                  <p className={`ml-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}><span className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Real-time pricing</span> with market analytics</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    darkMode ? 'bg-[#e76f51]/20' : 'bg-[#e76f51]/10'
                  }`}>
                    <FiShield className="h-5 w-5 text-[#e76f51]" />
                  </div>
                  <p className={`ml-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}><span className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Secure transactions</span> with escrow protection</p>
                </div>
                
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    darkMode ? 'bg-[#e9c46a]/20' : 'bg-[#e9c46a]/10'
                  }`}>
                    <FiTrendingUp className="h-5 w-5 text-[#e9c46a]" />
                  </div>
                  <p className={`ml-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}><span className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-800'
                  }`}>Direct connections</span> between farmers and buyers</p>
                </div>
              </div>

              <div className={`mt-8 p-4 rounded-xl border-l-4 border-[#2a9d8f] ${
                darkMode ? 'bg-gray-700' : 'bg-[#f8f9fa]'
              }`}>
                <p className={`italic ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>"AgriLinked helped us increase our sales by 40% while reducing middlemen costs."</p>
                <p className="mt-2 text-sm font-medium text-[#2a9d8f]">— Rajat dala, Farmer</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={controls}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden"
        >
          <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full filter blur-3xl ${
            darkMode ? 'bg-[#e76f51]/20' : 'bg-[#e76f51]/10'
          }`}></div>
          <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl ${
            darkMode ? 'bg-[#2a9d8f]/20' : 'bg-[#2a9d8f]/10'
          }`}></div>
          
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 text-5xl opacity-80"
          >
            🌾
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/3 right-1/4 text-5xl opacity-80"
          >
            🍎
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/3 text-5xl opacity-80"
          >
            🚜
          </motion.div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 ${
                darkMode ? 'border-gray-700' : 'border-white/20'
              }`}
            >
              <div className="aspect-w-16 aspect-h-9 bg-black/10">
                <ReactPlayer
                  ref={videoRef}
                  url=""
                  playing={isVideoPlaying}
                  width="100%"
                  height="100%"
                  controls={false}
                  light="" 
                />
              </div>
              <button
                onClick={toggleVideoPlay}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
              >
                {!isVideoPlaying && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 group-hover:bg-[#2a9d8f]' 
                        : 'bg-white/90 group-hover:bg-[#2a9d8f]'
                    }`}
                  >
                    <FiPlay className={`h-10 w-10 ml-1 transition-all duration-300 ${
                      darkMode 
                        ? 'text-white group-hover:text-white' 
                        : 'text-[#2a9d8f] group-hover:text-white'
                    }`} />
                  </motion.div>
                )}
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white font-bold text-lg">AgriLinked Platform Demo</h3>
                <p className="text-white/80 text-sm">See how farmers and buyers connect in real-time</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <motion.div 
                whileHover={{ y: -5, boxShadow: darkMode ? "0 10px 25px -5px rgba(0,0,0,0.3)" : "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className={`p-6 rounded-xl border flex flex-col items-center text-center backdrop-blur-sm ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/90 border-gray-100'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-[#2a9d8f]/20' : 'bg-[#2a9d8f]/10'
                }`}>
                  <FiTrendingUp className="h-8 w-8 text-[#2a9d8f]" />
                </div>
                <h4 className={`font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>Market Analytics</h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Real-time pricing and demand forecasting</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, boxShadow: darkMode ? "0 10px 25px -5px rgba(0,0,0,0.3)" : "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className={`p-6 rounded-xl border flex flex-col items-center text-center backdrop-blur-sm ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/90 border-gray-100'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-[#e76f51]/20' : 'bg-[#e76f51]/10'
                }`}>
                  <FiShield className="h-8 w-8 text-[#e76f51]" />
                </div>
                <h4 className={`font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>Secure Payments</h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Escrow-protected transactions</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, boxShadow: darkMode ? "0 10px 25px -5px rgba(0,0,0,0.3)" : "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                className={`p-6 rounded-xl border flex flex-col items-center text-center backdrop-blur-sm ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/90 border-gray-100'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-[#e9c46a]/20' : 'bg-[#e9c46a]/10'
                }`}>
                  <FiAward className="h-8 w-8 text-[#e9c46a]" />
                </div>
                <h4 className={`font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>Verified Partners</h4>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Trusted network of farmers and buyers</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`p-6 rounded-xl shadow-lg border backdrop-blur-sm ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/90 border-gray-100'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img 
                    className="h-12 w-12 rounded-full object-cover" 
                    src="/src/assets/images/farmer-avatar.jpg" 
                    alt="Farmer testimonial"
                  />
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="mt-2">
                    <p className={`italic ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>"AgriLinked transformed our business. We now sell directly to restaurants at better prices, with guaranteed payments."</p>
                  </blockquote>
                  <div className="mt-3 flex items-center">
                    <span className="text-sm font-medium text-[#2a9d8f]">dhanna moulavi</span>
                    <span className={`mx-1 ${
                      darkMode ? 'text-gray-600' : 'text-gray-400'
                    }`}>•</span>
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>Organic Farmer, Punjab</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;