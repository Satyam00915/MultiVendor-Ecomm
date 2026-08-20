"use client";

import UseGetAllVendor from "./hooks/UseGetAllVendor";
import UseGetCurrentUser from "./hooks/UseGetCurrentUser";

function InitUser() {
  UseGetCurrentUser();
  UseGetAllVendor();
  return null;
}

export default InitUser;
