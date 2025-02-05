const loadScreeningsByMovieId = async (id) => {
    const url = `/movie/${id}/screenings/upcoming`;
    const resp = await fetch(url);
    const fetchedScreenings = await resp.json();
    return fetchedScreenings;
};

export { loadScreeningsByMovieId };

export default async function screeningDOMinfo() {
    const moviesID = document.querySelectorAll(".movie-link");
    const IDs = Array.prototype.map.call(moviesID, (movies) => { return movies.id });

    for (const id of IDs) {
        try {
            const screenings = await loadScreeningsByMovieId(id);
            console.log(`Upcoming screenings for movie ID ${id}:`, screenings);

            const movieContainer = document.getElementById(id);

            if (!movieContainer) {
                console.error(`No movie container found for movie ID ${id}`);
                continue;
            }

            const screeningPlaceElement = movieContainer.querySelector(".movie-card__screeningPlace");
            const screeningTimeElement = movieContainer.querySelector(".movie-card__screeningTime");

            if (screenings.length > 0) {
                const screening = screenings[0];
                
                const screeningTime = new Date(screening.attributes.start_time);
                const screeningRoom = screening.attributes.room;
                
                if (screeningTime && screeningRoom) {
                    screeningPlaceElement.textContent = `Salong: ${screeningRoom}`;
                    screeningTimeElement.textContent = `Tid: ${screeningTime.toLocaleString()}`;
                } else {
                    console.error(`Invalid screening data for movie ID ${id}:`, screening);
                }
            } else {
                const noShowingElement = document.createElement("p");
                noShowingElement.textContent = "No showings";
                noShowingElement.classList.add("no-showings");
                movieContainer.appendChild(noShowingElement);
            }

        } catch (error) {
            console.error(`Error fetching screenings for movie ID ${id}:`, error);
        }
    }
}