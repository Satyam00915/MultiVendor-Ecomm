"use client";
import { IUser } from "@/models/User";
import { useRouter } from "next/navigation";

function Footer({ user }: { user: IUser }) {
  const role = user?.role;
  const isUser = role === "user";
  const isAdminOrVendor = role === "admin" || role === "vendor";
  const router = useRouter();

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 py-16 relative overflow-hidden z-40">
      {/* Subtle bottom gradient shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-black pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div
          className={`grid gap-12 text-left ${
            isUser 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {/* Brand info column */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Multicart
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Smart, Secure & Scalable multi-vendor Ecommerce platform built for
              performance and growth.
            </p>
            {isAdminOrVendor && (
              <span
                className={`inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${
                  role === "admin"
                    ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                }`}
              >
                {role === "admin" ? "Admin Panel" : "Vendor Panel"}
              </span>
            )}
          </div>

          {/* User Specific Columns */}
          {isUser && (
            <div>
              <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-5">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li
                  onClick={() => router.push("/")}
                  className="cursor-pointer hover:text-indigo-400 transition-colors duration-200 w-fit"
                >
                  Home
                </li>
                <li
                  onClick={() => router.push("/category")}
                  className="cursor-pointer hover:text-indigo-400 transition-colors duration-200 w-fit"
                >
                  Categories
                </li>
                <li
                  onClick={() => router.push("/shops")}
                  className="cursor-pointer hover:text-indigo-400 transition-colors duration-200 w-fit"
                >
                  Shops
                </li>
              </ul>
            </div>
          )}

          {isUser && (
            <div>
              <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-5">
                Help & Support
              </h3>
              <ul className="space-y-3 text-sm">
                <li
                  onClick={() => router.push("/support")}
                  className="cursor-pointer hover:text-indigo-400 transition-colors duration-200 w-fit"
                >
                  Support
                </li>
                <li
                  onClick={() => router.push("/track-orders")}
                  className="cursor-pointer hover:text-indigo-400 transition-colors duration-200 w-fit"
                >
                  Track-Orders
                </li>
              </ul>
            </div>
          )}

          {/* Admin/Vendor Specific Panel Column */}
          {isAdminOrVendor && (
            <div className="bg-slate-900/20 rounded-2xl p-6 border border-slate-900 hover:border-slate-800 transition-all duration-300">
              <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-4">
                {role === "admin" ? "System Access" : "Vendor Dashboard"}
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                {role === "admin" ? (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      Platform Management
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      Vendor Control
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      Orders & Revenue
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      System Security
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Product Upload & Edit
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Order & Delivery Tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Sales & Profit Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Wallet & Settlement
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}

          {/* Contact column */}
          <div>
            <h3 className="text-white text-xs uppercase tracking-widest font-bold mb-5">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>admin@multikart.com</li>
              <li>+91 98765 43210</li>
              <li>New Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright block */}
        <div className="border-t border-slate-900/80 mt-16 pt-8 text-center text-xs tracking-widest text-slate-500 uppercase">
          {new Date().getFullYear()} Powered by Multicart Secure Commerce Platform
        </div>
      </div>
    </footer>
  );
}

export default Footer;
