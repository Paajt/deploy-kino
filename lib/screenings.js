const API_MOVIES = 'https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&filters[movie]=';

const screenings = async function (movie) {
  const res = await fetch(API_MOVIES + movie);
  const payload = await res.json();

  if (!payload.data || !Array.isArray(payload.data) || payload.data.length === 0) {
    console.error('No screenings found or invalid data:', payload);
    return [];
  }
  return payload.data.map((screening) => {
    return {
      start_time: screening.attributes.start_time,
      room: screening.attributes.room,
    };
  });
};

export default screenings;
