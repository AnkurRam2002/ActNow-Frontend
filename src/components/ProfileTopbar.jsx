import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIcon.png";
import Logo from "../assets/Logo.png";
import { PiSignOutBold } from "react-icons/pi";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const ProfileTopBar = () => {
  const navigate = useNavigate();
  const { logout, userRole } = useContext(UserContext);

  const goHome = () => {
    navigate(userRole === "admin" ? "/admin" : "/home");
  };
  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success("Logged out.");
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] px-[2.7%] py-[1.5%] flex justify-between items-center h-[10%] w-full">
      {/* Left section for Logo */}
      <div className="flex items-center">
        <img src={Logo} alt="logo" className="w-[50%]" />
      </div>

      {/* Right section for Home button and Profile */}
      <div className="flex items-center gap-[10%]">
        {/* Home button */}
        <img
          id="home-btn"
          src={homeIcon}
          alt="profile"
          className="h-[2.5vw] cursor-pointer opacity-75 hover:opacity-55 active:opacity-75 transition-all" // Ensuring profile icon has same size as home icon
          onClick={goHome}
        />
        <Tooltip anchorSelect="#home-btn" content="home" />

        {/* Vertical Line between Home and Profile */}
        <div className="h-15 w-[1.7vw] mx-[0.5vw] bg-[#5f5e5a]"></div>

        {/* Logout Button */}
        <button
          id="logout-btn"
          className="logout-btn h-[2.5vw] rounded text-red-700 text-[2.7vw] cursor-pointer hover:text-red-500 active:text-red-700 transition-all"
          onClick={handleLogout}
        >
          <PiSignOutBold />
        </button>
        <Tooltip anchorSelect="#logout-btn" content="logout" />
      </div>
    </div>
  );
};

export default ProfileTopBar;
