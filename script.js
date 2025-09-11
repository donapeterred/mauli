// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Force dark brown text on mobile devices - AGGRESSIVE FIX
    function forceMobileTextColor() {
        if (window.innerWidth <= 768) {
            // Target all possible text elements in hero section
            const selectors = [
                '.hero .brand-large',
                '.hero .hero-subtitle',
                '.hero .hero-description',
                '.hero h1',
                '.hero span',
                '.hero-title .brand-large',
                '.hero-title .hero-subtitle',
                '.hero-title .hero-description',
                '.hero-text .brand-large',
                '.hero-text .hero-subtitle',
                '.hero-text .hero-description',
                '.hero-content .brand-large',
                '.hero-content .hero-subtitle',
                '.hero-content .hero-description'
            ];

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    // Force maroon color with maximum priority
                    element.style.setProperty('color', '#8B0000', 'important');
                    element.style.setProperty('-webkit-text-fill-color', '#8B0000', 'important');
                    element.style.setProperty('background', 'transparent', 'important');
                    element.style.setProperty('background-image', 'none', 'important');
                    element.style.setProperty('background-color', 'transparent', 'important');
                    element.style.setProperty('-webkit-background-clip', 'text', 'important');
                    element.style.setProperty('background-clip', 'text', 'important');
                    element.style.setProperty('text-shadow', 'none', 'important');
                });
            });
        }
    }

    // Apply immediately and on resize
    forceMobileTextColor();
    window.addEventListener('resize', forceMobileTextColor);

    // Also apply after a short delay to catch any dynamically loaded content
    setTimeout(forceMobileTextColor, 500);
    setTimeout(forceMobileTextColor, 1000);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate stats numbers
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, observerOptions);

// Counter Animation for Statistics
function animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    
    if (target && !element.classList.contains('animated')) {
        element.classList.add('animated');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
}

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.about, .collections, .contact, .crafting-process, .video-section');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Product Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Quick View Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Get product info
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Create modal (simplified version)
            showQuickView(productTitle, productPrice, productImage);
        });
    });
});

function showQuickView(title, price, image) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${image}" alt="${title}" class="modal-image">
                <div class="modal-info">
                    <p class="modal-price">${price}</p>
                    <p>Premium eco-luxury saree crafted from banana plant fiber.</p>
                    <button class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Add to Cart Functionality - Redirect to WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;

            // Create WhatsApp message
            const message = `Hi! I'm interested in purchasing the ${productTitle} priced at ${productPrice}. Could you please provide more details?`;
            const whatsappNumber = '+916381606058';
            const whatsappURL = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

            // Add visual feedback before redirect
            this.textContent = 'Redirecting...';
            this.style.background = '#25D366'; // WhatsApp green

            // Show notification and redirect
            showNotification(`Redirecting to WhatsApp for ${productTitle}!`);

            // Redirect to WhatsApp after a short delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');

                // Reset button after redirect
                this.textContent = 'Add to Cart';
                this.style.background = '#8B0000';
            }, 1000);
        });
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax Effect for Hero Section - REMOVED
// Removed parallax scrolling effects for cleaner presentation

// Video Play Functionality
document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-button, .play-button-large');
    
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoContainer = this.closest('.image-container, .video-container');
            const video = videoContainer.querySelector('video');
            
            if (video) {
                if (video.paused) {
                    video.play();
                    this.style.opacity = '0';
                } else {
                    video.pause();
                    this.style.opacity = '1';
                }
            }
        });
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loading');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Button Ripple Effect
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .add-to-cart-btn, .quick-view-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Performance Optimization - Throttle Scroll Events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Header background change
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Parallax effect - REMOVED
    // Removed parallax effects for cleaner presentation
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Enhanced Loading Animation - SIMPLIFIED
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    // Removed complex loading animations for cleaner presentation
});

// Add Particle Effect - REMOVED
// Removed particle effects for cleaner presentation

// Enhanced Product Card Interactions - SIMPLIFIED
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Initialize particles - REMOVED
// createParticles();

// Console welcome message
console.log('%c🌱 Welcome to MAULI - Premium Eco-Luxury Sarees', 'color: #8B0000; font-size: 16px; font-weight: bold;');
console.log('%cCrafted with love and sustainability 💚', 'color: #FFD700; font-size: 14px;');
