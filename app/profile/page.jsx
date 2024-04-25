"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

export default function ProfilePage() {
  const [data, setData] = useState("nothing");

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Profile</h1>
      <h2>{data === "nothing" ? "Loading..." : `Welcome ${data.username}`}</h2>
    </div>
  );
}
