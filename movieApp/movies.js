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
       
{
    id: 2,
    title: "Inception",
    description: "A thief who enters people's dreams to steal secrets must pull off the ultimate heist.",
    movie_year: 2010,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy", "Cillian Murphy", "Ken Watanabe", "Marion Cotillard", "Michael Caine"],
    poster_url: "https://i.ebayimg.com/00/s/MTYwMFgxMDk3/z/LlUAAOSwm8VUwoRL/$_57.JPG?set_id=880000500F",
    price: "100.00"
},

{
    id: 5,
    title: "The Matrix",
    description: "A hacker discovers the reality he knows is a simulation and fights to break free.",
    movie_year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"],
    poster_url: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    price: "90.00"
},
{
    id: 6,
    title: "Titanic",
    description: "A love story unfolds on the ill-fated Titanic as it sails towards disaster.",
    movie_year: 1997,
    director: "James Cameron",
    actors: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates", "Frances Fisher", "Bill Paxton", "Gloria Stuart"],
    poster_url: "https://i.ebayimg.com/images/g/gnEAAOSwP~tW4HMS/s-l1200.jpg",
    price: "95.00"
},
{
    id: 2,
    title: "Inception",
    description: "A thief who enters people's dreams to steal secrets must pull off the ultimate heist.",
    movie_year: 2010,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy", "Cillian Murphy", "Ken Watanabe", "Marion Cotillard", "Michael Caine"],
    poster_url: "https://i.ebayimg.com/00/s/MTYwMFgxMDk3/z/LlUAAOSwm8VUwoRL/$_57.JPG?set_id=880000500F",
    price: "100.00"
},

{
    id: 5,
    title: "The Matrix",
    description: "A hacker discovers the reality he knows is a simulation and fights to break free.",
    movie_year: 1999,
    director: "Lana Wachowski, Lilly Wachowski",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"],
    poster_url: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    price: "90.00"
},
{
    id: 3,
    title: "The Dark Knight",
    description: "Batman faces his greatest enemy, the Joker, in a battle for Gotham's soul.",
    movie_year: 2008,
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Maggie Gyllenhaal", "Gary Oldman", "Morgan Freeman", "Michael Caine"],
    poster_url: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    price: "110.00"
},
{
    id: 6,
    title: "Titanic",
    description: "A love story unfolds on the ill-fated Titanic as it sails towards disaster.",
    movie_year: 1997,
    director: "James Cameron",
    actors: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates", "Frances Fisher", "Bill Paxton", "Gloria Stuart"],
    poster_url: "https://i.ebayimg.com/images/g/gnEAAOSwP~tW4HMS/s-l1200.jpg",
    price: "95.00"
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

        // Add Star Rating and Comment Section
        const ratingSection = createStarRating(movie.id);
        const commentSection = createCommentSection(movie.id);

        // Add a rating display section
        const ratingDisplay = document.createElement('p');
        ratingDisplay.classList.add('rating-display');
        ratingDisplay.textContent = 'Rating: Not yet rated';

        // Append everything to the movie container
        container.append(title, img);
        dom.movie.appendChild(container);
    });
};


// Events
window.addEventListener('load', loadHandler);

