import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../lib/db";
import Reply from "../../../../models/reply";

connect();

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const ticketId = url.pathname.split("/").pop();

    const replies = await Reply.find({ ticket: ticketId }).populate("user", "username", "User");
    console.log("==============================================");
    console.log("==============================================");
    console.log("replies:", replies);
    console.log("==============================================");
    console.log("==============================================");

    return NextResponse.json({ replies });
  } catch (error) {
    console.error("Error fetching replies:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
