import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import activityMap from '../utils/activityMessages';
import { FaClipboardList } from 'react-icons/fa';

const ActivityTimeline = ({ userId }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const endpoint = userId ? `/admin/activities?userId=${userId}` : '/admin/activities';
        const response = await api.get(endpoint);
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, [userId]); 

  return (
    <div className="min-h-screen bg-gray-300 flex justify-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Activity Timeline{userId ? ` for User: ${userId}` : ''}
        </h1>
        <VerticalTimeline>
          {activities.map((activity, index) => {
            const user = activity.user?.username || 'Unknown';
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
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default ActivityTimeline;


