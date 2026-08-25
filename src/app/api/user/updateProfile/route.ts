import { auth } from "@/auth";
import { uploadFile } from "@/lib/cloudinary";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDb();
    const session = await auth();

    if (!session || !session.user?.id || !session.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized User",
        },
        {
          status: 401,
        },
      );
    }

    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const phone = formData.get("phone") as string;
    const file = formData.get("image") as File | null;
    console.log(file);

    if (!fullName || !phone) {
      return NextResponse.json(
        {
          message: "Fields are missing",
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    let imageUrl;
    if (file) {
      console.log("Cloudinary upload is being done");
      imageUrl = await uploadFile(file);
    }
    console.log(imageUrl);

    const updatedUser = await User.findByIdAndUpdate(
      session?.user?.id,
      {
        $set: {
          fullName,
          phone,
          ...(file && { image: imageUrl }),
        },
      },
      {
        new: true,
      },
    );

    if (!updatedUser) {
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
        message: "Details Updated",
        user: updatedUser,
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
        message: "Update User Error",
        error,
        success: false,
      },
      {
        status: 500,
      },
    );
  }
};
