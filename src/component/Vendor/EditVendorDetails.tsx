"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineFileText,
  AiOutlineHome,
  AiOutlineShop,
} from "react-icons/ai";
import { ClipLoader } from "react-spinners";

function EditVendorDetails() {
  const [loading, setLoading] = useState(false);
  const [vendorDetails, setVendorDetails] = useState({
    shopName: "",
    shopAddress: "",
    gstNumber: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVendorDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/vendor/edit-vendor-details",
        vendorDetails,
      );
      if (!response?.data?.success) {
        toast.error(response?.data?.message, {
          position: "bottom-left",
          style: {
            borderRadius: "14px",
            background: "rgba(15, 23, 42, 0.85)",
            color: "#f8fafc",
            border: "1px solid rgba(239, 68, 68, 0.25)", // Subtle red indicator border
            backdropFilter: "blur(12px)",
            padding: "12px 18px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.4)",
          },
          iconTheme: {
            primary: "#ef4444", // Clean red indicator
            secondary: "#ffffff",
          },
        });
        return;
      }
      setLoading(false);
      router.push("/");
      toast.success(response?.data?.message, {
        position: "bottom-left",
        style: {
          borderRadius: "14px",
          background: "rgba(15, 23, 42, 0.85)",
          color: "#f8fafc",
          border: "1px solid rgba(16, 185, 129, 0.25)", // Subtle emerald indicator border
          backdropFilter: "blur(12px)",
          padding: "12px 18px",
          fontSize: "14px",
          fontWeight: "600",
          boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.4)",
        },
        iconTheme: {
          primary: "#10b981", // Emerald success indicator
          secondary: "#ffffff",
        },
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setVendorDetails({
      shopName: "",
      shopAddress: "",
      gstNumber: "",
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-linear-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans overflow-hidden px-4">
      {/* Decorative animated gradient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:2s]"></div>

      {/* Main card wrapper */}
      <div className="relative w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-slate-700/50 z-10 flex flex-col items-center">
        {/* Header */}
        <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent text-center mb-2">
          Complete Your Shop Details
        </h2>
        <p className="text-slate-400 text-sm text-center mb-8 font-light max-w-xs">
          Enter your business information to activate your vendor account
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Shop Name Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Shop Name
            </label>
            <div className="relative">
              <AiOutlineShop
                size={22}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
              <input
                type="text"
                required
                value={vendorDetails.shopName}
                onChange={handleChange}
                placeholder="Enter shop name"
                name="shopName"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Business Address Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Business Address
            </label>
            <div className="relative">
              <AiOutlineHome
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                size={22}
              />
              <input
                type="text"
                required
                value={vendorDetails.shopAddress}
                onChange={handleChange}
                name="shopAddress"
                placeholder="Enter business address"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* GST Number Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              GST Number
            </label>
            <div className="relative">
              <AiOutlineFileText
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                size={22}
              />
              <input
                type="text"
                required
                value={vendorDetails.gstNumber}
                onChange={handleChange}
                name="gstNumber"
                placeholder="Enter GST number"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm tracking-wide rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? <ClipLoader size={18} color="#ffffff" /> : "Submit Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditVendorDetails;
