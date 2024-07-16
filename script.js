document.addEventListener('DOMContentLoaded', () => { // Ensures the DOM is fully loaded before running the script
    const postForm = document.getElementById('new-post-form'); // Gets the form element for creating new posts
    const postList = document.getElementById('post-list'); // Gets the list element to display posts
    const searchInput = document.getElementById('search-input'); // Gets the search input element

    // Event listener for form submission to create a new post
    postForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        const author = document.getElementById('author').value; // Gets the value of the author input field
        const content = document.getElementById('content').value; // Gets the value of the content textarea
        const tags = document.getElementById('tags').value; // Gets the value of the tags input field
        const date = new Date().toLocaleString(); // Gets the current date and time as a string

        const post = { author, content, tags, date }; // Creates a post object with the collected data
        addPost(post); // Adds the new post to the DOM
        savePost(post); // Saves the new post to local storage
        postForm.reset(); // Resets the form fields
    });

    // Event listener for search input to filter posts
    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.toLowerCase(); // Gets the search input value and converts it to lowercase
        filterPosts(keyword); // Filters the displayed posts based on the search keyword
    });

    /**
     * Adds a post to the DOM.
     * @param {Object} post - Post data
     */
    function addPost(post) {
        const postElement = createPostElement(post); // Creates a new post element
        postList.appendChild(postElement); // Appends the post element to the post list
    }

    /**
     * Saves a post to local storage.
     * @param {Object} post - Post data
     */
    function savePost(post) {
        const posts = getPosts(); // Retrieves the current posts from local storage
        posts.push(post); // Adds the new post to the list of posts
        savePosts(posts); // Saves the updated list of posts to local storage
    }

    /**
     * Loads all posts from local storage and displays them.
     */
    function loadPosts() {
        const posts = getPosts(); // Retrieves the current posts from local storage
        posts.forEach(post => addPost(post)); // Adds each post to the DOM
    }

    /**
     * Filters posts based on a keyword.
     * @param {string} keyword - Keyword to filter posts
     */
    function filterPosts(keyword) {
        const posts = document.querySelectorAll('.post'); // Gets all post elements from the DOM
        posts.forEach(post => {
            const content = post.querySelector('p:nth-child(2)').textContent.toLowerCase(); // Gets the content of the post and converts it to lowercase
            const tags = post.querySelector('p:nth-child(3)').textContent.toLowerCase(); // Gets the tags of the post and converts them to lowercase
            if (content.includes(keyword) || tags.includes(keyword)) { // Checks if the keyword is present in the content or tags
                post.style.display = ''; // Shows the post if the keyword is found
            } else {
                post.style.display = 'none'; // Hides the post if the keyword is not found
            }
        });
    }

    // Load all posts when the page is loaded
    loadPosts(); // Calls the function to load and display all posts from local storage
});

/**
 * Edits a post.
 * @param {HTMLElement} button - Edit button element
 */
window.editPost = function (button) {
    const postElement = button.parentElement; // Gets the parent element of the button (the post element)
    const contentElement = postElement.querySelector('p:nth-child(2)'); // Gets the content element of the post
    const newContent = prompt('Edit your post:', contentElement.textContent); // Prompts the user to enter new content
    if (newContent) { // If the user entered new content
        contentElement.textContent = newContent; // Updates the content element with the new content
        updatePostInStorage(postElement); // Updates the post in local storage
    }
};

/**
 * Deletes a post.
 * @param {HTMLElement} button - Delete button element
 */
window.deletePost = function (button) {
    const postElement = button.parentElement; // Gets the parent element of the button (the post element)
    postElement.remove(); // Removes the post element from the DOM
    removePostFromStorage(postElement); // Removes the post from local storage
};

/**
 * Updates a post in local storage.
 * @param {HTMLElement} postElement - Post element to update
 */
function updatePostInStorage(postElement) {
    const posts = getPosts(); // Retrieves the current posts from local storage
    const author = postElement.querySelector('p:nth-child(1)').textContent; // Gets the author and date text content
    const content = postElement.querySelector('p:nth-child(2)').textContent; // Gets the content text content
    const tags = postElement.querySelector('p:nth-child(3)').textContent; // Gets the tags text content
    const date = author.match(/\(([^)]+)\)/)[1]; // Extracts the date from the author and date text
    const index = posts.findIndex(post => post.date === date); // Finds the index of the post in the posts array based on the date
    if (index !== -1) { // If the post is found
        posts[index].content = content; // Updates the content of the post
        savePosts(posts); // Saves the updated list of posts to local storage
    }
}

/**
 * Removes a post from local storage.
 * @param {HTMLElement} postElement - Post element to remove
 */
function removePostFromStorage(postElement) {
    const posts = getPosts(); // Retrieves the current posts from local storage
    const author = postElement.querySelector('p:nth-child(1)').textContent; // Gets the author and date text content
    const date = author.match(/\(([^)]+)\)/)[1]; // Extracts the date from the author and date text
    const index = posts.findIndex(post => post.date === date); // Finds the index of the post in the posts array based on the date
    if (index !== -1) { // If the post is found
        posts.splice(index, 1); // Removes the post from the posts array
        savePosts(posts); // Saves the updated list of posts to local storage
    }
}
