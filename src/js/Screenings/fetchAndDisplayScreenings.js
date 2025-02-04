//Hittar (.movie-link) med id och skickar förfrågan till cmsAdapter via funktionen loadScreeningsByMovieId. Efter att att datan hämtats processas det.

export default async function getDisplayedScreenings (cmsAdapter, movieId) {
     
      const screenings = await cmsAdapter.loadScreeningsByMovieId(movieId);

      const today = new Date();
      const fiveDaysLater = new Date();
      fiveDaysLater.setDate(today.getDate() + 5);
  
      const screeningsForNext5Days = screenings.filter(screening => {
        const screeningDate = new Date(screening.attributes.start_time);
        return screeningDate >= today && screeningDate <= fiveDaysLater;
      });
    
      const limitedScreenings = screeningsForNext5Days.slice(0, 10);

      return limitedScreenings
    }