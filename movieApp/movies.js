let data = {}; // Declare a global variable to store the fetched data

// Fetch movie data from the API
async function getData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/payalrattan/payalrattan.github.io/refs/heads/main/data/moviesdata.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json(); // Assign the fetched data to the global `data` variable
        console.log(data);
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

// Centralized DOM object
const dom = {
    movie: document.querySelector('#movies'),
    prevButton: document.querySelector('#prev-page'),
    nextButton: document.querySelector('#next-page'),
    currentPageDisplay: document.querySelector('#current-page'),
    searchInput: document.querySelector('.search-input'),
    searchIcon: document.querySelector('.search-icon'),
    sortOptions: document.querySelector('#sort-options'),
    filterType: document.querySelector('#filter-type'),
    filterInput: document.querySelector('#filter-input'),
    filterButton: document.querySelector('#filter-button'),
    resetFilterButton: document.querySelector('#reset-filter-button'),
    timerInput: document.querySelector('#timer-input'),
    startTimerButton: document.querySelector('#start-timer'),
    timerDisplay: document.querySelector('#timer-display'),
    timeSpentDisplay: document.querySelector('#time-spent-display'),
};

// Function to create and append a movie element with a collapsible section
const createMovieElement = (movie) => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie');
    movieContainer.setAttribute('data-id', movie.id);

    const img = document.createElement('img');
    img.src = movie.poster_url || './assets/noImage.png'; // Fallback to default image
    img.alt = movie.title;

    const collapsibleSection = document.createElement('div');
    collapsibleSection.classList.add('movie-collapsible');
    collapsibleSection.style.display = 'none'; // Initially hidden

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const description = document.createElement('p');
    description.innerHTML = `<strong>Description:</strong> ${movie.description}`;

    const price = document.createElement('p');
    price.innerHTML = `<strong>Price:</strong> $${movie.price}`;

    const year = document.createElement('p');
    year.innerHTML = `<strong>Year :</strong> ${movie.movie_year}`;

    const director = document.createElement('p');
    director.innerHTML = `<strong>Director:</strong> ${movie.director}`;

    const actors = document.createElement('p');
    actors.innerHTML = `<strong>Actors:</strong> ${movie.actors.join(', ')}`;

    const ratingSection = createStarRating(movie.id);
    const commentSection = createCommentSection(movie.id);

    const ratingDisplay = document.createElement('p');
    ratingDisplay.classList.add('rating-display');
    ratingDisplay.innerHTML = `<strong>Rating:</strong> ${movie.rating || 'Not yet rated'}`;

    collapsibleSection.append(
        title,
        description,
        price,
        year,
        director,
        actors,
        ratingDisplay,
        ratingSection,
        commentSection
    );
    //Creating show/hide button
    const showButton = document.createElement('button');
    showButton.textContent = 'Show Details';
    showButton.classList.add('show-button');
    showButton.addEventListener('click', () => {
        if (collapsibleSection.style.display === 'none') {
            collapsibleSection.style.display = 'block';
            showButton.textContent = 'Hide Details';
            img.style.display = 'none';
        } else {
            collapsibleSection.style.display = 'none';
            showButton.textContent = 'Show Details';
            img.style.display = 'block';
        }
    });

    movieContainer.append(img, showButton, collapsibleSection);
    return movieContainer;
};
// Define variables for pagination
let currentPage = 1; // Start on the first page
const moviesPerPage = 6; // Number of movies to display per page
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

    dom.prevButton.disabled = currentPage === 1;
    dom.nextButton.disabled = currentPage === totalPages;

    dom.currentPageDisplay.textContent = `Page ${currentPage}`;
};

// Event listeners for pagination buttons
dom.prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayMovies(data.movies);
    }
});

dom.nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(data.movies.length / moviesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayMovies(data.movies);
    }
});

// Search Handler
const searchHandler = () => {
    const searchTerm = dom.searchInput.value.toLowerCase().trim();

    if (!data.movies || data.movies.length === 0) {
        alert("Movies data is not available. Please try again later.");
        return;
    }

    const filteredMovies = data.movies.filter((movie) =>movie.title.toLowerCase().includes(searchTerm));

    dom.movie.innerHTML = '';

    if (filteredMovies.length === 0) {
        const noMoviesContainer = document.createElement('div');
        noMoviesContainer.classList.add('movie');
        const noImage = document.createElement("img");
        noImage.src = "./assets/noImage.png";
        noImage.alt = "No movies found matching your search";
        noMoviesContainer.appendChild(noImage);
        dom.movie.appendChild(noMoviesContainer);
    } else {
        displayMovies(filteredMovies);
    } 
};

// Attach event listener to the search icon
dom.searchIcon.addEventListener('click', searchHandler);

// Attach event listener to the search input for "Enter" key press
dom.searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchHandler();
    }
});

// Sorting Handler
const sortHandler = () => {
    const sortOption = dom.sortOptions.value;

    const sortedMovies = [...data.movies];

    switch (sortOption) {
        case 'name':
            sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'year':
            sortedMovies.sort((a, b) => a.movie_year - b.movie_year);
            break;
        case 'price':
            sortedMovies.sort((a, b) => a.price - b.price);
            break;
    }

    displayMovies(sortedMovies);
};

// Attach the event listener to the sort dropdown
dom.sortOptions.addEventListener('change', sortHandler);

// Filter Handler
const filterHandler = () => {
    const filterType = dom.filterType.value;
    const filterInput = dom.filterInput.value.trim();

    if (!filterInput) {
        alert('Please enter a valid year or price.');
        return;
    }

    const filterValue = parseFloat(filterInput);

    if (isNaN(filterValue)) {
        alert('Please enter a valid number for filtering.');
        return;
    }

    const filteredMovies = data.movies.filter((movie) => {
        switch (filterType) {
            case 'year':
                return movie.movie_year === filterValue;
            case 'price':
                return movie.price <= filterValue;
            default:
                return true;
        }
    });

    dom.movie.innerHTML = '';
    if (filteredMovies.length === 0) {
        const noMoviesContainer = document.createElement('div');
        noMoviesContainer.classList.add('movie');
        const noImage = document.createElement("img");
        noImage.src = "./assets/noImage.png";
        noImage.alt = "No movies found matching your search";
        noMoviesContainer.appendChild(noImage);
        dom.movie.appendChild(noMoviesContainer);
    } else {
        displayMovies(filteredMovies);
    }
};

// Attach event listener to the filter button
dom.filterButton.addEventListener('click', filterHandler);

// Reset Filter Handler
const resetFilterHandler = () => {
    dom.filterInput.value = '';
    dom.filterType.value = 'year';
    displayMovies(data.movies);
};

// Attach event listener to the reset filter button
dom.resetFilterButton.addEventListener('click', resetFilterHandler);

// Star Rating
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

const submitRating = (movieId, rating) => {
    const movieContainer = document.querySelector(`.movie[data-id="${movieId}"]`);
    const ratingDisplay = movieContainer.querySelector('.rating-display');
    ratingDisplay.innerHTML = `<strong>Rating:</strong> ${rating} / 5`;

    const stars = movieContainer.querySelectorAll('.star');
    stars.forEach((star) => {
        if (parseInt(star.dataset.value) <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
};

// Comment Section
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

const submitComment = (movieId, comment) => {
    if (comment.trim()) {
        const movieContainer = document.querySelector(`.movie[data-id="${movieId}"]`);
        const commentDisplay = movieContainer.querySelector('.movie-comments');
        commentDisplay.textContent = `Comment: ${comment}`;
    }
};

// Timer and Time Spent Logic
let timerInterval;
let timeSpent = 0;

const startTimer = () => {
    const minutes = parseInt(dom.timerInput.value);

    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    let timeLeft = minutes * 60;

    timerInterval = setInterval(() => {
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;

        dom.timerDisplay.textContent = `Time Left: ${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            dom.timerDisplay.textContent = 'Time is up!';
            alert('Time is up! Pick a movie now!');
        }

        timeLeft--;
    }, 1000);
};

dom.startTimerButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTimer();
});

const updateTimeSpent = () => {
    timeSpent++;
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;

    dom.timeSpentDisplay.textContent = `Time Spent on Page: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

setInterval(updateTimeSpent, 1000);
