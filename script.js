// Labubu Central - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initFilters();
    initNewsletterForm();
    initSmoothScrolling();
    initMobileMenu();
    initCardAnimations();
});

// Filter functionality for catalog page
function initFilters() {
    const sortSelect = document.getElementById('sort');
    const editionSelect = document.getElementById('edition');
    const collectionSelect = document.getElementById('collection');
    const cards = document.querySelectorAll('.labubu-card');

    function applyFilters() {
        const sortBy = sortSelect?.value || 'popularity';
        const selectedEdition = editionSelect?.value || 'all';
        const selectedCollection = collectionSelect?.value || 'all';

        // Filter cards based on selection
        cards.forEach(card => {
            const cardEdition = card.dataset.edition;
            const cardCollection = card.dataset.collection;

            const editionMatch = selectedEdition === 'all' || cardEdition === selectedEdition;
            const collectionMatch = selectedCollection === 'all' || cardCollection === selectedCollection;

            if (editionMatch && collectionMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Sort cards
        sortCards(cards, sortBy);
    }

    function sortCards(cards, sortBy) {
        const catalogGrid = document.querySelector('.catalog-grid');
        if (!catalogGrid) return;

        const cardsArray = Array.from(cards).filter(card => card.style.display !== 'none');

        cardsArray.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    const priceA = parseFloat(a.querySelector('.price-range')?.textContent.match(/\$(\d+\.\d+)/)?.[1] || '0');
                    const priceB = parseFloat(b.querySelector('.price-range')?.textContent.match(/\$(\d+\.\d+)/)?.[1] || '0');
                    return priceA - priceB;

                case 'price-high':
                    const priceAHigh = parseFloat(a.querySelector('.price-range')?.textContent.match(/\$(\d+\.\d+)/)?.[1] || '0');
                    const priceBHigh = parseFloat(b.querySelector('.price-range')?.textContent.match(/\$(\d+\.\d+)/)?.[1] || '0');
                    return priceBHigh - priceAHigh;

                case 'newest':
                    // For demo purposes, we'll sort by the order they appear
                    return Array.from(cards).indexOf(a) - Array.from(cards).indexOf(b);

                case 'popularity':
                default:
                    // Keep original order for popularity
                    return Array.from(cards).indexOf(a) - Array.from(cards).indexOf(b);
            }
        });

        // Clear and re-append sorted cards
        cardsArray.forEach(card => {
            catalogGrid.appendChild(card);
        });
    }

    // Add event listeners
    if (sortSelect) sortSelect.addEventListener('change', applyFilters);
    if (editionSelect) editionSelect.addEventListener('change', applyFilters);
    if (collectionSelect) collectionSelect.addEventListener('change', applyFilters);
}

// Newsletter form handling
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            const email = emailInput.value;

            if (email && isValidEmail(email)) {
                // Show loading state
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showNotification('Successfully subscribed to Labubu Central newsletter!', 'success');

                    // Reset form
                    emailInput.value = '';
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '1000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4ecdc4';
            break;
        case 'error':
            notification.style.backgroundColor = '#ff6b9d';
            break;
        default:
            notification.style.backgroundColor = '#2c3e50';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu toggle (for future mobile menu implementation)
function initMobileMenu() {
    // This function is ready for when we add a mobile hamburger menu
    const nav = document.querySelector('.nav');

    // Create mobile menu button (hidden by default, can be shown with CSS)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.style.display = 'none'; // Hidden by default

    Object.assign(mobileMenuButton.style, {
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#2c3e50',
        padding: '0.5rem',
        display: 'none'
    });

    if (nav) {
        nav.appendChild(mobileMenuButton);

        mobileMenuButton.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('mobile-open');
            }
        });
    }
}

// Enhanced card animations and interactions
function initCardAnimations() {
    const cards = document.querySelectorAll('.labubu-card, .blog-card');

    cards.forEach(card => {
        // Add click handler for cards
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Buy button functionality - Links work normally
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('buy-btn')) {
        // Let the links work normally - no demo interference
        const button = e.target;
        const retailer = button.textContent.trim();

        // Optional: Show notification that link is opening
        showNotification(`Opening ${retailer}...`, 'info');
    }
});

// Search functionality (for future implementation)
function initSearch() {
    // This function is ready for when we add a search feature
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search Labubus...';
    searchInput.className = 'search-input';

    // Add to nav if needed
    const nav = document.querySelector('.nav');
    if (nav) {
        // Could add search functionality here
    }
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some Easter eggs for fun
let konami = [];
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konami.push(e.code);
    if (konami.length > konamiCode.length) {
        konami.shift();
    }

    if (konami.join('') === konamiCode.join('')) {
        // Easter egg activated!
        showNotification('🎉 Labubu dance party! 🎉', 'success');
        document.body.style.animation = 'pulse 0.5s infinite';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// Add CSS animation for the Easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    .mobile-menu-button {
        display: none !important;
    }

    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block !important;
        }

        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            flex-direction: column;
            padding: 1rem;
        }

        .nav-menu.mobile-open {
            display: flex;
        }
    }
`;
document.head.appendChild(style);
