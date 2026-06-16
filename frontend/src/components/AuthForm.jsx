
// import React, { useState } from "react";
// import { Mail, Lock, User, Eye, EyeOff, Globe, AlertCircle } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";

// const AuthForm = ({ onClose }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     displayName: '',
//     confirmPassword: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       if (isLogin) {
//         await signIn(formData.email, formData.password);
//         setTimeout(onClose, 200);
//       } else {
//         if (formData.password !== formData.confirmPassword) {
//           throw new Error('Passwords do not match');
//         }
//         await signUp(formData.email, formData.password, formData.displayName);
//         setTimeout(onClose, 200);
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       await signInWithGoogle();
//       setTimeout(onClose, 200);
//     } catch (err) {
//       setError(err.message || 'Google sign-in failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!formData.email) {
//       setError('Please enter your email address');
//       return;
//     }

//     try {
//       await resetPassword(formData.email);
//       setError('');
//       alert('Password reset email sent! Check your inbox.');
//     } catch (err) {
//       setError(err.message || 'Failed to send reset email');
//     }
//   };

//   return (
//     <div className="w-full max-w-xs mx-auto">
//       {/* Header */}
//       <div className="text-center mb-4">
//         <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
//           <User className="w-5 h-5 text-white" />
//         </div>
//         <h1 className="text-lg font-bold text-gray-900 mb-1">
//           {isLogin ? 'Welcome Back' : 'Create Account'}
//         </h1>
//         <p className="text-xs text-gray-600">
//           {isLogin ? 'Sign in to your account' : 'Join us and get started'}
//         </p>
//       </div>

//       {/* Auth Form */}
//       <div className="rounded-xl shadow-lg p-3 bg-transparent">
//         {error && (
//           <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
//             <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
//             <p className="text-xs text-red-700">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-3">
//           {!isLogin && (
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   name="displayName"
//                   value={formData.displayName}
//                   onChange={handleInputChange}
//                   className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
//                   placeholder="Enter your full name"
//                   required={!isLogin}
//                 />
//               </div>
//             </div>
//           )}

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="w-full pl-8 pr-8 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//               </button>
//             </div>
//           </div>

//           {!isLogin && (
//             <div>
//               <label className="block text-xs font-medium text-gray-700 mb-1">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
//                   placeholder="Confirm your password"
//                   required={!isLogin}
//                 />
//               </div>
//             </div>
//           )}

//           {isLogin && (
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 className="text-xs text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 Forgot password?
//               </button>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-2 rounded font-semibold text-xs hover:from-blue-600 hover:to-indigo-700 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
//           </button>
//         </form>

//         <div className="my-3 flex items-center">
//           <div className="flex-1 border-t border-gray-300"></div>
//           <span className="px-2 text-xs text-gray-500">or</span>
//           <div className="flex-1 border-t border-gray-300"></div>
//         </div>

//         <button
//           onClick={handleGoogleSignIn}
//           disabled={loading}
//           className="w-full border border-gray-300 text-gray-700 py-2 px-2 rounded font-semibold text-xs hover:bg-gray-50 focus:ring-1 focus:ring-gray-500 focus:ring-offset-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//         >
//           <Chrome className="w-4 h-4" />
//           Continue with Google
//         </button>

//         <div className="mt-3 text-center">
//           <p className="text-xs text-gray-600">
//             {isLogin ? "Don't have an account?" : 'Already have an account?'}
//             <button
//               type="button"
//               onClick={() => setIsLogin(!isLogin)}
//               className="ml-1 text-blue-600 hover:text-blue-700 font-semibold text-xs"
//             >
//               {isLogin ? 'Sign up' : 'Sign in'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;


import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Globe, AlertCircle } from "lucide-react"; // Fixed missing Chrome icon import
import { useAuth } from "../contexts/AuthContext";

const AuthForm = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Only importing the ones connected to your backend
  const { signIn, signUp } = useAuth(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        setTimeout(onClose, 200);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signUp(formData.email, formData.password, formData.displayName);
        // Toggle to login form after successful registration
        alert("Registration successful! Please sign in.");
        setIsLogin(true); 
      }
    } catch (err) {
      setError(err.message || 'An error occurred connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
          <User className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-bold text-gray-900 mb-1">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-xs text-gray-600">
          {isLogin ? 'Sign in to your account' : 'Join us and get started'}
        </p>
      </div>

      {/* Auth Form */}
      <div className="rounded-xl shadow-lg p-3 bg-white border border-gray-100">
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-8 pr-8 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-2 rounded font-semibold text-xs hover:from-blue-600 hover:to-indigo-700 focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-xs text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-blue-600 hover:text-blue-700 font-semibold text-xs"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;