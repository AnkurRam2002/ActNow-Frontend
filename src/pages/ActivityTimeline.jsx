import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import activityMap from '../utils/activityMessages';
import { FaClipboardList } from 'react-icons/fa';

const ActivityTimeline = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/admin/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Activity Timeline</h1>
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
            >
              <h3 className="font-semibold">{message}</h3>
              {activity.metadata?.email && (
                <p className="text-sm text-gray-500">Email: {activity.metadata.email}</p>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
};

export default ActivityTimeline;

