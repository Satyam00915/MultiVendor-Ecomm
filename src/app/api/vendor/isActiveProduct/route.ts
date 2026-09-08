import { auth } from "@/auth";
import connectToDb from "@/lib/connectToDb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { productId, isActive } = await req.json();
    await connectToDb();
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          message: "Unauthorized user",
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          isActive,
        },
      },
      { new: true },
    );

    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
          success: false,
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Status updated",
        success: true,
        product,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Update Active Status error",
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
};
