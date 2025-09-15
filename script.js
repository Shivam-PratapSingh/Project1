document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = mobileMenuBtn ? mobileMenuBtn.querySelector('.hamburger') : null;
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Animate hamburger menu
            if (mobileNav.classList.contains('active')) {
                if (hamburger) {
                    hamburger.style.transform = 'rotate(45deg)';
                    hamburger.style.background = 'transparent';
                }
            } else {
                if (hamburger) {
                    hamburger.style.transform = 'rotate(0deg)';
                    hamburger.style.background = '#2d7a2d';
                }
            }
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.nav-link-mobile');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                if (hamburger) {
                    hamburger.style.transform = 'rotate(0deg)';
                    hamburger.style.background = '#2d7a2d';
                }
            });
        });
    }

    // Smooth scrolling for navigation links (internal anchors)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        });
    });

    // Add loading/ripple effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Avoid ripple on prediction button (handled separately)
            if (this.classList.contains('btn-full') && this.textContent.includes('Generate')) {
                return;
            }

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            const x = (e.clientX - rect.left) - size / 2;
            const y = (e.clientY - rect.top) - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS keyframes via injected style tag (for ripple)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Form handlers: simulated login/register that redirect to dashboard
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail')?.value || '';
            const pass = document.getElementById('loginPassword')?.value || '';
            if (!email || !pass) {
                showNotification('Please fill all login fields.', 'error');
                return;
            }
            // Simulate login success
            showNotification('Login successful — redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html#dashboard';
            }, 900);
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName')?.value || '';
            const email = document.getElementById('registerEmail')?.value || '';
            const pass = document.getElementById('registerPassword')?.value || '';
            const confirm = document.getElementById('registerConfirm')?.value || '';
            const terms = document.getElementById('registerTerms')?.checked || false;
            if (!name || !email || !pass || !confirm) {
                showNotification('Please fill all registration fields.', 'error');
                return;
            }
            if (pass !== confirm) {
                showNotification('Passwords do not match.', 'error');
                return;
            }
            if (!terms) {
                showNotification('Please accept Terms & Conditions.', 'error');
                return;
            }
            // Simulate registration success
            showNotification('Registration successful — redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html#dashboard';
            }, 900);
        });
    }
});

// Prediction functionality (outside DOMContentLoaded so it can be called inline from HTML)
function generatePrediction() {
    const cropType = document.getElementById('cropType')?.value;
    const area = document.getElementById('area')?.value;
    const soilType = document.getElementById('soilType')?.value;
    const season = document.getElementById('season')?.value;
    
    // Validate inputs
    if (!cropType || !area || !soilType || !season) {
        alert('Please fill in all fields to generate a prediction.');
        return;
    }
    
    // Show loading state
    const predictedYield = document.getElementById('predictedYield');
    const confidenceScore = document.getElementById('confidenceScore');
    
    if (predictedYield) predictedYield.textContent = 'Calculating...';
    if (confidenceScore) confidenceScore.textContent = 'Calculating...';
    
    // Simulate AI prediction with realistic data
    setTimeout(() => {
        const predictions = generateRealisticPrediction(cropType, area, soilType, season);
        
        if (predictedYield) animateValue(predictedYield, 0, predictions.yield, 1500, ' tons/ha');
        if (confidenceScore) animateValue(confidenceScore, 0, predictions.confidence, 1200, '%');
        
        showNotification('Prediction generated successfully!', 'success');
    }, 1200);
}

function generateRealisticPrediction(cropType, area, soilType, season) {
    // Base yields for different crops (tons per hectare)
    const baseYields = {
        wheat: 4.5,
        rice: 5.2,
        corn: 6.8,
        soybean: 3.2
    };
    
    const soilMultipliers = {
        clay: 0.9,
        loam: 1.1,
        sandy: 0.8,
        silt: 1.0
    };
    
    const seasonMultipliers = {
        kharif: 1.1,
        rabi: 1.0,
        zaid: 0.9
    };
    
    // Calculate predicted yield (per ha)
    let predictedYield = baseYields[cropType] || 4.0;
    predictedYield *= soilMultipliers[soilType] || 1.0;
    predictedYield *= seasonMultipliers[season] || 1.0;
    predictedYield *= (0.9 + Math.random() * 0.2);
    
    // Confidence
    let confidence = 85 + Math.random() * 13; // 85-98%
    
    return {
        yield: Math.round(predictedYield * 10) / 10,
        confidence: Math.round(confidence)
    };
}

function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        if (suffix === '%') {
            element.textContent = Math.round(current) + suffix;
        } else {
            element.textContent = (Math.round(current * 10) / 10) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2d7a2d' : (type === 'error' ? '#b73a3a' : '#666')};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
