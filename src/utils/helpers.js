function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleString('pl-PL', options);
}

function formatTime(date) {
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return date.toLocaleString('pl-PL', options);
}

export { formatDate, formatTime };
