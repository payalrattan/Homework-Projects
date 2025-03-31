let data = {}; // Declare a global variable to store the fetched data

async function getData() {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/payalrattan/payalrattan.github.io/refs/heads/main/data/moviesdata.json"
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json(); // Assign the fetched data to the global `data` variable
        displayMovies(data.movies); // Display the movies after fetching the data
    } catch (error) {
        console.error("Failed to fetch movie data:", error);
        alert("Failed to load movie data. Please try again later.");
    }
}

// Call the getData function on page load
window.addEventListener('load', () => {
    getData(); // Fetch and display the movies
});

const dom = {
    movie: document.querySelector('#movies'),
};

//add star rating
const createStarRating = (movieId) => {
    const starContainer = document.createElement('div');
    starContainer.classList.add('star-rating');
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.textContent = '★';
        star.dataset.value = i;
        star.addEventListener('click', () => submitRating(movieId, i));
        starContainer.appendChild(star);
    }
    return starContainer;
};
//add comment section
const createCommentSection = (movieId) => {
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-section');

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';

    const submitCommentBtn = document.createElement('button');
    submitCommentBtn.textContent = 'Submit Comment';
    submitCommentBtn.addEventListener('click', () => submitComment(movieId, commentInput.value));

    const commentDisplay = document.createElement('p');
    commentDisplay.classList.add('movie-comments');

    commentContainer.append(commentInput, submitCommentBtn, commentDisplay);
    return commentContainer;
};

// Handlers for  star rating 
const submitRating = (movieId, rating) => {
    const movie = data.movies.find((movie) => movie.id === movieId);
    const movieContainer = document.querySelector(`.movie[data-id="${movieId}"]`);
    const ratingDisplay = movieContainer.querySelector('.rating-display');
    ratingDisplay.textContent = `Rating: ${rating} / 5`;

    // Highlight the selected stars
    const stars = movieContainer.querySelectorAll('.star');
    stars.forEach((star) => {
        if (parseInt(star.dataset.value) <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
};
// Handlers for comment section
const submitComment = (movieId, comment) => {
    if (comment.trim()) {
        const movie = data.movies.find((movie) => movie.id === movieId);
        const movieContainer = document.querySelector(`.movie[data-id="${movieId}"]`);
        const commentDisplay = movieContainer.querySelector('.movie-comments');
        commentDisplay.textContent = `Comment: ${comment}`;
    }
};

// Define variables for pagination
let currentPage = 1; // Start on the first page
const moviesPerPage = 10; // Number of movies to display per page

// Function to create and append a movie element with a collapsible section
const createMovieElement = (movie) => {
    const container = document.createElement('div');
    container.classList.add('movie');
    container.setAttribute('data-id', movie.id);

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const img = document.createElement('img');
    img.src = movie.poster_url;
    img.alt = movie.title;

    // Create the collapsible section
    const collapsibleSection = document.createElement('div');
    collapsibleSection.classList.add('movie-collapsible');
    collapsibleSection.style.display = 'none'; // Initially hidden

    // Add movie details to the collapsible section
    const description = document.createElement('p');
    description.textContent = `Description: ${movie.description}`;

    const price = document.createElement('p');
    price.textContent = `Price: $${movie.price}`;

    const year = document.createElement('p');
    year.textContent = `Year: ${movie.movie_year}`;

    const director = document.createElement('p');
    director.textContent = `Director: ${movie.director}`;

    const actors = document.createElement('p');
    actors.textContent = `Actors: ${movie.actors.join(', ')}`;

    const ratingSection = createStarRating(movie.id);
    const commentSection = createCommentSection(movie.id);

    const ratingDisplay = document.createElement('p');
    ratingDisplay.classList.add('rating-display');
    ratingDisplay.textContent = `Rating: ${movie.rating || 'Not yet rated'}`;

    // Append all details to the collapsible section
    collapsibleSection.append(description, price, year, director, actors, ratingSection, commentSection, ratingDisplay);

    // Create a button to toggle the collapsible section
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Expand Section'; // Initial button text
    toggleButton.classList.add('toggle-button');
    toggleButton.addEventListener('click', () => {
        if (collapsibleSection.style.display === 'none') {
            collapsibleSection.style.display = 'block'; // Show the collapsible section
            toggleButton.textContent = 'Hide Details'; // Update button text
            img.style.display = 'none'; // Hide the image
        } else {
            collapsibleSection.style.display = 'none'; // Hide the collapsible section
            toggleButton.textContent = 'Expand Section'; // Update button text
            img.style.display = 'block'; // Show the image
        }
    });

    // Append the title, image, toggle button, and collapsible section to the container
    container.append(title, img, toggleButton, collapsibleSection);

    return container;
};

// Function to display movies with pagination
const displayMovies = (movies) => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToDisplay = movies.slice(startIndex, endIndex);

    dom.movie.innerHTML = ''; // Clear the current movie display

    moviesToDisplay.forEach((movie) => {
        const movieElement = createMovieElement(movie);
        dom.movie.appendChild(movieElement);
    });

    updatePaginationButtons(movies.length);
};

// Function to update pagination buttons
const updatePaginationButtons = (totalMovies) => {
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    const prevButton = document.querySelector('#prev-page');
    const nextButton = document.querySelector('#next-page');
    const currentPageDisplay = document.querySelector('#current-page');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    currentPageDisplay.textContent = `Page ${currentPage}`;
};

// Event listeners for pagination buttons
document.querySelector('#prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayMovies(data.movies);
    }
});

document.querySelector('#next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(data.movies.length / moviesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayMovies(data.movies);
    }
});

const searchInput = document.querySelector('.search-input'); // Ensure this matches the class in your HTML
const searchIcon = document.querySelector('.search-icon'); // Ensure this matches the class in your HTML

// Search Handler
const searchHandler = () => {
    const searchTerm = searchInput.value.toLowerCase().trim(); // Get the search term and trim whitespace

    // Check if data.movies is populated
    if (!data.movies || data.movies.length === 0) {
        console.error("Movies data is not loaded yet.");
        alert("Movies data is not available. Please try again later.");
        return;
    }

    // Filter the movies based on the search term
    const filteredMovies = data.movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm) // Check if the movie title includes the search term
    );

    // Clear the movies container
    dom.movie.innerHTML = '';

    if (filteredMovies.length === 0) {
        // Create a movie-like container for the "No movies found" message
        const noMoviesContainer = document.createElement('div');
        noMoviesContainer.classList.add('movie'); // Use the same class as the movie block for consistent styling

        const noMoviesMessage = document.createElement('p');
        noMoviesMessage.textContent = 'No movies found matching your search.';
        noMoviesMessage.style.color = 'white'; // Optional: Style the message
        noMoviesMessage.style.textAlign = 'center'; // Optional: Center the message

        noMoviesContainer.appendChild(noMoviesMessage); // Append the message to the container
        dom.movie.appendChild(noMoviesContainer); // Append the container to the movies section
    } else {
        // Display the filtered movies
        displayMovies(filteredMovies);
    }
};

// Attach event listener to the search icon
searchIcon.addEventListener('click', searchHandler);

// Attach event listener to the search input for "Enter" key press
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchHandler();
    }
});

// Sorting Handler
const sortHandler = () => {
    const sortOption = document.querySelector('#sort-options').value; // Get the selected sort option

    // Sort the movies array based on the selected option
    const sortedMovies = [...data.movies]; // Create a copy of the movies array to avoid mutating the original

    switch (sortOption) {
        case 'name':
            sortedMovies.sort((a, b) => a.title.localeCompare(b.title)); // Sort by name (alphabetical order)
            break;
        case 'year':
            sortedMovies.sort((a, b) => a.movie_year - b.movie_year); // Sort by year (ascending order)
            break;
        case 'rating':
            sortedMovies.sort((a, b) => b.rating - a.rating); // Sort by rating (descending order)
            break;
        case 'price':
            sortedMovies.sort((a, b) => a.price - b.price); // Sort by price (ascending order)
            break;
        default:
            break;
    }

    // Display the sorted movies
    displayMovies(sortedMovies);
};

// Attach the event listener to the sort dropdown
document.querySelector('#sort-options').addEventListener('change', sortHandler);

// Timer and Time Spent Logic
const timerInput = document.querySelector('#timer-input');
const startTimerButton = document.querySelector('#start-timer');
const timerDisplay = document.querySelector('#timer-display');
const timeSpentDisplay = document.querySelector('#time-spent-display');

let timerInterval;
let timeSpent = 0;

// Timer Handler
const startTimer = () => {
    const minutes = parseInt(timerInput.value);

    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    let timeLeft = minutes * 60;

    timerInterval = setInterval(() => {
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;

        timerDisplay.textContent = `Time Left: ${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = 'Time is up!';
            alert('Time is up! Pick a movie now!');
        }

        timeLeft--;
    }, 1000);
};

// Attach the timer handler to the start button
startTimerButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTimer();
});

// Function to update the time spent display
const updateTimeSpent = () => {
    timeSpent++;
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;

    timeSpentDisplay.textContent = `Time Spent on Page: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Start the timer to track time spent on the page
setInterval(updateTimeSpent, 1000);
