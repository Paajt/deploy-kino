import cmsAdapter from '../src/js/cmsAdapter.js';

export default async function fetchAndDisplayScreenings() {
  try {
    // Fetch movie screenings from the server using the cmsAdapter
    const data = await cmsAdapter.loadAllScreenings();

    // Filter out the screenings within the next 5 days
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

// Function to fetch the movie screenings for the next 5 days and display them
/* export default async function fetchAndDisplayScreenings() {
    try {
      // Fetch movie screenings from the server. Change URL to our API.
      const response = await fetch('/api/screenings');
      const data = await response.json();
  
      // Filter out the screenings within the next 5 days
      const today = new Date();
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(today.getDate() + 5);
  
      // Convert all screenings start times to Date objects
      const screenings = data.filter(screening => {
        const screeningDate = new Date(screening.start_time);
        return screeningDate >= today && screeningDate <= fiveDaysLater;
      });
  
      // Limit to 10 screenings if there are more than that
      const limitedScreenings = screenings.slice(0, 10);
  
      // Display the screenings
      const screeningsList = document.getElementById('screenings-list');
      screeningsList.innerHTML = ''; // Clear previous screenings
  
      limitedScreenings.forEach(screening => {
        const screeningElement = document.createElement('div');
        const date = new Date(screening.start_time);
        const formattedTime = date.toLocaleString();
  
        screeningElement.innerHTML = `
          <p>Room: ${screening.room}</p>
          <p>Time: ${formattedTime}</p>
        `;
  
        screeningsList.appendChild(screeningElement);
      });
    } catch (error) {
      console.error('Error fetching screenings:', error);
    }
  } */