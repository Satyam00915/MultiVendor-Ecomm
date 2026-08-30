import { auth } from "@/auth";
import connectToDb from "@/lib/connectToDb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const session = await auth();
    if (!session || !session.user?.id || !session.user.email) {
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

    const allProducts = await Product.find()
      .populate("vendor", "name email vendor.shopName")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Products Fetched",
        success: true,
        allProducts,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Fetch Products Failed",
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
};
