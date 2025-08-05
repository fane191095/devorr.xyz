// Advanced Special Effects System
document.addEventListener('DOMContentLoaded', function() {
    // Create Particle System
    function createParticleSystem() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    // Create Matrix Rain Effect
    function createMatrixRain() {
        const matrixContainer = document.getElementById('matrix-rain');
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const columnCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = i * 20 + 'px';
            column.style.animationDelay = Math.random() * 8 + 's';
            column.style.animationDuration = (Math.random() * 4 + 6) + 's';
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += characters[Math.floor(Math.random() * characters.length)];
            }
            column.textContent = text;
            matrixContainer.appendChild(column);
        }
    }
    
    // Initialize special effects
    createParticleSystem();
    createMatrixRain();
    
    // Add smooth scroll behavior
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for staggered animation
    const animatedFeatureCards = document.querySelectorAll('.feature-card');
    animatedFeatureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe sections for fade-in
    const sections = document.querySelectorAll('.features, .support');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Enhanced lightning animation with random timing
    function createRandomLightning() {
        const lightningElements = document.querySelectorAll('.lightning');
        
        lightningElements.forEach(lightning => {
            // Random delay between 3-8 seconds
            const randomDelay = Math.random() * 5000 + 3000;
            
            setTimeout(() => {
                lightning.style.opacity = '1';
                lightning.style.boxShadow = '0 0 20px #8b5cf6, 0 0 40px #8b5cf6';
                
                setTimeout(() => {
                    lightning.style.opacity = '0';
                    lightning.style.boxShadow = 'none';
                }, 150);
                
                // Recursive call for continuous animation
                createRandomLightning();
            }, randomDelay);
        });
    }

    // Start random lightning after page load
    setTimeout(createRandomLightning, 2000);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Button click effects
    const buttons = document.querySelectorAll('.cta-button, .support-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Typing effect for hero subtitle (optional enhancement)
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid #8b5cf6';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing effect after hero animation
        setTimeout(typeWriter, 1000);
    }

    // Advanced Mouse Interaction Effects
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Lightning parallax
        const lightningElements = document.querySelectorAll('.lightning');
        lightningElements.forEach((lightning, index) => {
            const speed = (index + 1) * 0.8;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            lightning.style.transform = `translate(${x}px, ${y}px) rotate(${lightning.style.transform.match(/rotate\(([^)]+)\)/)?.[1] || '0deg'})`;
        });
        
        // Particle interaction
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - particleX, 2) + Math.pow(e.clientY - particleY, 2));
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(particleY - e.clientY, particleX - e.clientX);
                const moveX = Math.cos(angle) * force * 20;
                const moveY = Math.sin(angle) * force * 20;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force})`;
                particle.style.boxShadow = `0 0 ${force * 20}px #8b5cf6`;
            } else {
                particle.style.transform = 'translate(0, 0) scale(1)';
                particle.style.boxShadow = 'none';
            }
        });
        
        // Hero title interaction
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const rect = heroTitle.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
            
            if (distance < 200) {
                const intensity = (200 - distance) / 200;
                heroTitle.style.filter = `drop-shadow(0 0 ${20 + intensity * 30}px rgba(139, 92, 246, ${0.8 + intensity * 0.4})) hue-rotate(${intensity * 30}deg)`;
            }
        }
    });
    
    // Cyber Glitch Effect for Feature Cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create glitch effect
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'cyber-glitch 0.3s ease-in-out';
            }, 10);
            
            // Add cyber scan line
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ff88, transparent);
                animation: scan-card 0.5s ease-in-out;
                z-index: 10;
            `;
            this.appendChild(scanLine);
            
            setTimeout(() => {
                scanLine.remove();
            }, 500);
        });
    });
    
    // Add cyber effects CSS
    const cyberStyle = document.createElement('style');
    cyberStyle.textContent = `
        @keyframes cyber-glitch {
            0%, 100% { transform: translateY(-10px); }
            20% { transform: translateY(-10px) translateX(2px); }
            40% { transform: translateY(-10px) translateX(-2px); }
            60% { transform: translateY(-10px) translateX(1px); }
            80% { transform: translateY(-10px) translateX(-1px); }
        }
        
        @keyframes scan-card {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100px); opacity: 0; }
        }
        
        .feature-card:hover {
            box-shadow: 
                0 20px 40px rgba(139, 92, 246, 0.3),
                inset 0 0 20px rgba(139, 92, 246, 0.1),
                0 0 0 1px rgba(0, 255, 136, 0.5) !important;
        }
    `;
    document.head.appendChild(cyberStyle);
});
