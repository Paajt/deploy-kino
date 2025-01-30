export default class LoadMovieReviews {
  constructor(url, movieId, page = 1, pageSize = 5) {
    this.url = url;
    this.movieId = movieId;
    this.page = page;
    this.pageSize = pageSize;
  }

  async fetchReviews() {
    try {
      const response = await fetch(
        `${this.url}/movie/${this.movieId}/reviews?page=${this.page}&pageSize=${this.pageSize}`
      );

      if (!response.ok) throw new Error('Failed to fetch reviews');

      const rawData = await response.json();

      const transformedData = {
        data: rawData.data.map((item) => ({
          id: item.id,
          ...item.attributes,
        })),
        meta: rawData.meta,
      };
      return transformedData;
    } catch (error) {
      console.error('Error fetching movie reviews:', error);
      return { data: [], meta: { pagination: {} } };
    }
  }
}
