// Användaren requestar en film genom att besöka hemsidan. Skickar förfrågan till CMSAdapter.
const loadScreeningsByMovieId = async (id) => {
    const url = `/movie/${id}/screenings/upcoming`;
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload;
};

export default async function screeningDOMinfo() {
    const moviesID = document.querySelectorAll(".movie-link");
    const IDs = Array.prototype.map.call(moviesID, (movies) => { return movies.id });

    for (const id of IDs) {
        try {
            const screenings = await loadScreeningsByMovieId(id);
            console.log(`Upcoming screenings for movie ID ${id}:`, screenings); // Log the screenings data

            const movieContainer = document.getElementById(id);

            if (!movieContainer) {
                console.error(`No movie container found for movie ID ${id}`);
                continue;
            }

            const screeningPlaceElement = movieContainer.querySelector(".movie-card__screeningPlace");
            const screeningTimeElement = movieContainer.querySelector(".movie-card__screeningTime");

            screenings.forEach((screening, index) => {
                console.log(`Screening #${index + 1}:`, screening);

                const screeningTime = new Date(screening.attributes.start_time);
                const screeningRoom = screening.attributes.room;

                if (screeningTime && screeningRoom) {
                    screeningPlaceElement.textContent = `Salong: ${screeningRoom}`;
                    screeningTimeElement.textContent = `Tid: ${screeningTime.toLocaleString()}`;
                } else {
                    console.error(`Invalid screening data for movie ID ${id}:`, screening);
                }
            });

        } catch (error) {
            console.error(`Error fetching screenings for movie ID ${id}:`, error);
        }
    }
}