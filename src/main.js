// vite will now compile our scss
import './styles/styles.scss';
//JS Import
import MovieCardGenerator from './js/_frontpage_movie_cards.js';
// import LoadAllFilmsPage from './js/LoadAllFilmsPage.js';
import ApiBackend from './js/ApiBackend.js';
import MobileMenu from './js/MobileMenu.js';
import initLiveEvents from './js/_initLiveEvents.js';
import checkMovieScreenInfo from './js/_initScreenings';

// if (document.querySelector('.moviesSecond')) {
//   const loadingMessage = document.createElement('h4');
//   loadingMessage.classList.add('movies__message__new');
//   loadingMessage.innerText = 'Api is starting\nLoading movies... Please wait.';
//   document.querySelector('.movies__message').appendChild(loadingMessage);
//   loadingMessage.style.display = 'none';

//   const backend = new ApiBackend('https://kino-bio-projekt.onrender.com');
//   console.log('Link to API:' + backend);
//   const filmList = new LoadAllFilmsPage(backend);
//   const moviesContainer = document.querySelector('.moviesSecond');

//   filmList.start(moviesContainer, loadingMessage);
// } else {
//   const backend = new ApiBackend('https://kino-bio-projekt.onrender.com');
//   const movieCardGenerator = new MovieCardGenerator(backend);
//   movieCardGenerator.CardGenerator(4);
// }
if (window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', initLiveEvents);
}

document.addEventListener('DOMContentLoaded', async () => {
  const moviesList = document.querySelector('.movies__list');
  moviesList.innerHTML = '<li>Laddar populära filmer...</li>';

  try {
    const response = await fetch('/api/top-movies');
    const movies = await response.json();

    moviesList.innerHTML = '';

    if (!movies.length) {
      moviesList.innerHTML = '<li>Inga topprankade filmer hittades.</li>';
      return;
    }

    movies.forEach((movie) => {
      const movieItem = document.createElement('li');
      movieItem.innerHTML = `
              <a href="/movie/${movie.id}" id="${movie.id}">
                  <article class="movie-card">
                      <img class="movie-card__image" src="${movie.attributes.image.url}" alt="Movie title: ${movie.attributes.title}">
                      <h3 class="movie-card_title">${movie.attributes.title}</h3>
                      <span class="movie-card_rating">⭐ Rating: ${movie.attributes.avgRating}/5</span>
                  </article>
              </a>
          `;
      moviesList.appendChild(movieItem);
    });
  } catch (error) {
    console.error('Fel vid hämtning av topprankade filmer:', error);
    moviesList.innerHTML = '<li>Kunde inte ladda populära filmer.</li>';
  }
});
