// api/users/me/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../lib/db";
import User from "../../../../models/user";
import { getDataFromToken } from "../../../../helper/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
