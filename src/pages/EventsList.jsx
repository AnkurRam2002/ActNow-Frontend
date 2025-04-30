import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import TopBar from '../components/EventTopbar' 
import { UserContext } from '../context/UserContext';

const EventsListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userRole} = useContext(UserContext);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events'); 
      setEvents(response.data.reverse()); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === 'admin') {
      fetchEvents();
    }
  }, []);

  // If not admin, show nothing and redirect
  if (userRole !== 'admin') {
    setTimeout(() => {
      alert('You are not authorized to access this page.');
      navigate(-1);
    }, 100);
    return null; // Don't render anything
  }

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="bg-gray-100">
      <TopBar />
      <h1 className="text-4xl font-bold text-center my-8">Events List</h1>

      <div className='px-8 mb-8'>
        {loading ? (
          <p className="text-gray-600 text-center">Loading events...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => handleEventClick(event._id)}
                className="p-6 bg-white rounded-lg shadow-lg border-3 border-gray-200 hover:shadow-xl transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                <p className="text-sm text-gray-800">Status: {event.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsListPage;
