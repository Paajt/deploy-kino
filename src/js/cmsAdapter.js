const API_MOVIES = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapter = {
  // Original Reviews Methods

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

  // New Methods for Screenings
  
  // Get all screenings (GET /screenings)
  loadAllScreenings: async () => {
    const url = API_MOVIES + '/screenings';
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload.data;
  },

  // Get screenings by movie ID (GET /screenings?filters[movie]=id)
  loadScreeningsByMovieId: async (id) => {
    const url = API_MOVIES + `/screenings?filters[movie]=${id}`;
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload.data;
  },

  // Post a new screening (POST /screenings)
  postScreening: async (data) => {
    const res = await fetch(API_MOVIES + '/screenings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Get a specific screening by ID (GET /screenings/{id})
  loadScreeningById: async (id) => {
    const url = API_MOVIES + `/screenings/${id}`;
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload.data;
  },

  // Update a specific screening by ID (PUT /screenings/{id})
  updateScreening: async (id, data) => {
    const res = await fetch(API_MOVIES + `/screenings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Delete a specific screening by ID (DELETE /screenings/{id})
  deleteScreening: async (id) => {
    const res = await fetch(API_MOVIES + `/screenings/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },
};

export default cmsAdapter;