import Review from './Review';

export default class PaginatedMovieReviews {
  constructor(backend) {
    this.backend = backend;
  }

  async initReviews(container) {
    const { data: reviews, meta } = await this.backend.fetchReviews();

    reviews.forEach((reviewData) => {
      const review = new Review(reviewData);
      container.append(review.render());
    });

    // Pagination will be added here later
  }
}
