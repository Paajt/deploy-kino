const API_MOVIES = 'https://plankton-app-xhkom.ondigitalocean.app/api';
// kirill
export const cmsAdapter = {
  loadAllReviews: async () => {
    const url = API_MOVIES + '/reviews';
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload.data;
  },
  postReview: async () => {
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
};
//
// Henrik
export const cmsAdapterScreenings = {
  loadAllScreenings: async () => {
    const url = API_MOVIES + '/screenings';
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload.data;
  },
  loadScreeningById: async (id) => {
    const url = API_MOVIES + '/screenings?filters[movie]=' + id;
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload.data;
  },
};

export default { cmsAdapter, cmsAdapterScreenings };
