import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import activityMap from '../utils/activityMessages';
import { FaClipboardList } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../components/EventTopbar'
import { UserContext } from '../context/UserContext';

const ActivityTimeline = () => {
  const [activities, setActivities] = useState([]);
  const { id } = useParams();
  const {userRole} = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const endpoint = id ? `/admin/activities?userId=${id}` : '/admin/activities';
        const response = await api.get(endpoint);
        setActivities(response.data);
        if (id) {
          setUsername(activities[0].user.username);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, [id, activities]);

  // If not admin, show nothing and redirect
  if (userRole !== 'admin') {
    setTimeout(() => {
      alert('You are not authorized to access this page.');
      navigate(-1);
    }, 100);
    return null; // Don't render anything
  }

  return (
    <div className='bg-gray-300'>
      <TopBar />
      <div className="min-h-screen mt-3 flex justify-center p-6">
        <div className="w-full max-w-4xl">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Activity Timeline{id ? ` for User: ${username}` : ''}
          </h1>
          <VerticalTimeline>
            {activities.map((activity, index) => {
              const user = activity.user?.username || 'Deleted User';
              const { getMessage, icon } = activityMap[activity.action] || {};
              const message = getMessage ? getMessage(user, activity.metadata) : `${user} performed ${activity.action}`;
              const activityIcon = icon || <FaClipboardList />;
              return (
                <VerticalTimelineElement
                  key={index}
                  date={new Date(activity.createdAt).toLocaleString()}
                  iconStyle={{ background: '#4f46e5', color: '#fff' }}
                  icon={activityIcon}
                  contentArrowStyle={{ borderRight: '7px solid #4f46e5' }}
                  contentStyle={{
                    background: '#fff',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    border: '1px solid #4f46e5',
                    borderRadius: '0.5rem',
                  }}
                >
                  <h3 className="font-semibold">{message}</h3>
                  {activity.metadata?.email && (
                    <p className="text-sm text-gray-500">Email: {activity.metadata.email}</p>
                  )}
                  {activity.metadata?.changes && (
                    <div className="text-sm text-gray-500">
                      <p>Changes:</p>
                      <ul className="list-disc pl-5">
                        {Object.entries(activity.metadata.changes).map(([key, value]) => (
                          <li key={key}>
                            {key}: {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activity.metadata?.deletedUser && (
                    <p className="text-sm text-red-500">
                      Deleted ID: {activity.metadata.deletedUser}
                    </p>
                  )}
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;


