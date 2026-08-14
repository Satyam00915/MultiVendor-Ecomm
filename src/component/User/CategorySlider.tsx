"use client";
import React, { useEffect, useState } from "react";
import {
  AiOutlineSkin,
  AiOutlineLaptop,
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineTrophy,
  AiOutlineBook,
  AiOutlineGift,
  AiOutlineCar,
  AiOutlineCoffee,
  AiOutlineCrown,
} from "react-icons/ai";
import { AnimatePresence, motion } from "motion/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";

// Import category background images
import fashionBg from "@/assets/categories/fashion.png";
import electronicsBg from "@/assets/categories/electronics.png";
import homeBg from "@/assets/categories/home.png";
import beautyBg from "@/assets/categories/beauty.png";
import sportsBg from "@/assets/categories/sports.png";
import booksBg from "@/assets/categories/books.png";
import toysBg from "@/assets/categories/toys.png";
import toolsBg from "@/assets/categories/tools.png";
import foodBg from "@/assets/categories/food.png";
import watchesBg from "@/assets/categories/watches.png";

function CategorySlider() {
  const categories = [
    { label: "Fashion & LifeStyle", icon: AiOutlineSkin, image: fashionBg },
    {
      label: "Electronics & Gadjets",
      icon: AiOutlineLaptop,
      image: electronicsBg,
    },
    { label: "Home & Living", icon: AiOutlineHome, image: homeBg },
    { label: "Beauty & Care", icon: AiOutlineHeart, image: beautyBg },
    { label: "Sports & Fitness", icon: AiOutlineTrophy, image: sportsBg },
    { label: "Books & Stationery", icon: AiOutlineBook, image: booksBg },
    { label: "Toys & Hobbies", icon: AiOutlineGift, image: toysBg },
    { label: "Automotive & Tools", icon: AiOutlineCar, image: toolsBg },
    { label: "Food & Groceries", icon: AiOutlineCoffee, image: foodBg },
    { label: "Jewelry & Watches", icon: AiOutlineCrown, image: watchesBg },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Dynamically calculate number of visible cards based on viewport width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(5);
      } else if (width >= 768) {
        setItemsPerPage(3);
      } else if (width >= 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NextSlice = () => {
    setStartIndex((prev) => (prev + itemsPerPage) % categories.length);
  };

  const PrevSlice = () => {
    setStartIndex((prev) =>
      prev - itemsPerPage < 0
        ? categories.length - itemsPerPage
        : prev - itemsPerPage,
    );
  };

  // Re-run timer whenever itemsPerPage changes to avoid closures
  useEffect(() => {
    const intervalId = setInterval(NextSlice, 5000);
    return () => clearInterval(intervalId);
  }, [itemsPerPage, startIndex]);

  // Retrieve items including circular array wrapping
  const getSlicedItems = () => {
    const sliced = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (startIndex + i) % categories.length;
      sliced.push(categories[index]);
    }
    return sliced;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full py-16 bg-slate-950/30 border-y border-slate-900/50 text-white relative overflow-visible"
    >
      <div className="w-full px-4 sm:px-12 relative">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent text-left mb-8 border-b border-slate-900 pb-4">
          Shop By Category
        </h2>

        <div className="relative px-8 sm:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              key={startIndex}
              className={`grid gap-6 w-full ${
                itemsPerPage === 5
                  ? "grid-cols-5"
                  : itemsPerPage === 3
                    ? "grid-cols-3"
                    : itemsPerPage === 2
                      ? "grid-cols-2"
                      : "grid-cols-1"
              }`}
            >
              {getSlicedItems().map((item) => {
                return (
                  <motion.div
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="relative mx-2 bg-slate-900/40 border border-slate-850 rounded-2xl p-6 cursor-pointer text-center flex flex-col items-center justify-center min-h-[170px] shadow-lg overflow-hidden group transition-all duration-300 hover:border-indigo-500/40 hover:shadow-indigo-500/5"
                    key={item.label}
                  >
                    {/* Background Category Image */}
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover opacity-80 transition-transform duration-500 ease-out group-hover:scale-115 select-none pointer-events-none"
                    />
                    {/* Dark overlay mask for legibility */}
                    <div className="absolute inset-0 bg-slate-950/70 group-hover:bg-slate-950/60 transition-colors duration-300 z-5"></div>

                    {/* Floating content */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-center mb-4 group-hover:border-indigo-500/30 group-hover:bg-indigo-950/30 transition-all duration-300">
                        <item.icon className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors duration-200">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Floating Side Controls - Elongated Height */}
          <button
            onClick={PrevSlice}
            className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 z-25 bg-slate-900/40 hover:bg-indigo-950/20 hover:text-indigo-400 border border-slate-850 hover:border-indigo-500/30 backdrop-blur-md text-slate-400 transition-all duration-300 cursor-pointer flex items-center justify-center rounded-l-2xl"
          >
            <FaAngleLeft size={18} />
          </button>
          <button
            onClick={NextSlice}
            className="absolute right-0 top-0 bottom-0 w-8 sm:w-10 z-25 bg-slate-900/40 hover:bg-indigo-950/20 hover:text-indigo-400 border border-slate-850 hover:border-indigo-500/30 backdrop-blur-md text-slate-400 transition-all duration-300 cursor-pointer flex items-center justify-center rounded-r-2xl"
          >
            <FaAngleRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CategorySlider;
