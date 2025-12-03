import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Mail, LogOut, Home, Calendar, Shield, ArrowLeft } from "lucide-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL ;


  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view profile");
        navigate("/login");
        return;
      }

  
      const decoded = JSON.parse(atob(token.split(".")[1]));
      
      // Fetch user details from backend
      const response = await fetch(`${API_URL}/users/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
      } else {
        
        setProfile({ email: decoded.email });
      }
    } catch (err) {
      console.log("Profile Error:", err);
      

      try {
        const token = localStorage.getItem("token");
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setProfile({ email: decoded.email });
      } catch (e) {
        setError("Please login again");
        toast.error("Session expired. Please login again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("You have been logged out");
    setTimeout(() => navigate("/Login"), 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Shield size={40} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Expired</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition font-semibold w-full"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const getInitials = () => {
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
    }
    return profile?.email?.[0]?.toUpperCase() || "U";
  };

  const getJoinDate = () => {
  
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-white hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header Section  */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-md p-8 rounded-full border-4 border-white/50 shadow-xl">
                  <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {getInitials()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-2">
                  {profile?.firstName && profile?.lastName 
                    ? `${profile.firstName} ${profile.lastName}`
                    : "Welcome"}
                </h1>
                <p className="text-indigo-100 flex items-center justify-center gap-2">
                  <Mail size={16} />
                  {profile?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-indigo-500 p-2 rounded-lg">
                    <User size={20} className="text-white" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Account Type</p>
                </div>
                <p className="text-xl font-bold text-gray-800">Standard User</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Member Since</p>
                </div>
                <p className="text-xl font-bold text-gray-800">{getJoinDate()}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Shield size={20} className="text-white" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Status</p>
                </div>
                <p className="text-xl font-bold text-gray-800">Active</p>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Account Details</h2>
              
              {profile?.firstName && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <p className="text-gray-600 font-medium">First Name</p>
                  <p className="text-gray-800 font-semibold">{profile.firstName}</p>
                </div>
              )}

              {profile?.lastName && (
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <p className="text-gray-600 font-medium">Last Name</p>
                  <p className="text-gray-800 font-semibold">{profile.lastName}</p>
                </div>
              )}

              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <p className="text-gray-600 font-medium">Email Address</p>
                <p className="text-gray-800 font-semibold">{profile?.email}</p>
              </div>

              {profile?._id && (
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">User ID</p>
                  <p className="text-xs font-mono text-gray-600 bg-gray-200 px-3 py-1 rounded">
                    {profile._id}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row mt-8">
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:shadow-lg transition font-semibold flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Back to Home
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:shadow-lg transition font-semibold flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;