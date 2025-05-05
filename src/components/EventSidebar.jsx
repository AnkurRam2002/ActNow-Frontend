import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { FaEdit, FaUsers, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const EventSidebar = ({ eventId, organizerId, userId, status }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [volunteersPresent, setVolunteersPresent] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState({});

  const { token, userRole } = useContext(UserContext); // Auth token from context
  const isNgoOwner = userId === organizerId; // Check if current user is the event owner

  const navigate = useNavigate();

  // Fetch participants and their attendance status when component mounts or eventId changes
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

    const fetchAttendance = async () => {
      try {
        const res = await api.get(`/events/${eventId}`);
        setVolunteersPresent(res.data.volunteersPresent || []);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchParticipants();
    fetchAttendance();
  }, [eventId]);

  // Toggle individual attendance for a participant
  const handleToggleAttendance = async (volunteerId) => {
    try {
      // Prevent toggling off the checkbox once marked as present
      if (volunteersPresent.includes(volunteerId)) {
        toast.error("You cannot unmark attendance once it's marked as present.");
        return; // Prevent further execution
      }
  
      setLoadingParticipants((prev) => ({ ...prev, [volunteerId]: true }));
      const res = await api.post(
        `/events/${eventId}/toggle-attendance`,
        {
          volunteerId, // Payload: volunteer to be marked present/absent
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      setVolunteersPresent(data.volunteersPresent);
    } catch (err) {
      console.error("Toggle attendance error:", err.message);
      toast.error("Failed to toggle attendance.");
    } finally {
      setLoadingParticipants((prev) => ({ ...prev, [volunteerId]: false }));
    }
  };

  // Navigate to the participant's profile page
  const goToProfile = (participantId) => {
    navigate(`/users/${participantId}`); // Redirect to the profile page with userId 
  }

  // Delete event (with confirmation)
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await api.delete(`/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200 || response.status === 204) {  
          toast.success("Event deleted successfully!");
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
      {(userId === organizerId || userRole === "admin") && (
      <div className="flex justify-center gap-4 mb-4">
        {/* Edit Event Button */}
        { status !== 'Completed' && (
        <Link
          to={`/events/${eventId}/edit`}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 transition-all cursor-pointer text-white py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <FaEdit /> Edit Event
        </Link>)}

        {/* Delete Event Button */}
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 active:bg-red-500 transition-all cursor-pointer text-white py-2 px-4 rounded-lg flex items-center gap-2"
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
            {participants.map((participant) => {
              const isPresent = volunteersPresent.includes(participant._id);

              return (
                <li
                  key={participant._id}
                  onClick={() => goToProfile(participant._id)}  // Pass the participant ID dynamically
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-gray-800 transition-all cursor-pointer
                    ${
                      status === "Completed" && isPresent
                        ? "bg-green-200 hover:bg-green-300"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                >
                  {participant.username}

                  {/* Attendance checkbox (editable only if event is not completed and user is owner) */}
                  {isNgoOwner && status === "Ongoing" &&
                    (loadingParticipants[participant._id] ? (
                      <div className="h-5 w-5 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-green-600"></div>
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        checked={isPresent}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleToggleAttendance(participant._id)}
                        className="form-checkbox h-5 w-5 accent-green-600 cursor-pointer"
                      />
                    ))}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventSidebar;
