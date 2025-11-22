// ===================================
// NO Floating Shapes - Removed for steady professional appearance
// ===================================

// ===================================
// Mobile Navigation Toggle
// ===================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ===================================
// Smooth Scrolling
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Enhanced Navbar on Scroll
// ===================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Intersection Observer for Scroll Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Fade in on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll(
    '.expertise-card, .service-card, .portfolio-card, .highlight-card, ' +
    '.publication-card, .education-card, .timeline-item, .therapeutic-card, ' +
    '.stat-item, .badge, .language-item, .contact-card'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(el);
});

// ===================================
// NO Parallax Effects - Removed for steady appearance
// ===================================

// ===================================
// Active Navigation Link
// ===================================

const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===================================
// Counter Animation for Stats
// ===================================

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50; // 50 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                const suffix = text.replace(number, '');
                
                if (!stat.classList.contains('animated')) {
                    animateCounter(stat, number, suffix);
                    stat.classList.add('animated');
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// Tilt Effect on Cards
// ===================================

function addTiltEffect(elements) {
    elements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

// Apply tilt to profile card and specific cards
const tiltCards = document.querySelectorAll('.profile-card, .expertise-card, .service-card');
addTiltEffect(tiltCards);

// ===================================
// Typing Effect for Hero Title
// ===================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalText = element.textContent;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     typeWriter(heroTitle, heroTitle.textContent, 80);
// }

// ===================================
// Gradient Animation on Hover
// ===================================

function animateGradientOnHover(elements) {
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.backgroundPosition = '100% 0';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.backgroundPosition = '0 0';
        });
    });
}

const gradientElements = document.querySelectorAll('.btn-primary, .badge');
gradientElements.forEach(el => {
    el.style.backgroundSize = '200% auto';
    el.style.transition = 'background-position 0.5s ease';
});
animateGradientOnHover(gradientElements);

// ===================================
// Copy Email on Click
// ===================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.textContent;
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary feedback
                const originalText = link.textContent;
                link.textContent = 'Email copied! ✓';
                link.style.color = '#10b981';
                
                setTimeout(() => {
                    link.textContent = originalText;
                    link.style.color = '';
                }, 2000);
            });
        }
    });
});

// ===================================
// Dynamic Year in Footer
// ===================================

const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
}

// ===================================
// External Links Open in New Tab
// ===================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===================================
// Scroll Progress Indicator
// ===================================

function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(102, 126, 234, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgressBar();

// ===================================
// Lazy Loading for Images (if any are added)
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Cursor Trail Effect
// ===================================

function createCursorTrail() {
    let lastX = 0;
    let lastY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
            z-index: 9998;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            transform: translate(-50%, -50%);
            animation: cursorFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
        
        lastX = e.clientX;
        lastY = e.clientY;
    });
}

// Add cursor trail CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes cursorFade {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
        }
    }
`;
document.head.appendChild(style);

// Uncomment to enable cursor trail
// createCursorTrail();

// ===================================
// Performance: Debounce Scroll Events
// ===================================

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

// Use debounced scroll for better performance
const debouncedUpdateNav = debounce(updateActiveNav, 100);
window.removeEventListener('scroll', updateActiveNav);
window.addEventListener('scroll', debouncedUpdateNav);

// ===================================
// Print-Friendly Styles
// ===================================

window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===================================
// Reveal on Scroll Effect
// ===================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', debounce(revealOnScroll, 50));

// Add reveal class to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
});

// ===================================
// Mouse Movement Parallax
// ===================================

function addMouseParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move floating shapes based on mouse position
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            const x = (window.innerWidth - mouseX * speed) / 100;
            const y = (window.innerHeight - mouseY * speed) / 100;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Subtle parallax on cards
        const cards = document.querySelectorAll('.expertise-card, .service-card');
        cards.forEach((card, index) => {
            if (isInViewport(card)) {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                
                const angleX = (e.clientY - cardCenterY) / 50;
                const angleY = (cardCenterX - e.clientX) / 50;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            }
        });
    });
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Uncomment to enable mouse parallax
// addMouseParallax();

// ===================================
// Console Message
// ===================================

console.log('%c Daniel Ribes - Senior Health Economist ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Interested in the code? Let\'s connect! danribes@iies.es ', 'color: #667eea; font-size: 12px;');

// ===================================
// Initialize on DOMContentLoaded
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Website loaded successfully with enhanced animations');
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Create floating shapes
    createFloatingShapes();
    
    // Update active nav on load
    updateActiveNav();
    
    // Initial reveal
    revealOnScroll();
    
    // Add entrance animation to hero
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.animation = 'fadeInLeft 1s ease-out';
    }
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.animation = 'fadeInRight 1s ease-out';
    }
});

// ===================================
// Service Worker for PWA (Optional)
// ===================================

if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker not registered', err));
}
