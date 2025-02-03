export default async function getDisplayedScreenings (cmsAdapter, movieId) {
     
     // Generate mock screenings for the movies
      const screenings = await cmsAdapter.loadScreeningsByMovieId(movieId);
    
      console.log(screenings);

      const today = new Date();
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(today.getDate() + 15);
  
      const limitedScreenings = screenings.filter(screening => {
        const screeningDate = new Date(screening.attributes.start_time);
        return screeningDate >= today && screeningDate <= fiveDaysLater;
      }).slice(0, 10);
      return limitedScreenings
    }