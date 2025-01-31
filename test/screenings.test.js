import { fetchAndDisplayScreenings }  from '../lib/fetchScreenings';
import {loadAllScreenings} from '../src/js/cmsAdapter';

// Mock the cmsAdapter
jest.mock('../src/js/cmsAdapter', () => ({
    loadAllScreenings: jest.fn(),
  }));
  
  describe('fetchAndDisplayScreenings', () => {
    it('should return screenings within the next 5 days', async () => {
      const mockScreenings = [
        { start_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString() }, // 1 day from now
        { start_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }, // 7 days from now
        { start_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString() }, // 4 days from now
      ];
  
      // Mock the response from cmsAdapter
      cmsAdapter.loadAllScreenings.mockResolvedValue(mockScreenings);
  
      const screenings = await fetchAndDisplayScreenings();
  
      // Only 2 screenings should be returned (the ones within 5 days)
      expect(screenings).toHaveLength(2);
      expect(new Date(screenings[0].start_time).getTime()).toBeLessThanOrEqual(Date.now() + 5 * 24 * 60 * 60 * 1000); // Within 5 days
    });
  });
  
  it('should return no more than 10 screenings', async () => {
      const mockScreenings = Array.from({ length: 15 }, (_, i) => ({
        start_time: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
      }));
    
      cmsAdapter.loadAllScreenings.mockResolvedValue(mockScreenings);
    
      const screenings = await fetchAndDisplayScreenings();
    
      expect(screenings).toHaveLength(10); // Limit to 10 screenings
  });