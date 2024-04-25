"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [btnText, setBtnText] = useState("Login");
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setisAuth(true);
      setData(res.data.data);
      setBtnText("Logout");
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      setData("nothing");
      setisAuth(false);
      setBtnText("Login");
      router.push("/auth/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <nav className="bg-blue-600 py-4 px-6 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-white text-lg mr-6">
            Home
          </a>
          {isAuth ? (
            <Link href="/ticket/create" className="text-white text-lg mr-6">
              Create
            </Link>
          ) : null}
          {isAuth ? (
            <Link href="/profile" className="text-white text-lg mr-6">
              Profile
            </Link>
          ) : null}
        </div>
        <div>
          {!isAuth ? (
            <Link href="/auth/login" className="text-white text-lg">
              {btnText}
            </Link>
          ) : (
            <button onClick={logout} className="text-white text-lg">
              {btnText}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
