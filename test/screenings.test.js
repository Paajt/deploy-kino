import { it, describe, expect } from '@jest/globals';
import { getDisplayedScreenings } from '../src/js/Screenings/fetchAndDisplayScreenings';

const getDisplayedScreeningsTest = getDisplayedScreenings('./fetchAndDisplayScreenings.js')
const date = new Date()
const mockScreenings = [
  {
    id:1, 
    attributes: {
      start_time:  date.setDate(date.getDate()+ 3).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:2, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 6).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:3, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 3).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:4, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 5).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:5, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 3).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:6, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 2).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:7, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 4).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:8, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 5).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:9, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 2).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:10, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 1).toISOString(),
      room: 'Stora salongen'
    },
  },
  {
    id:11, 
    attributes: {
      start_time: date.setDate(date.getDate()+ 3).toISOString(),
      room: 'Stora salongen'
    },
  },
]
jest.mock('getDisplayedScreenings'); 

const mockCmsAdapter = {
  loadScreeningsByMovieId: jest.fn(),
};

describe('getDisplayedScreeningsTest', () => {
  beforeAll(() => {
    // Mock the current date
    const fixedDate = new Date('2025-02-04T00:00:00Z'); 
    global.Date = jest.fn(() => fixedDate); // Mock global Date object

    // Mock the loadScreeningsByMovieId method to return mocked screenings
    mockCmsAdapter.loadScreeningsByMovieId.mockResolvedValue(mockScreenings);
  });

  it('Should only show movies within the upcoming five days and a maximum of ten screenings', async () => {
    // Call the function with the mock adapter and a movie ID
    const result = await getDisplayedScreenings(mockCmsAdapter, 'someMovieId');
    expect(result).toHaveLength(10);

    result.forEach(screening => {
      const screeningDate = new Date(screening.attributes.start_time);
      const today = new Date();
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(today.getDate() + 5);
      expect(screeningDate).toBeGreaterThanOrEqual(today);
      expect(screeningDate).toBeLessThanOrEqual(fiveDaysLater);
    });

    expect(result.length).toBeLessThanOrEqual(10);
  });
});