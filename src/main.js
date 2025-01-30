// vite will now compile our scss
import './styles/styles.scss';
//JS Import
import MovieCardGenerator from './js/_frontpage_movie_cards.js';
// import LoadAllFilmsPage from './js/LoadAllFilmsPage.js';
import ApiBackend from './js/ApiBackend.js';
import MobileMenu from './js/MobileMenu.js';
import initLiveEvents from './js/_initLiveEvents.js';
import checkMovieScreenInfo from './js/_initScreenings';
import LoadMovieReviews from './js/Reviews/LoadMovieReviews.js';
import PaginatedMovieReviews from './js/Reviews/PaginatedMovieReviews.js';

if (document.querySelector('.reviews__container')) {
  const apiBase = 'http://localhost:5080/api';
  const movieId = window.location.pathname.split('/').pop();
  const backend = new LoadMovieReviews(apiBase, movieId);

  const movieReviews = new PaginatedMovieReviews(backend);
  movieReviews.initReviews(document.querySelector('.reviews__container'));
} else {
  console.log('No reviews container found.');
}

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
