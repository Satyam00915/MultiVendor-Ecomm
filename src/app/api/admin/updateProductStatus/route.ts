import { auth } from "@/auth";
import connectToDb from "@/lib/connectToDb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { productId, approvalStatus, rejectedReason } = await req.json();
  try {
    await connectToDb();
    const session = await auth();

    if (!session || !session?.user || session?.user?.role !== "admin") {
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

    if (!productId) {
      return NextResponse.json(
        {
          message: "Product Id missing",
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    if (approvalStatus === "Approved") {
      await Product.findByIdAndUpdate(productId, {
        $set: {
          verificationStatus: approvalStatus,
          approvedAt: new Date(),
        },
      });
    } else if (approvalStatus === "Rejected") {
      await Product.findByIdAndUpdate(productId, {
        $set: {
          verificationStatus: approvalStatus,
          rejectedReason,
        },
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
        success: false,
        message: "Product Status update error",
        error,
      },
      {
        status: 500,
      },
    );
  }
};
