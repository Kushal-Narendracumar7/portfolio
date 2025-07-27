// Initialize variables
let isUserScroll = false;
let scrollTimeout;

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
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
}

// Mobile Menu Toggle - IMPROVED VERSION
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
const body = document.body;
let backdrop = document.querySelector('.mobile-menu-backdrop');

// Create backdrop if it doesn't exist
if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    document.body.appendChild(backdrop);
}

// Function to toggle body scroll
function toggleBodyScroll(disable) {
    if (disable) {
        // Store current scroll position
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    } else {
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
}

// Close mobile menu function
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
    backdrop.classList.remove('active');
    toggleBodyScroll(false);
}

// Open mobile menu function
function openMobileMenu() {
    mobileMenu.classList.add('active');
    navLinks.classList.add('active');
    backdrop.classList.add('active');
    toggleBodyScroll(true);
}

// Mobile menu toggle
if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = mobileMenu.classList.contains('active');
        
        if (!isActive) {
            openMobileMenu();
        } else {
            closeMobileMenu();
        }
    });
}

// Close mobile menu when clicking on backdrop
if (backdrop) {
    backdrop.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a link
if (navLinks) {
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            closeMobileMenu();
            
            // Handle smooth scrolling for hash links
            const href = e.target.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    setTimeout(() => {
                        const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenu.contains(e.target) &&
        !backdrop.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty hash or just # 
        if (!href || href === '#') {
            return;
        }
        
        // Don't prevent default for CTA button
        if (this.classList.contains('cta-button')) {
            return;
        }
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 80;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Progress
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.max(0, Math.min(100, (scrollTop / scrollHeight) * 100));
    const progressElement = document.querySelector('.scroll-progress');
    if (progressElement) {
        progressElement.style.width = scrollPercent + '%';
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }
    }
}

// Combined scroll handler
function handleScroll() {
    updateScrollProgress();
    handleHeaderScroll();
    
    // Clear any existing timeout
    clearTimeout(scrollTimeout);
    
    // Set timeout to ensure scroll has stopped
    scrollTimeout = setTimeout(() => {
        isUserScroll = true;
    }, 150);
}

window.addEventListener('scroll', handleScroll);

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

// Parallax effect for floating elements
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-element');
    
    parallax.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', handleParallax);

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

// Smooth reveal animations with staggered effect
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

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure page starts at top
    setTimeout(() => {
        if (window.scrollY > 0) {
            window.scrollTo(0, 0);
        }
        isUserScroll = true;
    }, 100);
    
    // Initialize scroll progress
    updateScrollProgress();
});

// Handle page load
window.addEventListener('load', () => {
    // Reset scroll position if hash is present but not intended
    if (window.location.hash && window.location.hash !== '#') {
        const target = document.querySelector(window.location.hash);
        if (target && window.scrollY === 0) {
            history.replaceState(null, null, window.location.pathname);
        }
    }
    isUserScroll = true;
});

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});