"use client";
import { motion } from "motion/react";
import { FaBox, FaCheckCircle, FaShoppingBag, FaStore } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

function AdminDashboard() {
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: MdDashboard },
    { id: "vendors", label: "Vendor Details", icon: FaStore },
    { id: "orders", label: "User Orders", icon: FaShoppingBag },
    { id: "vendor-approval", label: "Vendor Approval", icon: FaCheckCircle },
    { id: "product-approval", label: "Product Requests", icon: FaBox },
  ];
  return (
    <div className="w-full flex min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Sidebar for large area  */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      ></motion.div>
    </div>
  );
}

export default AdminDashboard;
