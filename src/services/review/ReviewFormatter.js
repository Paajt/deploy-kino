export class ReviewFormatter {
  static format(comment, rating, movieId, author) {
    return {
      data: {
        comment,
        rating,
        author: author.username,
        verified: author.verified,
        movie: movieId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
  }
}
