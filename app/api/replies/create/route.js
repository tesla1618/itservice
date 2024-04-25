// pages/api/replies/create.js

import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../lib/db";
import { getDataFromToken } from "../../../../helper/getDataFromToken";
import Reply from "../../../..//models/reply";

connect();

export async function POST(request) {
  try {
    const userId = getDataFromToken(request);

    const { ticketId, reply } = await request.json();
    const newReply = new Reply({
      ticket: ticketId,
      user: userId,
      reply,
    });
    const savedReply = await newReply.save();
    return NextResponse.json({ message: "Reply created successfully", reply: savedReply });
  } catch (error) {
    console.log("=========================================================");
    console.log("=========================================================");
    console.log("Error creating reply:", error);
    console.log("=========================================================");
    console.log("=========================================================");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
