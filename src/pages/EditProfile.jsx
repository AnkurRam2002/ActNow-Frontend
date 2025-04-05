import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { FaPlus, FaTrash } from "react-icons/fa";

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true); // for blocking render

  // Extracted userId from token for authorization check
  const loggedInUserId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

  const [profileData, setProfileData] = useState({
    username: "",
    phoneNumber: "",
    city: "",
    skills: [],
    newSkill: "",
  });

  useEffect(() => {

    // Redirected to home page if the profile does not belong to the logged in user
    if (loggedInUserId !== id) {
      alert("You are not authorized to edit this profile.");
      navigate("/home");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data;

        setProfileData({
          username: data.username || "",
          phoneNumber: data.phoneNumber || "",
          city: data.city || "",
          skills: data.skills || [],
          newSkill: "",
        });

        setLoading(false);

      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return null; // Don't show anything until auth check is done

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = () => {
    if (profileData.newSkill.trim() !== "" && !profileData.skills.includes(profileData.newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, profileData.newSkill.trim()],
        newSkill: "",
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: profileData.username,
      phoneNumber: profileData.phoneNumber,
      city: profileData.city,
      skills: profileData.skills,
    };

    try {
      const response = await api.put(`/users/${id}/edit`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Profile updated successfully!");
        navigate(`/users/${id}`);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={profileData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="city"
          value={profileData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border rounded"
        />

        {/* Skills section */}
        <div>
          <label className="block font-semibold mb-1">Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="newSkill"
              value={profileData.newSkill}
              onChange={handleChange}
              placeholder="Add skill"
              className="flex-grow p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-[#6a7c91] text-white px-3 rounded hover:bg-[#4f5d6c] cursor-pointer"
              title="Add Skill"
            >
              <FaPlus />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {profileData.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center bg-gray-200 px-2 py-1 rounded">
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-gray-800 hover:text-red-600"
                  title="Remove Skill"
                >
                  <FaTrash className="size-[0.8vw] cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
