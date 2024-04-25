// import { connect } from "@/lib/db";
import User from "../../../../models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

import mongoose from "mongoose";

export async function connect() {
  console.log("connecting to db");
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error" + err);
      process.exit();
    });
  } catch (error) {
    console.log("error: not connected");
    console.log(error);
  }
}

connect();

console.log("POST /api/users/login is called");

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invlid password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isEmployee: user.isEmployee,
    };

    // Create a token with expiration of 1 day
    const token = await jwt.sign(tokenData, `${process.env.TOKEN_SECRET}`!, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set the token as an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    console.log("response: ", response);

    return response;
  } catch (error: any) {
    console.log("error: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
