"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
  AiOutlineUser,
  AiOutlineClose,
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineHome,
  AiOutlineFile,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import userIcon from "@/assets/user.png";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function Profile() {
  const user = useSelector((state: RootState) => state.user.userData);
  const router = useRouter();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditShop, setShowEditShop] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.image || userIcon);
  const [profileDetails, setProfileDetails] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    profileImage: user?.image || "",
  });
  const [shopDetails, setShopDetails] = useState({
    shopName: user?.vendor?.shopName || "",
    shopAddress: user?.vendor?.shopAddress || "",
    gstNumber: user?.vendor?.gstNumber || "",
  });
  const [loading, setLoading] = useState(false);

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileDetails((p) => ({
      ...p,
      profileImage: URL.createObjectURL(file),
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileDetails((p) => ({ ...p, [name]: value }));
  };

  const handleShopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopDetails((p) => ({ ...p, [name]: value }));
  };

  const handleUpdateShop = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/vendor/edit-vendor-details",
        shopDetails,
      );
      if (!response?.data?.success) {
        toast.error(response?.data?.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setShowEditShop(false);
      router.push("/");
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-linear-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans overflow-hidden px-4 pt-24 pb-12">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Profile Card Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center z-10"
      >
        {/* Avatar Image Wrapper */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/20 bg-slate-950 flex items-center justify-center shadow-lg shadow-indigo-650/5 select-none"
        >
          {user?.image ? (
            <Image
              loading="eager"
              src={user?.image}
              alt="Profile Image"
              width={120}
              height={120}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-slate-950">
              <AiOutlineUser size={44} className="text-slate-500" />
            </div>
          )}
        </motion.div>

        {/* Profile Head details */}
        <div className="text-center mt-6">
          <h2 className="text-2xl sm:text-3xl text-white font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {user?.fullName}
          </h2>
          <p className="text-slate-450 text-sm mt-1 mb-3.5 font-light">
            {user?.email}
          </p>
          <span
            className={`inline-block text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full border ${
              user?.role === "admin"
                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                : user?.role === "vendor"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-pink-500/10 text-pink-400 border-pink-500/20"
            }`}
          >
            {user?.role}
          </span>
        </div>

        {/* Dynamic Key-Value Information list */}
        <div className="w-full mt-8 space-y-4 text-sm border-t border-b border-slate-900/60 py-6 text-slate-300">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Phone</span>
            <span className="text-slate-100 font-semibold font-mono">
              {user?.phone || "-"}
            </span>
          </div>
          {user?.role === "vendor" && (
            <>
              <div className="flex justify-between items-center py-1.5 border-t border-slate-950/60">
                <span className="text-slate-400 font-medium">Shop Name</span>
                <span className="text-slate-100 font-semibold">
                  {user?.vendor?.shopName || "-"}
                </span>
              </div>
              <div className="flex justify-between items-start py-1.5 border-t border-slate-950/60">
                <span className="text-slate-400 font-medium pt-0.5">
                  Shop Address
                </span>
                <span className="text-slate-100 font-semibold text-right max-w-[65%]">
                  {user?.vendor?.shopAddress || "-"}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-t border-slate-950/60">
                <span className="text-slate-400 font-medium">GSTIN</span>
                <span className="text-slate-100 font-semibold uppercase font-mono text-xs px-2.5 py-1 rounded bg-slate-950/60 border border-slate-950/80">
                  {user?.vendor?.gstNumber || "-"}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="w-full grid grid-cols-1 gap-3.5 mt-8">
          {user?.role === "user" && (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push("orders")}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-semibold text-sm tracking-wide rounded-xl shadow-lg shadow-emerald-600/10 transition-all duration-300 cursor-pointer text-center"
            >
              My Orders
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              setProfileDetails({
                fullName: user?.fullName || "",
                phone: user?.phone || "",
                profileImage: user?.image || "",
              });

              setPreviewImage(user?.image || userIcon);
              setShowEditProfile(true);
              setShowEditShop(false);
            }}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm tracking-wide rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-300 cursor-pointer text-center"
          >
            Edit Profile
          </motion.button>
          {user?.role === "vendor" && (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                setShopDetails({
                  shopName: user?.vendor?.shopName || "",
                  shopAddress: user?.vendor?.shopAddress || "",
                  gstNumber: user?.vendor?.gstNumber || "",
                });

                setShowEditShop(true);
                setShowEditProfile(false);
              }}
              className="w-full py-3.5 bg-slate-950/60 hover:bg-slate-900 hover:text-white border border-slate-900 text-slate-400 font-semibold text-sm tracking-wide rounded-xl transition-all duration-300 cursor-pointer text-center"
            >
              Edit Shop Details
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Edit Profile Modal Dialog */}
      <AnimatePresence>
        {showEditProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowEditProfile(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-950/50"
              >
                <AiOutlineClose size={20} />
              </button>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent text-left mb-6 border-b border-slate-950 pb-4">
                Edit Profile
              </h3>

              <div className="flex flex-col items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-indigo-500/30 bg-slate-950 flex items-center justify-center shadow-lg"
                >
                  <Image
                    src={previewImage}
                    width={120}
                    height={120}
                    alt="Select Image"
                    className="object-cover w-full h-full"
                  />
                </motion.div>
                <label className="px-4 py-2 mt-1 bg-slate-950/65 hover:bg-slate-900 text-slate-350 hover:text-white border border-slate-900 text-xs font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-md">
                  Select Image
                  <input
                    onChange={handlePreviewImage}
                    hidden
                    type="file"
                    accept="image/*"
                  />
                </label>
              </div>

              <div className="w-full mt-6 space-y-4">
                {/* Full Name field */}
                <div className="space-y-2 text-left">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>
                  <div className="relative">
                    <AiOutlineUser
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                    <input
                      type="text"
                      name="fullName"
                      onChange={handleChange}
                      value={profileDetails.fullName}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/40 border border-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Phone field */}
                <div className="space-y-2 text-left">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Phone Number
                  </label>
                  <div className="relative">
                    <AiOutlinePhone
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                    <input
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      value={profileDetails.phone}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/40 border border-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <button className="w-full py-3.5 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm tracking-wide rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                  Update Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Shop Details Modal Dialog */}
      <AnimatePresence>
        {showEditShop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowEditShop(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-950/50"
              >
                <AiOutlineClose size={20} />
              </button>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent text-left mb-6 border-b border-slate-950 pb-4">
                Edit Shop Details
              </h3>

              <div className="w-full mt-6 space-y-4">
                {/* Shop Name field */}
                <div className="space-y-2 text-left">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Shop Name
                  </label>
                  <div className="relative">
                    <AiOutlineShop
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                    <input
                      type="text"
                      name="shopName"
                      onChange={handleShopChange}
                      value={shopDetails.shopName}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/40 border border-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Shop Address */}
                <div className="space-y-2 text-left">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Shop Address
                  </label>
                  <div className="relative">
                    <AiOutlineHome
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                    <input
                      type="text"
                      name="shopAddress"
                      onChange={handleShopChange}
                      value={shopDetails.shopAddress}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/40 border border-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* GSTIN  */}
                <div className="space-y-2 text-left">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    GSTIN
                  </label>
                  <div className="relative">
                    <AiOutlineFile
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                    <input
                      type="text"
                      name="gstNumber"
                      onChange={handleShopChange}
                      value={shopDetails.gstNumber}
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/40 border border-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  onClick={handleUpdateShop}
                  className="w-full py-3.5 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm tracking-wide rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {loading ? (
                    <ClipLoader size={20} color="white" />
                  ) : (
                    "Update Shop Details"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;
