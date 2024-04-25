"use client";
import { SigninForm } from "../../components/utils/SigninForm";
import { useState } from "react";

export default function Register() {
  return (
    <div className="flex container items-center justify-center h-screen mt-10">
      <SigninForm />
    </div>
  );
}
