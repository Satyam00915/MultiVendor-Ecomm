"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";

const ProductCardPage = () => {
  const { AllProductData } = useSelector((state: RootState) => state.vendor);
  const activeProducts = Array.isArray(AllProductData)
    ? AllProductData?.filter(
        (p) => p.verificationStatus === "Approved" && p.isActive,
      )
    : [];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-16 overflow-hidden font-sans">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Explore Verified & Trending Products
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Shop only from approved sellers with guaranteed quality and fast delivery
          </p>
        </div>

        {/* Product Cards Grid */}
        <div>
          {activeProducts.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm border border-slate-900 bg-slate-900/20 backdrop-blur-md rounded-2xl max-w-md mx-auto shadow-xl">
              No products available right now. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {activeProducts.map((product) => (
                <ProductCard key={product._id.toString()} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardPage;
