"use client";
import React from "react";
import Slider from "./Slider";
import CategorySlider from "./CategorySlider";
import ProductCardPage from "./ProductCardPage";

function UserDashboard() {
  return (
    <div className="w-full flex flex-col">
      <Slider />
      <CategorySlider />
      <ProductCardPage />
    </div>
  );
}

export default UserDashboard;
