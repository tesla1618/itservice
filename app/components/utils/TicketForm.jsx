"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function TicketForm() {
  const router = useRouter();
  const [ticket, setTicket] = useState({
    title: "",
    issue: "",
  });

  const createTicket = async () => {
    try {
      const response = await axios.post("/api/tickets/create", ticket);
      router.push("/");
      console.log("Ticket created successfully", response.data);
    } catch (error) {
      console.log("Ticket creation failed", error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-3xl font-bold mb-4">Create Ticket</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" value={ticket.title} onChange={(e) => setTicket({ ...ticket, title: e.target.value })} placeholder="Enter ticket title" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue">
            Issue
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="issue" type="text" value={ticket.issue} onChange={(e) => setTicket({ ...ticket, issue: e.target.value })} placeholder="Enter ticket issue" />
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={createTicket}>
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
