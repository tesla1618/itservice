// api/tickets/index.js

import { connect } from "../../../../lib/db";
import Ticket from "../../../../models/ticket";
import User from "../../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helper/getDataFromToken";

connect();

export async function GET(request) {
  try {
    const userId = getDataFromToken(request);

    const tickets = await Ticket.find({ createdBy: userId }).populate("createdBy", "username");

    return NextResponse.json({ tickets });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
