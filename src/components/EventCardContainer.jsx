import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const EventCardContainer = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events'); // Change URL if needed
        const data = await response.json();
        setEvents(data);
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
