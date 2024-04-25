// pages/reply/[ticketId].jsx
"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReplyForm from "../../../components/ReplyForm";
import axios from "axios";
import RepliesList from "../../../components/RepliesList";

function ReplyPage() {
  const router = useRouter();
  // const { ticketId } = router.query;
  const { ticketId } = useParams();
  console.log("Ticket ID:", ticketId);

  // console.log(ticketId);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTicket = async () => {
      console.log("Fetching ticket for ticketId:", ticketId);
      setLoading(true);
      try {
        const response = await axios.get(`/api/tickets/index/${ticketId}`);
        setTicket(response.data.ticket);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  console.log("Ticket:", ticket);
  console.log(`/api/tickets/index/${ticketId}`);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center mt-10 pt-14">
      <div className="container mx-auto">
        {!ticket ? (
          <div className="mt-4">Loading...</div>
        ) : error ? (
          <div className="mt-4">Error: {error}</div>
        ) : (
          <div className="mt-4 border-[1px] bg-clip- p-5 border-slate-300">
            <span className="bg-gray-200 text-slate-800 px-3 py-1 sm:float-end">{ticket._id}</span>
            <p className="sm:mt-0 mt-2 text-lg font-semibold">{ticket.title}</p>
            <p className="mt-4">{ticket.issue}</p>
            <hr className="my-4" />
            <div className="flex space-x-2 items-center">
              <p className="">Created By: {ticket.createdBy.username}</p>
              <div>{ticket.status === "open" ? <span className="bg-green-100 text-green-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span> : ticket.status === "closed" ? <span className="bg-red-100 text-red-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span> : <span className="bg-green-100 text-green-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span>}</div>
            </div>
          </div>
        )}
        <RepliesList ticketId={ticketId} className="mt-4" />
      </div>
      <ReplyForm ticketId={ticketId} className="sm:mt-0 mt-4" />
    </div>
  );
}

export default ReplyPage;
