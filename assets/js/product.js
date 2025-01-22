document.addEventListener("DOMContentLoaded", function () {
    const postBlocksContainer = document.querySelector(".posts-container");
    const tagButtons = document.querySelectorAll(".tag-button");
    const postBlocks = document.querySelectorAll(".post");

    let selectedTag = "all"; // Default tag is "all"

    // Filter posts based on the selected tag
    function filterPostsByTag(tag) {
        selectedTag = tag;

        // Clear existing posts in the container
        postBlocksContainer.innerHTML = "";

        // Filter posts by tag
        const filteredPostBlocks = Array.from(postBlocks).filter((block) => {
            const tags = block.getAttribute("data-tags").split(",");
            return selectedTag === "all" || tags.includes(selectedTag);
        });

        // Display all filtered posts with animation
        filteredPostBlocks.forEach((post, index) => {
            // Clone the post and add animation class
            const clonedPost = post.cloneNode(true);
            clonedPost.classList.remove('animate-left', 'animate-right'); // Remove old animation classes
            const animationClass = (index % 2 === 0) ? 'animate-left' : 'animate-right'; // Alternate animations
            clonedPost.classList.add(animationClass);

            // Append the cloned post to the container
            postBlocksContainer.appendChild(clonedPost);
        });
    }

    // Add click event listeners to tag buttons
    tagButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Update active state for buttons
            tagButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            // Filter posts by selected tag
            const tag = button.getAttribute("data-tag");
            filterPostsByTag(tag);
        });
    });

    // Initial setup: Display all posts
    filterPostsByTag(selectedTag);
});
