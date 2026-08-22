import { auth } from "@/auth";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { shopName, shopAddress, gstNumber } = await req.json();
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
        success: false,
      },
      {
        status: 401,
      },
    );
  }

  try {
    await connectToDb();
    const user = await User.findByIdAndUpdate(
      session?.user?.id,
      {
        $set: {
          "vendor.shopName": shopName,
          "vendor.shopAddress": shopAddress,
          "vendor.gstNumber": gstNumber,
          "vendor.verificationStatus": "Pending",
          "vendor.requestedAt": new Date(),
        },
      },
      {
        new: true,
      },
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Details Updated Successfully",
        user,
        success: true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Update Vendor Details Error",
        error,
        success: false,
      },
      {
        status: 500,
      },
    );
  }
};
