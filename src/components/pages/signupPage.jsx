import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signupUser } from "../../api/signupApi.js";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaLock,FaSpinner,FaInfoCircle } from "react-icons/fa";
import { toast, Toaster } from "sonner";



const rolesConfig = {  
  farmer: ["fullName", "email", "password", "mobileNumber", "location"],
  broker: ["fullName", "email", "password", "mobileNumber", "location", "adharNumber"],
  buyer: ["fullName", "email", "password", "mobileNumber", "location", "adharNumber", "truckNo", "taxId"],
  wholesaler: ["fullName", "email", "password", "mobileNumber", "location", "marketAddress"],
  others: ["fullName", "email", "password", "mobileNumber", "location",],
};

const roleLabels = {
  fullName: "Full Name",
  email: "Email Id",
  password: "Password",
  mobileNumber: "Mobile Number",
  location: "Location",
  adharNumber: "Adhar Number",
  truckNo: "Truck Number",
  taxId: "Tax ID",
  marketAddress: "Market Address"
};

const roleDescriptions = {
  farmer: "Connect directly with buyers and get fair prices",
  broker: "Facilitate transactions between farmers and buyers",
  buyer: "Purchase fresh produce directly from farmers",
  wholesaler: "Source and distribute agricultural products",
  others: "Join our agricultural network"
};

function SignupPage() {
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("Signing up...");
    try {
      const finalRole = selectedRole === 'others' && formData.customRole ? formData.customRole : selectedRole;
      const result = await signupUser({ ...formData, role: finalRole });
      setMessage(result.message);
      if (result.success) { 
        toast.success("Signup SucessFull");

        login(result.token);
        navigate('/home'); 
      }
    } catch (error) {
      toast.error("Signup Failed. Check your credentials.");
      setMessage("An error occurred during signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" richColors style={{ zIndex: 999 }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <motion.header 
          whileHover={{ scale: 1.02 }}
          className="text-center mb-12 bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-center space-x-3">
            <motion.p 
              className="text-2xl font-light text-gray-800 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              Welcome to 
              <motion.img 
                className="w-12 h-12 ml-3"
                src="/src/assets/images/tomatoLogo.png" 
                alt="Tomato Icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
            </motion.p>
          </div>
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Agri Linked
          </motion.h1>
          <motion.p 
            className="mt-2 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Connecting the agricultural ecosystem
          </motion.p>
        </motion.header>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Select Your <span className="text-red-600">Role</span>
          </h1>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-gray-50 text-lg font-medium text-gray-700">
                I am a...
              </span>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto pb-4">
            <div className="flex space-x-6 px-2">
              {Object.keys(rolesConfig).map(role => (
                <motion.div
                  key={role}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center border-2 rounded-xl p-5 w-48 cursor-pointer transition-all duration-300 shadow-md
                    ${selectedRole === role ? 'bg-gradient-to-br from-red-500 to-red-600 text-white border-red-600' : 'border-gray-200 bg-white'}`}
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="mb-4">
                    <motion.img 
                      className="w-14 h-14 object-contain"
                      src={`/src/assets/images/${role}.png`} 
                      alt={`${role} Icon`}
                      animate={selectedRole === role ? { rotate: [0, 360], scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <motion.button 
                    className={`px-5 py-2 rounded-lg font-medium text-sm
                      ${selectedRole === role ? 'bg-white text-red-600 shadow-md' : 'bg-red-600 text-white'}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </motion.button>
                  <AnimatePresence>
                      <motion.p 
                        className="mt-3 text-xs text-center"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {roleDescriptions[role]}
                      </motion.p>
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="h-10 w-1 bg-red-600 rounded-full mr-3"></div>
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rolesConfig[selectedRole].map((field, index) => (
                <motion.div 
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="space-y-2"
                >
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {roleLabels[field]}
                  </label>
                  <input
                    value={formData[field] || ""}
                    onChange={handleChange}
                    required
                    id={field}
                    name={field}
                    type={
                      field.includes("Number") ? "number" :
                      field==="password" ? "password":
                      "text"
                    }
                    placeholder={`Enter ${roleLabels[field]}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>
              ))}
              {selectedRole === 'others' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + rolesConfig[selectedRole].length * 0.05 }}
                  className="space-y-2"
                >
                  <label htmlFor="customRole" className="block text-sm font-medium text-gray-700">
                    Your Role
                  </label>
                  <input
                    value={formData.customRole || ""}
                    onChange={handleChange}
                    id="customRole"
                    name="customRole"
                    type="text"
                    placeholder="Enter your role"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </motion.div>
              )}
            </div>
          </div>

          <motion.div 
            className="flex flex-wrap items-end gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex-grow">
              <label htmlFor="OTP" className="block text-sm font-medium text-gray-700 mb-2">
                OTP Verification
              </label>
              <div className="relative">
                <input 
                  id="OTP" 
                  type="number" 
                  placeholder="Enter 6-digit OTP" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <motion.button 
              type="button" 
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send OTP
            </motion.button>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="tac" 
                  type="checkbox" 
                  required 
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
              </div>
              <label htmlFor="tac" className="ml-3 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-red-600 hover:underline">Terms of Service</a> and <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            <motion.button 
              type='submit' 
              disabled={isSubmitting}
              className={`w-full py-4 px-6 font-medium rounded-lg shadow-lg transition-all duration-300
                ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transform hover:scale-[1.01]'}`}
              whileHover={!isSubmitting ? { scale: 1.01 } : {}}
              whileTap={!isSubmitting ? { scale: 0.99 } : {}}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Processing...
                </div>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </motion.div>
        </motion.form>
        
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-center justify-center mt-6 p-4 rounded-lg text-center shadow-md
                ${message.includes('success') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
            >
              <FaInfoCircle className='mr-3'/>{message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.footer 
          className="mt-12 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Already have an account?  <button 
                onClick={() => navigate('/login')}
                className="text-red-600 font-medium hover:underline focus:outline-none"
          >
            Sign In              
          </button></p>

          <p className="mt-2">© {new Date().getFullYear()} Agri Linked. All rights reserved.</p>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default SignupPage;