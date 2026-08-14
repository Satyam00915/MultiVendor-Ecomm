import React from "react";
import Slider from "./Slider";
import CategorySlider from "./CategorySlider";

function UserDashboard() {
  return (
    <div className="w-full flex flex-col">
      <Slider />
      <CategorySlider />
    </div>
  );
}

export default UserDashboard;
