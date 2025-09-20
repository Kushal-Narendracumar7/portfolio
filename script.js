// Enhanced Portfolio JavaScript
class EnhancedPortfolio {
    constructor() {
        this.isLoaded = false;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentSlide = 0;
        this.totalSlides = 3;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initTheme();
        this.initLoader();
        this.initNavigation();
        this.initScrollEffects();
        this.initAnimations();
        this.initTypewriter();
        this.initCounters();
        this.initSkillsSection();
        this.initProjectsFilter();
        this.initTestimonials();
        this.initContactForm();
        this.initParticles();
        this.initCursor();
    }

    setupEventListeners() {
        // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.addFadeInAnimations();
        });

        // Window Load
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoader();
                this.isLoaded = true;
            }, 1000);
        });

        // Resize with debouncing
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // Theme System
    initTheme() {
        this.setTheme(this.currentTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Loader
    initLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            // Simulate loading progress
            const progress = loader.querySelector('.loader-text');
            if (progress) {
                let count = 0;
                const interval = setInterval(() => {
                    count += Math.random() * 30;
                    if (count >= 100) {
                        count = 100;
                        clearInterval(interval);
                    }
                    progress.textContent = `Loading Portfolio... ${Math.round(count)}%`;
                }, 100);
            }
        }
    }

    hideLoader() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = '';
            }, 500);
        }
    }

    // Navigation
    initNavigation() {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', this.throttle(() => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            this.updateActiveNavLink();
        }, 10));
    }

    toggleMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll Effects
    initScrollEffects() {
        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        
        if (backToTop) {
            window.addEventListener('scroll', this.throttle(() => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }, 10));

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Parallax effects
        window.addEventListener('scroll', this.throttle(() => {
            const scrolled = window.pageYOffset;
            
            // Hero parallax
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.3;
                hero.style.transform = `translateY(${rate}px)`;
            }
            
            // Floating icons parallax
            const floatingIcons = document.querySelectorAll('.floating-icon');
            floatingIcons.forEach((icon, index) => {
                const rate = scrolled * (0.1 + index * 0.05);
                icon.style.transform = `translateY(${rate}px)`;
            });
        }, 10));
    }

    // Typewriter Effect
    initTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const texts = typewriterElement.dataset.text.split(',');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // Wait at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Wait before starting new text
            }

            setTimeout(type, typingSpeed);
        };

        setTimeout(type, 1000);
    }

    // Counter Animation
    initCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const start = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Skills Section
    initSkillsSection() {
        const categories = document.querySelectorAll('.skill-category');
        const skillGroups = document.querySelectorAll('.skills-group');
        
        categories.forEach(category => {
            category.addEventListener('click', () => {
                const targetGroup = category.dataset.category;
                
                // Update active category
                categories.forEach(cat => cat.classList.remove('active'));
                category.classList.add('active');
                
                // Show target group
                skillGroups.forEach(group => {
                    group.classList.remove('active');
                    if (group.dataset.group === targetGroup) {
                        group.classList.add('active');
                        this.animateSkillBars(group);
                    }
                });
            });
        });

        // Animate skill bars when they come into view
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skills-group').forEach(group => {
            skillObserver.observe(group);
        });
    }

    animateSkillBars(container) {
        const skillBars = container.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.dataset.progress;
                bar.style.width = `${progress}%`;
            }, index * 200);
        });
    }

    // Projects Filter
    initProjectsFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.dataset.category;
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Testimonials Slider
    initTestimonials() {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const navDots = document.querySelectorAll('.nav-dot');
        
        if (testimonialItems.length === 0) return;

        // Auto-advance testimonials
        this.testimonialInterval = setInterval(() => {
            this.nextTestimonial();
        }, 5000);

        // Navigation dots
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showTestimonial(index);
                this.resetTestimonialInterval();
            });
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        
        const testimonialContainer = document.querySelector('.testimonials-slider');
        if (testimonialContainer) {
            testimonialContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });

            testimonialContainer.addEventListener('touchend', (e) => {
                if (!startX || !startY) return;
                
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                
                const diffX = startX - endX;
                const diffY = startY - endY;
                
                // Only handle horizontal swipes
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        this.nextTestimonial();
                    } else {
                        this.previousTestimonial();
                    }
                    this.resetTestimonialInterval();
                }
                
                startX = 0;
                startY = 0;
            });
        }
    }

    showTestimonial(index) {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const navDots = document.querySelectorAll('.nav-dot');
        
        // Update active testimonial
        testimonialItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Update active dot
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        this.currentSlide = index;
    }

    nextTestimonial() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.showTestimonial(nextIndex);
    }

    previousTestimonial() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.showTestimonial(prevIndex);
    }

    resetTestimonialInterval() {
        clearInterval(this.testimonialInterval);
        this.testimonialInterval = setInterval(() => {
            this.nextTestimonial();
        }, 5000);
    }

    // Contact Form
    initContactForm() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            // Form field animations
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea, select');
                if (input) {
                    input.addEventListener('focus', () => {
                        group.classList.add('focused');
                    });
                    
                    input.addEventListener('blur', () => {
                        if (!input.value.trim()) {
                            group.classList.remove('focused');
                        }
                    });

                    // Check if field has value on load
                    if (input.value.trim()) {
                        group.classList.add('focused');
                    }
                }
            });

            // Form submission
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleFormSubmission(form);
            });
        }
    }

    async handleFormSubmission(form) {
        const submitButton = form.querySelector('.form-submit');
        const originalContent = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitButton.disabled = true;

        try {
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (!this.validateForm(data)) {
                throw new Error('Please fill in all required fields correctly.');
            }

            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(data);
            
            // Success feedback
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Remove focused classes
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('focused'));
            
        } catch (error) {
            // Error feedback
            this.showNotification(error.message || 'Failed to send message. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Restore button state
            submitButton.innerHTML = originalContent;
            submitButton.disabled = false;
        }
    }

    validateForm(data) {
        const { firstName, lastName, email, subject, projectType, message } = data;
        
        if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || 
            !subject?.trim() || !projectType || !message?.trim()) {
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address.');
        }
        
        return true;
    }

    async submitForm(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve({ success: true, message: 'Form submitted successfully' });
                } else {
                    reject(new Error('Server temporarily unavailable'));
                }
            }, 2000);
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                </div>
                <span class="notification-message">${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '12px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '400px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        });

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Add close functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle',
            warning: 'exclamation-triangle'
        };
        return icons[type] || icons.info;
    }

    removeNotification(notification) {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }

    // Particles Animation
    initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particlesCount = 50;
        const particles = [];

        // Create particles
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            Object.assign(particle.style, {
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'rgba(37, 99, 235, 0.3)',
                borderRadius: '50%',
                pointerEvents: 'none'
            });

            particlesContainer.appendChild(particle);
            
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1
            });
        }

        // Animate particles
        const animateParticles = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around screen
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;

                // Update position
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                particle.element.style.width = particle.size + 'px';
                particle.element.style.height = particle.size + 'px';
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    // Custom Cursor
    initCursor() {
        if (window.innerWidth < 1024) return; // Skip on mobile devices

        const cursor = document.getElementById('cursor');
        if (!cursor) return;

        const cursorDot = cursor.querySelector('.cursor-dot');
        const cursorOutline = cursor.querySelector('.cursor-outline');

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor movement
        const animateCursor = () => {
            const speed = 0.15;
            
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .cert-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });

            element.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Intersection Observer for Animations
    initAnimations() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.skill-item, .project-card, .cert-card, .timeline-content');
                    children.forEach((child, index) => {
                        child.style.animationDelay = `${index * 0.1}s`;
                        child.classList.add('fade-in');
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        const elementsToAnimate = document.querySelectorAll(
            '.section-header, .about-intro, .about-details, .skills-content, ' +
            '.projects-grid, .experience-content, .testimonials-content, .contact-content'
        );
        
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    addFadeInAnimations() {
        const heroElements = document.querySelectorAll('.hero-text > *:not(.fade-in)');
        heroElements.forEach((el, index) => {
            el.style.animationDelay = `${0.1 + index * 0.1}s`;
            el.classList.add('fade-in');
        });
    }

    // Keyboard Navigation
    handleKeyboard(e) {
        document.body.classList.add('keyboard-navigation');
        
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
        
        // Arrow keys for testimonial navigation
        if (e.key === 'ArrowLeft') {
            this.previousTestimonial();
            this.resetTestimonialInterval();
        } else if (e.key === 'ArrowRight') {
            this.nextTestimonial();
            this.resetTestimonialInterval();
        }
    }

    // Window Resize Handler
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
        
        // Reinitialize cursor on resize
        if (window.innerWidth >= 1024 && !document.getElementById('cursor').style.display) {
            this.initCursor();
        }
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
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

    // Cleanup
    destroy() {
        if (this.testimonialInterval) {
            clearInterval(this.testimonialInterval);
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.updateActiveNavLink);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleKeyboard);
    }
}

// Utility Functions
const Utils = {
    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Validate email
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    },

    // Get scroll percentage
    getScrollPercentage: () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        return (scrollTop / docHeight) * 100;
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Performance Monitoring
const Performance = {
    logMetrics: () => {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                        console.log('Performance Metrics:', {
                            'DNS Lookup': Math.round(navigation.domainLookupEnd - navigation.domainLookupStart) + 'ms',
                            'TCP Connection': Math.round(navigation.connectEnd - navigation.connectStart) + 'ms',
                            'Server Response': Math.round(navigation.responseStart - navigation.requestStart) + 'ms',
                            'DOM Content Loaded': Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart) + 'ms',
                            'Complete Load': Math.round(navigation.loadEventEnd - navigation.loadEventStart) + 'ms'
                        });
                    }
                }, 0);
            });
        }
    },

    // Monitor Core Web Vitals
    monitorCoreWebVitals: () => {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }
};

// Initialize Application
let portfolioApp;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    portfolioApp = new EnhancedPortfolio();
    
    // Initialize performance monitoring
    Performance.logMetrics();
    Performance.monitorCoreWebVitals();
    
    // Make utilities globally available
    window.PortfolioUtils = Utils;
    
    console.log('%c🚀 Enhanced Portfolio Loaded Successfully!', 'color: #2563eb; font-size: 16px; font-weight: bold;');
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (portfolioApp) {
        portfolioApp.destroy();
    }
});

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnhancedPortfolio, Utils, Performance };
}