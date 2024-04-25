"use client";
import { SignupForm } from "../../components/utils/SignupForm";
import { useState } from "react";

export default function Register() {
  return (
    <div className="flex container items-center justify-center h-screen mt-10">
      <SignupForm />
    </div>
  );
}
