// Custom Cursor Implementation
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    const cursorText = document.getElementById('cursorText');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    // Check if device supports hover (not touch device)
    const hasHover = window.matchMedia('(hover: hover)').matches;

    if (hasHover) {
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      // Cursor hover effects
      const hoverElements = document.querySelectorAll('.magnetic, a, button, .skill-tag, .tech-tag');
      
      hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
          cursorText.style.opacity = '1';
          
          if (element.hasAttribute('title')) {
            cursorText.textContent = element.getAttribute('title');
          } else if (element.textContent.length < 20) {
            cursorText.textContent = element.textContent;
          } else {
            cursorText.textContent = 'Click';
          }
        });

        element.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
          cursorText.style.opacity = '0';
          cursorText.textContent = '';
        });

        element.addEventListener('mousemove', (e) => {
          cursorText.style.left = e.clientX + 20 + 'px';
          cursorText.style.top = e.clientY - 10 + 'px';
        });
      });
    } else {
      // Hide cursor on touch devices
      cursor.style.display = 'none';
      cursorFollower.style.display = 'none';
      cursorText.style.display = 'none';
    }

    // Magnetic Effect for elements
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        if (!hasHover) return;
        
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = 0.2;
        element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });

    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add theme transition effect
      document.body.style.transition = 'all 0.5s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when clicking on a link
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Parallax Background Effect
    const parallaxBg = document.getElementById('parallaxBg');
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      parallaxBg.style.transform = `translateY(${rate}px)`;
    }

    // Scroll Progress Bar
    function updateScrollProgress() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.max(0, Math.min(100, (scrollTop / scrollHeight) * 100));
      const progressElement = document.getElementById('scrollProgress');
      if (progressElement) {
        progressElement.style.width = scrollPercent + '%';
      }
    }

    // Floating Particles Animation
    function createFloatingParticles() {
      const particlesContainer = document.getElementById('floatingParticles');
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
      }
    }

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
      observer.observe(el);
    });

    // Header scroll effect with parallax
    function handleHeaderScroll() {
      const header = document.querySelector('header');
      const scrolled = window.scrollY;
      
      if (scrolled > 100) {
        header.style.background = 'var(--glass-bg)';
        header.style.backdropFilter = 'blur(25px)';
        header.style.borderBottom = '3px solid var(--accent-gold)';
        header.style.boxShadow = '0 10px 30px var(--shadow-medium)';
      } else {
        header.style.background = 'var(--glass-bg)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '2px solid var(--border-color)';
        header.style.boxShadow = '';
      }
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

    // Enhanced card hover effects
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        if (!hasHover) return;
        
        this.style.transform = 'translateY(-15px) rotateY(5deg) scale(1.02)';
        this.style.boxShadow = '0 30px 60px var(--shadow-heavy), 0 0 50px rgba(255, 215, 0, 0.3)';
        this.style.borderColor = 'var(--accent-gold)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.borderColor = '';
      });
    });

    // Typewriter effect for hero title
    function typeWriter(element, text, speed = 100) {
      let i = 0;
      element.innerHTML = '';
      
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          element.classList.add('glow-text');
        }
      }
      
      type();
    }

    // Loading screen management
    window.addEventListener('load', () => {
      const loading = document.getElementById('loading');
      
      setTimeout(() => {
        loading.classList.add('hidden');
        
        // Initialize typewriter effect after loading
        setTimeout(() => {
          const heroTitle = document.querySelector('.hero-text h1');
          if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 120);
          }
        }, 500);
        
        // Create floating particles
        createFloatingParticles();
        
      }, 2000);
    });

    // Debounced scroll handler for performance
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

    const debouncedScrollHandler = debounce(() => {
      updateScrollProgress();
      handleHeaderScroll();
      updateActiveNavLink();
      updateParallax();
    }, 16);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Theme toggle with 'T' key
      if (e.key === 't' || e.key === 'T') {
        if (!e.ctrlKey && !e.altKey && !e.metaKey) {
          themeToggle.click();
        }
      }
    });

    // Add ripple effect to buttons
    function createRipple(event) {
      const button = event.currentTarget;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      .btn-primary, .btn-outline {
        position: relative;
        overflow: hidden;
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);

    // Add ripple to buttons
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
      button.addEventListener('click', createRipple);
    });

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      updateScrollProgress();
      updateActiveNavLink();
      
      // Add custom styles for active nav links
      const style = document.createElement('style');
      style.textContent = `
        .nav-links a.active {
          color: var(--accent-primary) !important;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        .nav-links a.active::before {
          width: 100% !important;
        }
      `;
      document.head.appendChild(style);

      // Add entrance animations with stagger
      const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
      animatedElements.forEach((el, index) => {
        el.style.animationDelay = (index * 0.1) + 's';
      });
    });

    // Performance optimizations
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (reduceMotion) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--animation-duration', '0.01s');
      document.querySelectorAll('.floating-particles').forEach(el => {
        el.style.display = 'none';
      });
    }

    // Add visual feedback for interactions
    document.querySelectorAll('a, button, .skill-tag, .tech-tag').forEach(element => {
      element.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      });
    });

    // Error handling for images
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        this.style.opacity = '0.5';
        this.alt = 'Image loading error - ' + this.alt;
      });
    });

    // Lazy loading for better performance
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    console.log('🏰 Royal Portfolio Loaded Successfully! 👑');