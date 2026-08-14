"use client";
import React, { useState, useEffect } from "react";
import slide1 from "@/assets/image.jpg";
import slide2 from "@/assets/image2.jpg";
import slide3 from "@/assets/image3.png";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

function Slider() {
  const [current, setCurrent] = useState(2);
  const slides = [
    //Fill the details for slide1 image is of watch
    {
      image: slide1,
      title: "Luxury Watch",
      subtitle: "Exclusive Timepieces",
      description: "Crafted for Elegance, Built for Precision",
      button: "EXPLORE WATCHES",
    },
    // Fill it for slide2 image is Shoes
    {
      image: slide2,
      title: "Premium Footwear",
      subtitle: "Step in Style",
      description: "Designed for Comfort, Styled for Performance",
      button: "SHOP FOOTWEAR",
    },
    // Fill it for slide3 image is Iphone
    {
      image: slide3,
      title: "Next-Gen Smartphone",
      subtitle: "Ultimate Innovation",
      description: "Experience Power and Precision in Your Hands",
      button: "DISCOVER IPHONE",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [slides.length]);
  return (
    <div className="relative w-full h-[65vh] min-h-120 md:h-[75vh] mt-16 overflow-hidden bg-black text-white">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex justify-center"
        >
          <Image
            alt={slides[current].title}
            src={slides[current].image}
            className="object-cover opacity-60 select-none"
            fill
            priority
          />
          {/* Immersive gradient fade to black on the left */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent z-5"></div>

          <div className="absolute inset-0 flex flex-col items-start justify-center px-8 sm:px-16 md:px-24 z-10 max-w-3xl">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs sm:text-sm uppercase tracking-widest text-indigo-400 font-bold mb-2"
            >
              {slides[current].subtitle}
            </motion.h3>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-3 leading-tight bg-linear-to-r from-white via-slate-100 to-slate-350 bg-clip-text text-transparent drop-shadow-sm"
            >
              {slides[current].description}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-slate-350 mb-8 font-medium"
            >
              {slides[current].title}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-300 cursor-pointer text-xs tracking-wider uppercase"
            >
              {slides[current].button}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Seamless Thumbnails Navigation Row */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-20">
        {slides.map((slide, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrent(index)}
            key={index}
            className={`relative w-20 h-12 cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              index === current
                ? "border-white shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-105"
                : "border-zinc-900 bg-black hover:border-indigo-500/40 opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover select-none"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
