import { NextRequest, NextResponse } from "next/server";
import Ticket from "../../../../../../models/ticket";
import { connect } from "../../../../../../lib/db";

connect();

export async function PUT(request) {
  const url = new URL(request.url);
  const ticketId = url.pathname.split("/")[4];
  const { status } = await request.json();
  console.log("==============================================");
  console.log("==============================================");
  console.log("status:", status);
  console.log("ticketId:");
  console.log("==============================================");
  console.log("==============================================");
  try {
    // await Ticket.findByIdAndUpdate(ticketId, { status });
    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, { status }, { new: true });

    return NextResponse.json({ message: "Ticket status updated successfully" });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
