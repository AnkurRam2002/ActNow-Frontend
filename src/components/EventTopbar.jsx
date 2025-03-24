import { FaUser, FaHome } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Left: Profile Icon and Logo */}
      <div className="flex items-center gap-2">
        <FaUser className="text-gray-700 text-xl" />
        <h1 className="text-2xl font-bold text-gray-900">ActNow</h1>
      </div>

      {/* Right: Home Button */}
      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100">
        <FaHome />
        <span>Home</span>
      </button>
    </div>
  );
};

export default TopBar;
