document.addEventListener('DOMContentLoaded', () => 
    {
    const carouselImages = document.querySelector('.carousel-images'); /*CSS selector of the element you want to select*/
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    function showSlide(index)  
    {
        const offset = -index * 100; /*100% width - symbol left side pic move*/
        carouselImages.style.transform = `translateX(${offset}%)`;/*x axis moving*/
    }

    function nextSlide() 
    {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    }

    carouselPrev.addEventListener('click', () => 
        {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        showSlide(currentIndex);
    });

    carouselNext.addEventListener('click', () =>
         {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        showSlide(currentIndex);
    });

    
    setInterval(nextSlide, 9000); /*9secs automat slide*/

    // Initial setup
    showSlide(currentIndex);
});

// Sample blogs data
const blogs = [
    {
        title: "Food Blog 1", /*property name,value*/
        category: "food",
        image: "images/food1.jpg",
        content: "This is a brief content of food blog 1.",
        date: "2023-08-01",
        comments: []/* inital emty post*/
    },
    {
        title: "Food Blog 2",
        category: "food",
        image: "images/food2.jpg",
        content: "This is a brief content of food blog 2.",
        date: "2023-08-02",
        comments: []
    },
    {
        title: "News Blog 1",
        category: "news",
        image: "images/news1.jpg",
        content: "This is a brief content of news blog 1.",
        date: "2023-08-03",
        comments: []
    },
    {
        title: "News Blog 2",
        category: "news",
        image: "images/news2.jpg",
        content: "This is a brief content of news blog 2.",
        date: "2023-08-04",
        comments: []
    },
    {
        title: "Technology Blog 1",
        category: "technology",
        image: "images/technology1.jpg",
        content: "This is a brief content of technology blog 1.",
        date: "2023-08-05",
        comments: []
    },
    {
        title: "Technology Blog 2",
        category: "technology",
        image: "images/technology2.jpg",
        content: "This is a brief content of technology blog 2.",
        date: "2023-08-06",
        comments: []
    },
    {
        title: "Art Blog 1",
        category: "art",
        image: "images/art.jpg",
        content: "This is a brief content of art blog 1.",
        date: "2023-08-07",
        comments: []
    },
    {
        title: "Politics Blog 1",
        category: "politics",
        image: "images/politics.jpg",
        content: "This is a brief content of politics blog 1.",
        date: "2023-08-08",
        comments: []
    },
    {
        title: "Tourism Blog 1",
        category: "tourism",
        image: "images/tourism1.jpg",
        content: "This is a brief content of tourism blog 1.",
        date: "2023-08-09",
        comments: []
    },
    {
        title: "Education Blog 1",
        category: "education",
        image: "images/education.jpg",
        content: "This is a brief content of education blog 1.",
        date: "2023-08-10",
        comments: []
    },
    {
        title: "Media Blog 1",
        category: "media",
        image: "images/media.jpg",
        content: "This is a brief content of media blog 1.",
        date: "2023-08-11",
        comments: []
    },
];

function loadBlogs(category = 'all') 
{
    const blogContainer = document.getElementById('blogs');
    /* Selects the HTML element with the ID blogs*/
    blogContainer.innerHTML = '';

    let filteredBlogs = blogs;

    if (category === 'all') {
        // Show only one blog per category
        const categories = [...new Set(blogs.map(blog => blog.category))];
        filteredBlogs = categories.map(cat => blogs.find(blog => blog.category === cat));
    } else {
        // Show all blogs for the selected category
        filteredBlogs = blogs.filter(blog => blog.category === category);
    }

    filteredBlogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.classList.add('blog-post');

        blogElement.innerHTML = `
            <img src="${blog.image}" alt="${blog.title}" class="blog-image">
            <div class="blog-post-content">
                <h3><a href="blog.html?id=${encodeURIComponent(blog.title)}">${blog.title}</a></h3>
                 <p>${blog.content}</p>
                  <p><small>Published on: ${blog.date}</small></p>
                  <div class="like-section">
                     <button class="like-button">Like</button>
                     <span class="like-count">0 Likes</span>
                </div>
            </div >
        `;

        const likeButton = blogElement.querySelector('.like-button');
        const likeCount = blogElement.querySelector('.like-count');

        likeButton.addEventListener('click', () => {
            let likes = parseInt(likeCount.textContent.split(' ')[0]);
            likes++;
            likeCount.textContent = `${likes} Likes`;
        });

        blogContainer.appendChild(blogElement);
    });
}

function loadBlogPost() 
{
    const urlParams = new URLSearchParams(window.location.search);
    const blogTitle = decodeURIComponent(urlParams.get('id'));
    const blog = blogs.find(b => b.title === blogTitle);

    if (blog) {
        const blogPostContainer = document.getElementById('blog-post');
        blogPostContainer.innerHTML = `
            <div class="blog-post-detail">
                <img src="${blog.image}" alt="${blog.title}" class="blog-image">
                <div class="blog-post-content">
                    <h3>${blog.title}</h3>
                    <p>${blog.content}</p>
                    <p><small>Published on: ${blog.date}</small></p>
                </div>
                <div class="comment-section">
                    <h4>Comments</h4>
                    <ul id="comment-list">
                        ${blog.comments.map(comment => `<li>${comment}</li>`).join('')}
                    </ul>
                    <textarea id="comment-input" placeholder="Add a comment..."></textarea>
                    <button id="comment-submit">Submit</button>
                </div>
            </div>
        `;

        document.getElementById('comment-submit').addEventListener('click', () => {
            const commentInput = document.getElementById('comment-input');
            if (commentInput.value.trim()) {
                blog.comments.push(commentInput.value.trim());
                loadBlogPost(); // Reload to show new comment
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () =>
     {
    if (document.getElementById('blog-post')) {
        loadBlogPost();
    } else {
        loadBlogs();
        document.querySelectorAll('#categories a').forEach(categoryLink => {
            categoryLink.addEventListener('click', (event) => {
                event.preventDefault();
                const category = event.target.getAttribute('data-category');
                loadBlogs(category);
            });
        });

        document.querySelector('#categories a[data-category="all"]').addEventListener('click', (event) => {
            event.preventDefault();
            loadBlogs('all');
        });

        // Search functionality
        document.getElementById('search-button').addEventListener('click', () => {
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm) || blog.content.toLowerCase().includes(searchTerm));
            displayBlogs(filteredBlogs);
            window.scrollTo(0, document.getElementById('blogs').offsetTop); // Scroll to blogs section
        });

        document.getElementById('search-input').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const searchTerm = event.target.value.toLowerCase();
                const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(searchTerm) || blog.content.toLowerCase().includes(searchTerm));
                displayBlogs(filteredBlogs);
                window.scrollTo(0, document.getElementById('blogs').offsetTop); // Scroll to blogs section
            }
        });
    }
});

function displayBlogs(filteredBlogs) 
{
    const blogContainer = document.getElementById('blogs');
    blogContainer.innerHTML = '';

    filteredBlogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.classList.add('blog-post');

        blogElement.innerHTML = `
            <img src="${blog.image}" alt="${blog.title}" class="blog-image">
            <div class="blog-post-content">
                <h3><a href="blog.html?id=${encodeURIComponent(blog.title)}">${blog.title}</a></h3>
                <p>${blog.content}</p>
                <p><small>Published on: ${blog.date}</small></p>
                <div class="like-section">
                    <button class="like-button">Like</button>
                    <span class="like-count">0 Likes</span>
                </div>
            </div>
        `;

        const likeButton = blogElement.querySelector('.like-button');
        const likeCount = blogElement.querySelector('.like-count');

        likeButton.addEventListener('click', () => {
            let likes = parseInt(likeCount.textContent.split(' ')[0]);
            likes++;
            likeCount.textContent = `${likes} Likes`;
        });

        blogContainer.appendChild(blogElement);
    });
}
