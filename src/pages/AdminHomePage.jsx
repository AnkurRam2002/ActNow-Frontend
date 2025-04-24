import { useNavigate } from 'react-router-dom';
import TopBar from '../components/EventTopbar';

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <>
    <TopBar />
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/events')}
            className="cursor-pointer w-24 h-24 bg-white border border-black rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center text-base font-medium"
          >
            Events
          </button>
          <button
            onClick={() => navigate('/users')}
            className="cursor-pointer w-24 h-24 bg-white border border-black rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center text-base font-medium"
          >
            Users
          </button>
        </div>
        <button
          onClick={() => navigate('/activity')}
          className="cursor-pointer w-52 h-24 bg-white border border-black rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-center text-base font-medium"
        >
          Activities
        </button>
      </div>
    </div>
    </>
  );
};

export default AdminHomePage;

