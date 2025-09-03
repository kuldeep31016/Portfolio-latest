// =================== ENHANCED PORTFOLIO JAVASCRIPT ===================

// Typed.js for hero section with more variations
var typed = new Typed(".text", {
    strings: [
      "Full Stack Developer",
        "React Specialist",
        "UI/UX Enthusiast",
        "Problem Solver",
        "Open Source Contributor"
    
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// =================== SCROLL PROGRESS BAR ===================
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// =================== CUSTOM CURSOR ===================
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
document.querySelectorAll('a, button, .tech-item, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// =================== MOBILE MENU TOGGLE ===================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on nav links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// =================== SMOOTH SCROLLING & ACTIVE NAV ===================
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id], div[id]');

function updateActiveNav() {
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

window.addEventListener('scroll', updateActiveNav);

// =================== ENHANCED SMOOTH SCROLLING ===================
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const headerHeight = 80; // Adjust based on your header height
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active state immediately
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            const navbar = document.querySelector('.navbar');
            navbar.classList.remove('active');
        }
    });
});

// =================== STATS COUNTER ANIMATION ===================
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// =================== PROJECT FILTERING ===================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// =================== PROJECT MODAL ===================
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');

function openProjectModal(projectId) {
    const projectData = {
        'project1': {
            title: 'Trip Trekker',
            description: 'A comprehensive Toursism Website built with javaScript and Node.js, featuring user authentication, shopping cart, payment processing, and admin dashboard.',
            image: 'pictures/project1.png',
            technologies: ['Html', 'Node.js', 'MongoDB', 'CSS', 'JWT',' JavaScript'],
            features: [
                'User registration and authentication',
                'Destination search with advanced filters',
               'Online booking and reservation system',
                'User reviews and ratings for tours',
                'Admin dashboard for inventory management'
            ]
        },
        'project2': {
            title: 'React UI Components Library',
            description: 'A reusable component library built with React, TypeScript, and Tailwind CSS, documented using Storybook. Designed for scalability, accessibility, and modern UI patterns.',
        image: 'pictures/project2.png',
           technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
           features: [
    'Reusable InputField component with validation',
    'DataTable with sorting and selection',
    'Multiple variants, sizes, and themes',
    'Storybook documentation for developers',
    'Responsive and accessible design',
    'Unit tests for component reliability'
]

        },
        'project3': {
            title: 'Social Media Dashboard',
            description: 'A comprehensive dashboard for managing multiple social media accounts with analytics, scheduling, and performance metrics.',
            image: 'pictures/project3.png',
            technologies: ['React', 'Tailwind CSS', 'Firebase', 'Chart.js'],
            features: [
    'Browse and search books by title, author, or category',
    'Add books to favorites and personal reading lists',
    'Responsive and mobile-friendly design',
    'Book details with descriptions and cover images',
    'Seamless user experience with clean UI',
    'Deployed on Vercel for fast performance'
]

        },
       'project4': {
    title: 'DBMS - Railway Management System',
    description: 'A full-stack railway management system for handling ticket booking, train scheduling, and passenger information. Built with Java and MySQL to ensure security, reliability, and efficient database management.',
    image: 'pictures/project4.png',
    technologies: ['Java', 'MySQL', 'JDBC', 'Swing/JavaFX'],
    features: [
        '🎟️ Ticket booking and cancellation',
        '🛤️ Train scheduling and management',
        '👥 Passenger information system',
        '📊 Admin dashboard with reports',
        '🔒 Secure database operations',
        'Responsive and user-friendly interface'
    ]
},
'project5': {
    title: 'FindScan – Trading Chart App',
    description: 'A real-time trading chart application with candlestick charts and Bollinger Bands indicator, built to deliver a TradingView-like experience with smooth performance and customizable settings.',
    image: 'pictures/project5.png',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'KLineCharts'],
    features: [
        'Candlestick chart with OHLCV data',
        'Bollinger Bands indicator with customizable inputs',
        'Real-time updates and smooth interactions',
        'Configurable styles (color, line width, opacity)',
        'Responsive and clean UI design',
        'Deployed on Vercel for fast performance'
    ]
},

       'project6': {
    title: 'AuthForm - React Login System',
    description: 'A simple authentication module built with React featuring login and signup forms, form validation, and responsive UI. Perfect as a starter template for secure applications.',
    image: 'pictures/project6.png',
    technologies: ['React', 'JavaScript', 'CSS3', 'Vite'],
    features: [
        'User login and signup forms',
        'Form validation with error handling',
        'Responsive and mobile-friendly design',
        'Clean and minimal user interface',
        'Reusable authentication component structure',
        'Deployed on Vercel for fast performance'
    ]
}

    };
    
    const project = projectData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #0ef; margin-bottom: 15px;">${project.title}</h2>
            <p style="color: #ededed; margin-bottom: 20px; line-height: 1.6;">${project.description}</p>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0ef; margin-bottom: 10px;">Technologies Used:</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${project.technologies.map(tech => `<span style="background: rgba(0, 238, 255, 0.1); border: 1px solid rgba(0, 238, 255, 0.3); color: #0ef; padding: 5px 12px; border-radius: 15px; font-size: 0.8rem;">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0ef; margin-bottom: 10px;">Key Features:</h3>
                <ul style="color: #ededed; line-height: 1.8;">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0ef; margin-bottom: 10px;">Challenges & Solutions:</h3>
                <p style="color: #ededed; line-height: 1.6;">${project.challenges}</p>
            </div>
            
            <div style="display: flex; gap: 15px; margin-top: 30px;">
                <a href="${project.liveUrl}" class="btn-box primary" target="_blank">
                    <i class='bx bx-link-external'></i>
                    Live Demo
                </a>
                <a href="${project.githubUrl}" class="btn-box secondary" target="_blank">
                    <i class='bx bxl-github'></i>
                    View Code
                </a>
            </div>
        </div>
    `;
    
    projectModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.style.display === 'block') {
        closeProjectModal();
    }
});

// =================== CONTACT FORM ENHANCEMENT ===================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.send');
        const formData = new FormData(contactForm);
        
        // Show loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showFormStatus('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
        }
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

// Form validation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const errorElement = field.parentNode.querySelector('.form-error');
    
    let errorMessage = '';
    
    if (!value) {
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && !isValidEmail(value)) {
        errorMessage = 'Please enter a valid email address';
    }
    
    errorElement.textContent = errorMessage;
    field.style.borderColor = errorMessage ? '#ff4444' : 'rgba(0, 238, 255, 0.2)';
}

function clearError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.form-error');
    errorElement.textContent = '';
    field.style.borderColor = 'rgba(0, 238, 255, 0.2)';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// =================== THEME TOGGLE ===================
const themeToggle = document.querySelector('.theme-toggle');
let isDarkMode = true;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        toggleTheme();
    });
}

function toggleTheme() {
    const root = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    
    if (isDarkMode) {
        // Dark Blue mode (current/default)
        body.style.backgroundColor = '#081b29';
        body.style.color = '#ededed';
        root.style.setProperty('--bg-primary', '#081b29');
        root.style.setProperty('--bg-secondary', '#051129');
        root.style.setProperty('--text-primary', '#ededed');
        root.style.setProperty('--accent', '#00eeff');
        themeIcon.className = 'bx bx-moon';
        
        // Update header
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundColor = 'rgba(8, 27, 41, 0.8)';
        }
    } else {
        // Black mode
        body.style.backgroundColor = '#000000';
        body.style.color = '#ffffff';
        root.style.setProperty('--bg-primary', '#000000');
        root.style.setProperty('--bg-secondary', '#111111');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--accent', '#00eeff');
        themeIcon.className = 'bx bx-sun';
        
        // Update header
        const header = document.querySelector('header');
        if (header) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        }
    }
    
    // Update all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.backgroundColor = isDarkMode ? '#081b29' : '#000000';
    });
}

// =================== FLOATING ANIMATIONS ===================
function createFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements';
    floatingContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 238, 255, 0.3);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
            animation-delay: ${i * 0.5}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        floatingContainer.appendChild(element);
    }
    
    document.body.appendChild(floatingContainer);
}

// =================== SCROLL ANIMATIONS ===================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.project-card, .tech-item, .timeline-item').forEach(el => {
    observer.observe(el);
});

// =================== PERFORMANCE OPTIMIZATIONS ===================
// Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    updateScrollProgress();
    updateActiveNav();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// =================== KONAMI CODE EASTER EGG ===================
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            triggerEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerEasterEgg() {
    // Create rainbow effect
    const style = document.createElement('style');
    style.textContent = `
        .navbar a, .logo, .btn-box, .tech-item {
            animation: rainbow 2s linear infinite !important;
        }
        
        @keyframes rainbow {
            0% { color: #ff0000; }
            16% { color: #ff8000; }
            33% { color: #ffff00; }
            50% { color: #00ff00; }
            66% { color: #0000ff; }
            83% { color: #8000ff; }
            100% { color: #ff0000; }
        }
    `;
    
    document.head.appendChild(style);
    
    // Show easter egg message
    showFormStatus('🎉 You found the Easter egg! Enjoy the rainbow! 🌈', 'success');
    
    // Remove effect after 5 seconds
    setTimeout(() => {
        document.head.removeChild(style);
    }, 5000);
}

// =================== INITIALIZE ===================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating elements
    createFloatingElements();
    
    // Add smooth transitions to all elements
    document.body.style.transition = 'all 0.3s ease';
    
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#0ef' },
                shape: { type: 'circle' },
                opacity: { value: 0.5 },
                size: { value: 3 },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                }
            }
        });
    }
    
    console.log('🚀 Enhanced Portfolio Loaded Successfully!');
});

// =================== PERFORMANCE MONITORING ===================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
        
        if (pageLoadTime > 3000) {
            console.warn('⚠️ Page load time is slower than recommended');
        }
    });
}

// =================== RESUME DOWNLOAD FUNCTION ===================
function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = './resume.pdf';
    link.download = 'Kuldeep_Raj_Resume.pdf';
    
    // Add to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show download started message
    const downloadBtn = document.getElementById('downloadBtn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="bx bx-check"></i> Download Started!';
    downloadBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
    
    // Reset button after 2 seconds
    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.style.background = '';
    }, 2000);
}

// Global functions for HTML onclick events
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.downloadResume = downloadResume;