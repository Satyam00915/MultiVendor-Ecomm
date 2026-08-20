import { auth } from "@/auth";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();
  try {
    await connectToDb();
    const user = await User.findOne({ email: session?.user?.email }).select(
      "-password",
    );
    if (!user) {
      return NextResponse.json(
        {
          message: "User Not Found",
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "User details fetched",
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
        message: "Fetch User error",
        error,
        success: false,
      },
      {
        status: 500,
      },
    );
  }
};
