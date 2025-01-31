export default async function getMovieReviews(cmsAdapter, movieId, page = 1, pageSize = 5) {
  const reviews = await cmsAdapter.fetchMovieReviews(movieId, page, pageSize);
  return reviews;
}
