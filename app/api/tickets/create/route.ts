// api/tickets/create.ts

import { connect } from "../../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helper/getDataFromToken"; // Import the function to retrieve user data from the token
import Ticket from "../../../../models/ticket";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);

    // Parse the request body as JSON
    const body = await request.json();

    const { title, issue } = body;

    const newTicket = new Ticket({
      title,
      issue,
      createdBy: userId,
    });

    // Save the new ticket to the database
    const savedTicket = await newTicket.save();

    // Return success response with the saved ticket
    return NextResponse.json({
      message: "Ticket created successfully",
      success: true,
      ticket: savedTicket,
    });
  } catch (error: any) {
    console.error(error);
    // Return error response if an error occurs
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
