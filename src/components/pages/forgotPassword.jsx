import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../assets/images/tomatoLogo.png';
import { FaTimesCircle,FaCheckCircle,FaInfoCircle,FaEnvelope,
  FaLock,FaSyncAlt,FaPaperPlane,FaEye, FaEyeSlash,FaCheck,FaSpinner
} from "react-icons/fa";


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let strength = 0;
    if (newPassword.length > 0) strength += 1;
    if (newPassword.length >= 8) strength += 1;
    if (/[A-Z]/.test(newPassword)) strength += 1;
    if (/[0-9]/.test(newPassword)) strength += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;
    setPasswordStrength(strength);
  }, [newPassword]);

  useEffect(() => {
    let timer;
    if (otpCountdown > 0) {
      timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  const handleSendOtp = () => {
    if (!email) {
      setMessage({ text: 'Please enter your email or mobile number', type: 'error' });
      return;
    }
    
    setOtpSent(true);
    setOtpCountdown(30);
    setMessage({ 
      text: `OTP sent to ${email} (valid for 5 minutes)`, 
      type: 'success' 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    if (passwordStrength < 3) {
      setMessage({ text: 'Please choose a stronger password', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: 'Securely updating your password...', type: 'info' });
    
    setTimeout(() => {
      setMessage({ 
        text: 'Password updated successfully! Redirecting to login...', 
        type: 'success' 
      });
      setIsSubmitting(false);
      setTimeout(() => navigate('/login'), 2000);
    }, 2000);
  };

  const passwordStrengthColors = [
    'bg-red-400',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-red-500',
    'bg-red-600'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-amber-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100">
          
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 sm:p-8 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-200 rounded-full filter blur-3xl"></div>
            </div>
            
            <motion.div 
              className="flex flex-col items-center mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={appLogo} 
                alt="AgriLinked Logo"
                className="h-12 sm:h-14 w-auto mb-3 drop-shadow-md"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">AGRILINKED</h2>
            </motion.div>
            
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2 sm:gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-xl sm:text-2xl"
              >
                🔐
              </motion.span>
              Reset Your Password
              <motion.span
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="text-xl sm:text-2xl"
              >
                🔑
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-red-100 text-opacity-90 text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Secure your AgriLinked account with a new password
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
            <AnimatePresence>
              {message.text && (
                <motion.div
                  key={message.text}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl border ${
                    message.type === 'error' 
                      ? 'bg-red-50 border-red-200 text-red-800' 
                      : message.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-blue-50 border-blue-200 text-blue-800'
                  }`}
                >
                  <div className="flex items-center">
                    {message.type === 'error' ? (
                      <FaTimesCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-600" />
                    ) : message.type === 'success' ? (
                      <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600" />
                    ) : (
                      <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600" />
                    )}
                    <span className="text-sm sm:text-base">{message.text}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email or mobile"
                    className="w-full px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <label htmlFor="otp" className="text-sm sm:text-base font-medium text-gray-700 flex items-center">
                  <FaLock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                    Verification Code
                  </label>
                  {otpSent && otpCountdown > 0 && (
                    <span className="text-xs text-gray-500">
                      Resend in {otpCountdown}s
                    </span>
                  )}
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <input
                    id="otp"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="flex-1 px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    required
                    disabled={!otpSent}
                  />
                  <motion.button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpSent && otpCountdown > 0}
                    className={`px-3 sm:px-5 py-2 sm:py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-200 flex items-center justify-center text-sm sm:text-base ${
                      otpSent && otpCountdown > 0
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                    }`}
                    whileHover={!(otpSent && otpCountdown > 0) ? { scale: 1.03 } : {}}
                    whileTap={!(otpSent && otpCountdown > 0) ? { scale: 0.98 } : {}}
                  >
                    {otpSent ? (
                      otpCountdown > 0 ? (
                        'Sent'
                      ) : (
                        <>
                          <FaSyncAlt className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Resend
                        </>
                      )
                    ) : (
                      <>
                        <FaPaperPlane className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Get OTP
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                 <FaLock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-10 sm:pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-gray-500 hover:text-red-600"
                  >
                    {showPassword ? (
                    <FaEyeSlash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      ) : (
                     <FaEye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    )}
                  </button>
                </div>
                
                {newPassword && (
                  <div className="mt-2 sm:mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength < 2 ? 'text-red-500' : 
                        passwordStrength < 4 ? 'text-yellow-500' : 'text-green-600'
                      }`}>
                        {passwordStrength < 2 ? 'Weak' : 
                         passwordStrength < 4 ? 'Medium' : 'Strong'}
                      </span>
                    </div>
                    <div className="flex gap-1 h-1 sm:h-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                          key={level}
                          className={`flex-1 rounded-full ${
                            level <= passwordStrength 
                              ? passwordStrengthColors[level - 1] 
                              : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500" />
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className="w-full px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-10 sm:pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-gray-500 hover:text-red-600"
                  >
                    {showPassword ? (
                <FaEyeSlash className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                 ) : (
                 <FaEye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                )}
                  </button>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-xl p-3 sm:p-4">
                <h4 className="font-medium text-red-800 flex items-center mb-1 sm:mb-2 text-sm sm:text-base">
                <FaInfoCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-600" />
                  Password Requirements
                </h4>
                <ul className="text-xs sm:text-sm text-red-700 space-y-1">
                  <li className="flex items-start">
                  <FaCheckCircle
                  className={`w-3 h-3 sm:w-4 sm:h-4 mt-0.5 mr-1 sm:mr-2 flex-shrink-0 ${newPassword.length >= 8 ? 'text-green-500' : 'text-red-400'}`}
                  />
                    Minimum 8 characters
                  </li>
                  <li className="flex items-start">
                  <FaCheckCircle
                  className={`w-3 h-3 sm:w-4 sm:h-4 mt-0.5 mr-1 sm:mr-2 flex-shrink-0 ${
                /[A-Z]/.test(newPassword) ? 'text-green-500' : 'text-red-400'
                }`}
               />
                    At least one uppercase letter
                  </li>
                  <li className="flex items-start">
                  <FaCheckCircle
                  className={`w-3 h-3 sm:w-4 sm:h-4 mt-0.5 mr-1 sm:mr-2 flex-shrink-0 ${
                 /[0-9]/.test(newPassword) ? 'text-green-500' : 'text-red-400'
                 }`}
                />
                    At least one number
                  </li>
                </ul>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !otp || !email || !newPassword || !confirmPassword}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-white shadow-lg transition-all duration-300 relative overflow-hidden text-sm sm:text-base ${
                  isSubmitting
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                   <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    Securing Account...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Reset Password</span>
                    <motion.span 
                      className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                    />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 text-center border-t border-red-100 pt-4 sm:pt-6">
            <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">
              Remember your password?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-red-600 font-medium hover:underline focus:outline-none"
              >
                Login to AgrLinked
              </button>
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <p className="text-xs text-gray-400">
                © {new Date().getFullYear()} AgriLinked. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;