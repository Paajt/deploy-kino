const apiBase = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function fetchMovieReviews(movieId, page = 1, pageSize = 5) {
  try {
    const res = await fetch(
      `${apiBase}/reviews?filters[movie]=${movieId}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );

    if (!res.ok) {
      throw new Error(`Error! Status: ${res.status}`);
    }

    const payload = await res.json();
    return {
      data: payload.data,
      meta: payload.meta,
    };
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
}
