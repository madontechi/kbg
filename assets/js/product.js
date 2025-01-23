// document.addEventListener("DOMContentLoaded", function () {
//     const postBlocksContainer = document.querySelector(".posts-container");
//     const tagButtons = document.querySelectorAll(".tag-button");
//     const postBlocks = document.querySelectorAll(".post");

//     let selectedTag = "all"; // Default tag is "all"

//     // Filter posts based on the selected tag
//     function filterPostsByTag(tag) {
//         selectedTag = tag;

//         // Clear existing posts in the container
//         postBlocksContainer.innerHTML = "";

//         // Filter posts by tag
//         const filteredPostBlocks = Array.from(postBlocks).filter((block) => {
//             const tags = block.getAttribute("data-tags").split(",");
//             return selectedTag === "all" || tags.includes(selectedTag);
//         });

//         // Display all filtered posts with animation
//         filteredPostBlocks.forEach((post, index) => {
//             // Clone the post and add animation class
//             const clonedPost = post.cloneNode(true);
//             clonedPost.classList.remove('animate-left', 'animate-right'); // Remove old animation classes
//             const animationClass = (index % 2 === 0) ? 'animate-left' : 'animate-right'; // Alternate animations
//             clonedPost.classList.add(animationClass);

//             // Append the cloned post to the container
//             postBlocksContainer.appendChild(clonedPost);
//         });
//     }

//     // Add click event listeners to tag buttons
//     tagButtons.forEach((button) => {
//         button.addEventListener("click", () => {
//             // Update active state for buttons
//             tagButtons.forEach((btn) => btn.classList.remove("active"));
//             button.classList.add("active");

//             // Filter posts by selected tag
//             const tag = button.getAttribute("data-tag");
//             filterPostsByTag(tag);
//         });
//     });

//     // Initial setup: Display all posts
//     filterPostsByTag(selectedTag);
// });


// Function to get URL parameters
// Function to get URL parameters
// Function to get URL parameters
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded", function () {
    const postBlocksContainer = document.querySelector(".posts-container");
    const productCards = document.querySelectorAll(".product-card");
    const tagButtons = document.querySelectorAll(".tag-button");

    let postBlocks = null;
    if (postBlocksContainer) {
        postBlocks = document.querySelectorAll(".post");
    }

    if (!postBlocksContainer && !productCards && !tagButtons) {
        console.warn("No relevant elements found on this page. Exiting script.");
        return;
    }

    const category = getParameterByName('category');
    let selectedTag = category || "all";

    function filterPostsByTag(tag) {
        if (!postBlocksContainer || !postBlocks) return;

        selectedTag = tag;
        postBlocksContainer.innerHTML = "";

        const filteredPostBlocks = Array.from(postBlocks).filter((block) => {
            const tags = block.getAttribute("data-tags")?.split(',') || [];
            console.log("Post tags:", tags, "Matches:", tags.includes(tag));
            return selectedTag === "all" || tags.includes(selectedTag);
        });

        console.log("Filtered posts:", filteredPostBlocks);

        filteredPostBlocks.forEach((post, index) => {
            const clonedPost = post.cloneNode(true);
            clonedPost.classList.remove('animate-left', 'animate-right');
            const animationClass = (index % 2 === 0) ? 'animate-left' : 'animate-right';
            clonedPost.classList.add(animationClass);
            postBlocksContainer.appendChild(clonedPost);
        });
    }

    function filterProductCards(tag) {
        if (!productCards) return;

        productCards.forEach(card => {
            const tags = card.getAttribute('data-tags')?.split(',') || [];
            if (tag === 'all' || tags.includes(tag)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (tagButtons.length > 0) {
        tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tag = button.getAttribute('data-tag');

                console.log("Clicked tag:", tag);

                tagButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                filterPostsByTag(tag);
                filterProductCards(tag);

                if (postBlocksContainer) {
                    const newUrl = window.location.origin + window.location.pathname + "?category=" + tag;
                    window.history.pushState({ path: newUrl }, '', newUrl);
                }
            });
        });

        tagButtons.forEach(button => {
            if (button.getAttribute('data-tag') === selectedTag) {
                button.classList.add('active');
            }
        });
    }

    if (postBlocksContainer) {
        filterPostsByTag(selectedTag);
    } else if (productCards) {
        filterProductCards(selectedTag);
    }
});
// Inside the click event listener:
// console.log("Clicked tag:", tag);
// console.log("Product cards:", productCards);
// productCards.forEach(card => {
//     console.log("Card tags:", card.getAttribute('data-tags'));
// });