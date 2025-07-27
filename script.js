// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effects
document.querySelectorAll('a, button, .skill-tag').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
const body = document.body;
const backdrop = document.querySelector('.mobile-menu-backdrop');

// Function to toggle body scroll
function toggleBodyScroll(disable) {
    if (disable) {
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
    } else {
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    }
}

mobileMenu.addEventListener('click', () => {
    const isActive = mobileMenu.classList.contains('active');
    
    if (!isActive) {
        // Opening menu
        mobileMenu.classList.add('active');
        navLinks.classList.add('active');
        backdrop.classList.add('active');
        toggleBodyScroll(true);
    } else {
        // Closing menu
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        backdrop.classList.remove('active');
        toggleBodyScroll(false);
    }
});

// Close mobile menu when clicking on backdrop
backdrop.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
    backdrop.classList.remove('active');
    toggleBodyScroll(false);
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        // Close menu immediately
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        backdrop.classList.remove('active');
        toggleBodyScroll(false);
        
        // Handle smooth scrolling
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Small delay to ensure menu is closed before scrolling
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenu.contains(e.target) &&
        !backdrop.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        backdrop.classList.remove('active');
        toggleBodyScroll(false);
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        backdrop.classList.remove('active');
        toggleBodyScroll(false);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll Progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scroll');
    } else {
        header.classList.remove('header-scroll');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Carousel functionality
let currentSlide = 0;
const carousel = document.querySelector('.projects-carousel');
const cards = document.querySelectorAll('.project-card');
const indicators = document.querySelectorAll('.carousel-indicator');

function moveCarousel(direction) {
    const totalCards = cards.length;
    
    if (direction === 1) {
        currentSlide = (currentSlide + 1) % totalCards;
    } else {
        currentSlide = (currentSlide - 1 + totalCards) % totalCards;
    }
    
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function updateCarousel() {
    // Check if we're on mobile (carousel should be scrollable)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, just update indicators and let CSS handle the scrolling
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Scroll to the current card
        if (cards[currentSlide]) {
            cards[currentSlide].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'start'
            });
        }
    } else {
        // On desktop, use transform for smooth sliding
        const cardWidth = cards[0].offsetWidth + 32; // card width + gap
        const translateX = -currentSlide * cardWidth;
        
        carousel.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
}

// Update carousel on window resize
window.addEventListener('resize', () => {
    updateCarousel();
});

// Update carousel indicators on scroll (for mobile)
carousel.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 16; // card width + gap
        const newSlide = Math.round(scrollLeft / cardWidth);
        
        if (newSlide !== currentSlide && newSlide >= 0 && newSlide < cards.length) {
            currentSlide = newSlide;
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
    }
});

// Auto-play carousel
let autoPlayInterval;

function startAutoPlay() {
    // Disable auto-play since we only have 3 projects
    return;
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto-play when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Don't start auto-play for 3 projects
    startAutoPlay();
    
    // Pause auto-play on hover
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
        carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    }
});

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-element');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Enhanced hover effects for cards
document.querySelectorAll('.skill-card, .project-card, .cert-card, .experience-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Magnetic effect for buttons
document.querySelectorAll('.cta-button, .project-link, .resume-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Smooth reveal animations
const revealElements = document.querySelectorAll('.fade-in');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});