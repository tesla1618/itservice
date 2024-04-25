// components/RepliesList.jsx

import { useEffect, useState } from "react";
import axios from "axios";

function RepliesList({ ticketId }) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReplies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/replies/${ticketId}`);
        setReplies(response.data.replies);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReplies();
  }, [ticketId]);

  return (
    <>
      <h2 className="mt-10 mb-5 text-xl font-bold">Replies:</h2>
      <div className="border-[1px] border-slate-300 px-5 py-8 rounded-md mb-10">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <ul>
              {replies.map((reply) => (
                <li key={reply._id} className={`border-[1px] border-slate-300 p-4 rounded-md mb-4 ${reply.user.isAdmin ? "bg-green-500 text-green-900" : "bg-gray-100 text-gray-900"}`}>
                  <p className="font-bold">{reply.user.username}</p>
                  <p className="text-xs font-thin">{new Date(reply.created_at).toLocaleString()}</p>
                  <p className="pl-3 break-words">{reply.reply}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default RepliesList;
