// vite will now compile our scss
import './styles/styles.scss';
//JS Import
import MovieCardGenerator from './js/_frontpage_movie_cards.js';
// import LoadAllFilmsPage from './js/LoadAllFilmsPage.js';
import MobileMenu from './js/MobileMenu.js';
import initLiveEvents from './js/_initLiveEvents.js';
import checkMovieScreenInfo from './js/_initScreenings';
import ReviewService from './services/ReviewService.js';

const review = document.querySelector('.review');
console.log(review);

const MYAPI = 'localhost:5080';

if (review) {
  const reviewService = new ReviewService(MYAPI);
  reviewService.render();
} else {
  console.log('No review element found');
}

if (window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', initLiveEvents);
}
