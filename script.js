// Application State
let currentPage = 'home';
let isLoading = false;
let isTransitioning = false;

// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const mobileMenu = document.getElementById('mobileMenu');
const loading = document.getElementById('loading');
const contactForm = document.getElementById('contactForm');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    hideLoadingScreen();
});

// Initialize Application
function initializeApp() {
    // Set initial page
    showPage('home');
    
    // Initialize progress bars
    initializeProgressBars();
    
    // Setup intersection observer for animations
    setupScrollAnimations();
    
    // Initialize dynamic background
    startBackgroundAnimation();
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenu.addEventListener('click', toggleMobileMenu);
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Contact form submission
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Prevent default behavior for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
}

// Page Navigation System
function navigateTo(page) {
    if (isTransitioning || page === currentPage) return;
    
    isTransitioning = true;
    const currentElement = document.getElementById(currentPage);
    const targetElement = document.getElementById(page);
    
    // Update navigation
    updateNavigation(page);
    
    // Close mobile menu
    closeMobileMenu();
    
    // Page transition animation
    if (currentElement && targetElement) {
        // Fade out current page
        currentElement.style.opacity = '0';
        currentElement.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            // Hide current page and show target page
            currentElement.classList.remove('active');
            targetElement.classList.add('active');
            
            // Reset target page position
            targetElement.style.opacity = '0';
            targetElement.style.transform = 'translateX(50px)';
            
            // Animate in new page
            requestAnimationFrame(() => {
                targetElement.style.transition = 'all 0.6s ease';
                targetElement.style.opacity = '1';
                targetElement.style.transform = 'translateX(0)';
                
                // Update current page and reset transition flag
                currentPage = page;
                
                setTimeout(() => {
                    isTransitioning = false;
                    // Trigger page-specific animations
                    triggerPageAnimations(page);
                    // Reset transitions
                    resetTransitions();
                }, 600);
            });
        }, 300);
    }
}

// Show specific page
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    currentPage = page;
    updateNavigation(page);
}

// Update Navigation Active State
function updateNavigation(activePage) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('onclick').match(/'(\w+)'/)[1];
        if (linkPage === activePage) {
            link.classList.add('active');
        }
    });
}

// Reset page transitions
function resetTransitions() {
    document.querySelectorAll('.page').forEach(page => {
        page.style.transition = '';
        page.style.transform = '';
        page.style.opacity = '';
    });
}

// Page-specific Animations
function triggerPageAnimations(page) {
    const pageElement = document.getElementById(page);
    
    if (page === 'skills') {
        animateProgressBars();
    }
    
    // Animate elements with stagger effect
    const animatedElements = pageElement.querySelectorAll('.skill-card, .project-card, .about-content > *, .contact-item');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
}

// Scroll Handling
function handleScroll() {
    const scrollY = window.scrollY;
    
    // Update navbar appearance
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Loading Screen
function hideLoadingScreen() {
    setTimeout(() => {
        loading.classList.add('hide');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
}

// Progress Bars Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, index * 200);
    });
}

// Skill Details Modal
function showSkillDetails(skill) {
    const skillInfo = {
        frontend: {
            title: 'Frontend Development',
            description: 'I specialize in creating responsive and interactive user interfaces using modern frameworks and libraries.',
            technologies: ['React', 'Vue.js', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'SASS', 'TypeScript', 'Webpack', 'Responsive Design'],
            experience: '5+ years of experience building scalable frontend applications'
        },
        backend: {
            title: 'Backend Development',
            description: 'Building robust server-side applications and APIs with scalable architecture and best practices.',
            technologies: ['Node.js', 'Express.js', 'Python', 'Django', 'REST APIs', 'GraphQL', 'Microservices', 'Authentication', 'Security'],
            experience: '4+ years developing backend systems and APIs'
        },
        database: {
            title: 'Database Management',
            description: 'Designing and optimizing database structures for efficient data storage and retrieval.',
            technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Database Design', 'Query Optimization', 'Data Modeling'],
            experience: '4+ years working with various database technologies'
        },
        cloud: {
            title: 'Cloud & DevOps',
            description: 'Deploying and managing applications in cloud environments with automated CI/CD pipelines.',
            technologies: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux', 'Nginx', 'Load Balancing', 'Monitoring'],
            experience: '3+ years in cloud infrastructure and DevOps practices'
        },
        design: {
            title: 'UI/UX Design',
            description: 'Creating beautiful and intuitive user experiences with modern design principles and user-centered approach.',
            technologies: ['Figma', 'Adobe Creative Suite', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Accessibility'],
            experience: '4+ years in UI/UX design and user experience optimization'
        },
        mobile: {
            title: 'Mobile Development',
            description: 'Building cross-platform mobile applications with native performance and user experience.',
            technologies: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Progressive Web Apps', 'Mobile UI/UX'],
            experience: '3+ years developing mobile applications'
        }
    };

    const info = skillInfo[skill];
    if (info) {
        showModal(info.title, `
            <p><strong>${info.description}</strong></p>
            <h4 style="color: #e0aaff; margin: 1.5rem 0 1rem 0;">Technologies & Tools:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                ${info.technologies.map(tech => `<span style="background: linear-gradient(45deg, #e0aaff, #c77dff); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem;">${tech}</span>`).join('')}
            </div>
            <p style="font-style: italic; color: rgba(255, 255, 255, 0.8);">${info.experience}</p>
        `);
    }
}

// Project Details Modal
function showProjectDetails(project) {
    const projectInfo = {
        'cashelan': {
            title: 'Cash Elan Mobile Bank',
            description: 'A comprehensive mobile banking application providing secure financial services with modern UX design. Built to handle real-time transactions, account management, and advanced security features.',
            features: ['Secure Mobile Banking', 'Real-time Money Transfers', 'Bill Payment Services', 'Account Management', 'Transaction History', 'Biometric Authentication', 'Push Notifications', 'Multi-language Support'],
            technologies: ['React Native', 'Node.js', 'Firebase Database', 'Firebase Authentication', 'Push Notifications'],
            github: 'https://github.com/alayssahrnndz/Cash-Elan-Mobile-Bank',
            demo: 'https://github.com/alayssahrnndz/Cash-Elan-Mobile-Bank'
        },
        'hanap-kita': {
            title: 'Hanap-Kita: Job Portal System',
            description: 'A comprehensive job portal system that bridges the gap between job seekers and employers. Features intelligent matching algorithms and streamlined application processes.',
            features: ['Advanced Job Search', 'Employer Dashboard', 'Application Tracking', 'Resume Builder', 'Company Profiles', 'Automated Matching', 'Interview Scheduling', 'Notification System'],
            technologies: ['React', 'Express.js', 'mySQL', 'Node.js'],
            github: 'https://infinitywyn.free.nf/hanapkita/index.php',
            demo: 'https://infinitywyn.free.nf/hanapkita/index.php'
        },
        'school-chatbot': {
            title: 'AI Chatbot for School Services',
            description: 'An intelligent chatbot system designed to revolutionize school administration by providing instant, accurate responses to student and staff inquiries about various school services.',
            features: ['Natural Language Processing', 'School Services Integration', 'Student Query Handling', 'Admission Information', 'Schedule Management', 'Facility Information', 'Academic Support', '24/7 Availability'],
            technologies: ['Python', 'Natural Language Processing', 'HTML', 'CSS'],
            github: 'https://github.com/alayssahrnndz/AI-Chatbot',
            demo: 'https://github.com/alayssahrnndz/AI-Chatbot'
        },
        'ai-clone': {
            title: 'AI Clone Chatbot of Yourself',
            description: 'A revolutionary AI system that creates a personalized digital clone capable of mimicking your personality, communication patterns, and knowledge base for authentic interactions.',
            features: ['Personality Cloning', 'Communication Style Mimicry', 'Knowledge Base Training', 'Voice Pattern Analysis', 'Behavioral Learning', 'Context Awareness', 'Continuous Learning', 'Privacy Protection'],
            technologies: ['Python', 'OpenAI GPT', 'Machine Learning', 'Ollama', 'Natural Language Processing', 'Flask'],
            github: 'https://github.com/alayssahrnndz/AI-Clone-Chatbot',
            demo: 'https://github.com/alayssahrnndz/AI-Clone-Chatbot'
        }
    };

    const info = projectInfo[project];
    if (info) {
        showModal(info.title, `
            <p><strong>${info.description}</strong></p>
            <h4 style="color: #e0aaff; margin: 1.5rem 0 1rem 0;">Key Features:</h4>
            <ul style="margin-bottom: 1.5rem; padding-left: 1rem;">
                ${info.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
            </ul>
            <h4 style="color: #e0aaff; margin: 1.5rem 0 1rem 0;">Technologies Used:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                ${info.technologies.map(tech => `<span style="background: linear-gradient(45deg, #e0aaff, #c77dff); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem;">${tech}</span>`).join('')}
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <a href="${info.github}" target="_blank" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: bold;">View Code</a>
                <a href="${info.demo}" target="_blank" style="background: linear-gradient(45deg, #e0aaff, #c77dff); color: white; padding: 0.8rem 1.5rem; border-radius: 25px; text-decoration: none; font-weight: bold;">Live Demo</a>
            </div>
        `);
    }
}

// Modal System
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <h3>${title}</h3>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    }
    document.addEventListener('keydown', escapeHandler);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Projects Filter System
function filterProjects(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter projects
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Contact Form Handling
function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('span');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    btnText.textContent = 'Sending...';
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form and button state
        e.target.reset();
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        btnText.textContent = 'Send Message';
        
        // Show success message
        showModal('Message Sent!', `
            <p>Thank you for your message, <strong>${data.name}</strong>!</p>
            <p>I'll get back to you at <strong>${data.email}</strong> as soon as possible.</p>
            <p style="color: rgba(255, 255, 255, 0.8); font-style: italic;">Usually within 24 hours.</p>
        `);
    }, 2000);
}

// Social Links Handler
function openSocial(platform) {
    const socialLinks = {
        email: 'mailto:alayssa.hernandez@tup.edu.ph?subject=Portfolio Contact',
        linkedin: 'https://facebook.com/alayssahrnndz',
        github: 'https://github.com/alayssahrnndz',
        twitter: 'https://instagram.com/alyhrnndz_'
    };
    
    if (socialLinks[platform]) {
        window.open(socialLinks[platform], '_blank');
    }
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
    const pages = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentIndex = pages.indexOf(currentPage);
    
    switch(e.key) {
        case 'ArrowLeft':
            if (currentIndex > 0) {
                navigateTo(pages[currentIndex - 1]);
            }
            break;
        case 'ArrowRight':
            if (currentIndex < pages.length - 1) {
                navigateTo(pages[currentIndex + 1]);
            }
            break;
        case 'Home':
            navigateTo('home');
            break;
        case 'End':
            navigateTo('contact');
            break;
        case 'Escape':
            closeModal();
            closeMobileMenu();
            break;
    }
}

// Scroll Animations Setup
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger progress bars if in skills section
                if (entry.target.closest('#skills')) {
                    animateProgressBars();
                }
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Dynamic Background Animation
function startBackgroundAnimation() {
    let gradientAngle = 135;
    let direction = 1;
    
    setInterval(() => {
        gradientAngle += direction * 0.5;
        
        // Reverse direction at bounds
        if (gradientAngle >= 180 || gradientAngle <= 90) {
            direction *= -1;
        }
        
        document.body.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`;
    }, 100);
}

// Utility Functions
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

// Performance Optimizations
const debouncedScroll = debounce(handleScroll, 10);
window.addEventListener('scroll', debouncedScroll);

// Lazy Loading for Images (if you add images later)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme Toggle (if you want to add dark/light theme switching)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// Smooth Scrolling for Anchor Links
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Page Visibility API for performance optimization
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send error reports to a logging service here
});

// Preload Critical Resources
function preloadResources() {
    const criticalResources = [
        // Add any critical images or fonts here
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.url;
        link.as = resource.type;
        document.head.appendChild(link);
    });
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics Tracking (placeholder - replace with your analytics)
function trackPageView(page) {
    // Google Analytics example:
    // gtag('config', 'GA_MEASUREMENT_ID', {
    //     page_title: page,
    //     page_location: window.location.href
    // });
    
    console.log(`Page view tracked: ${page}`);
}

// Call trackPageView when navigating
const originalNavigateTo = navigateTo;
navigateTo = function(page) {
    originalNavigateTo(page);
    trackPageView(page);
};

// Performance Monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
                console.log('DOM Ready Time:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
            }, 0);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Accessibility Improvements
function setupAccessibility() {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
}

// Initialize accessibility features
setupAccessibility();

// Advanced Animation System
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    addAnimation(element, animation) {
        if (this.isReducedMotion) return;
        
        const id = Date.now() + Math.random();
        this.animations.set(id, { element, animation });
        return id;
    }
    
    removeAnimation(id) {
        this.animations.delete(id);
    }
    
    pauseAll() {
        this.animations.forEach(({ element }) => {
            element.style.animationPlayState = 'paused';
        });
    }
    
    resumeAll() {
        this.animations.forEach(({ element }) => {
            element.style.animationPlayState = 'running';
        });
    }
}

// Initialize animation manager
const animationManager = new AnimationManager();

// Export functions for global access (if needed)
window.portfolioApp = {
    navigateTo,
    showModal,
    closeModal,
    filterProjects,
    showSkillDetails,
    showProjectDetails,
    openSocial,
    toggleTheme,
    animationManager
};

// Console welcome message
console.log(`
🎨 Alayssa's Portfolio
━━━━━━━━━━━━━━━━━━━━━━━━
Built with vanilla JavaScript, CSS3, and lots of ☕
Feel free to explore the code!

Navigation:
• Use arrow keys to navigate between pages
• Press Escape to close modals
• Use Home/End keys for quick navigation

GitHub: https://github.com/alayssahrnndz
━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Additional utility for clipboard functionality
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showModal('Copied!', `<p>Text copied to clipboard: <code>${text}</code></p>`);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

// Add copy functionality to contact info
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item p');
    contactItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.title = 'Click to copy';
        item.addEventListener('click', function() {
            copyToClipboard(this.textContent);
        });
    });
});