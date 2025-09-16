// Portfolio JavaScript - Enhanced with better loading and performance

// Loading Screen with content-based loading
let contentLoaded = false;
let imagesLoaded = false;

// Check if all content is loaded
function checkContentLoaded() {
    if (contentLoaded && imagesLoaded) {
        const loading = document.getElementById('loading');
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 500);
    }
}

// Preload critical images
function preloadImages() {
    const imageUrls = [
        'images/memoji.png',
        'images/coffee.png',
        'images/favicon.png'
    ];
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loadedCount++;
            if (loadedCount === totalImages) {
                imagesLoaded = true;
                checkContentLoaded();
            }
        };
        img.src = url;
    });
    
    // Fallback timeout in case images take too long
    setTimeout(() => {
        if (!imagesLoaded) {
            imagesLoaded = true;
            checkContentLoaded();
        }
    }, 3000);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    contentLoaded = true;
    preloadImages();
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
});

// Window Load (backup)
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading && !loading.classList.contains('hidden')) {
            loading.classList.add('hidden');
        }
    }, 2000);
});

// Mobile Menu Toggle
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Scroll Progress Bar
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.max(0, Math.min(100, (scrollTop / scrollHeight) * 100));
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    // Active Navigation Update
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Header Scroll Effect
    function updateHeaderStyle() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.9)';
                header.style.boxShadow = 'none';
            }
        }
    }

    // Throttled scroll handler for better performance
    let scrollTimeout;
    function throttledScrollHandler() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            updateScrollProgress();
            updateActiveNav();
            updateHeaderStyle();
        }, 10);
    }

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}

// Animation Initialization
function initializeAnimations() {
    // Intersection Observer for scroll animations
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

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Stats Counter Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const originalText = stat.textContent;
            const hasPlus = originalText.includes('+');
            const target = parseInt(originalText.replace('+', ''));
            
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 60;
                const duration = 2000; // 2 seconds
                const stepTime = duration / 60;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                }, stepTime);
            }
        });
    }

    // Trigger stats animation when section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (e.key === 'Escape') {
        if (mobileMenu && navLinks) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// Performance Optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when tab is visible
        document.body.style.animationPlayState = 'running';
    }
});

// Error Handling for Images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
        });
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleImageErrors);

// Form Enhancement (if contact form is added later)
function enhanceContactForm() {
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    });
}

//