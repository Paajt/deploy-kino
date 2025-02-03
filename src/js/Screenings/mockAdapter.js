
// Function to generate random date within the next 5 days
function getRandomDateWithinNext5Days() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 5);
  
    // Get a random date between today and 5 days later
    const randomTime = today.getTime() + Math.random() * (maxDate.getTime() - today.getTime());
    return new Date(randomTime);
  }
  
  // Function to generate mock screenings for movies
  export default async function mockGetUpcomingScreenings(movies) {
    const rooms = ['Stora salongen', 'Lilla salongen', 'VIP Room', 'IMAX', 'Screen 5'];
  
    // Create a mock screening for each movie (limit to 10)
    return movies.slice(0, 10).map(movie => {
      // Random start time
      const start_time = getRandomDateWithinNext5Days().toISOString();
      
      // Randomly pick a room
      const room = rooms[Math.floor(Math.random() * rooms.length)];
  
      const formattedTime = formatTimeToHH(start_time);
      return {
        movieId: movie.id,
        movieTitle: movie.attributes.title,
        start_time,
        room,
      };
    });
  
    screenings.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
  
    return screenings;
  }

  /* import cmsAdapter from './cmsAdapter.js';

// Function to generate random date within the next 5 days
export function getRandomDateWithinNext5Days() {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 5);

  // Get a random date between today and 5 days later
  const randomTime = today.getTime() + Math.random() * (maxDate.getTime() - today.getTime());
  return new Date(randomTime);
}

// Function to generate mock screenings for movies
export async function mockGetUpcomingScreenings(movies) {
  const rooms = ['Stora salongen', 'Lilla salongen', 'VIP Room', 'IMAX', 'Screen 5'];

  // Create a mock screening for each movie (limit to 10)
  return movies.slice(0, 10).map(movie => {
    // Generate a random start time for the screening
    const start_time = getRandomDateWithinNext5Days().toISOString();
    
    // Randomly pick a room
    const room = rooms[Math.floor(Math.random() * rooms.length)];

    return {
      movieId: movie.id,
      movieTitle: movie.attributes.title,
      start_time,
      room,
    };
  });
} */