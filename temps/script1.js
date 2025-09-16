  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');

  mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
          mobileMenuToggle.classList.remove('active');
          navLinks.classList.remove('active');
      }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              target.scrollIntoView({behavior: 'smooth', block: 'start'});
          }
      });
  });

  // Scroll indicator
  function updateScrollIndicator() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      document.getElementById('scrollIndicator').style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateScrollIndicator);

  // Fade in animation on scroll
  function checkFadeElements() {
      const fadeElements = document.querySelectorAll('.fade-in');
      const windowHeight = window.innerHeight;

      fadeElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;

          if (elementTop < windowHeight - elementVisible) {
              element.classList.add('visible');
          }
      });
  }

  window.addEventListener('scroll', checkFadeElements);
  checkFadeElements();

  // Header background change on scroll
  window.addEventListener('scroll', function () {
      const header = document.querySelector('header');
      if (window.scrollY > 100) {
          header.style.background = 'rgba(15, 10, 26, 0.98)';
      } else {
          header.style.background = 'rgba(15, 15, 35, 0.95)';
      }
  });

  // Interactive skill tags
  document.querySelectorAll('.skill-tag').forEach(tag => {
      tag.addEventListener('mouseenter', function () {
          this.style.background = 'var(--vibranium-purple)';
          this.style.color = 'var(--white)';
          this.style.transform = 'translateY(-2px) scale(1.05)';
      });

      tag.addEventListener('mouseleave', function () {
          this.style.background = 'rgba(139, 92, 246, 0.1)';
          this.style.color = 'var(--vibranium-purple)';
          this.style.transform = 'translateY(0) scale(1)';
      });
  });

  // Project card hover effects
  document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mouseenter', function () {
          this.style.transform = 'translateY(-10px)';
          this.style.borderColor = 'var(--wakanda-gold)';
          this.style.boxShadow = 'var(--glow-gold)';
      });

      card.addEventListener('mouseleave', function () {
          this.style.transform = 'translateY(0)';
          this.style.borderColor = 'rgba(139, 92, 246, 0.2)';
          this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      });
  });

  // Typewriter effect completion
  setTimeout(() => {
      const typewriterText = document.querySelector('.typewriter-text');
      if (typewriterText) {
          typewriterText.style.borderRight = 'none';
      }
  }, 4000);

// Custom Cursor Animation
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px';
        cursorTrail.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effects
document.querySelectorAll('a, button, .cta-button, .project-link, .social-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.background = 'radial-gradient(circle, #FFD700 0%, rgba(255, 215, 0, 0.8) 100%)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'radial-gradient(circle, #FFD700 0%, rgba(255, 215, 0, 0.3) 100%)';
    });
});

// Parallax Scrolling Effect
const parallaxElements = document.querySelectorAll('.parallax-element');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed'));
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Carousel Navigation
let currentSlide = 0;
const carousel = document.querySelector('.projects-carousel');
const cards = document.querySelectorAll('.project-card');
const indicators = document.querySelectorAll('.carousel-indicator');

function moveCarousel(direction) {
    const cardWidth = cards[0].offsetWidth + 32; // card width + gap
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
    const cardWidth = cards[0].offsetWidth + 32;
    const translateX = -currentSlide * cardWidth;
    
    carousel.style.transform = `translateX(${translateX}px)`;
    carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// Auto-play carousel
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto-play when page loads
document.addEventListener('DOMContentLoaded', () => {
    startAutoPlay();
    
    // Pause auto-play on hover
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
    carouselWrapper.addEventListener('mouseleave', startAutoPlay);
});