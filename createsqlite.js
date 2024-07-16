// Initialize the SQLite database
let db;

(async () => {
    const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/sql-wasm.wasm` });
    db = new SQL.Database();

    // Create the posts table if it doesn't exist
    db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, author TEXT, content TEXT, tags TEXT, date TEXT)");

    // Load existing posts and display them
    loadPosts();
})();

/**
 * Utility function to get posts from SQLite database.
 * @returns {Array} - List of posts
 */
function getPosts() {
    const stmt = db.prepare("SELECT * FROM posts");
    const posts = [];
    while (stmt.step()) {
        const row = stmt.getAsObject();
        posts.push(row);
    }
    stmt.free();
    return posts;
}

/**
 * Utility function to save a post to SQLite database.
 * @param {Object} post - Post data
 */
function savePost(post) {
    const stmt = db.prepare("INSERT INTO posts (author, content, tags, date) VALUES (?, ?, ?, ?)");
    stmt.run([post.author, post.content, post.tags, post.date]);
    stmt.free();
}

/**
 * Utility function to create a new post element.
 * @param {Object} post - Post data
 * @returns {HTMLElement} - Post element
 */
function createPostElement(post) {
    const li = document.createElement('li');
    li.className = 'post';
    li.innerHTML = `
        <p><strong>${post.author}</strong> (${post.date})</p>
        <p>${post.content}</p>
        <p><em>${post.tags}</em></p>
        <button onclick="editPost(this, ${post.id})">Edit</button>
        <button onclick="deletePost(this, ${post.id})">Delete</button>
    `;
    return li;
}
