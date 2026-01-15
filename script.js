// Main JavaScript for ZL-CAPITALS.FX

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Modal Functionality
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    
    function openModal() {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunc() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (loginBtn) loginBtn.addEventListener('click', openModal);
    if (registerBtn) registerBtn.addEventListener('click', openModal);
    if (closeModal) closeModal.addEventListener('click', closeModalFunc);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            closeModalFunc();
        }
    });
    
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simulate login process
            alert(`Login berhasil untuk: ${email}\nRedirecting to dashboard...`);
            closeModalFunc();
            window.location.href = 'dashboard.html';
        });
    }
    
    // Animated Counter for Stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toFixed(1) + (target === 85.7 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 85.7 ? '%' : '+');
            }
        }, 20);
    }
    
    // Initialize counters when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const target = index === 0 ? 85.7 : 
                                 index === 1 ? 24 : 
                                 index === 2 ? 5000 : 0;
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
    
    // Live Market Data Simulation
    function updateMarketData() {
        const pairs = document.querySelectorAll('.pair');
        if (pairs.length === 0) return;
        
        pairs.forEach(pair => {
            const currency = pair.querySelector('span:first-child').textContent;
            const priceElement = pair.querySelector('.price');
            const changeElement = pair.querySelector('.change');
            
            // Simulate price movement
            let currentPrice = parseFloat(priceElement.textContent);
            let change = parseFloat(changeElement.textContent.replace(/[+-]|%/g, ''));
            
            // Random movement
            const movement = (Math.random() - 0.5) * 0.002;
            currentPrice += currentPrice * movement;
            change += movement * 100;
            
            // Update display
            priceElement.textContent = currentPrice.toFixed(4);
            changeElement.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
            
            // Update colors
            const isUp = movement >= 0;
            priceElement.className = 'price ' + (isUp ? 'up' : 'down');
            changeElement.className = 'change ' + (isUp ? 'up' : 'down');
        });
    }
    
    // Update market every 5 seconds
    setInterval(updateMarketData, 5000);
    
    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.style.display = 'none');
        testimonialCards[index].style.display = 'block';
    }
    
    // Auto-rotate testimonials every 8 seconds
    if (testimonialCards.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 8000);
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate subscription
            this.innerHTML = '<div class="success-message">Terima kasih! Analisis mingguan akan dikirim ke email Anda.</div>';
            
            // Reset after 3 seconds
            setTimeout(() => {
                this.innerHTML = `
                    <input type="email" placeholder="Email Anda" required>
                    <button type="submit"><i class="fas fa-paper-plane"></i></button>
                `;
            }, 3000);
        });
    }
    
    // CTA Button Actions
    const startTrialBtn = document.getElementById('startTrial');
    if (startTrialBtn) {
        startTrialBtn.addEventListener('click', function() {
            alert('Mulai Trial 7 Hari Gratis!\nAnda akan diarahkan ke halaman pendaftaran...');
            window.location.href = 'pricing.html';
        });
    }
    
    const watchDemoBtn = document.getElementById('watchDemo');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function() {
            window.open('https://youtu.be/example-demo', '_blank');
        });
    }
    
    // Add hover effects to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Real-time clock in header
    function updateClock() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Jakarta'
        };
        
        const timeString = now.toLocaleDateString('id-ID', options);
        
        // Add clock to navigation if not exists
        let clockElement = document.querySelector('.nav-clock');
        if (!clockElement) {
            clockElement = document.createElement('div');
            clockElement.className = 'nav-clock';
            clockElement.style.fontSize = '0.9rem';
            clockElement.style.color = 'var(--gray)';
            document.querySelector('.nav-actions').prepend(clockElement);
        }
        
        clockElement.textContent = timeString;
    }
    
    // Update clock every second
    setInterval(updateClock, 1000);
    updateClock();
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });
});