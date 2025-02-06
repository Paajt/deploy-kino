export default async function getDisplayedScreenings(cmsAdapter, movieId) {
  // Fetch all screenings for the movie
  const screenings = await cmsAdapter.loadScreeningsByMovieId(movieId);

  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 5);

  // Filter screenings to show only those within the next 5 days
  const screeningsForNext5Days = screenings.filter(screening => {
      const screeningDate = new Date(screening.attributes.start_time);
      return screeningDate >= today && screeningDate <= fiveDaysLater;
  });

  // Limit to 10 screenings
  const limitedScreenings = screeningsForNext5Days.slice(0, 10);

  // Log the number of screenings after limiting to 10 (this helps to confirm the limit is applied correctly)
  console.log(`Limited screenings for movie ${movieId}:`, limitedScreenings.length);

  return limitedScreenings;
}

export { getDisplayedScreenings };