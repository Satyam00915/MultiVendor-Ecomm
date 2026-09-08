import { auth } from "@/auth";
import { uploadFile } from "@/lib/cloudinary";
import connectToDb from "@/lib/connectToDb";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    await connectToDb();
    const session = await auth();

    if (!session || !session?.user || !session?.user?.id) {
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
    const detailPoints = formData.getAll("detailPoints");

    const images = formData.getAll("images");

    const productId = formData.get("productId");

    if (
      !productId ||
      !title ||
      !description ||
      !price ||
      !category ||
      images.length != 4
    ) {
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

    const finalImageUrls = await Promise.all(
      images.map((image) => {
        if (typeof image == "string") {
          return image;
        } else {
          return uploadFile(image);
        }
      }),
    );

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
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
        images: finalImageUrls,
        detailPoints,
      },
      {
        new: true,
      },
    );

    if (!updatedProduct) {
      return NextResponse.json(
        {
          message: "Product not found",
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product Updated",
        product: updatedProduct,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Update Product Error",
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
};
