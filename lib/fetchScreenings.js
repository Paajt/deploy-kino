// This file is used to get and filter the data from the API/mock. It should return the structured data for ScreeningList.js.

import cmsAdapter from '../src/js/cmsAdapter.js';

export default async function fetchAndDisplayScreenings() {
  try {
    const data = await cmsAdapter.loadAllScreenings();

    // Only showings for the next five days
    const today = new Date();
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(today.getDate() + 5);

    // Convert all screenings start times to Date objects and filter
    const screenings = data.filter(screening => {
      const screeningDate = new Date(screening.start_time);
      return screeningDate >= today && screeningDate <= fiveDaysLater;
    });
    // Limit to 10 screenings if there are more than that
    const limitedScreenings = screenings.slice(0, 10);

    // Display the screenings
    return limitedScreenings; // Return the filtered screenings
  } catch (error) {
    console.error('Error fetching screenings:', error);
    return [];
  }
}