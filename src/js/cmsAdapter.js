const API_MOVIES = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapter = {
  // Original Reviews Methods - copy from Kirill 

  loadAllReviews: async () => {
    const url = API_MOVIES + '/reviews';
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload.data;
  },

  postReview: async (data) => {
    const res = await fetch(API_MOVIES + '/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  loadReviewById: async (id) => {
    const url = API_MOVIES + '/reviews?filters[movie]=' + id;
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload.data;
  },

  // Jenny's Screenings
  
loadAllScreenings: async () => {
    const url = API_MOVIES + '/screenings';
  
    try {
      const resp = await fetch(url, {
        cache: 'no-store',
      });
  
      if (!resp.ok) {
        console.error("Error fetching screenings", resp.status);
        return [];
      }
  
      const fetchedScreenings = await resp.json();
  
      if (fetchedScreenings && Array.isArray(fetchedScreenings.data)) {
        return fetchedScreenings.data;
      } else {
        console.error("Invalid data format:", fetchedScreenings);
        return [];
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      return [];
    }
  },

  // Get screenings by movie ID (GET /screenings?filters[movie]=id)
  loadScreeningsByMovieId: async (id) => {
    const url = API_MOVIES + `/screenings?filters[movie]=${id}`;
    const resp = await fetch(url);
    const fetchedScreenings = await resp.json();
    return fetchedScreenings.data;
  },
}

export default cmsAdapter;