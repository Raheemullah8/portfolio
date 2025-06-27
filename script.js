    
      // Enhanced scroll progress with smooth animations
      function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("scrollProgress").style.width = scrolled + "%";
      }

      // Advanced intersection observer for section animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section becomes visible
            if (entry.target.id === 'skills') {
              animateSkillBars();
            }
            
            // Animate timeline items
            if (entry.target.id === 'experience') {
              animateTimelineItems();
            }
          }
        });
      }, observerOptions);

      // Observe all sections
      document.querySelectorAll('.section').forEach((section) => {
        sectionObserver.observe(section);
      });

      // Skill bars animation
      function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
          }, index * 200);
        });
      }

      // Timeline animation
      function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 300);
        });
      }

      // Navigation dots functionality
      const navDots = document.querySelectorAll('.nav-dot');
      const sections = document.querySelectorAll('section');

      // Update active navigation dot based on scroll position
      function updateActiveNavDot() {
        let current = '';
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
          }
        });

        navDots.forEach((dot) => {
          dot.classList.remove('active');
          if (dot.getAttribute('data-section') === current) {
            dot.classList.add('active');
          }
        });
      }

      // Smooth scroll to section on nav dot click
      navDots.forEach((dot) => {
        dot.addEventListener('click', () => {
          const sectionId = dot.getAttribute('data-section');
          const section = document.getElementById(sectionId);
          section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        });
      });

      // Enhanced scroll event listener
      window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateActiveNavDot();
      });

      // Improved mouse parallax effect for hero section
      document.addEventListener('mousemove', (e) => {
        const heroCard = document.querySelector('.hero-card');
        const { clientX: x, clientY: y } = e;
        const { innerWidth: width, innerHeight: height } = window;
        
        const moveX = (x / width - 0.5) * 8; // Reduced movement for subtlety
        const moveY = (y / height - 0.5) * 8;
        
        heroCard.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
      });

      // Reset hero card transform when mouse leaves
      document.addEventListener('mouseleave', () => {
        const heroCard = document.querySelector('.hero-card');
        heroCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      });

      // Enhanced contact item interactions
      const contactItems = document.querySelectorAll('.contact-item');
      contactItems.forEach((item) => {
        item.addEventListener('click', () => {
          const text = item.querySelector('span').textContent;
          navigator.clipboard.writeText(text).then(() => {
            // Create a temporary feedback element
            const feedback = document.createElement('div');
            feedback.textContent = 'Copied!';
            feedback.style.cssText = `
              position: absolute;
              top: -35px;
              left: 50%;
              transform: translateX(-50%);
              background: var(--accent-primary);
              color: var(--primary-bg);
              padding: 0.5rem 1rem;
              border-radius: 20px;
              font-size: 0.8rem;
              font-weight: 600;
              opacity: 0;
              animation: fadeInOut 2s ease forwards;
              z-index: 1000;
            `;
            
            item.style.position = 'relative';
            item.appendChild(feedback);
            
            setTimeout(() => {
              feedback.remove();
            }, 2000);
          });
        });
      });

      // Add fadeInOut animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
          50% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }
      `;
      document.head.appendChild(style);

      // Initialize on page load with improved stagger animation
      document.addEventListener('DOMContentLoaded', () => {
        updateScrollProgress();
        updateActiveNavDot();
        
        // Add stagger animation to initial load with smoother transitions
        const heroElements = document.querySelectorAll('.hero-card, .contact-item');
        heroElements.forEach((el, index) => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 150);
        });
      });

      // Enhanced project card interactions with improved 3D effect
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'rotateY(5deg) rotateX(3deg) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        });
        
        // Add subtle movement on mouse move within card
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
      });
    
