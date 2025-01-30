import screenings from '../lib/screenings.js';
import { it, describe, expect, jest, beforeEach } from '@jest/globals';

describe('screenings function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return only future screenings', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                attributes: {
                  start_time: new Date(Date.now() + 86400000).toISOString(), // future showings
                  room: 'Stora Salongen',
                },
              },
            ],
          }),
      })
    );

    const result = await screenings('123');
    expect(result.length).toBe(1);
    expect(result[0].room).toBe('Stora Salongen');
  });

  it('filters out past screenings', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                attributes: {
                  start_time: new Date(Date.now() - 86400000).toISOString(), // old showing
                  room: 'Stora Salongen',
                },
              },
            ],
          }),
      })
    );

    const result = await screenings('123');
    expect(result.length).toBe(0); // no showings should be returned
  });

  it('handles empty screening data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      })
    );

    const result = await screenings('123');
    expect(result.length).toBe(0); // no data should be returned
  });

  it('handles API errors', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API error')));

    const result = await screenings('123');
    expect(result).toEqual([]); // an empty array should be returned on error
  });
});
