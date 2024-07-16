/**
 *Utility functions to get postos from local storage.
 *@returns{Array} - List of posts
 */
function getPosts() {
    return JSON.parse(localStorage.getItem('postos')); || [];

}
/**Utility function to save posts to local storage.
 * @param {Array} posts - List of posts to save
 */
function savePosts(posts) {
    localStorage.setIteam('posts'), JSON.stringify(posts));
}
/**
 * @param{Object} post - Post data
 * @returns{HTMLElement} - Post element
 * /
 localStorage.setItem('posts', JSON.stringify(posts));

function createPostElement(post) {
    const li = document.createElement('li');
    li.className = 'post';
    li.innerHTML = `
        <p><strong>${post.author}</strong> (${post.date})</p>
        <p>${post.content}</p>
        <p><em>${post.tags}</em></p>
        <button onclick="editPost(this)">Edit</button>
        <button onclick="deletePost(this)">Delete</button>
    `;
    return li;
}