// Function to generate a random date within the next 5 days
const mockGetUpcomingScreenings = (movies) => {

  const getRandomDateWithinNext5Days = () => {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);
  return new Date(today.getTime() + Math.random() * (maxDate.getTime() - today.getTime()));
};
  const rooms = ['Stora salongen', 'Lilla salongen', 'VIP Room', 'IMAX', 'Screen 5'];

  // Create a mock screening for each movie, limit to first 10
  return movies.slice(0, 10).map(({ id, attributes: { title } }) => ({
    movieId: id,
    movieTitle: title,
    start_time: getRandomDateWithinNext5Days().toISOString(),
    room: rooms[Math.floor(Math.random() * rooms.length)],
  }))
  .sort((a, b) => new Date(a.start_time) - new Date(b.start_time)); // Sort by start_time
};

export default mockGetUpcomingScreenings;