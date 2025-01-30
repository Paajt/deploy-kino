import { initApp, setupVite } from './src/js/app.js';
import { loadMovie, loadMovies } from './lib/movies.js';
import { createServer as createViteServer } from 'vite'; // Add Vite
import cmsAdapter from './src/js/cmsAdapter.js';

// Helper function to generate random date within the next 5 days
function getRandomDateWithinNext5Days() {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 5); // 5 days later

  // Get a random date between today and 5 days later
  const randomTime = today.getTime() + Math.random() * (maxDate.getTime() - today.getTime());
  return new Date(randomTime);
}

// Function to generate mock screenings for movies
async function getUpcomingScreenings(movies) {
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
}

// Create an API object with methods
const api = {
  loadMovie,
  loadMovies,
  loadAllScreenings: cmsAdapter.loadAllScreenings,
};

async function startServer() {
  const app = initApp(api);

  if (process.env.NODE_ENV !== 'production') {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: 'true' },
    });

    // Use Vite's middlewares
    app.use(vite.middlewares);

    // Call setupVite to tweak rendering behavior
    await setupVite(app, vite);
  }

  // Home route to show movies and mock screenings
  app.get('/', async (req, res) => {
    try {
      const movies = await api.loadMovies(); // Fetch movies
      const screenings = await getUpcomingScreenings(movies); // Generate mock screenings

      // Render homepage with movies and mock screenings data
      res.render('index.ejs', {
        movies: movies.slice(0, 10),  // Show first 10 movies
        screenings,  // Pass mock screenings data
      });
    } catch (err) {
      console.error('Error loading data', err);
      res.status(500).send('Error loading data');
    }
  });

  const PORT = 5080;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});

// const app = initApp(api);

// if (process.env.NODE_ENV !== 'test') {
//   app.listen(5080, () => {
//     console.log('Server running at http://localhost:5080');
//   });
// }
