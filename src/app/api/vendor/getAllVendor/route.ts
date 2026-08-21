import { auth } from "@/auth";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        {
          message: "User not authenticated",
          success: false,
        },
        {
          status: 401,
        },
      );
    }
    const allVendors = await User.find({ role: "vendor" }).sort({
      createdAt: -1,
    });
    return NextResponse.json(
      {
        success: true,
        Vendors: allVendors,
        message: "Fetched all vendors",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Get Vendors error",
        error,
      },
      {
        status: 500,
      },
    );
  }
};
