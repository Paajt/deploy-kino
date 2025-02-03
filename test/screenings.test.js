// Add new tests

// Old tests
/* import { getRandomDateWithinNext5Days } from '../src/js/app';

describe('getRandomDateWithinNext5Days', () => {
  test('should return a date between today and 5 days later', () => {
    const randomDate = getRandomDateWithinNext5Days();
  
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 5);
  
    // Compare timestamps (getTime() returns the timestamp)
    expect(randomDate).toBeInstanceOf(Date);
    expect(randomDate.getTime()).toBeGreaterThanOrEqual(today.getTime());
    expect(randomDate.getTime()).toBeLessThanOrEqual(maxDate.getTime());
  });
});

import { getUpcomingScreenings } from '../src/js/app';

describe('getUpcomingScreenings', () => {
  const mockMovies = [
    { id: 1, attributes: { title: 'Movie 1' } },
    { id: 2, attributes: { title: 'Movie 2' } },
    { id: 3, attributes: { title: 'Movie 3' } },
  ];

  test('should return at most 10 screenings', async () => {
    const screenings = await getUpcomingScreenings(mockMovies);

    expect(screenings.length).toBeLessThanOrEqual(10);
  });

  test('each screening should have a valid start_time', async () => {
    const screenings = await getUpcomingScreenings(mockMovies);

    screenings.forEach(screening => {
      const startTime = new Date(screening.start_time);
      expect(startTime).toBeInstanceOf(Date);
      expect(startTime.getTime()).not.toBeNaN();
    });
  });

  test('each screening should have a valid room', async () => {
    const screenings = await getUpcomingScreenings(mockMovies);

    screenings.forEach(screening => {
      expect(screening.room).toBeDefined();
      expect(['Stora salongen', 'Lilla salongen', 'VIP Room', 'IMAX', 'Screen 5']).toContain(screening.room);
    });
  });
}); */