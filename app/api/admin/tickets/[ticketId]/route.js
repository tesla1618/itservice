import { NextRequest, NextResponse } from "next/server";
import Ticket from "../../../../../models/ticket";

export async function DELETE(request) {
  const url = new URL(request.url);
  const ticketId = url.pathname.split("/").pop();
  try {
    await Ticket.findByIdAndDelete(ticketId);
    return NextResponse.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
