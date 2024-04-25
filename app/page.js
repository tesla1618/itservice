"use client";
import Image from "next/image";
import TicketList from "./components/TicketList";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isAuth, setisAuth] = useState(false);
  const [data, setData] = useState("nothing");

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data.username);
      setisAuth(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <main className="">
      {isAuth ? (
        <TicketList />
      ) : (
        <div className="flex flex-col items-center mt-10 pt-10 justify-center h-screen">
          <h1 className="text-xl font-light my-5 text-blue-500">Welcome to Support Ticket System</h1>
          <div class="flex items-center bg-blue-500 text-white text-sm font-light mb-2 px-4 py-3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>
              <strong>Authentication Required</strong> - Please <Link href="/auth/login">sign in</Link> to view your support tickets
            </p>
          </div>
          <Image src="/authentication.png" width={500} height={500} />
        </div>
      )}
    </main>
  );
}
