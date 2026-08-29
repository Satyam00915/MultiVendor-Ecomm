"use client";
import React from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

function VendorProducts() {
  const router = useRouter();
  return (
    <div className="w-full text-white">
      {/* Header  */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">My Products</h1>

        <motion.button
          onClick={() => router.push("/addVendorProduct")}
          className="bg-blue-900/80 p-2 cursor-pointer rounded-lg hover:bg-blue-900"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          + Add Product
        </motion.button>
      </div>
    </div>
  );
}

export default VendorProducts;
