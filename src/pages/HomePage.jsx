import { React, useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader";
import EventCardContainer from "../components/EventCardContainer";
import BackToTop from "../components/BackToTop";
import homeBanner from "../assets/homeBanner.png";
import eventsHeading from "../assets/eventsHeading.png";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";

const HomePage = () => {

  const navigate = useNavigate();

  //Request permission after logging in
  useEffect(() => {
    const askNotificationPermission = async () => {
      const justLoggedIn = localStorage.getItem("justLoggedIn");
      const username = localStorage.getItem("username");
  
      // Only run this after a fresh login
      if (justLoggedIn === "true") {
        localStorage.removeItem("justLoggedIn"); // clear the flag after showing once
  
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker Registered:', registration);
  
            const permission = await Notification.requestPermission();
            alert(`Logged in as ${username}`);
  
            if (permission === 'denied') {
              console.warn("User denied notification permission.");
            }
          } catch (error) {
            console.error('Service Worker Error:', error);
          }
        } else {
          alert(`Logged in as ${username}`);
        }
      }
    };
  
    askNotificationPermission();
  }, []);
  

  // State variables for all | my events
  const [filterType, setFilterType] = useState("all");

  // State variables for search query and date filters
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get role directly from localStorage (non-reactive)
  const userRole = localStorage.getItem("userRole");
  // const userRole = loggedInUser?.role;
  console.log(userRole);

  // Handles search query received from HomeHeader component
  const handleSearch = ({ query }) => {
    setQuery(query); // Updates the state with the received search query
    console.log("Query set in HomePage:", query); //3rd log
  };

  // Handles date filter values received from HomeHeader component
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    console.log("Date filters set in Homepage:", { start, end });
  };

  return (
    <div className="relative">
      <HomeHeader onSearch={handleSearch} onDateChange={handleDateChange} />

      <BackToTop />
      <Chatbot />

      <div className="w-[95%] mx-auto mt-[1%]">
        <img src={homeBanner} alt="home banner" className="w-full" />
      </div>

      <div className="absolute top-[90%] left-[5%] w-[12%]">
        <img
          src={eventsHeading}
          alt=""
          className="w-full h-full object-cover rounded-[5%]"
        />
      </div>

      {/* Filter toggle (only show if volunteer) */}
      {userRole === "volunteer" && (
        <div className="absolute top-[70%] left-[20%] flex gap-[10%] items-center w-[30%] text-[1.9vw] font-bold text-white ">
          <p
            className={`hover:bg-[#2727276e] rounded-sm px-[0.4vw] transition-all cursor-pointer border-b-[0.4vw] ${
              filterType === "all" ? "border-[#54F0E3]" : "border-transparent"
            }`}
            onClick={() => setFilterType("all")}
          >
            ALL
          </p>
          <p
            className={`hover:bg-[#2727276e] rounded-sm px-[0.4vw] transition-all cursor-pointer border-b-[0.4vw] ${
              filterType === "my" ? "border-[#54F0E3]" : "border-transparent"
            }`}
            onClick={() => setFilterType("my")}
          >
            MY EVENTS
          </p>
        </div>
      )}

      {/* CREATE NEW button (only show if NGO) */}
      {userRole === "ngo" && (
        <button
          className="create-event-btn absolute mt-[12vw] left-[5%] bg-blue-800 text-white px-[2vw] py-[1vw] text-[1.1vw] rounded-sm sm:rounded-lg font-semibold font-[Poppins] hover:bg-blue-700 cursor-pointer"
          onClick={() => navigate("/create-event")}
        >
          CREATE NEW +
        </button>
      )}

      {/* EventCardContainer receives search and date filter values as props */}
      <EventCardContainer
        query={query}
        startDate={startDate}
        endDate={endDate}
        filterType={filterType}
        userRole={userRole}
      />
    </div>
  );
};

export default HomePage;
