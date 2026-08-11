import { auth } from "@/auth";
import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { phone, role } = await req.json();

  try {
    await connectToDb();
    const session = await auth();
    const user = await User.findByIdAndUpdate(
      session?.user?.id,
      {
        role,
        phone,
      },
      {
        new: true,
      },
    );
    if (!user) {
      return NextResponse.json(
        {
          message: "User is not found",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        message: "User updated successfully",
        user,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Edit Role and phone Error",
        error,
      },
      {
        status: 500,
      },
    );
  }
};
