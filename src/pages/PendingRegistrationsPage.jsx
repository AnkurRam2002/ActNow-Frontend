import { useEffect, useState } from "react";
import api from "../api";
import { AiOutlineFilePdf } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PendingRegistrationsPage = () => {
  const [pendingList, setPendingList] = useState([]);
  const navigate = useNavigate();

  const fetchPendingRegistrations = async () => {
    try {
      const response = await api.get("admin//pending-registrations");
      setPendingList(response.data);
    } catch (error) {
      console.error("Error fetching pending registrations", error);
    }
  };

  useEffect(() => {
    fetchPendingRegistrations();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.post(`/admin/approve/${id}`);
      fetchPendingRegistrations();
      alert("Registration Approved");
    } catch (error) {
      console.error("Error approving registration", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.delete(`/admin/reject/${id}`);
      fetchPendingRegistrations();
      alert("Registration Rejected");
    } catch (error) {
      console.error("Error rejecting registration", error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100 font-[Poppins]">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pending Registrations</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>

      {pendingList.length === 0 ? (
        <p className="text-gray-600">No pending registrations right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingList.map((registration) => (
            <div
              key={registration._id}
              className="bg-white p-4 rounded-xl shadow flex flex-col gap-4"
            >
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {registration.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {registration.email}
              </p>
              <p>
                <span className="font-semibold">Role:</span>{" "}
                {registration.role}
              </p>

              <a
                href={`${import.meta.env.VITE_BACKEND_URL_UPLOADS}/${registration.idPdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-red-600 gap-2 hover:underline"
              >
                <AiOutlineFilePdf size={20} />
                View ID PDF
              </a>

              <div className="flex gap-4">
                <button
                  onClick={() => handleApprove(registration._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(registration._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingRegistrationsPage;
