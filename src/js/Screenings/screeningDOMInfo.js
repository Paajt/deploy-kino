// Användaren requestar en film genom att besöka hemsidan. Skickar förfrågan till CMSAdapter.

const loadScreeningsByMovieId = async (id) => {
    const url = `/movie/${id}/screenings/upcoming`;
    const resp = await fetch(url);
    const payload = await resp.json();
    return payload;
};

export default async function screeningDOMinfo () {
    console.log("Hello World!");

    const moviesID = document.querySelectorAll(".movie-link");
    const IDs = Array.prototype.map.call(moviesID, (movies) => { return movies.id });
    console.log(IDs);

    for (const id of IDs) {
        try {
            const screenings = await loadScreeningsByMovieId(id);
            console.log(`Upcoming screenings for movie ID ${id}:`, screenings);
        } catch (error) {
            console.error(`Error fetching screenings for movie ID ${id}:`, error);
        }
    }

    
};