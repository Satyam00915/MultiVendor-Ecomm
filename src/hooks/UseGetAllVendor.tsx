"use client";
import { AppDispatch } from "@/redux/store";
import { setAllVendorsData } from "@/redux/vendorSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function UseGetAllVendor() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("/api/vendor/getAllVendor");
        if (!response.data.success) {
          return;
        }
        dispatch(setAllVendorsData(response?.data?.Vendors));
      } catch (error) {
        console.log(error);
        dispatch(setAllVendorsData([]));
      }
    }
    getData();
  }, []);
}

export default UseGetAllVendor;
