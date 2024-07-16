/**
 * Fetch posts from the backend.
 * @returns {Promise<Array>} - List of posts
 */
async function getPosts() {
    const response = await fetch('/posts');
    const data = await response.json();
    return data.posts;
}

/**
 * Save a post to the backend.
 * @param {Object} post - Post data
 */
async function savePost(post) {
    await fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
}

/**
 * Update a post in the backend.
 * @param {number} id - Post ID
 * @param {string} newContent - New content
 */
async function updatePostInStorage(id, newContent) {
    await fetch(`/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newContent })
    });
}

/**
 * Remove a post from the backend.
 * @param {number} id - Post ID
 */
async function removePostFromStorage(id) {
    await fetch(`/posts/${id}`, {
        method: 'DELETE'
    });
}
