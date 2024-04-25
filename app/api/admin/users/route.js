import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/user";

export async function GET() {
  try {
    const users = await User.find({}, "-password");
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
