// pages/api/tickets/update/[ticketId].js

import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../lib/db";
import Ticket from "../../../../../models/ticket";

connect();

export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const ticketId = url.pathname.split("/").pop();
    const { title, issue, status } = await request.json();

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, { title, issue, status }, { new: true });

    return NextResponse.json({ message: "Ticket updated successfully", ticket: updatedTicket });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
