// api/tickets/[ticketId].js

import { connect } from "../../../../../../lib/db";
import User from "../../../../../../models/user";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  console.log("=========================================================");
  console.log(request.url.split("/")[6]);
  console.log("=========================================================");
  try {
    const url = new URL(request.url);
    const userId = url.pathname.split("/")[6];
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
