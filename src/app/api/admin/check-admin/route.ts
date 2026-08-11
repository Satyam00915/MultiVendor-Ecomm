import connectToDb from "@/lib/connectToDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
    const foundAdmin = await User.findOne({ role: "admin" });

    return NextResponse.json({
      status: !!foundAdmin,
      foundAdmin,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Get Admin Error",
        error,
      },
      {
        status: 500,
      },
    );
  }
};
