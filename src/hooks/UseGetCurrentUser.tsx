"use client";
import { AppDispatch } from "@/redux/store";
import { setUserData } from "@/redux/userSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function UseGetCurrentUser() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("/api/user/currentUser");
        if (!response?.data?.success) {
          return;
        }
        dispatch(setUserData(response?.data?.user));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));
      }
    }
    getUser();
  }, []);
}

export default UseGetCurrentUser;
