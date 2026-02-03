// Portfolio Interactive Features

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('.nav-link');
const downloadResumeBtn = document.getElementById('downloadResume');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate hamburger
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Highlighting on Scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
function handleNavbarScroll() {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
}

// Scroll Animations
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

// Observe all animatable elements
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.skill-card, .experience-item, .project-card, .cert-item, .achievement-card, .contact-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Download Resume Handler
downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple alert for now
    // In production, you would link to an actual resume PDF
    alert('Resume download feature coming soon! Please contact me directly for my latest resume.');
    
    // Optional: If you have a resume PDF, uncomment and update the path:
    // const link = document.createElement('a');
    // link.href = 'path/to/your/resume.pdf';
    // link.download = 'Domala_Venkateswara_Rao_Resume.pdf';
    // link.click();
});

// Button Hover Effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Skill Tags Animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.opacity = '0';
    tag.style.animation = 'fadeInUp 0.5s ease forwards';
});

// Add CSS for skill tag animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Contact Cards Click Animation
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Allow default behavior for links, just add animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Parallax Effect for Hero Section
function handleParallax() {
    const scrolled = window.scrollY;
    const heroPattern = document.querySelector('.hero-pattern');
    const profileWrapper = document.querySelector('.profile-wrapper');
    
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (profileWrapper && scrolled < 500) {
        profileWrapper.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
}

// Typing Effect for Hero Role (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load (optional)
window.addEventListener('load', () => {
    const heroRole = document.querySelector('.hero-role');
    const originalText = heroRole.textContent;
    
    // Uncomment to enable typing effect
    // typeWriter(heroRole, originalText, 50);
});

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #2DD4BF, #14B8A6);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    }
    
    window.addEventListener('scroll', updateProgress);
}

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Form Validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Performance: Throttle scroll events
function throttle(func, wait) {
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

// Event Listeners
window.addEventListener('scroll', throttle(() => {
    handleNavbarScroll();
    updateActiveNav();
    handleParallax();
}, 10));

// Initialize all features on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    createScrollProgress();
    lazyLoadImages();
    
    // Add entrance animations
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-image').style.opacity = '1';
    }, 100);
    
    console.log('Portfolio loaded successfully! 🚀');
    console.log('Developed by Domala Venkateswara Rao');
});

// Prevent right-click on images (optional protection)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Easter egg: Console message
console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║   Welcome to Venkateswara Rao's Portfolio!   ║
║                                               ║
║   Python Developer & Cybersecurity Enthusiast ║
║                                               ║
║   Feel free to explore the code!              ║
║                                               ║
╚═══════════════════════════════════════════════╝
`);

// Service Worker Registration (for PWA - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// Analytics placeholder (Google Analytics, etc.)
function trackEvent(category, action, label) {
    console.log('Event tracked:', category, action, label);
    // Integrate with Google Analytics or other analytics platform
    // gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track button clicks
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent);
    });
});

// Accessibility: Focus management
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid #2DD4BF;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);
