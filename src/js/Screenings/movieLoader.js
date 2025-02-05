// Add the function to filter the movies here instead of in app.js??

import getDisplayedScreenings from "./fetchAndDisplayScreenings.js";
import cmsAdapter from "../cmsAdapter.js";

export async function loadMoviesAndFilter(cmsAdapter) {
  try {
    const movies = await cmsAdapter.loadMovies();
    const filteredMovies = [];

    for (let movie of movies) {
      const movieId = movie.id;

      const displayScreenings = await getDisplayedScreenings(cmsAdapter, movieId);

      const upcomingScreenings = displayScreenings.filter(screening => {
        const screeningDate = new Date(screening.attributes.start_time);
        const today = new Date();
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 5);

        return screeningDate >= today && screeningDate <= maxDate;
      });

      if (upcomingScreenings.length > 0) {
        filteredMovies.push(movie);
      }
    }

    const limitedMovies = filteredMovies.slice(0, 10);
    return limitedMovies;

  } catch (err) {
      throw new Error('Error loading and filtered movies:' + err.message);
    }
  }