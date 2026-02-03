// 1. Initialize State (Runs when page loads)
document.addEventListener("DOMContentLoaded", () => {
    // Restore Cart Count
    const savedCount = localStorage.getItem('cartCount');
    if (savedCount) {
        cartItemCount = parseInt(savedCount);
        document.getElementById('cartCount').innerText = cartItemCount;
    }

    // Restore Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeIcon').classList.replace('fa-moon', 'fa-sun');
    }
});

// 2. Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// 3. Theme Toggle (Dark Mode)
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    
    // Toggle class
    body.classList.toggle('dark-mode');

    // Save preference & Update Icon
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// 4. Filter Products
function filterProducts(category) {
    // Update Active Button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category || (category === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        }
    });
    
    // Filter Cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hide');
            // Reset animation
            card.style.animation = 'none';
            card.offsetHeight; /* Trigger reflow */
            card.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            card.classList.add('hide');
        }
    });
}

// 5. Search Functionality
function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const desc = card.querySelector('.desc').innerText.toLowerCase();
        
        if (title.includes(input) || desc.includes(input)) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });

    // Visually reset filter buttons to 'All'
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn[onclick="filterProducts(\'all\')"]').classList.add('active');
}

// 6. Add to Cart Logic
let cartItemCount = 0;

function addToCart() {
    cartItemCount++;
    
    const countElement = document.getElementById('cartCount');
    countElement.innerText = cartItemCount;
    
    // Save to LocalStorage
    localStorage.setItem('cartCount', cartItemCount);
    
    // Animation
    countElement.classList.add('bump');
    setTimeout(() => {
        countElement.classList.remove('bump');
    }, 300);
}