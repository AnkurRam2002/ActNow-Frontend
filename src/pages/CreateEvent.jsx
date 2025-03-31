import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreateEvent = () => {
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
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (!token) {
      navigate("/login");
      setTimeout(() => {
        alert("Please log in.");
      }, 100); 
    } else if (userRole !== "ngo") {
      navigate("/home");
      setTimeout(() => {
        alert("You are not authorized to create events.");
      }, 100);
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const eventPayload = {
      ...eventData,
      requiredSkills: eventData.requiredSkills.split(","), // Convert skills to an array
      volunteersNeeded: parseInt(eventData.volunteersNeeded, 10),
    };

    try {
      const response = await api.post("/events/create", eventPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Event created successfully!");
        setEventData({
          name: "",
          description: "",
          date: "",
          location: "",
          requiredSkills: "",
          volunteersNeeded: "",
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create an Event</h2>
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
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
