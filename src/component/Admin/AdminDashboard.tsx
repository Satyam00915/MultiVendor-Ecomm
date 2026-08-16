"use client";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaBox, FaCheckCircle, FaShoppingBag, FaStore } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Dashboard from "./Dashboard";
import VendorDetails from "./VendorDetails";
import UserOrders from "./UserOrders";
import VendorApproval from "./VendorApproval";
import ProductRequests from "./ProductRequests";

function AdminDashboard() {
  // Admin Dashboard
  const [activePage, setActivePage] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState(false);
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: MdDashboard },
    { id: "vendors", label: "Vendor Details", icon: FaStore },
    { id: "orders", label: "User Orders", icon: FaShoppingBag },
    { id: "vendor-approval", label: "Vendor Approval", icon: FaCheckCircle },
    { id: "product-approval", label: "Product Requests", icon: FaBox },
  ];
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "vendors":
        return <VendorDetails />;
      case "orders":
        return <UserOrders />;
      case "vendor-approval":
        return <VendorApproval />;
      case "product-approval":
        return <ProductRequests />;
      default:
        return null;
    }
  };
  const router = useRouter();
  return (
    <div className="w-full flex min-h-screen pt-16 bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Mobile Tab bar */}
      <div className="lg:hidden fixed top-16 left-0 w-full bg-slate-950/80 backdrop-blur-xl px-6 py-3.5 flex justify-between items-center border-b border-slate-900/60 z-40">
        <h1 className="text-lg font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <button
          className="cursor-pointer text-slate-400 hover:text-white transition-colors p-1"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <AnimatePresence mode="wait">
            {openMenu ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AiOutlineClose size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AiOutlineMenu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Sidebar for large area  */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:block w-72 bg-slate-950/40 border-r border-slate-900/60 p-6 backdrop-blur-2xl"
      >
        <h1 className="text-xl font-extrabold mb-6 tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent border-b border-slate-900/60 pb-4">
          Admin Panel
        </h1>
        <div className="flex flex-col gap-3">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-semibold cursor-pointer border ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-500/20 shadow-lg shadow-indigo-600/10"
                    : "bg-slate-900/10 hover:bg-slate-900/40 border-transparent hover:border-slate-800/60 text-slate-400 hover:text-slate-200"
                }`}
                key={item.id}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Mobile Menu Sidebar  */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:hidden fixed left-0 top-0 w-72 h-full bg-slate-950/95 backdrop-blur-2xl z-50 border-r border-slate-900 shadow-2xl flex flex-col pt-28"
          >
            <div className="px-6 pb-4 mb-4 border-b border-slate-900/60">
              <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Admin Panel
              </h2>
            </div>
            <div className="flex flex-col gap-2.5 px-6 w-full">
              {menu.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    onClick={() => {
                      setActivePage(item.id);
                      setOpenMenu(false);
                    }}
                    className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-semibold cursor-pointer border ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-500/20 shadow-lg shadow-indigo-600/10"
                        : "bg-slate-900/40 border-slate-900/60 text-slate-400 hover:text-slate-200"
                    }`}
                    key={item.id}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Area  */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-10 mt-16 lg:mt-0"
      >
        {renderPage()}
      </motion.div>
    </div>
  );
}

export default AdminDashboard;
