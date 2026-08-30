"use client";

import UseGetAllProductData from "./hooks/UseGetAllProductData";
import UseGetAllVendor from "./hooks/UseGetAllVendor";
import UseGetCurrentUser from "./hooks/UseGetCurrentUser";

function InitUser() {
  UseGetCurrentUser();
  UseGetAllVendor();
  UseGetAllProductData();
  return null;
}

export default InitUser;
