// pages/api/admin/users/[userId]/role.js

import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../../lib/db";
import User from "../../../../../../models/user";

connect();

export async function PUT(request) {
  const url = new URL(request.url);
  const userId = url.pathname.split("/")[4];
  console.log("==============================================");
  console.log("==============================================");
  console.log("userId:", userId);
  console.log("==============================================");
  console.log("==============================================");
  try {
    const { isAdmin, isEmployee } = await request.json();

    const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin, isEmployee }, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" });
    }

    return NextResponse.json({ message: "User role updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user role:", error);
    console.log("==============================================");
    console.log("==============================================");
    console.log("error:", error);
    console.log("==============================================");
    console.log("==============================================");
    return NextResponse.json({ error: "Error updating user role" }, { status: 500 });
  }
}
