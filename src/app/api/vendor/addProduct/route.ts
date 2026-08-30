import { auth } from "@/auth";
import { uploadFile } from "@/lib/cloudinary";
import connectToDb from "@/lib/connectToDb";
import Product from "@/models/Product";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    await connectToDb();
    const session = await auth();
    if (!session || !session?.user?.id || !session.user?.email) {
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

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const category = formData.get("category") as string;
    const replacementDays = Number(formData.get("replacementDays") || 0);
    const warranty = formData.get("warranty") || "No Warranty";
    const isWearable = formData.get("isWearable") === "true";
    const sizes = formData.getAll("sizes");
    const freeDelivery = formData.get("freeDelivery") === "true";
    const payOnDelivery = formData.get("payOnDelivery") === "true";
    const images = formData.getAll("images") as File[];
    const detailPoints = formData.getAll("detailPoints");

    if (!title || !description || !price || !category || images.length != 4) {
      return NextResponse.json(
        {
          message: "All Fields and atleast 4 images are required",
          success: false,
        },
        {
          status: 400,
        },
      );
    }

    if (isWearable && sizes.length === 0) {
      return NextResponse.json(
        {
          message: "Sizes are required for wearable products",
          success: false,
        },
        {
          status: 400,
        },
      );
    }

    const imageUrl = await Promise.all(
      images.map((image) => uploadFile(image)),
    );

    const newProduct = await Product.create({
      title,
      description,
      price,
      stock,
      isStockAvailable: stock > 0,
      vendor: session.user.id,
      category,
      verificationStatus: "Pending",
      requestedAt: new Date(),
      isActive: false,
      replacementDays,
      warranty,
      isWearable,
      sizes: isWearable ? sizes : [],
      freeDelivery,
      payOnDelivery,
      images: imageUrl,
      detailPoints,
    });

    await User.findByIdAndUpdate(
      session.user.id,
      {
        $push: {
          "vendor.products": newProduct._id,
        },
      },
      { new: true },
    );

    return NextResponse.json(
      {
        message: "Product created",
        success: true,
        product: newProduct,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Add product error",
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
};
