// AIVIA Health & Nutrition Tracking App - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initLanguageToggle();
    initScrollReveal();
    initSmoothScrolling();
    initAnimations();
    initMobileMenu();
    initAnalyticsPreview();
    initChatDemo();
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
        const languages = ['EN', 'KZ', 'RU'];
        const currentIndex = languages.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languages.length;
        currentLang = languages[nextIndex];
        
        langToggle.textContent = currentLang;
        localStorage.setItem('language', currentLang);
        
        // Here you would implement actual language switching
        updateLanguage(currentLang);
    });
}

function updateLanguage(lang) {
    // Placeholder for language switching functionality
    const translations = {
        EN: {
            heroTitle: 'Build Your Best Self',
            heroSubtitle: 'Track food, monitor activity, and reach your health goals with AI support.',
            exploreFeatures: 'Explore Features',
            startJourney: 'Start Your Journey'
        },
        KZ: {
            heroTitle: 'Ең жақсы өзіңіз',
            heroSubtitle: 'Тағамды қадағала, белсенділікті бақылау және AI қолдауымен денсаулық мақсаттарыңа жетіңіз.',
            exploreFeatures: 'Мүмкіндіктерді қарау',
            startJourney: 'Сапарыңызды бастау'
        },
        RU: {
            heroTitle: 'Строй лучшую версию себя',
            heroSubtitle: 'Отслеживайте питание, контролируйте активность и достигайте целей для здоровья с поддержкой ИИ.',
            exploreFeatures: 'Исследовать функции',
            startJourney: 'Начать путь'
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
    const cards = document.querySelectorAll('.feature-card, .step-card');
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
        padding: 0.5rem;
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
                navMenu.style.cssText += `
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--glass-bg);
                    backdrop-filter: blur(20px);
                    padding: 2rem;
                    border-radius: 0 0 20px 20px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                `;
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.style.cssText = '';
            }
        }
        
        checkMobileMenu();
        window.addEventListener('resize', checkMobileMenu);
    }
}

// Analytics Preview
function initAnalyticsPreview() {
    const chartPlaceholder = document.querySelector('.chart-placeholder');
    const statValues = document.querySelectorAll('.stat-value');
    
    if (chartPlaceholder) {
        // Animate chart drawing
        setTimeout(() => {
            chartPlaceholder.innerHTML = `
                <canvas id="analyticsChart" width="400" height="300"></canvas>
            `;
            drawAnalyticsChart();
        }, 1000);
    }
    
    // Animate stat counting
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue);
        let currentValue = 0;
        
        const counter = setInterval(() => {
            if (currentValue <= numericValue) {
                stat.textContent = currentValue + (numericValue / 50);
                currentValue += numericValue / 50;
            } else {
                stat.textContent = finalValue;
                clearInterval(counter);
            }
        }, 30);
    });
}

function drawAnalyticsChart() {
    const canvas = document.getElementById('analyticsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Simple line chart animation
    let progress = 0;
    const animateChart = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            ctx.beginPath();
            ctx.moveTo(0, (height / 5) * i);
            ctx.lineTo(width, (height / 5) * i);
            ctx.stroke();
        }
        
        // Data line
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const points = [
            {x: 0, y: height * 0.8},
            {x: width * 0.2, y: height * 0.6},
            {x: width * 0.4, y: height * 0.7},
            {x: width * 0.6, y: height * 0.4},
            {x: width * 0.8, y: height * 0.5},
            {x: width, y: height * 0.3}
        ];
        
        const drawProgress = Math.min(progress, points.length - 1);
        for (let i = 0; i <= drawProgress; i++) {
            if (i === 0) {
                ctx.moveTo(points[i].x, points[i].y);
            } else {
                ctx.lineTo(points[i].x, points[i].y);
            }
        }
        
        ctx.stroke();
        
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        progress += 0.02;
        if (progress < points.length) {
            requestAnimationFrame(animateChart);
        }
    };
    
    animateChart();
}

// Chat Demo
function initChatDemo() {
    const chatMessages = [
        "What should I eat today to reach my protein goal?",
        "How can I track my water intake?",
        "Is this food good for my diet plan?"
    ];
    
    let messageIndex = 0;
    const chatPreview = document.querySelector('.chat-preview');
    
    if (chatPreview) {
        setInterval(() => {
            const message = chatMessages[messageIndex % chatMessages.length];
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.textContent = message;
            messageElement.style.opacity = '0';
            messageElement.style.transform = 'translateY(20px)';
            
            chatPreview.appendChild(messageElement);
            
            // Animate message appearance
            setTimeout(() => {
                messageElement.style.transition = 'all 0.5s ease';
                messageElement.style.opacity = '1';
                messageElement.style.transform = 'translateY(0)';
            }, 100);
            
            messageIndex++;
            
            // Remove old messages if too many
            const messages = chatPreview.querySelectorAll('.chat-message');
            if (messages.length > 3) {
                messages[0].remove();
            }
        }, 3000);
    }
}

// Particle Animation for Hero
function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        heroParticles.appendChild(particle);
    }
}

// Initialize particles
setTimeout(createParticles, 500);

// Export functions for potential use
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
    
    trackEvent: function(eventName, data) {
        // Analytics tracking placeholder
        console.log('Event tracked:', eventName, data);
        
        // Here you would send to analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }
};
