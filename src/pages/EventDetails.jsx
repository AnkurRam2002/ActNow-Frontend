import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { FaEdit, FaMapMarkerAlt, FaUsers, FaClock } from "react-icons/fa";
import EventSidebar from "../components/EventSidebar";
import EventTopbar from "../components/EventTopbar";

const EventDetails = () => {
  const { id } = useParams(); // Retrieve eventId from URL params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split("."))[1]).userId : null;

  // Fetch event data from the API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        alert("Failed to load event details. Please try again later."); // Alert user if event data fails to load
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleParticipate = async () => {
    if (!token) {
      alert("Please log in to participate."); // Notify user if not logged in
      return;
    }

    try {
      const response = await api.post(`/events/${id}/participate`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status >= 200 && response.status < 300) {
        alert("Successfully registered for the event!"); // Success alert
      } else {
        alert("Registration successful, but encountered an issue. Please verify."); // Handle unexpected success response
      }
    } catch (error) {
      console.error("Error participating:", error);
      alert(error.response?.data?.message || "An error occurred while registering. Please try again later."); // Generic error message fallback
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-900"></div>
      </div>
    );
  }

  if (!event) {
    return <div>Event not found.</div>; // Display if event does not exist
  }

  return (
    <>
    <EventTopbar />
    <div className= "flex justify-center gap-5 items-center min-h-[90vh] bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-3xl shadow-lg">
        {/* Event Name */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h2>
        <p className="text-lg text-gray-600 mb-3">{event.description}</p>

        {/* Participate Button */}
        <button onClick={handleParticipate} className="w-full bg-gray-900 text-white font-bold py-2 rounded-lg">
          Participate
        </button>
      </div>
      
      {/* Event Sidebar */}
      {userId === event.organizer._id && <EventSidebar eventId={id} organizerId={event.organizer._id} userId={userId} />}
    </div>
    </>
  );
};

export default EventDetails;