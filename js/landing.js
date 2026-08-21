/**
 * landing.js - Interactions for Bulk Medics landing page
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation & Scroll Effects
    const header = document.getElementById('site-header');
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Subtle Parallax for Hero Image
        if (heroBg && window.scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
    });

    // Initialize header state on load
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 2. Mobile Menu Toggle & Drawer Controller
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const menuClose = document.getElementById('mobile-menu-close');
    const siteNav = document.getElementById('site-nav');
    const navBackdrop = document.getElementById('nav-backdrop');

    function openMobileMenu() {
        if (!siteNav) return;
        siteNav.classList.add('active');
        if (menuToggle) {
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (!siteNav) return;
        siteNav.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (siteNav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        if (menuClose) {
            menuClose.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking any navigation link or action button
        const navLinksAndActions = siteNav.querySelectorAll('.nav-link, .nav-actions a');
        navLinksAndActions.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && siteNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Offset for fixed header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Intersection Observer for Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('visible');
            
            // If it's a stats item, trigger counter animation
            if (entry.target.classList.contains('stat-item')) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement && !numberElement.classList.contains('counted') && !numberElement.classList.contains('stat-static')) {
                    animateValue(numberElement);
                    numberElement.classList.add('counted');
                }
            }
            
            observer.unobserve(entry.target); // Stop observing once revealed
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Counter Animation Function
    function animateValue(obj) {
        const target = parseInt(obj.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Use easeOutQuart for smooth deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutProgress * target);
            
            // Format number with commas
            obj.innerHTML = currentCount.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = target.toLocaleString();
            }
        };
        
        window.requestAnimationFrame(step);
    }

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all FAQs and update aria attributes
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const q = faq.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                // Open clicked one if it wasn't already open
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
});
