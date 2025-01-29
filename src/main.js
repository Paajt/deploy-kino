// vite will now compile our scss
import './styles/styles.scss';
//JS Import
import MovieCardGenerator from './js/_frontpage_movie_cards.js';
// import LoadAllFilmsPage from './js/LoadAllFilmsPage.js';
import MobileMenu from './js/MobileMenu.js';
import initLiveEvents from './js/_initLiveEvents.js';
import checkMovieScreenInfo from './js/_initScreenings';

document.getElementById('reviewForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const movieId = document.getElementById('movieId').value;
  const author = document.getElementById('author').value;
  const comment = document.getElementById('comment').value;
  const rating = parseInt(document.getElementById('rating').value);

  const reviewData = {
    data: {
      comment,
      rating,
      author,
      verified: true,
      movie: '',
      createdAt: '2025-01-29T16:48:30.575Z',
      updatedAt: '2025-01-29T16:48:30.575Z',
      createdBy: 'test',
      updatedBy: 'test',
    },
  };

  try {
    const response = await fetch(`http://localhost:5080/movie/${movieId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const result = await response.json();
    alert('Tack för din kommentar!');
    console.log('Svar:', result);
  } catch (error) {
    console.error('Error:', error);
    alert('Det gick inte att skicka resention');
  }
});
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
