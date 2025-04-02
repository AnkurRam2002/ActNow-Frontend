import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { FaEdit, FaUsers, FaTrashAlt } from "react-icons/fa";

const EventSidebar = ({ eventId, organizerId, userId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await api.get(`/events/${eventId}/participants`);
        setParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  // Navigate to the participant's profile page
  const goToProfile = (participantId) => {
    navigate(`/users/${participantId}`); // Redirect to the profile page with userId 
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await api.delete(`/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200 || response.status === 204) {  
          alert("Event deleted successfully!");
          navigate("/home");  
        } else {
          alert("Failed to delete event: " + (response.data?.message || "Unknown error"));
        }
        
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="w-1/3 bg-white p-4 rounded-xl shadow-lg">
      {/* Edit Event Button (Only for Organizer) */}
      {userId === organizerId && (
      <div className="flex justify-center gap-4 mb-4">
        {/* Edit Event Button */}
        <Link
          to={`/events/${eventId}/edit`}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <FaEdit /> Edit Event
        </Link>

        {/* Delete Event Button */}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <FaTrashAlt /> Delete Event
        </button>
      </div>
    )}

     {/* Horizontal Line */}
     <hr className="border-t border-gray-300 my-4" />

      {/* Participants List */}
      <div>
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <FaUsers className="text-gray-700" /> Participants
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : participants.length === 0 ? (
          <p>No participants yet.</p>
        ) : (
          <ul className="space-y-2">
            {participants.map((participant) => (
              <li
                key={participant._id}
                onClick={() => goToProfile(participant._id)}  // Pass the participant ID dynamically
                className="p-2 bg-gray-100 rounded-lg text-gray-800 cursor-pointer hover:underline"
              >
                {participant.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventSidebar;
