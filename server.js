// Jennys kommentar: Hanterar request från fetchAndDisplayScreenings.js med funktionen getDisplayedScreenings() för att filtrera och processa visningarna. Server.js hämtar visningarna via CMSAdapter.

import { initApp, setupVite } from './src/js/app.js';
import { loadMovie, loadMovies } from './lib/movies.js';
import { createServer as createViteServer } from 'vite';
import cmsAdapter from './src/js/cmsAdapter.js';

  
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
      const movies = await api.loadMovies();
      const screenings = await mockGetUpcomingScreenings(movies);

      res.render('index.ejs', {
        movies: movies.slice(0, 10), 
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
