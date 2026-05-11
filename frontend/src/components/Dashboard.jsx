// import React from 'react';
// import { LogOut, User, Mail, Shield, Settings } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// const Dashboard = () => {
//   const { currentUser, logout } = useAuth();

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error('Failed to logout:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <Shield className="w-5 h-5 text-white" />
//               </div>
//               <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//             >
//               <LogOut className="w-4 h-4" />
//               <span className="hidden sm:inline">Logout</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Welcome Card */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Welcome back, {currentUser?.displayName || 'User'}!
//               </h2>
//               <p className="text-gray-600 mb-6">
//                 You have successfully signed in to your account. This is a protected dashboard that only authenticated users can access.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
//                   <User className="w-8 h-8 mb-3" />
//                   <h3 className="font-semibold text-lg">Profile</h3>
//                   <p className="text-blue-100 text-sm">Manage your account</p>
//                 </div>

//                 <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
//                   <Settings className="w-8 h-8 mb-3" />
//                   <h3 className="font-semibold text-lg">Settings</h3>
//                   <p className="text-green-100 text-sm">Configure preferences</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* User Info Card */}
//           <div className="lg:col-span-1">
//             <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//                     {currentUser?.photoURL ? (
//                       <img
//                         src={currentUser.photoURL}
//                         alt="Profile"
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                     ) : (
//                       <User className="w-6 h-6 text-white" />
//                     )}
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900">
//                       {currentUser?.displayName || 'User'}
//                     </p>
//                     <p className="text-sm text-gray-500">Account holder</p>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 pt-4">
//                   <div className="flex items-center gap-3 mb-3">
//                     <Mail className="w-5 h-5 text-gray-400" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">Email</p>
//                       <p className="text-sm text-gray-600">{currentUser?.email}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <Shield className="w-5 h-5 text-gray-400" />
//                     <div>
//                       <p className="text-sm font-medium text-gray-900">Email Verified</p>
//                       <p className="text-sm text-gray-600">
//                         {currentUser?.emailVerified ? 'Yes' : 'No'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 pt-4">
//                   <p className="text-xs text-gray-500">
//                     Last sign in: {new Date(currentUser?.metadata.lastSignInTime || '').toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow duration-200">
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//               <User className="w-6 h-6 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
//             <p className="text-gray-600 text-sm">Manage user profiles and account settings with ease.</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow duration-200">
//             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
//               <Shield className="w-6 h-6 text-green-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
//             <p className="text-gray-600 text-sm">Advanced security features to protect your account.</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow duration-200">
//             <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
//               <Settings className="w-6 h-6 text-purple-600" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
//             <p className="text-gray-600 text-sm">Customize your experience with flexible settings.</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
