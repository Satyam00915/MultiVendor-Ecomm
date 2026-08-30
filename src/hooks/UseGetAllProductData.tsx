"use client";
import { AppDispatch } from "@/redux/store";
import { setAllProductsData } from "@/redux/vendorSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function UseGetAllProductData() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    async function req() {
      try {
        const response = await axios.get("/api/vendor/allProduct");
        if (!response.data.success) {
          return;
        }
        dispatch(setAllProductsData(response?.data?.allProducts));
      } catch (error) {
        dispatch(setAllProductsData([]));
        console.log(error);
      }
    }
    req();
  }, [dispatch]);
}

export default UseGetAllProductData;
