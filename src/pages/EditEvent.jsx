import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import EventTopbar from "../components/EventTopbar";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    requiredSkills: "",
    volunteersNeeded: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.status === 200) {
          const data = await response.data;
          setEventData({
            name: data.name,
            description: data.description,
            date: new Date(data.date).toISOString().slice(0, 16),
            location: data.location,
            requiredSkills: data.requiredSkills.join(","),
            volunteersNeeded: data.volunteersNeeded,
          });
        } else {
          alert("Failed to fetch event details.");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Error fetching event details.");
      }
    };
    
    fetchEvent();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const eventPayload = {
      ...eventData,
      requiredSkills: eventData.requiredSkills.split(","),
      volunteersNeeded: parseInt(eventData.volunteersNeeded, 10),
    };

    try {
      const response = await api.put(`/events/${id}/edit`, eventPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Event updated successfully!");
        navigate(`/events/${id}`);
      } else {
        alert("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Error updating event.");
    }
  };

  return (
    <>
    <EventTopbar />
    <div className="max-w-lg mx-auto my-10 p-6 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          placeholder="Event Name"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="requiredSkills"
          value={eventData.requiredSkills}
          onChange={handleChange}
          placeholder="Required Skills (comma-separated)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="volunteersNeeded"
          value={eventData.volunteersNeeded}
          onChange={handleChange}
          placeholder="Volunteers Needed"
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded"
        >
          Update Event
        </button>
      </form>
    </div>
    </>
  );
};

export default EditEvent;