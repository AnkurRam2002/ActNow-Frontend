import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import TopBar from "../components/EventTopbar";
import api from "../api";
import {
  AiFillCalendar,
  AiFillCheckCircle,
  AiOutlineCalendar,
} from "react-icons/ai";
import { FaUsers, FaUserFriends } from "react-icons/fa";
import { LuSquareActivity } from "react-icons/lu";
import { RiTimerFlashLine } from "react-icons/ri";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Register chart.js elements

// Register chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHomePage = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext);

  // Mocked stats and activities
  const [eventCount, setEventCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // If not admin, show nothing and redirect
  if (userRole !== "admin") {
    setTimeout(() => {
      alert("You are not authorized to access this page.");
      navigate(-1);
    }, 100);
    return null; // Don't render anything
  }

  useEffect(() => {
    // Fetch the event count from the backend using your API module
    const fetchEventCount = async () => {
      try {
        console.log("Fetching event count...");
        const response = await api.get("/events/events-count"); // Make sure this matches your API endpoint
        setEventCount(response.data.count); // Adjusted to match the response structure { count: eventCount }
        setCompletedCount(response.data.completedEvents); // Completed event count
        console.log("Event Count:", response.data.count); // Logs the fetched count
      } catch (error) {
        console.log("Error fetching event count");
        console.log(error.message);
      }
    };

    // Fetch the user count from the backend using your API module
    const fetchUserCount = async () => {
      try {
        console.log("Fetching user count...");
        const response = await api.get("/users/users-count"); // Make sure this matches your API endpoint
        setUserCount(response.data.count); // Adjusted to match the response structure { count: eventCount }
        console.log("User Count:", response.data.count); // Logs the fetched count
      } catch (error) {
        console.log("Error fetching user count");
        console.log(error.message);
      }
    };

    fetchEventCount();
    fetchUserCount();
  }, []);

  // Donut Chart Data
  const data = {
    labels: [
      `Completed Events (${completedCount})`,
      `Active Events (${eventCount - completedCount})`,
    ], // Labels for the chart
    datasets: [
      {
        data: [completedCount, eventCount - completedCount], // The data for the chart
        backgroundColor: ["#52b788", "#ffc43d"], // Colors for each section of the donut chart
        borderColor: ["#ffffff", "#ffffff"], // Border color for segments
        borderWidth: 2, // Border width between the segments
      },
    ],
  };

  return (
    <>
      <TopBar />
      <div className="flex flex-col lg:flex-row justify-center gap-10 items-center p-6 bg-gray-100 min-h-[84vh]">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatCard
            label="Total Events"
            count={eventCount}
            icon={AiFillCalendar}
          />
          <StatCard
            label="Completed Events"
            count={completedCount}
            icon={AiFillCheckCircle}
          />
          <StatCard label="Users" count={userCount} icon={FaUsers} />
          <StatCard
            label="Active Events"
            count={eventCount - completedCount}
            icon={RiTimerFlashLine}
          />
        </div>

        {/* Donut Chart Section */}
        <div className="flex items-center gap-8 font-[Poppins] bg-white p-8 rounded-xl shadow-lg">
          {/* Chart Container */}
          <div className="w-46 h-46">
            <Doughnut data={data} /> {/* Render the Donut chart here */}
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 font-[Poppins]">
            <div className="flex gap-6">
              {/* Events Button */}
              <button
                onClick={() => navigate("/events")}
                className="w-28 h-28 rounded-xl bg-gradient-to-br from-blue-100 to-blue-300 hover:from-blue-200 hover:to-blue-400 shadow-lg hover:shadow-xl flex flex-col items-center justify-center gap-2 text-blue-900 font-semibold cursor-pointer"
              >
                <AiOutlineCalendar size={28} className="text-blue-800" />
                Events
              </button>

              {/* Users Button */}
              <button
                onClick={() => navigate("/users")}
                className="w-28 h-28 rounded-xl bg-gradient-to-br from-orange-100 to-orange-300 hover:from-orange-200 hover:to-orange-400 shadow-lg hover:shadow-xl flex flex-col items-center justify-center gap-2 text-orange-900 font-semibold cursor-pointer"
              >
                <FaUserFriends size={26} className="text-orange-700" />
                Users
              </button>
            </div>

            {/* Activities Button */}
            <button
              onClick={() => navigate("/activity")}
              className="w-60 h-28 rounded-xl bg-gradient-to-br from-purple-100 to-purple-300 hover:from-purple-200 hover:to-purple-400 shadow-lg hover:shadow-xl flex flex-col items-center justify-center gap-2 text-purple-900 font-semibold cursor-pointer"
            >
              <LuSquareActivity size={28} className="text-purple-800" />
              Activities
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;

// StatCard Component
const StatCard = ({ label, count, icon: Icon }) => (
  <div className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4 h-28">
    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xl font-semibold">{count}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);
