// Back-end focused: deals with routing, setting up the server, fetches data from the API or mock API and renders to the EJS template. 

import express from 'express';
import ejs from 'ejs';
// converts markdown text in to html
import * as marked from 'marked';
import cmsAdapter from './cmsAdapter.js';
import ScreeningList from '../../lib/ScreeningList.js';

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

// vite
async function setupVite(app, vite) {
  // Set views directory
  app.set('views', './views');

  // Update app.render to include Vite transforms for EJS files
  const originalRender = app.render.bind(app);
  app.render = (view, data, callback) => {
    const filePath = `./views/${view}`;
    vite.transformIndexHtml(filePath, '').then(() => {
      originalRender(view, data, callback);
    });
  };
}
// vite

function initApp(api) {
  // create a new express application/server
  const app = express();

  // sets the view engine to EJS
  app.set('view engine', 'ejs');
  // sets view directory (the folder with EJS files)
  app.set('views', './views');

  // Routes
  app.get('/', async (request, response) => {
    try {
      console.log('Fetching movies and screenings');
      const movies = await api.loadMovies(); // Fetch all movies

      // Generate mock screenings for the movies
      const screenings = await getUpcomingScreenings(movies);
  
      const limitedMovies = movies.slice(0, 10);
  
      const today = new Date();
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(today.getDate() + 5);
  
      const limitedScreenings = screenings.filter(screening => {
        const screeningDate = new Date(screening.start_time);
        return screeningDate >= today && screeningDate <= fiveDaysLater;
      }).slice(0, 10); // Limit to 10 screenings
  
      // Render the EJS template with both movies and screenings data
      response.render('index.ejs', {
        movies: limitedMovies,
        screenings: limitedScreenings
      });
    } catch (err) {
      console.error('Error loading data', err);
      response.status(500).send('Error loading data');
    }
  });

  app.get('/about-us', async (request, response) => {
    response.render('about-us.ejs');
  });

  app.get('/movies', async (request, response) => {
    const movies = await api.loadMovies();
    response.render('movies.ejs', { movies });
  });

  // single movie page
  app.get('/movie/:movieId', async (request, response) => {
    try {
      const movie = await api.loadMovie(request.params.movieId);

      if (!movie) {
        return response.status(404).render('404');
      }
      // convert movie intro text from markdown to html
      if (movie && movie.attributes && movie.attributes.intro) {
        movie.attributes.intro = marked.marked(movie.attributes.intro);
      }
      response.render('movie', { movie });
    } catch (err) {
      console.error('Error loading movie', err);
      response.status(500).send('Error loading movie');
    }
  });

  // static assets
  app.use('/static', express.static('static'));

  // catch all 404
  app.use((request, response, next) => {
    response.status(404).render('404');
  });

  return app;
}

export { initApp, setupVite };