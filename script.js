// Enhanced Mobile Navigation with Touch Support
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle mobile menu with enhanced animations
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = hamburger.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent background scrolling
        body.style.position = 'fixed';
        body.style.width = '100%';
        
        // Add touch-friendly backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(backdrop);
        
        // Animate backdrop
        requestAnimationFrame(() => {
            backdrop.style.opacity = '1';
        });
        
        // Close on backdrop click
        backdrop.addEventListener('click', closeMobileMenu);
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        
        // Remove backdrop
        const backdrop = document.querySelector('.mobile-backdrop');
        if (backdrop) {
            backdrop.style.opacity = '0';
            setTimeout(() => backdrop.remove(), 300);
        }
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
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
                    element.style.setProperty('color', '#2D5016', 'important');
                    element.style.setProperty('-webkit-text-fill-color', '#2D5016', 'important');
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
            const headerHeight = 100; // Fixed header height + buffer
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
                this.style.background = '#2D5016';
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

// Enhanced Touch and Mobile Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Touch gesture support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Swipe left/right detection
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
    
    // Enhanced button interactions for mobile
    const buttons = document.querySelectorAll('.btn, .add-to-cart-btn, .feature');
    buttons.forEach(button => {
        // Add touch feedback
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
        
        // Prevent double-tap zoom on buttons
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
    
    // Optimize scroll performance
    let ticking = false;
    function updateScrollEffects() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;
        
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(248, 248, 248, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
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

// Premium Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.premium-gallery');
    if (!gallery) return;

    const galleryItems = gallery.querySelectorAll('.gallery-item');
    
    // Add interactive effects to gallery items
    galleryItems.forEach((item, index) => {
        const image = item.querySelector('.gallery-img');
        
        // Add click handler for image switching
        item.addEventListener('click', function() {
            // Remove featured class from all items
            galleryItems.forEach(gItem => gItem.classList.remove('featured'));
            
            // Add featured class to clicked item
            this.classList.add('featured');
            
            // Add visual feedback
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });

        // Add keyboard support
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Add accessibility attributes
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View ${image.alt}`);
    });

    // Add staggered animation on load
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Gallery Action Functions
function scrollToCollections() {
    const collectionsSection = document.querySelector('#collections');
    if (collectionsSection) {
        const headerHeight = 100; // Fixed header height + buffer
        const targetPosition = collectionsSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function openLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">
                <i class="fas fa-times"></i>
            </button>
            <div class="lightbox-gallery">
                <img src="hero1.jpg" alt="Premium Golden Saree" class="lightbox-img active">
                <img src="hero2.jpg" alt="Elegant Maroon Saree" class="lightbox-img">
                <img src="hero3.jpg" alt="Classic Cream Saree" class="lightbox-img">
            </div>
            <div class="lightbox-controls">
                <button class="lightbox-nav prev" onclick="changeLightboxImage(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-nav next" onclick="changeLightboxImage(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="lightbox-dots">
                <span class="lightbox-dot active" onclick="setLightboxImage(0)"></span>
                <span class="lightbox-dot" onclick="setLightboxImage(1)"></span>
                <span class="lightbox-dot" onclick="setLightboxImage(2)"></span>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);
    setTimeout(() => lightbox.classList.add('show'), 10);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-modal');
    if (lightbox) {
        lightbox.classList.remove('show');
        setTimeout(() => document.body.removeChild(lightbox), 300);
    }
}

let currentLightboxImage = 0;

function changeLightboxImage(direction) {
    const images = document.querySelectorAll('.lightbox-img');
    const dots = document.querySelectorAll('.lightbox-dot');
    
    currentLightboxImage += direction;
    if (currentLightboxImage >= images.length) currentLightboxImage = 0;
    if (currentLightboxImage < 0) currentLightboxImage = images.length - 1;
    
    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentLightboxImage);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentLightboxImage);
    });
}

function setLightboxImage(index) {
    currentLightboxImage = index;
    changeLightboxImage(0);
}

// Console welcome message
console.log('%c🌱 Welcome to MAULI - Premium Eco-Luxury Sarees', 'color: #2C2C2C; font-size: 16px; font-weight: bold;');
console.log('%cCrafted with love and sustainability 💚', 'color: #FFD700; font-size: 14px;');
