import { NextRequest, NextResponse } from "next/server";
import Ticket from "../../../../models/ticket";

export async function GET() {
  try {
    const tickets = await Ticket.find();
    return NextResponse.json({ tickets });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
