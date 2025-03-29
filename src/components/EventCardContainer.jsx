import React, { useEffect, useState } from 'react';
import api from '../api'
import EventCard from './EventCard';

const EventCardContainer = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='absolute top-[90%] left-[20%] w-[75%] flex flex-wrap gap-[3%] pr-[2%]'>
      {events.map(event => (
        <EventCard 
          key={event._id} 
          name={event.name} 
          ngo={event.organizer?.username || 'Anonymous NGO'} 
          city={event.location} 
          date={new Date(event.date).toLocaleDateString()} 
          description={event.description} 
        />
      ))}
    </div>
  );
};

export default EventCardContainer;
