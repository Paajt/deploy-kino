// Responsible for rendering the list of screenings on the front-end. It fetches the data and formats the times.

import fetchAndDisplayScreenings from './fetchScreenings.js';
const ScreeningList = () => {
    let screenings = [];
    let loading = true;
    
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
  
      const screeningsContainer = document.getElementById('screenings-list');
  
      // Function to load screenings
      const loadScreenings = async () => {
        try {
          const screeningsData = await fetchAndDisplayScreenings();
          screenings = screeningsData;
          loading = false; // Once data is fetched
          render();
        } catch (error) {
          console.error("Error loading screenings:", error);
        }
      };
  
      // Function to render the data to the DOM
      const render = () => {
        if (loading) {
          screeningsContainer.innerHTML = '<div>Loading screenings...</div>';
        } else {
          let html = '<h2>Upcoming Screenings (Next 5 Days)</h2>';
      
          if (screenings.length > 0) {
            html += screenings.map((screening) => {
              const formattedTime = screening.formattedTime;
      
              return `
                <div class="screening-item">
                  <p><strong>Room:</strong> ${screening.room}</p>
                  <p><strong>Time:</strong> ${formattedTime}</p>
                </div>
              `;
            }).join('');
          } else {
            html += '<p>No screenings available for the next 5 days.</p>';
          }
      
          screeningsContainer.innerHTML = html;
        }
      };
  
      loadScreenings();
    }
  };
  
  export default ScreeningList;
  
  // Call the function once the DOM is fully loaded (only in browser)
  if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      ScreeningList();
    });
  }