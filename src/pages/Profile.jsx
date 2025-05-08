import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTrash,
} from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";
import { TbActivity } from "react-icons/tb";
import ProfileTopbar from "../components/ProfileTopbar";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const navigate = useNavigate();

  // Extract user ID from URL parameters
  const { id } = useParams();

  const {
    token,
    userId: loggedInUserId,
    userRole,
    username,
    userEmail,
  } = useContext(UserContext); // use context instead of localStorage

  // State for storing user data and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(50); // Default to 50
  const [showInput, setShowInput] = useState(false); // State to toggle input visibility

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
          alert(
            "Failed to delete your profile: " +
              (response.data?.message || "Unknown error")
          );
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

  // Donate function
  const handlePayment = async () => {
    setShowInput(false); // Hide input and button after clicking pay

    const { data } = await api.post("/payment/create-order", { amount });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "NGO Donation",
      description: "Thank you for your support!",
      order_id: data.orderId,

      handler: async function (response) {
        // Send response.razorpay_payment_id to backend for verification/log
        const paymentId = response.razorpay_payment_id;
        const orderId = response.razorpay_order_id;
        const signature = response.razorpay_signature;

        let toastId;

        try {
          const verifyRes = await api.post("/payment/verify", {
            paymentId,
            orderId,
            signature,
          });

          if (verifyRes.data.status === "success") {
            console.log("Payment verified by backend!");

            // Show payment success toast with a spinner for receipt generation
            toastId = toast.success(
              "Payment successful! Generating receipt...",
              {
                icon: (
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                ), // Adds a spinning icon
                autoClose: false, // Keeps the toast open until we manually close it
                closeOnClick: false, // Disables closing by clicking
              }
            );
          } else {
            console.log("Verification failed!");
            toast.error("Payment failed!");
          }
        } catch (err) {
          alert("Error while verifying payment!");
          console.error(err);
        }

        // Generate Receipt
        try {
          const receiptRes = await api.post("/payment/generate-receipt", {
            name: username,
            email: userEmail,
            amount,
            paymentId,
            ngoName: user.username,
          });

          if (receiptRes.data.status === "success") {
            // Update the toast after receipt generation is successful
            toast.update(toastId, {
              render: "Receipt generated successfully!",
              type: "success",
              icon: null, // Remove the spinner
              autoClose: 2000, // Auto-close after a few seconds
            });

            const { receiptName } = receiptRes.data;

            const receiptUrl = `${import.meta.env.VITE_BACKEND_URL.replace(
              "/api",
              ""
            )}/receipts/${receiptName}`;
            console.log(receiptName, receiptUrl);

            window.open(receiptUrl, "_blank");
            console.log("✅ Receipt opened:", receiptUrl);
          } else {
            alert("❌ Receipt generation failed: " + receiptRes.data.message);
          }
        } catch (err) {
          console.error("❌ Error generating receipt:", err);
          alert("An error occurred during receipt generation.");
        }
      },
      prefill: {
        name: username || "", // auto-fill from user context
        email: userEmail || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="bg-gray-100">
      {/* Topbar Component */}
      <ProfileTopbar />
      {/* Profile Page Container */}
      <div className="flex justify-center items-center min-h-[84vh] mt-3 p-6">
        <div className="w-full max-w-lg bg-white p-6 rounded-3xl shadow-lg">
          {/* Profile Header - Display username and role */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <FaUser className="text-5xl text-gray-800" />
              <div>
              <div className="flex gap-2 items-start">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {user.username}
                  </h2>
                  
                  {/* Donate button */}
                  {user?.role === "ngo" && loggedInUserId !== user?._id && (
                    <div>
                      <button
                        onClick={() => {
                          setShowInput(!showInput);
                        }}
                        className="donate-btn"
                      >
                        <BiSolidDonateHeart className="text-purple-400 mt-1 cursor-pointer size-7 hover:text-purple-500 hover:active:text-purple-400 transition-all" />
                      </button>

                      {showInput && (
                        <div className="absolute flex flex-col gap-1">
                          <input
                            type="number"
                            min="50"
                            value={amount}
                            onChange={(e) =>
                              setAmount(Math.max(50, Number(e.target.value)))
                            }
                            placeholder="Enter amount (min ₹50)"
                            className="border rounded px-2 py-1 w-25 h-8"
                          />
                          <button
                            onClick={handlePayment} // Trigger the handlePayment function
                            className="p-2 bg-purple-400 text-white rounded h-8 leading-0 hover:bg-purple-500 active:bg-purple-400 cursor-pointer transition-all"
                          >
                            Donate ₹{amount}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-gray-600">
                  {user.role === "ngo" ? "NGO" : user.role}
                </p>
              </div>
            </div>
            {userRole === "admin" && (
              <button className="" onClick={() => navigate(`/activity/${id}`)}>
                <TbActivity className="w-9 h-9 p-2 text-white bg-gray-800 rounded-full cursor-pointer hover:bg-gray-700 active:bg-gray-800 transition-all mr-3 mt-1" />
              </button>
            )}
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
                <div className="flex flex-wrap gap-2 text-gray-700">
                  {user.eventsRegistered.map((event) => (
                    <p key={event._id} className="mb-1">
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
                <div className="flex flex-wrap gap-2 text-gray-700">
                  {user.eventsCreated.map((event) => (
                    <p key={event._id} className="mb-1">
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
          {(loggedInUserId === user._id || userRole === "admin") && (
            <div className="mt-6 flex items-center gap-2">
              {loggedInUserId === user._id && (
                <Link
                  to={`/users/${user._id}/edit`}
                  className="bg-gray-900 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 w-full hover:bg-gray-800 active:bg-gray-900 transition-all"
                >
                  <FaEdit /> Edit Profile
                </Link>
              )}
              <button
                className="bg-red-800 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 w-full cursor-pointer hover:bg-red-600 active:bg-red-800 transition-all"
                onClick={handleDelete}
              >
                <FaTrash /> Delete Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
