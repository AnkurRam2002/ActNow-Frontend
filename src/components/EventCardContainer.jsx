import React, { useEffect, useState } from 'react';
import api from '../api'
import EventCard from './EventCard';

const EventCardContainer = () => {

  // State to store the list of events
  const [events, setEvents] = useState([]);

  // Fetching event details from api
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events'); // API call to get events data
        setEvents(response.data); // Updating state with fetched events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div className='absolute top-[90%] left-[20%] w-[75%] flex flex-wrap gap-[3%] pr-[2%]'>

      {/* Mapping event cards in reverse order so the latest event appears first */}
      {events.slice().reverse().map(event => (
        <EventCard 
          key={event._id} 
          eventId={event._id}
          name={event.name}
          status={event.status} 
          ngo={event.organizer?.username || 'Anonymous NGO'} 
          city={event.location} 
          date={new Date(event.date).toLocaleDateString("en-GB")} 
          description={event.description}
          needed={event.volunteersNeeded.length} 
          assigned={event.volunteersAssigned.length}
        />
      ))}
    </div>
  );
};

export default EventCardContainer;
