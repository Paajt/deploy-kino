import screenings from '../lib/screenings';
import request from 'supertest';
import { it, expect, jest } from '@jest/globals';

describe('screenings function', () => {
  it('Should return only future screenings', async () => {
    global.fetch = jest.fn();
    const mockData = {
      data: [
        {
          attributes: {
            start_time: new Date(Date.now() + 86400000).toISOString(),
            room: 'Stora salongen',
          },
        },
      ],
    };

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const result = await screenings('123');
    expect(result.length).toBe(1);
    expect(result[0].room).toBe('Stora salongen');
  });

  it('filters out past screenings', async () => {
    const mockData = {
      data: [
        {
          attributes: {
            start_time: new Date(Date.now() - 86400000).toISOString(),
            room: 'Stora salongen',
          },
        },
      ],
    };
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await screenings('123');
    expect(result.length).toBe(0);
  });

  it('handles empty screening data', async () => {
    const mockData = { data: [] };

    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const result = await screenings('123');
    expect(result.length).toBe(0);
  });
  it('handles fetch errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(screenings('123')).rejects.toThrow('Network error');
  });
});
