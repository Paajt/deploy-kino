import { it, describe, expect, jest, beforeEach, afterEach } from '@jest/globals';
import loadMoviesAndFilter from '../src/js/Screenings/movieLoader.js';
import cmsAdapter from '../src/js/cmsAdapter.js';

jest.mock('../src/js/cmsAdapter.js');

const generateMockScreenings = () => {
  const date = new Date();
  return [
    { id: 1, attributes: { start_time: new Date(date.setDate(date.getDate() + 3)).toISOString(), room: 'Stora salongen' } },
    { id: 2, attributes: { start_time: new Date(date.setDate(date.getDate() + 6)).toISOString(), room: 'Stora salongen' } },
    { id: 3, attributes: { start_time: new Date(date.setDate(date.getDate() + 3)).toISOString(), room: 'Stora salongen' } },
    { id: 4, attributes: { start_time: new Date(date.setDate(date.getDate() + 5)).toISOString(), room: 'Stora salongen' } },
    { id: 5, attributes: { start_time: new Date(date.setDate(date.getDate() + 3)).toISOString(), room: 'Stora salongen' } },
    { id: 6, attributes: { start_time: new Date(date.setDate(date.getDate() + 2)).toISOString(), room: 'Stora salongen' } },
    { id: 7, attributes: { start_time: new Date(date.setDate(date.getDate() + 4)).toISOString(), room: 'Stora salongen' } },
    { id: 8, attributes: { start_time: new Date(date.setDate(date.getDate() + 5)).toISOString(), room: 'Stora salongen' } },
    { id: 9, attributes: { start_time: new Date(date.setDate(date.getDate() + 2)).toISOString(), room: 'Stora salongen' } },
    { id: 10, attributes: { start_time: new Date(date.setDate(date.getDate() + 1)).toISOString(), room: 'Stora salongen' } },
    { id: 11, attributes: { start_time: new Date(date.setDate(date.getDate() + 3)).toISOString(), room: 'Stora salongen' } }
  ];
};

const mockMovies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
];

describe('loadMoviesAndFilter', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('should return filtered movies with screenings within the next five days', async () => {
    const mockScreenings = generateMockScreenings();

    cmsAdapter.loadMovies.mockResolvedValue(mockMovies);
    cmsAdapter.loadScreeningsByMovieId.mockResolvedValue(mockScreenings);

    const filteredMovies = await loadMoviesAndFilter(cmsAdapter);

    expect(filteredMovies).toEqual([
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ]);
  });

  it('should return only 10 movies if there are more than 10 valid movies', async () => {
    const mockMoviesExtended = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Movie ${i + 1}`,
    }));

    const mockScreenings = generateMockScreenings();

    cmsAdapter.loadMovies.mockResolvedValue(mockMoviesExtended);
    cmsAdapter.loadScreeningsByMovieId.mockResolvedValue(mockScreenings);

    const filteredMovies = await loadMoviesAndFilter(cmsAdapter);

    expect(filteredMovies).toHaveLength(10);
  });
});