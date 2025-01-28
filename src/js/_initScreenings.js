import screenings from '../../lib/screenings';
const checkMovieScreenInfo = async () => {
  if (window.location.pathname.startsWith('/movie/')) {
    const getMovieIDfromUrl = function () {
      const path = window.location.pathname;
      const match = path.match(/\movie\/(\d+)/);

      return match ? match[1] : null;
    };
    const movieID = getMovieIDfromUrl();

    if (movieID) {
      try {
        const screeningData = await screenings(movieID);
        if (screeningData.length === 0) {
          console.warn('No screening available for this movie');
        } else {
          screeningData.forEach((screening) => {
            console.log(`start time: ${screening.start_time}, Room ${screening.room}`);
          });
        }
      } catch (error) {}
      console.error('Error fetching screenings:', error);
    } else {
      console.error('No movie ID found in the url');
    }
  }
};
checkMovieScreenInfo();

export default checkMovieScreenInfo;
