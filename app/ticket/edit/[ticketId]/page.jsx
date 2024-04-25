"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

function EditTicketPage() {
  const ticketId = useParams().ticketId;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    issue: "",
    status: "",
  });

  useEffect(() => {
    const fetchTicket = async () => {
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

    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title,
        issue: ticket.issue,
        status: ticket.status,
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/tickets/update/${ticketId}`, formData);
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error updating ticket:", error.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 pt-14">
      <h1 className="text-3xl font-bold mb-4">Edit Ticket</h1>
      {error && <div className="text-red-500">{error}</div>}
      {successMessage && <div className="text-green-900 bg-green-200 px-5 py-5 border[1px] border-green-700 text-center rounded-md my-5">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input className="px-5 py-5 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500 text-sm w-full transition-all ease-in-out" type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="issue" className="block font-semibold mb-1">
            Issue
          </label>
          <textarea className="px-5 py-5 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500 text-sm w-full transition-all ease-in-out" id="issue" name="issue" value={formData.issue} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block font-semibold mb-1">
            Status
          </label>
          <select className="px-5 py-5 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none focus:border-[1px] focus:border-blue-500 text-sm w-full transition-all ease-in-out" id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="in progress">In Progress</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTicketPage;
