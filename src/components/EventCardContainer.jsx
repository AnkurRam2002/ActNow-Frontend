import React, { useEffect, useState } from 'react';
import api from '../api'
import EventCard from './EventCard';

const EventCardContainer = ({ query, startDate, endDate, filterType }) => { // Receiving search, date filter and all|my filtertype props

  // State to store the list of events
  const [events, setEvents] = useState([]);

  // Extract user ID from JWT token stored in localStorage
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

  // Fetch event details from the API whenever query, startDate, or endDate changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Construct query parameters dynamically
        const params = {
          ...(query && { q: query }),
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
        };

        // Dynamically deciding the endpoint based on filterType        
        let endpoint = '/events';
        if (filterType === 'my' && userId) {
          endpoint = `/users/${userId}/myEvents`; // Using /myEvents when "MY EVENTS" is selected
        }

        console.log("Requesting:", endpoint, "with params:", params); // Check request 5th log

        const response = await api.get(endpoint, { params });

        console.log("Response received:", response.data); // Check filtered results 6th log

        setEvents([...response.data]); // Update state with new event data
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [query, startDate, endDate, filterType]); // Re-run effect when query, date filters or filtertype change

  // Log whenever events state updates
  useEffect(() => {
    console.log("Events updated:", events); // 7th log
  }, [events]);

  return (
    <div className='absolute top-[90%] left-[20%] w-[75%] flex flex-wrap gap-[3%] pr-[2%]'>

      {/* Mapping event cards in reverse order so the latest event appears first */}
      {events.length > 0 ? (
        events.slice().reverse().map(event => (
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
        ))
      ) : (
        <p className="absolute top-[4vw] left-[0.8vw] text-[1.2vw] w-full text-gray-800 mt-4 font-[Poppins]">No events found matching your criteria.</p>
      )}
    </div>
  );
};

export default EventCardContainer;
