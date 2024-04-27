// api/users/get/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from ".././../../../../lib/db";
import User from "../../../../../models/user";

connect();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split("/").pop();
    // const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
