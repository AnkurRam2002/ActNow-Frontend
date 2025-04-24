import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 

const EventsListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events'); 
      setEvents(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Events List</h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              onClick={() => handleEventClick(event._id)}
              className="p-6 bg-white rounded-lg shadow-lg border hover:shadow-xl transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-sm text-gray-800">Status: {event.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsListPage;
