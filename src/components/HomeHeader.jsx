import React, { useState, useEffect, useRef } from "react";
import profileIcon from "../assets/profileIcon.png";
import Logo from "../assets/Logo.png";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";

const HomeHeader = ({ onSearch, onDateChange }) => {
  // Change: Reference to the menu container to detect clicks outside
  const menuRef = useRef(null);

  // State variables
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside or on scroll
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleScroll = () => {
    setIsMenuOpen(false);
  };

  // Attach event listeners for click outside and scroll
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Change: Function to handle search queries from SearchBar
  const handleSearch = ({ query }) => {
    if (onSearch) {
      console.log(
        "homeheader -> passing query from searchbar to homepage:",
        query
      ); //2nd log
      onSearch({ query }); // Pass search data to HomePage
    }
  };

  // Change: Function to handle date changes and pass to parent component
  const handleDateChange = (start, end) => {
    if (onDateChange) {
      onDateChange(start, end); // Pass selected dates to HomePage
    }
  };

  return (
    <div className="home-header px-[2.7%] py-[1.5%] flex gap-[5%] h-[10%] w-full">
      {/* Left Section: Profile Icon, Dropdown Menu, and Logo */}
      <div
        ref={menuRef}
        className="left-section w-[20%] flex items-center justify-start gap-[8%]"
      >
        {/* Profile Icon - Opens/Closes the profile menu */}
        <img
          src={profileIcon}
          alt="profile"
          className="h-[60%] cursor-pointer hover:opacity-80 active:opacity-100 transition-all"
          onClick={toggleMenu}
        />

        {/* Profile Dropdown Menu */}
        {isMenuOpen && (
          <div className="profile-menu fixed md:top-[12%] top-[9%] left-[2%] w-[18%]">
            <ProfileMenu />
          </div>
        )}

        <img src={Logo} alt="logo" className="w-[50%]" />
      </div>

      {/* Middle Section: Search Bar */}
      <div className="middle-section flex justify-end items-center w-[40%]">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right Section: Date Filters */}
      <div className="right-section w-[30%] flex gap-[2%] items-center text-[1.1vw]">
        {/* Start Date Input */}
        <input
          type="date"
          className="start-date w-[50%] h-[65%] border border-[#b3b3b3] rounded-l-full px-[3%] text-[#757575] focus:outline-none focus:ring-2 ring-inset ring-gray-300"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            handleDateChange(e.target.value, endDate);
          }}
        />

        {/* End Date Input */}
        <input
          type="date"
          className="end-date w-[50%] h-[65%] border border-[#b3b3b3] rounded-r-full px-[3%] text-[#757575] focus:outline-none focus:ring-2 ring-inset ring-gray-300"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            handleDateChange(startDate, e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default HomeHeader;
