import { auth } from "@/auth";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { approvalStatus, vendorId, rejectedReason } = await req.json();
  if (!approvalStatus || !vendorId) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing Fields",
      },
      {
        status: 404,
      },
    );
  }

  try {
    await connectToDb();
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        {
          message: "Unauthorized User",
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    if (approvalStatus === "Approved") {
      await User.findByIdAndUpdate(vendorId, {
        $set: {
          "vendor.isApproved": true,
          "vendor.verificationStatus": "Approved",
          "vendor.approvedAt": new Date(),
        },
      });
    } else if (approvalStatus === "Rejected") {
      await User.findByIdAndUpdate(vendorId, {
        isApproved: false,
        verificationStatus: "Rejected",
        rejectedReason,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Status Updated",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Vendor Status Update Error",
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
};
