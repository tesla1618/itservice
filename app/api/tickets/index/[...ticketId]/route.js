// api/tickets/[ticketId].js

import { connect } from "../../../../../lib/db";
import Ticket from "../../../../../models/ticket";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  console.log("=========================================================");
  console.log(request);
  console.log("=========================================================");
  try {
    const url = new URL(request.url);
    const ticketId = url.pathname.split("/").pop();
    const ticket = await Ticket.findById(ticketId).populate("createdBy", "username");

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
