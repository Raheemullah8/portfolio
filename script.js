
        // Navigation functionality
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section');

        // Update active navigation
        function updateActiveNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === current) {
                    item.classList.add('active');
                }
            });
        }

        // Smooth scroll navigation
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.getAttribute('data-section');
                const section = document.getElementById(sectionId);
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Contact item click to copy
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach(item => {
            item.addEventListener('click', () => {
                const text = item.querySelector('span').textContent;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        // Visual feedback
                        const originalBg = item.style.background;
                        item.style.background = 'rgba(0, 217, 255, 0.2)';
                        item.style.borderColor = 'var(--neon-primary)';
                        
                        setTimeout(() => {
                            item.style.background = originalBg;
                            item.style.borderColor = 'var(--glass-border)';
                        }, 1000);
                    });
                }
            });
        });

        // Scroll event listener
        window.addEventListener('scroll', updateActiveNav);

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            updateActiveNav();
            
            // Animate skill bars on scroll
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillFills = entry.target.querySelectorAll('.skill-fill');
                        skillFills.forEach((fill, index) => {
                            setTimeout(() => {
                                fill.style.width = fill.style.width;
                            }, index * 200);
                        });
                    }
                });
            }, { threshold: 0.5 });

            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                skillObserver.observe(skillsSection);
            }

            // Animate cards on scroll
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            // Observe all cards
            document.querySelectorAll('.project-card, .card, .skill-category, .experience-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                cardObserver.observe(card);
            });
        });

        // Button interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Add parallax effect to particles
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                const speed = 0.5 + (index * 0.1);
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
   