
const posts = [
    {
        id: 1,
        name: "John Mathew",
        time: "2 hours ago",
        content: "Enjoying a beautiful day with friends! 🌄",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        likes: 120,
        comments: []
    },
    {
        id: 2,
        name: "Sarah Thomas",
        time: "3 hours ago",
        content: "Nature is the best therapy. 🌿",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
        likes: 85,
        comments: []
    },
    {
        id: 3,
        name: "Alex George",
        time: "5 hours ago",
        content: "Working on something exciting! 💻",
        image: "",
        likes: 45,
        comments: []
    },
    {
        id: 4,
        name: "Emily Rose",
        time: "Yesterday",
        content: "Some beautiful memories from my recent trip! ❤️",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        likes: 210,
        comments: []
    },
    {
        id: 5,
        name: "David Thomas",
        time: "Yesterday",
        content: "Never stop learning and growing. 🚀",
        image: "",
        likes: 65,
        comments: []
    }
];

const postsContainer = document.getElementById("postsContainer");

function displayPosts() {
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("div");

        postElement.className = "post";

        postElement.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">
                    ${post.name.charAt(0)}
                </div>

                <div class="post-info">
                    <strong>${post.name}</strong>
                    <small>${post.time}</small>
                </div>
            </div>

            <div class="post-content">
                ${post.content}
            </div>

            ${post.image ? `
                <img class="post-image"
                     src="${post.image}"
                     alt="Post image">
            ` : ""}

            <div class="post-stats">
                <span>👍 <span class="like-count">${post.likes}</span></span>
                <span>${post.comments.length} comments</span>
            </div>

            <div class="post-actions">
                <button class="like-btn">👍 Like</button>
                <button class="comment-btn">💬 Comment</button>
                <button class="share-btn">↗ Share</button>
            </div>

            <div class="comment-section">
                <div class="comments-list"></div>
                <input type="text" placeholder="Write a comment...">
                <button class="send-comment">Send</button>
            </div>
        `;

        postsContainer.appendChild(postElement);

        attachPostEvents(postElement, post);
    });
}

displayPosts();



function attachPostEvents(element, post) {

    let liked = false;

    const likeButton = element.querySelector(".like-btn");
    const likeCount = element.querySelector(".like-count");

    // Like / Unlike
    likeButton.addEventListener("click", () => {
        liked = !liked;

        post.likes += liked ? 1 : -1;

        likeCount.textContent = post.likes;

        likeButton.classList.toggle("liked", liked);
        likeButton.textContent = liked ? "👍 Liked" : "👍 Like";
    });

    // Show / Hide comments
    const commentButton = element.querySelector(".comment-btn");
    const commentSection = element.querySelector(".comment-section");

    commentButton.addEventListener("click", () => {
        commentSection.classList.toggle("active");
    });

    // Add comment
    const sendButton = element.querySelector(".send-comment");
    const commentInput = commentSection.querySelector("input");
    const commentsList = element.querySelector(".comments-list");

    sendButton.addEventListener("click", () => {
        const comment = commentInput.value.trim();

        if (comment === "") return;

        post.comments.push(comment);

        const commentElement = document.createElement("div");
        commentElement.className = "comment-item";
        commentElement.textContent = comment;

        commentsList.appendChild(commentElement);

        element.querySelector(".post-stats span:last-child").textContent =
            `${post.comments.length} comments`;

        commentInput.value = "";
    });

    // Share
    const shareButton = element.querySelector(".share-btn");

    shareButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(
                `${window.location.href}#post-${post.id}`
            );

            shareButton.textContent = "✓ Copied!";
        } catch (error) {
            shareButton.textContent = "Copy unavailable";
        }
    });
}



const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

// Toggle theme
themeToggle.addEventListener("click", () => {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});




const postInput = document.getElementById("postInput");
const publishButton = document.getElementById("publishPost");

publishButton.addEventListener("click", () => {

    const content = postInput.value.trim();

    if (content === "") {
        alert("Please enter something to post!");
        return;
    }

    const newPost = {
        id: Date.now(),
        name: "Ajin Thomas",
        time: "Just now",
        content: content,
        image: "",
        likes: 0,
        comments: []
    };

    posts.unshift(newPost);

    displayPosts();

    postInput.value = "";
});
