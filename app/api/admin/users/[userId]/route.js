import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/user";

export async function DELETE(request) {
  const url = new URL(request.url);
  const userId = url.pathname.split("/").pop();
  try {
    await User.findByIdAndDelete(userId);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
