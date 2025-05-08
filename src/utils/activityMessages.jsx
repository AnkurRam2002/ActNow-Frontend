import {
    FaUser,
    FaDonate,
    FaSignInAlt,
    FaSignOutAlt,
    FaEdit,
    FaTrash,
    FaPlus,
    FaTimes,
    FaRegCalendarCheck
  } from 'react-icons/fa';
  
  const activityMap = {
    'user-login': {
      getMessage: (user) => `${user} logged in`,
      icon: <FaSignInAlt />
    },
    'user-logout': {
      getMessage: (user) => `${user} logged out`,
      icon: <FaSignOutAlt />
    },
    'user-register': {
      getMessage: (user, meta) => `${user} registration approved by Admin for role ${meta?.role}`,
      icon: <FaUser />
    },
    'user-edit': {
      getMessage: (user) => `${user} updated their profile`,
      icon: <FaEdit />
    },
    'user-delete': {
      getMessage: (user) => `${user} deleted their account`,
      icon: <FaTrash />
    },
    'user-donate': {
      getMessage: (user, meta) => `${user} donated ${meta?.amount} INR to ${meta?.ngoName}`,
      icon: <FaDonate />
    },
    'event-create': {
      getMessage: (user, meta) => `${user} created event "${meta?.eventName}"`,
      icon: <FaPlus />
    },
    'event-edit': {
      getMessage: (user, meta) => `${user} edited event "${meta?.eventName}"`,
      icon: <FaEdit />
    },
    'event-delete': {
      getMessage: (user, meta) => `${user} deleted event "${meta?.eventName}"`,
      icon: <FaTrash />
    },
    'event-participate': {
      getMessage: (user, meta) => `${user} joined event "${meta?.eventName}"`,
      icon: <FaRegCalendarCheck />
    },
    'event-unparticipate': {
      getMessage: (user, meta) => `${user} left event "${meta?.eventName}"`,
      icon: <FaTimes />
    }
  };
  
  export default activityMap;
  
  