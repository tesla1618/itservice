import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    status: "",
    title: "",
    id: "",
  });
  const [users, setUsers] = useState([]);
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/tickets/index");
        setTickets(response.data.tickets);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await axios.get("/api/admin/users");
        setUsers(usersResponse.data.users);

        const ticketsResponse = await axios.get("/api/tickets/index/assigned");
        setAssignedTickets(ticketsResponse.data.tickets);
        const ticketsResponse2 = await axios.get("/api/admin/tickets");
        setAllTickets(ticketsResponse2.data.tickets);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUserData(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        setUserData({
          message: "No user",
        });
        console.log(error.message);
      }
    };
    getUserDetails();

    fetchData();

    fetchTickets();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const filteredTickets = tickets.filter((ticket) => {
    const { status, title, id } = searchCriteria;
    return (status === "" || ticket.status.toLowerCase().includes(status.toLowerCase())) && (title === "" || ticket.title.toLowerCase().includes(title.toLowerCase())) && (id === "" || ticket._id.toLowerCase().includes(id.toLowerCase()));
  });

  const allfilteredTickets = allTickets.filter((ticket) => {
    const { status, title, id } = searchCriteria;
    return (status === "" || ticket.status.toLowerCase().includes(status.toLowerCase())) && (title === "" || ticket.title.toLowerCase().includes(title.toLowerCase())) && (id === "" || ticket._id.toLowerCase().includes(id.toLowerCase()));
  });

  const assignedfilteredTickets = assignedTickets.filter((ticket) => {
    const { status, title, id } = searchCriteria;
    return (status === "" || ticket.status.toLowerCase().includes(status.toLowerCase())) && (title === "" || ticket.title.toLowerCase().includes(title.toLowerCase())) && (id === "" || ticket._id.toLowerCase().includes(id.toLowerCase()));
  });

  console.log(userData);
  if (userData.isAdmin || userData.isSupportStaff) {
    return (
      <>
        <div className="flex items-center justify-center mt-24">
          <Link href="/admin/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Admin Panel
          </Link>
        </div>
        <div className=" mt-5 pt-14 flex items-center justify-center sm:mx-auto mx-5 sm:container mb-10">
          <div className="w-full">
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-3xl font-bold mb-4">Tickets Assigned to you</h2>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-4 ">
                  <input className="px-3 py-2 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none text-sm" type="text" name="title" placeholder="Search by Title" value={searchCriteria.title} onChange={handleSearchChange} />
                  <input className="px-3 py-2 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none text-sm" type="text" name="id" placeholder="Search by ID" value={searchCriteria.id} onChange={handleSearchChange} />
                </div>
                <select className="px-3 py-2 border-[1px] border-blue-400 bg-white rounded-md focus:outline-none text-sm" name="status" value={searchCriteria.status} onChange={handleSearchChange}>
                  <option value="">-- Select Status --</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="in progress">In Progress</option>
                </select>
              </div>
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                assignedfilteredTickets.map((ticket) => (
                  <div key={ticket._id} className="border p-4 rounded-md mb-4">
                    <div className=" mb-2 flex justify-between">
                      <p className="text-lg font-bold">{ticket.title}</p>
                      <div className="flex space-x-2 justify-center items-center">
                        <Link href={`/ticket/edit/${ticket._id}`} className="">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </Link>
                        <div>{ticket.status === "open" ? <span className="bg-green-100 text-green-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span> : ticket.status === "closed" ? <span className="bg-red-100 text-red-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span> : <span className="bg-green-100 text-green-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span>}</div>
                      </div>
                    </div>
                    <p style={{ whiteSpace: "pre-line" }}>{ticket.issue}</p> {/* Use white-space: pre-line to display line breaks */}
                    <div className="flex justify-between">
                      {ticket.createdBy && (
                        <p className="mt-2">
                          ID: <span className="bg-gray-200 px-[6px] py-[3px] rounded-sm text-sm text-slate-90">{ticket._id}</span>
                        </p>
                      )}
                      <Link href={`/ticket/reply/${ticket._id}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">
                        Reply
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* All  */}
        <div className=" mt-10 pt-14 flex items-center justify-center sm:mx-auto mx-5 sm:container mb-10">
          <div className="w-full">
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-3xl font-bold mb-4">All Tickets</h2>
              <div className="flex justify-between mb-4">
                <div className="flex space-x-4 ">
                  <input className="px-3 py-2 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none text-sm" type="text" name="title" placeholder="Search by Title" value={searchCriteria.title} onChange={handleSearchChange} />
                  <input className="px-3 py-2 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none text-sm" type="text" name="id" placeholder="Search by ID" value={searchCriteria.id} onChange={handleSearchChange} />
                </div>
                <select className="px-3 py-2 border-[1px] border-blue-400 bg-white rounded-md focus:outline-none text-sm" name="status" value={searchCriteria.status} onChange={handleSearchChange}>
                  <option value="">-- Select Status --</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="in progress">In Progress</option>
                </select>
              </div>
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                allfilteredTickets.map((ticket) => (
                  <div key={ticket._id} className="border p-4 rounded-md mb-4">
                    <div className=" mb-2 flex justify-between">
                      <p className="text-lg font-bold">{ticket.title}</p>
                      <div className="flex space-x-2 justify-center items-center">
                        <Link href={`/ticket/edit/${ticket._id}`} className="">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </Link>
                        <div>{ticket.status === "open" ? <span className="bg-green-100 text-green-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span> : ticket.status === "closed" ? <span className="bg-red-100 text-red-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span> : <span className="bg-green-100 text-green-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span>}</div>
                      </div>
                    </div>
                    <p style={{ whiteSpace: "pre-line" }}>{ticket.issue}</p> {/* Use white-space: pre-line to display line breaks */}
                    <div className="flex justify-between">
                      {ticket.createdBy && (
                        <p className="mt-2">
                          ID: <span className="bg-gray-200 px-[6px] py-[3px] rounded-sm text-sm text-slate-90">{ticket._id}</span>
                        </p>
                      )}
                      <Link href={`/ticket/reply/${ticket._id}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">
                        Reply
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className=" mt-10 pt-14 flex items-center justify-center sm:mx-auto mx-5 sm:container mb-10">
        <div className="w-full">
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-3xl font-bold mb-4">Tickets</h2>
            <div className="flex justify-between mb-4">
              <div className="flex space-x-4 ">
                <input className="px-3 py-2 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none text-sm" type="text" name="title" placeholder="Search by Title" value={searchCriteria.title} onChange={handleSearchChange} />
                <input className="px-3 py-2 border-[1px] border-gray-300 bg-white rounded-md focus:outline-none text-sm" type="text" name="id" placeholder="Search by ID" value={searchCriteria.id} onChange={handleSearchChange} />
              </div>
              <select className="px-3 py-2 border-[1px] border-blue-400 bg-white rounded-md focus:outline-none text-sm" name="status" value={searchCriteria.status} onChange={handleSearchChange}>
                <option value="">-- Select Status --</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="in progress">In Progress</option>
              </select>
            </div>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              filteredTickets.map((ticket) => (
                <div key={ticket._id} className="border p-4 rounded-md mb-4">
                  <div className=" mb-2 flex justify-between">
                    <p className="text-lg font-bold">{ticket.title}</p>
                    <div className="flex space-x-2 justify-center items-center">
                      <Link href={`/ticket/edit/${ticket._id}`} className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </Link>
                      <div>{ticket.status === "open" ? <span className="bg-green-100 text-green-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span> : ticket.status === "closed" ? <span className="bg-red-100 text-red-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span> : <span className="bg-green-100 text-green-900 px-2 py-1 rounded-lg text-sm">{ticket.status}</span>}</div>
                    </div>
                  </div>
                  <p style={{ whiteSpace: "pre-line" }}>{ticket.issue}</p> {/* Use white-space: pre-line to display line breaks */}
                  <p className="mt-2">
                    ID: <span className="bg-gray-200 px-[6px] py-[3px] rounded-sm text-sm text-slate-90">{ticket._id}</span>
                  </p>
                  <div className="flex justify-between">
                    {ticket.createdBy && (
                      <p className="mt-2">
                        Created By: <span className="bg-gray-900 px-2 py-[3px] rounded-lg text-sm text-slate-50">{ticket.createdBy.username}</span>
                      </p>
                    )}
                    <Link href={`/ticket/reply/${ticket._id}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">
                      Reply
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default TicketList;
