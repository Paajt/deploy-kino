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

  // New Methods for Screenings
  
// Get all screenings (GET /screenings)
loadAllScreenings: async () => {
    const url = API_MOVIES + '/screenings';
  
    try {
      const resp = await fetch(url, {
        cache: 'no-store',  // Prevent the browser from using cached data
      });
  
      if (!resp.ok) {
        // Log the status code for debugging
        console.error("Error fetching screenings", resp.status);
        return [];  // Return an empty array if the fetch fails
      }
  
      const payload = await resp.json();
  
      // Log the fetched data for debugging
      console.log("Fetched screenings:", payload);
  
      if (payload && Array.isArray(payload.data)) {
        return payload.data;  // Return the screenings if the data exists
      } else {
        console.error("Invalid data format:", payload);
        return [];  // Return an empty array if the data format is not valid
      }
    } catch (error) {
      // Catch any errors that happen during the fetch
      console.error("Error during fetch:", error);
      return [];  // Return an empty array in case of an error
    }
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