import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTrash
} from "react-icons/fa";
import ProfileTopbar from "../components/ProfileTopbar";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Profile = () => {

  const navigate = useNavigate();

  // Extract user ID from URL parameters
  const { id } = useParams();

  const { token, userId: loggedInUserId } = useContext(UserContext); // 🆕 use context instead of localStorage

  // State for storing user data and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Delete profile function
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        const response = await api.delete(`/users/${loggedInUserId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200 || response.status === 204) {  
          toast.success("Your profile deleted successfully!");
          navigate("/");  
        } else {
          alert("Failed to delete your profile: " + (response.data?.message || "Unknown error"));
        }
        
      } catch (error) {
        console.error("Error deleting your profile:", error);
        alert("Something went wrong.");
      }
    }
  };

  // Fetch user details when component mounts or when `id` changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`); // API call to fetch user details
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false); // Stop loading once the request is completed
      }
    };
    fetchUser();
  }, [id]);

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-900"></div>
      </div>
    );
  }

  // Show message if user not found
  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <>
      {/* Topbar Component */}
      <ProfileTopbar />
      {/* Profile Page Container */}
      <div className="flex justify-center items-center min-h-[90vh] bg-gray-50 p-6">
        <div className="w-full max-w-lg bg-white p-6 rounded-3xl shadow-lg">
          {/* Profile Header - Display username and role */}
          <div className="flex items-center gap-4 mb-4">
            <FaUser className="text-5xl text-gray-800" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {user.username}
              </h2>
              <p className="text-gray-600">
                {user.role === "ngo" ? "NGO" : user.role}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-gray-800 space-y-3 mb-6">
            {/* Email */}
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-black" />
              <p>{user.email}</p>
            </div>

            {/* Phone Number (if available) */}
            {user.phoneNumber && (
              <div className="flex items-center gap-2">
                <FaPhone className="text-black" />
                <p>{user.phoneNumber}</p>
              </div>
            )}

            {/* City (if available) */}
            {user.city && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-black" />
                <p>{user.city}</p>
              </div>
            )}
          </div>

          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-700 font-semibold mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Registered Events Section (Only for Volunteers) */}
          {user.role === "volunteer" && (
            <>
              <p className="text-gray-700 font-semibold my-[4%]">
                Registered Events:
              </p>
              {user.eventsRegistered?.length > 0 ? (
                <div className="list-disc text-gray-700">
                  {user.eventsRegistered.map((event) => (
                    <p key={event._id} className="mb-[3%]">
                      <Link
                        to={`/events/${event._id}`}
                        className="text-gray-800 bg-gray-200 rounded-sm px-3 py-1 text-sm hover:bg-gray-300 active:bg-gray-200"
                      >
                        {event.name}
                      </Link>
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No events registered yet.</p>
              )}
            </>
          )}

          {/* Created Events Section (Only for NGOs) */}
          {user.role === "ngo" && (
            <>
              <p className="text-gray-700 font-semibold my-[4%]">
                Created Events:
              </p>
              {user.eventsCreated?.length > 0 ? (
                <div className="list-disc text-gray-700">
                  {user.eventsCreated.map((event) => (
                    <p key={event._id} className="mb-[3%]">
                      <Link
                        to={`/events/${event._id}`}
                        className="text-gray-800 bg-gray-200 rounded-sm px-3 py-1 text-sm hover:bg-gray-300 active:bg-gray-200 transition-all cursor-pointer"
                      >
                        {event.name}
                      </Link>
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No events created yet.</p>
              )}
            </>
          )}

          {/* Edit Profile Button (Only visible for the logged-in user) */}
          {loggedInUserId === user._id && (
            <div className="mt-6 flex items-center gap-2">
              <Link
                to={`/users/${user._id}/edit`}
                className="bg-gray-900 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 w-60 hover:bg-gray-800 active:bg-gray-900 transition-all"
              >
                <FaEdit /> Edit Profile
              </Link>
              <button className="bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 w-60 cursor-pointer hover:bg-red-600 active:bg-red-800 transition-all" onClick={handleDelete}>
                <FaTrash /> Delete Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
