"use client";
import { IProduct } from "@/models/Product";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";

function ProductCard({ product }: { product: IProduct }) {
  const images = product?.images;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const intervalId = setInterval(() => {
      setCurrentImage((p) => (p + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Images Carousel Container */}
      <div className="relative w-full h-52 sm:h-56 bg-slate-950 overflow-hidden flex items-center justify-center p-3">
        {/* Category Pill Tag */}
        {product?.category && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/90 text-indigo-400 border border-indigo-500/20 backdrop-blur-md z-10 shadow-sm">
            {product.category}
          </span>
        )}

        {/* Product Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          {images.length > 0 ? (
            <Image
              src={images[currentImage]}
              alt={product?.title || "Product Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 select-none"
            />
          ) : (
            <div className="flex items-center justify-center text-slate-600 text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Carousel Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-slate-300 hover:text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((p) => (p - 1 < 0 ? images.length - 1 : p - 1));
              }}
            >
              <FaChevronLeft size={10} />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-slate-300 hover:text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md z-10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((p) => (p + 1) % images.length);
              }}
            >
              <FaChevronRight size={10} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentImage === index
                      ? "w-4 bg-indigo-500"
                      : "w-1.5 bg-slate-700/80"
                  }`}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Data Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 text-slate-100">
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-slate-100 line-clamp-1 group-hover:text-indigo-400 transition-colors">
            {product?.title || "Product Title"}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-400 text-xs mt-1.5">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} size={11} />
              ))}
            </div>
            <span className="text-slate-400 text-[11px] font-medium ml-1">
              5.0 (120+)
            </span>
          </div>
        </div>

        {/* Price & Vendor Info */}
        <div className="pt-2 border-t border-slate-800/60 space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-base sm:text-lg font-bold font-mono text-emerald-400">
              ₹{product?.price ?? 0}
            </span>
            <span className="text-[11px] text-slate-400 truncate max-w-[50%] text-right font-medium">
              Sold by:{" "}
              <span className="text-slate-300 font-semibold">
                {product?.vendor?.vendor?.shopName ||
                  product?.vendor?.fullName ||
                  "Verified Seller"}
              </span>
            </span>
          </div>

          {/* Add to Cart CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs tracking-wide rounded-xl shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-3"
          >
            <FaShoppingCart size={13} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
