import mockGetUpcomingScreenings from '../src/js/Screenings/mockAdapter';

describe('mockGetUpcomingScreenings', () => {
  const mockMovies = [
    { id: 1, attributes: { title: 'Movie 1' } },
    { id: 2, attributes: { title: 'Movie 2' } },
    { id: 3, attributes: { title: 'Movie 3' } },
  ];

  test('should return no more than 10 screenings', async () => {
    const screenings = mockGetUpcomingScreenings(mockMovies);

    expect(screenings.length).toBeLessThanOrEqual(10);
  });

  test('screenings should only be for the next 5 days', () => {
    const screenings = mockGetUpcomingScreenings(mockMovies);

    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 5);

    screenings.forEach(screening => {
      const screeningDate = new Date(screening.start_time);
      
      expect(screeningDate.getTime()).toBeGreaterThanOrEqual(today.getTime());
      expect(screeningDate.getTime()).toBeLessThanOrEqual(maxDate.getTime());
    });
  });
});