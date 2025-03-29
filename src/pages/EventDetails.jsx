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
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

  // Fetch event data from the API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleParticipate = async () => {
    if (!token) {
      alert("Please log in to participate.");
      return;
    }

    try {
      const response = await api.post(`/events/${id}/participate`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Successfully registered for the event!");
      }
    } catch (error) {
      console.error("Error participating:", error);
      alert(error.response?.data?.message || "Failed to participate.");
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
    return <div>Event not found.</div>;
  }

    // Function to generate Google Maps link
    const getGoogleMapsLink = () => {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
      return mapUrl;
    };
  
    // Function to generate Google Calendar event link
    const getGoogleCalendarLink = () => {
      const startDateTime = new Date(event.date).toISOString().replace(/-|:|\.\d+/g, ""); // Format to ISO string
      const endDateTime = new Date(new Date(event.date).getTime() + 24 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, ""); // Adding 24 hours
  
      const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;
      return calendarUrl;
    };

  return (
    <>
    <EventTopbar />
    <div className= "flex justify-center gap-5 items-center min-h-[90vh] bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded-3xl shadow-lg">
        {/* Event Name */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{event.name}</h2>
        <p className="text-lg text-gray-600 mb-3">{event.description}</p>

        {/* Organizer */}
        <div className="text-gray-800 mb-2">
          <div className="flex items-center gap-2">
            <FaUsers className="text-black" />
            <p className="font-medium">{event.organizer.username || "Unknown Organizer"}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 my-4">
          {/* Date Box */}
          <div className="flex flex-col items-center border-2 border-gray-700 px-7 py-2 rounded-lg shadow-md">
            <span className="text-5xl font-bold">{new Date(event.date).getDate()}</span>
            <span className="text-lg">{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</span>
          </div>

          {/* Vertical Line */}
          <div className="h-30 w-0.5 bg-gray-600"></div>

          {/* Location and Time */}
          <div className="flex flex-col gap-2">
            {/* Location */}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-black" />
              <p className="font-medium">{event.location}</p>
              <a 
                href={getGoogleMapsLink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 text-sm">
                Show in Map
              </a>
            </div>
            {/* Time */}
            <div className="flex items-center gap-2">
              <FaClock className="text-black" />
              <p className="font-medium">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        </div>

        {/* Required Skills */}
        <div className="mb-4">
          <p className="text-gray-700 font-semibold mb-2">Requirements:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {event.requiredSkills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Needed & Assigned Count */}
        <p className="text-gray-700 mb-4">
          {event.volunteersNeeded} Needed • {event.volunteersAssigned.length} Participants
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Participate Button */}
          <button onClick={handleParticipate} className="w-full bg-gray-900 text-white font-bold py-2 rounded-lg">
            Participate
          </button>

          {/* Add to Calendar Button */}
          <a 
            href={getGoogleCalendarLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full bg-gray-600 text-white font-bold py-2 rounded-lg text-center flex items-center justify-center">
            Add to Calendar
          </a>
        </div>
      </div>
      
      {/* Event Sidebar */}
      {userId === event.organizer._id && <EventSidebar eventId={id} organizerId={event.organizer._id} userId={userId} />}
    </div>
    </>
  );
};

export default EventDetails;
