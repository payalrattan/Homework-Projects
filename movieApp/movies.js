const data = {
    movies: [
        {
            id: 1,
            title: 'Interstellar',
            description:
                'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
            movie_year: 2014,
            director: "Christopher Nolan",
            actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Casey Affleck", "Mackenzie Foy", "John Lithgow", "Ellen Burstyn", "Matt Damon"],
            poster_url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            price: '120.00',
        },
    ]
};

const dom = {
    movie: document.querySelector('#movies'),
};
// Load Handler
const loadHandler = () => {
    const movie = data.movies.forEach((movie) => {
        // Create movie container
        const container = document.createElement('div');
        container.classList.add('movie');
        container.setAttribute('data-id', movie.id);
        console.log(movie);

        // Title
        const title = document.createElement('h2');
        title.textContent = movie.title;

        // Image
        const img = document.createElement('img');
        img.src = movie.poster_url;
        img.alt = movie.title;

        // Description
        const description = document.createElement('p');
        description.textContent = movie.description;

        // Price
        const price = document.createElement('p');
        price.textContent = `Price: $${movie.price}`;

        // Year
        const year = document.createElement('p');
        year.textContent = `Year: ${movie.movie_year}`;

        // Director
        const director = document.createElement('p');
        director.textContent = `Director: ${movie.director}`;

        // Actors
        const actors = document.createElement('p');
        actors.textContent = `Actors: ${movie.actors.join(', ')}`;

        

        // Append everything to the movie container
        container.append(title, img, description, price, year, director, actors);
        dom.movie.appendChild(container);
    });
};


// Events
window.addEventListener('load', loadHandler);

