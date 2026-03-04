// AIVIA Premium Landing Page - Advanced Animations & Interactions
// Inspired by Apple, Stripe, Notion websites

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all premium features
    initSmoothScrolling();
    initScrollReveal();
    initParallaxEffects();
    initCounterAnimations();
    initChartAnimations();
    initFloatingElements();
    initThemeToggle();
    initLanguageToggle();
    initMobileMenu();
    initChatDemo();
    initHoverEffects();
    initPerformanceOptimizations();
});

// Smooth Scrolling with Easing
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
                    const offsetTop = targetElement.offsetTop - 100;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Advanced Scroll Reveal with Staggered Animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    function revealOnScroll() {
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    element.classList.add('revealed');
                }, index * 100); // Staggered animation
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Optimized scroll handler
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(revealOnScroll);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Parallax Effects for Hero Section
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroContent) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate * 0.5}px)`;
        heroContent.style.transform = `translateY(${rate * 0.3}px) scale(${1 - scrolled * 0.0002})`;
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.analytics-value, .stat-value');
    
    function animateCounter(counter) {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            if (counter.textContent.includes('%')) {
                counter.textContent = Math.round(current) + '%';
            } else if (counter.textContent.includes('g')) {
                counter.textContent = Math.round(current) + 'g';
            } else if (counter.textContent.includes('k')) {
                counter.textContent = (current / 1000).toFixed(1) + 'k';
            } else {
                counter.textContent = Math.round(current).toLocaleString();
            }
        }, 16);
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Chart Animations
function initChartAnimations() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    drawAnimatedChart(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(container);
    });
}

function drawAnimatedChart(container) {
    container.innerHTML = '<canvas id="animatedChart" width="400" height="200"></canvas>';
    const canvas = container.querySelector('#animatedChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Chart data
    const data = [65, 78, 90, 81, 95, 88, 92, 85, 94, 89];
    const maxValue = Math.max(...data);
    
    let progress = 0;
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Grid lines
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw chart
        const barWidth = width / data.length;
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#10b981');
        gradient.addColorStop(1, '#06b6d4');
        
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * height * Math.min(progress, 1);
            const x = index * barWidth + barWidth * 0.1;
            const y = height - barHeight;
            const actualBarWidth = barWidth * 0.8;
            
            // Draw bar with rounded top
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(x, height);
            ctx.lineTo(x, y + 5);
            ctx.quadraticCurveTo(x, y, x + 5, y);
            ctx.lineTo(x + actualBarWidth - 5, y);
            ctx.quadraticCurveTo(x + actualBarWidth, y, x + actualBarWidth, y + 5);
            ctx.lineTo(x + actualBarWidth, height);
            ctx.closePath();
            ctx.fill();
        });
        
        progress += 0.02;
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.animationDuration = `${3 + Math.random() * 2}s`;
    });
    
    // Create floating particles for hero section
    createHeroParticles();
}

function createHeroParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${4 + Math.random() * 4}px;
            height: ${4 + Math.random() * 4}px;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(6, 182, 212, 0.6));
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${4 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Theme Toggle with Smooth Transitions
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    updateTheme(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        updateTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function updateTheme(theme) {
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--white', '#0f172a');
        document.documentElement.style.setProperty('--gray-50', '#1e293b');
        document.documentElement.style.setProperty('--gray-100', '#334155');
        document.documentElement.style.setProperty('--gray-900', '#f1f5f9');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.style.setProperty('--white', '#ffffff');
        document.documentElement.style.setProperty('--gray-50', '#f9fafb');
        document.documentElement.style.setProperty('--gray-100', '#f3f4f6');
        document.documentElement.style.setProperty('--gray-900', '#111827');
        themeToggle.textContent = '🌙';
    }
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
        
        updateLanguage(currentLang);
    });
}

function updateLanguage(lang) {
    const translations = {
        EN: {
            heroTitle: 'Become the Best Version of Yourself',
            heroSubtitle: 'Track food, monitor activity, and reach your health goals with AI guidance.',
            startTracking: 'Start Tracking',
            exploreFeatures: 'Explore Features'
        },
        KZ: {
            heroTitle: 'Өзіңіздің ең жақсы нұсқасы болыңыз',
            heroSubtitle: 'Тағамды қадағала, белсенділікті бақылау және AI жетекшілігімен денсаулық мақсаттарыңа жетіңіз.',
            startTracking: 'Бақылауды бастау',
            exploreFeatures: 'Мүмкіндіктерді қарау'
        },
        RU: {
            heroTitle: 'Станьте лучшей версией себя',
            heroSubtitle: 'Отслеживайте питание, контролируйте активность и достигайте целей для здоровья с помощью ИИ.',
            startTracking: 'Начать отслеживание',
            exploreFeatures: 'Исследовать функции'
        }
    };
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
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
        color: var(--gray-700);
        padding: 0.5rem;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navContainer && navMenu) {
        navContainer.insertBefore(mobileMenuBtn, navMenu);
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
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
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    padding: 2rem;
                    border-radius: 0 0 1rem 1rem;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    border: 1px solid var(--gray-200);
                    border-top: none;
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

// Chat Demo Animation
function initChatDemo() {
    const chatPreview = document.querySelector('.chat-preview');
    if (!chatPreview) return;
    
    const messages = [
        "What should I eat today to reach my protein goal?",
        "How can I track my water intake effectively?",
        "Is this meal good for my weight loss plan?",
        "What exercises complement my nutrition goals?",
        "How can I improve my meal timing?"
    ];
    
    let messageIndex = 0;
    
    setInterval(() => {
        const message = messages[messageIndex % messages.length];
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
        
        // Remove old messages
        const messages = chatPreview.querySelectorAll('.chat-message');
        if (messages.length > 2) {
            messages[0].style.transition = 'all 0.3s ease';
            messages[0].style.opacity = '0';
            messages[0].style.transform = 'translateY(-20px)';
            setTimeout(() => messages[0].remove(), 300);
        }
    }, 4000);
}

// Advanced Hover Effects
function initHoverEffects() {
    // Card tilt effect
    const cards = document.querySelectorAll('.feature-card, .step-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
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
    
    // Optimize scroll performance
    window.addEventListener('scroll', debounce(() => {
        // Scroll-dependent animations here
    }, 16)); // ~60fps
}

// Add ripple animation to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Export for potential external use
window.AIVIA = {
    updateTheme: function(theme) {
        updateTheme(theme);
        localStorage.setItem('theme', theme);
    },
    
    updateLanguage: function(lang) {
        updateLanguage(lang);
        localStorage.setItem('language', lang);
    },
    
    trackEvent: function(eventName, data) {
        console.log('Analytics Event:', eventName, data);
        // Here you would send to your analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }
};
