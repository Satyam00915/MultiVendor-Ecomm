"use client";
import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

function VendorProducts() {
  const router = useRouter();
  return (
    <div className="w-full text-white">
      {/* Header  */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-900 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          My Products
        </h1>

        <motion.button
          onClick={() => router.push("/addVendorProduct")}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-300 cursor-pointer flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          + Add Product
        </motion.button>
      </div>
    </div>
  );
}

export default VendorProducts;
