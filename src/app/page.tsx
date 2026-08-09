"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const session = useSession();
  console.log(session.data);
  return <div>{session.data?.user?.fullName}</div>;
};

export default Page;
