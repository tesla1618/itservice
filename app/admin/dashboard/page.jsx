"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { TrashIcon, CheckCircleIcon, XCircleIcon, PlayIcon, UserAddIcon, ChatIcon } from "@heroicons/react/solid";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await axios.get("/api/admin/users");
        setUsers(usersResponse.data.users);

        const ticketsResponse = await axios.get("/api/admin/tickets");
        setTickets(ticketsResponse.data.tickets);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      setLoading(false);
      toast.success("User deleted successfully");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Error deleting user");
    }
  };

  const updateUserRole = async (userId, newRole) => {
    setLoading(true);
    try {
      let updatedUserRole = {};
      if (newRole === "admin") {
        updatedUserRole = { isAdmin: true, isEmployee: false };
      } else if (newRole === "employee") {
        updatedUserRole = { isAdmin: false, isEmployee: true };
      }
      await axios.put(`/api/admin/users/${userId}/role`, updatedUserRole);
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isAdmin: updatedUserRole.isAdmin, isEmployee: updatedUserRole.isEmployee };
        }
        return user;
      });
      setUsers(updatedUsers);
      setLoading(false);
      toast.success("User role updated successfully");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Error updating user role");
    }
  };

  const deleteTicket = async (ticketId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/admin/tickets/${ticketId}`);
      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      setLoading(false);
      toast.success("Ticket deleted successfully");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Error deleting ticket");
    }
  };
  const deleteUserRole = async (userId) => {
    setLoading(true);
    try {
      await axios.put(`/api/admin/users/${userId}/role`, { isAdmin: false, isEmployee: false });
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isAdmin: false, isEmployee: false };
        }
        return user;
      });
      setUsers(updatedUsers);
      setLoading(false);
      toast.success("User role deleted successfully");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Error deleting user role");
    }
  };

  const changeTicketStatus = async (ticketId, newStatus) => {
    setLoading(true);
    try {
      await axios.put(`/api/admin/tickets/${ticketId}/status`, { status: newStatus });
      const updatedTickets = tickets.map((ticket) => {
        if (ticket._id === ticketId) {
          return { ...ticket, status: newStatus };
        }
        return ticket;
      });
      setTickets(updatedTickets);
      setLoading(false);
      toast.success("Ticket status updated successfully");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error("Error updating ticket status");
    }
  };

  return (
    <div className="container mx-auto mt-8 pt-14 mb-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="py-3 px-6 text-left">{user.username}</td>
                <td className="py-3 px-6 text-left">{user.isAdmin ? "Admin" : user.isEmployee ? "Employee" : "N/A"}</td>
                <td className="py-3 px-6 text-left">
                  {user.email !== "admin@secure.id" && (
                    <>
                      {user.isAdmin || user.isEmployee ? (
                        <button onClick={() => deleteUserRole(user._id)} className="text-red-500 mr-2 hover:text-red-700">
                          <TrashIcon className="w-5 h-5 inline-block mr-1" />
                          Delete Role
                        </button>
                      ) : (
                        <button onClick={() => updateUserRole(user._id, "admin")} className="text-green-500 mr-2 hover:text-green-700">
                          <UserAddIcon className="w-5 h-5 inline-block mr-1" />
                          Promote to Admin
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Ticket Title</th>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td className="py-3 px-6 text-left">{ticket.title}</td>
                <td className="py-3 px-6 text-left">{ticket._id}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`inline-block bg-${ticket.status === "open" ? "green" : ticket.status === "closed" ? "red" : "yellow"}-500 text-white py-[3px] px-3 rounded-full`}>{ticket.status}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  {ticket.status === "open" && (
                    <button onClick={() => changeTicketStatus(ticket._id, "in progress")} className="text-yellow-500 mr-2 hover:text-yellow-700">
                      <PlayIcon className="w-5 h-5 inline-block mr-1" />
                      In Progress
                    </button>
                  )}
                  {ticket.status === "in progress" && (
                    <button onClick={() => changeTicketStatus(ticket._id, "closed")} className="text-green-500 mr-2 hover:text-green-700">
                      <CheckCircleIcon className="w-5 h-5 inline-block mr-1" />
                      Close
                    </button>
                  )}
                  {ticket.status === "closed" && (
                    <button onClick={() => changeTicketStatus(ticket._id, "open")} className="text-red-500 mr-2 hover:text-red-700">
                      <XCircleIcon className="w-5 h-5 inline-block mr-1" />
                      Reopen
                    </button>
                  )}
                  <button onClick={() => deleteTicket(ticket._id)} className="text-red-500 hover:text-red-700">
                    <TrashIcon className="w-5 h-5 inline-block mr-1" />
                    Delete
                  </button>
                  <Link href={`/ticket/reply/${ticket._id}`} className="text-blue-500 hover:text-blue-700 ml-2">
                    <ChatIcon className="w-5 h-5 inline-block mr-1" />
                    Reply
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminDashboard;
