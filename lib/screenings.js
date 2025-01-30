const API_MOVIES = 'https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&filters[movie]=';

const screenings = async function (movieId) {
  const res = await fetch(API_MOVIES + movieId);
  const payload = await res.json();
  // const API_screenings = await fetch(`/screenings/${movieId}/movie`);
  // const payload = await API_screenings.json;

  if (!payload.data || !Array.isArray(payload.data) || payload.data.length === 0) {
    console.error('No screenings found or invalid data:', payload);
    return [];
  }
  const now = new Date(); //gets current time

  return payload.data
    .filter((screening) => {
      const screeningTime = new Date(screening.attributes.start_time);
      // screeningTime.setFullYear(2025); //use until api is updated.
      return screeningTime >= now;
    })
    .map((screening) => ({
      start_time: screening.attributes.start_time,
      room: screening.attributes.room,
    }));
};

export default screenings;
