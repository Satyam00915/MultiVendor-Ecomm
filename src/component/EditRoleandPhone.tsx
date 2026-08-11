"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function EditRoleandPhone() {
  const [roleSet, setRoleSet] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [adminExists, setAdminExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const roles = [
    {
      label: "Admin",
      value: "admin",
      color: "indigo",
      path: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      label: "Vendor",
      value: "vendor",
      color: "emerald",
      path: "M16 11V7a4 4 0 00-8 0v4M5  9h14l1 12H4L5 9z",
    },
    {
      label: "User",
      value: "user",
      color: "pink",
      path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    },
  ];

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!roleSet || !phone) {
      toast.error("Admin Already Exists!", {
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
    setLoading(true);
    try {
      const res = await axios.post("/api/user/edit-role-phone", {
        role: roleSet,
        phone,
      });
      console.log(res.data);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get("/api/admin/check-admin");
        setAdminExists(res.data.status);
      } catch (error) {
        console.log(error);
        setAdminExists(false);
      }
    };
    checkAdmin();
  }, []);
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-linear-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans overflow-hidden px-4">
      {/* Decorative animated gradient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-delay:2s]"></div>

      {/* Main card wrapper */}
      <div className="relative w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-slate-700/50 z-10 flex flex-col items-center">
        {/* Header */}
        <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent text-center mb-2">
          Choose Your Role
        </h2>
        <p className="text-slate-400 text-sm text-center mb-8 font-light max-w-xs">
          Select your role and enter your mobile number to continue
        </p>

        {/* Mobile Number Input Section */}
        <form onSubmit={handleEdit} className="w-full mb-8">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            maxLength={10}
            required
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            placeholder="Enter Mobile Number"
            className="w-full px-4 py-3.5 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
          />
        </form>

        {/* Roles Grid Selection Section */}
        <div className="w-full">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Select Role
          </label>
          <div className="grid grid-cols-3 gap-4">
            {/* Admin Option */}
            {roles.map((role) => {
              const isSelected = roleSet === role.value;
              const isAdminBlocked = role.value === "admin" && adminExists;
              return (
                <button
                  type="button"
                  onClick={() => {
                    if (isAdminBlocked) {
                      toast.error("Admin Already Exists!", {
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
                    setRoleSet(role.value);
                  }}
                  key={role.value}
                  className={`relative overflow-hidden group flex flex-col items-center justify-center py-6 px-4 rounded-2xl transition-all duration-300 shadow-md border ${
                    isSelected
                      ? role.value === "admin"
                        ? "border-indigo-500 bg-indigo-950/20 text-white"
                        : role.value === "vendor"
                          ? "border-emerald-500 bg-emerald-950/20 text-white"
                          : "border-pink-500 bg-pink-950/20 text-white"
                      : role.value === "admin"
                        ? "border-slate-800/80 bg-slate-950/40 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-900/50"
                        : role.value === "vendor"
                          ? "border-slate-800/80 bg-slate-950/40 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-900/50"
                          : "border-slate-800/80 bg-slate-950/40 text-slate-300 hover:border-pink-500/50 hover:bg-slate-900/50"
                  } ${isAdminBlocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:-translate-y-1"}`}
                >
                  <div
                    className={`absolute inset-0 bg-linear-to-b transition-opacity duration-300 ${
                      role.value === "admin"
                        ? "from-indigo-500/0 to-indigo-500/5"
                        : role.value === "vendor"
                          ? "from-emerald-500/0 to-emerald-500/5"
                          : "from-pink-500/0 to-pink-500/5"
                    } ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  ></div>

                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-3 transition-all duration-300 ${
                      isSelected
                        ? role.value === "admin"
                          ? "border-indigo-500/50 bg-indigo-950/40"
                          : role.value === "vendor"
                            ? "border-emerald-500/50 bg-emerald-950/40"
                            : "border-pink-500/50 bg-pink-950/40"
                        : role.value === "admin"
                          ? "border-slate-800 bg-slate-900/80 group-hover:border-indigo-500/30 group-hover:bg-indigo-950/30"
                          : role.value === "vendor"
                            ? "border-slate-800 bg-slate-900/80 group-hover:border-emerald-500/30 group-hover:bg-emerald-950/30"
                            : "border-slate-800 bg-slate-900/80 group-hover:border-pink-500/30 group-hover:bg-pink-950/30"
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 text-${role.color}-400 group-hover:scale-110 transition-transform duration-300`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={role.path}
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
                    {role.label}
                  </span>
                </button>
              );
            })}

            <button
              type="submit"
              onClick={handleEdit}
              className="col-span-3 w-full py-4 mt-6 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm tracking-wide rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <ClipLoader size={18} color="#ffffff" />
              ) : (
                "Submit Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRoleandPhone;
