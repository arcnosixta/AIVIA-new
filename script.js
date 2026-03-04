// AIVIA Windsurf - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initLanguageToggle();
    initScrollReveal();
    initSmoothScrolling();
    initTestimonialSlider();
    initWindCalculator();
    initAnimations();
    initMobileMenu();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = `${savedTheme}-theme`;
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.className = `${newTheme}-theme`;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        body.style.transition = 'background-color 0.6s ease, color 0.6s ease';
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Language Toggle
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('language') || 'EN';
    
    langToggle.textContent = currentLang;
    
    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'EN' ? 'RU' : 'EN';
        langToggle.textContent = currentLang;
        localStorage.setItem('language', currentLang);
        
        // Here you would implement actual language switching
        // For now, just update the button text
        updateLanguage(currentLang);
    });
}

function updateLanguage(lang) {
    // Placeholder for language switching functionality
    const translations = {
        EN: {
            heroTitle: 'Ride the Wind',
            heroSubtitle: 'Experience the ultimate watersports adventure',
            exploreBoards: 'Explore Boards',
            bookLesson: 'Book a Lesson'
        },
        RU: {
            heroTitle: 'Поймай Ветер',
            heroSubtitle: 'Испытай ultimate водные виды спорта приключение',
            exploreBoards: 'Исследовать Доски',
            bookLesson: 'Забронировать Урок'
        }
    };
    
    // Apply translations to elements with data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = [
        {
            text: "The best windsurfing experience I've ever had! The equipment is top-notch and the instructors are amazing.",
            author: "Alex Johnson",
            role: "Professional Windsurfer"
        },
        {
            text: "As a beginner, I felt completely safe and learned so much in just one lesson. Highly recommend!",
            author: "Sarah Chen",
            role: "Adventure Enthusiast"
        },
        {
            text: "Perfect location, great facilities, and an incredible community. This is my go-to spot for watersports!",
            author: "Mike Rodriguez",
            role: "Water Sports Coach"
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialCard = document.querySelector('.testimonial-text');
    const authorName = document.querySelector('.author-info h4');
    const authorRole = document.querySelector('.author-info p');
    const dots = document.querySelectorAll('.dot');
    
    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        
        // Fade out
        testimonialCard.style.opacity = '0';
        authorName.style.opacity = '0';
        authorRole.style.opacity = '0';
        
        setTimeout(() => {
            testimonialCard.textContent = testimonial.text;
            authorName.textContent = testimonial.author;
            authorRole.textContent = testimonial.role;
            
            // Fade in
            testimonialCard.style.opacity = '1';
            authorName.style.opacity = '1';
            authorRole.style.opacity = '1';
        }, 300);
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }, 5000);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonial(currentTestimonial);
        });
    });
}

// Wind Calculator
function initWindCalculator() {
    const windSpeedInput = document.getElementById('windSpeed');
    const windDirectionInput = document.getElementById('windDirection');
    const calculateBtn = document.getElementById('calculateWind');
    const windResult = document.getElementById('windResult');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateWindConditions);
    }
    
    function calculateWindConditions() {
        const windSpeed = parseFloat(windSpeedInput.value) || 0;
        const windDirection = windDirectionInput.value || 'N';
        
        let conditions = '';
        let recommendation = '';
        let color = '';
        
        if (windSpeed < 5) {
            conditions = 'Calm';
            recommendation = 'Perfect for beginners and learning';
            color = '#10b981';
        } else if (windSpeed < 15) {
            conditions = 'Light Breeze';
            recommendation = 'Great for intermediate riders';
            color = '#06b6d4';
        } else if (windSpeed < 25) {
            conditions = 'Moderate Wind';
            recommendation = 'Ideal for advanced techniques';
            color = '#f97316';
        } else {
            conditions = 'Strong Wind';
            recommendation = 'Expert conditions only';
            color = '#ef4444';
        }
        
        // Update display with animation
        windResult.style.opacity = '0';
        
        setTimeout(() => {
            windResult.innerHTML = `
                <div class="wind-speed-display" style="color: ${color}">
                    ${windSpeed} knots
                </div>
                <div class="wind-conditions">${conditions}</div>
                <div class="wind-recommendation">${recommendation}</div>
                <div class="wind-direction">Direction: ${windDirection}</div>
            `;
            windResult.style.opacity = '1';
        }, 300);
    }
}

// Animations
function initAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Floating animation for elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Mouse move effect for cards
    const cards = document.querySelectorAll('.equipment-card, .location-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: inherit;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navContainer && navMenu) {
        navContainer.insertBefore(mobileMenuBtn, navMenu);
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Show mobile menu button on small screens
        function checkMobileMenu() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navMenu.style.display = 'none';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'var(--glass-bg)';
                navMenu.style.backdropFilter = 'blur(20px)';
                navMenu.style.padding = '2rem';
                navMenu.style.borderRadius = '0 0 20px 20px';
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'row';
                navMenu.style.position = 'static';
                navMenu.style.background = 'none';
                navMenu.style.padding = '0';
            }
        }
        
        checkMobileMenu();
        window.addEventListener('resize', checkMobileMenu);
    }
}

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
    });
    
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput) {
                const email = emailInput.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailRegex.test(email)) {
                    showError(emailInput, 'Please enter a valid email address');
                    return;
                }
                
                showSuccess(emailInput);
                // Here you would normally submit the form
                setTimeout(() => {
                    form.reset();
                    emailInput.classList.remove('success');
                }, 2000);
            }
        });
    });
}

function showError(input, message) {
    input.classList.remove('success');
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.appendChild(errorDiv);
}

function showSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    
    // Remove error message
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Lazy loading for images
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
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-based animations here
        }, 16); // ~60fps
    });
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initGalleryLightbox();
    initFormValidation();
    initPerformanceOptimizations();
});

// Export functions for potential use in other scripts
window.AIVIA = {
    updateTheme: function(theme) {
        document.body.className = `${theme}-theme`;
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    },
    
    updateLanguage: function(lang) {
        localStorage.setItem('language', lang);
        updateLanguage(lang);
    },
    
    scrollToSection: function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
