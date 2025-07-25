// Page exports
export { default as Home } from './Home.jsx';
export { default as Auth } from './Auth.jsx';
export { default as Tables } from './Tables.jsx';
export { default as Order } from './Order.jsx';
export { default as Menu } from './Menu.jsx';
export { default as Dashboard } from './DashBoard.jsx';

// Utility Functions

/**
 * Returns the uppercase initials from a name string.
 * @param {string} name
 * @returns {string}
 */
export const getAvatarName = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

/**
 * Formats a Date object to "Month DD, YYYY"
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
};

/**
 * Formats a date string into a full readable timestamp in IST.
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDateAndTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });
};
