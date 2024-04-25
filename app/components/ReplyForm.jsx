// components/ReplyForm.jsx
"use client";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function ReplyForm({ ticketId }) {
  const [reply, setReply] = useState("");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/tickets/index/${ticketId}`);
        setTicket(response.data.ticket);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/replies/create", { ticketId, reply });
      // Update the list of replies here (you might need to lift the state up)
      setReply(""); // Clear the reply input after submission
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ticket || ticket.status === "closed") {
    return <div className="sm:container sm:mr-10 px-10 py-5 text-center mx-12 mt-5 mb-10 bg-red-300 border-red-500 border-[1px] text-red-800">This ticket is closed and cannot be replied to.</div>;
  }

  return (
    <div className="sm:container sm:mx-auto mx-12 mb-10">
      <form onSubmit={handleSubmit}>
        <label className="mb-10 mt-10" htmlFor="reply">
          Reply:
        </label>
        <textarea id="reply" value={reply} onChange={(e) => setReply(e.target.value)} className="w-full p-2 mt-5 border" rows="4" required />
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit Reply
        </button>
      </form>
    </div>
  );
}

export default ReplyForm;
