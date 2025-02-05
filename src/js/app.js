// Back-end focused: deals with routing, setting up the server, fetches data from the API or mock API and renders to the EJS template. 

import express from 'express';
import ejs from 'ejs';
// converts markdown text in to html
import * as marked from 'marked';
import getDisplayedScreenings from './Screenings/fetchAndDisplayScreenings.js'
import cmsAdapter from './cmsAdapter.js';
import { loadMoviesAndFilter } from './Screenings/movieLoader.js';

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

  app.get('/', async (request, response) => {
    try {
      const movies = await loadMoviesAndFilter(cmsAdapter);
      response.render('index.ejs', { movies });
    } catch (err) {
      console.error('Error loading movies', err);
      response.status(500).send('Error loading movies');
    }
  });

  app.get('/movie/:movieId/screenings/upcoming', async (request, response) => {
    try {
        const movieId = request.params.movieId;
        const displayScreenings = await getDisplayedScreenings(cmsAdapter, movieId);
        response.json(displayScreenings);
    } catch (err) {
        console.error('Error getting screenings', err);
        response.status(500).json({ err: 'Internal Server Error', message: err.message });
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