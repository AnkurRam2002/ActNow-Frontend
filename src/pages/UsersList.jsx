import React, { useContext, useEffect, useState } from 'react';
import api from '../api'; 
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/EventTopbar'
import { UserContext } from '../context/UserContext';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userRole} = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users'); 
      setUsers(response.data.reverse());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  // If not admin, show nothing and redirect
  if (userRole !== 'admin') {
    setTimeout(() => {
      alert('You are not authorized to access this page.');
      navigate(-1);
    }, 100);
    return null; // Don't render anything
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="p-8 pt-0">
    <TopBar />
      <h1 className="text-4xl font-bold text-center my-8">Users List</h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading users...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user._id)}
              className="p-6 bg-white rounded-lg shadow-lg border hover:shadow-xl transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;
