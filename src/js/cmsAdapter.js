const API_MOVIES = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const cmsAdapter = {
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

  fetchMovieReviews: async (movieId, page = 1, pageSize = 5) => {
    const url = `${API_MOVIES}/reviews?filters[movie]=${movieId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(`API request failed with status ${resp.status}`);
    }

    const payload = await resp.json();
    return {
      data: payload.data.map((item) => ({
        id: item.id,
        rating: item.attributes.rating,
        comment: item.attributes.comment,
        author: item.attributes.author,
      })),
      meta: payload.meta,
    };
  },
};
export default cmsAdapter;
