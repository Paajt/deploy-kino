document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Fetch movies and screenings from the backend
      const [moviesResponse, screeningsResponse] = await Promise.all([
        fetch('/api/movies'),  // Adjust the API endpoint if needed
        fetch('/api/screenings')  // Adjust the API endpoint if needed
      ]);
  
      const movies = await moviesResponse.json();
      const screenings = await screeningsResponse.json();
  
      // Get the list container
      const moviesList = document.getElementById('movies-list');
      
      // Loop through movies and display them along with screenings
      movies.forEach(movie => {
        const movieItem = document.createElement('li');
        
        // Create the movie card content
        movieItem.innerHTML = `
          <a href="/movie/${movie.id}" id="${movie.id}">
            <article class="movie-card">
              <img class="movie-card__image" src="${movie.attributes.image.url}" alt="Movie title: ${movie.attributes.title}">
              <h3 class="movie-card__title">${movie.attributes.title}</h3>
              <ul class="screenings-list" id="screenings-${movie.id}">
                <!-- Screenings will be dynamically inserted here -->
              </ul>
            </article>
          </a>
        `;
        
        // Find the screenings for the current movie
        const movieScreenings = screenings.filter(screening => screening.movieId === movie.id);
  
        const screeningsList = movieItem.querySelector('.screenings-list');
        
        // Loop through the screenings and display them
        movieScreenings.forEach(screening => {
          const screeningItem = document.createElement('li');
          const formattedTime = new Date(screening.start_time).toLocaleString(); // Format the time
          screeningItem.innerHTML = `<strong>${screening.room}:</strong> ${formattedTime}`;
          screeningsList.appendChild(screeningItem);
        });
  
        // Append the movie item to the movies list
        moviesList.appendChild(movieItem);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });