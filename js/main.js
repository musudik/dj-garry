/**
 * DJ Garry - Equipment Rental Website
 * Main JavaScript File
 */

(function() {
    'use strict';

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }

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

    // Active menu item on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav ul li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Equipment category filter
    const categoryButtons = document.querySelectorAll('.category');
    const equipmentItems = document.querySelectorAll('.equipment-item');
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide equipment items based on category
                equipmentItems.forEach(item => {
                    if (category === 'all' || item.classList.contains(category)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Gallery filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide gallery items based on filter
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Lightbox gallery
    const galleryLinks = document.querySelectorAll('.gallery-zoom');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    let galleryImages = [];
    
    if (galleryLinks.length > 0) {
        // Collect all gallery images and their captions
        galleryLinks.forEach((link, index) => {
            galleryImages.push({
                src: link.getAttribute('href'),
                title: link.getAttribute('data-title')
            });
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                currentImageIndex = index;
                openLightbox(currentImageIndex);
            });
        });
        
        // Open lightbox
        function openLightbox(index) {
            lightboxImg.src = galleryImages[index].src;
            lightboxCaption.textContent = galleryImages[index].title;
            lightboxModal.style.display = 'block';
            
            // Disable scrolling on body
            document.body.style.overflow = 'hidden';
        }
        
        // Close lightbox
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function() {
                lightboxModal.style.display = 'none';
                
                // Enable scrolling on body
                document.body.style.overflow = 'auto';
            });
        }
        
        // Next image
        if (lightboxNext) {
            lightboxNext.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                lightboxImg.src = galleryImages[currentImageIndex].src;
                lightboxCaption.textContent = galleryImages[currentImageIndex].title;
            });
        }
        
        // Previous image
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                lightboxImg.src = galleryImages[currentImageIndex].src;
                lightboxCaption.textContent = galleryImages[currentImageIndex].title;
            });
        }
        
        // Close lightbox when clicking outside the image
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = 'none';
                
                // Enable scrolling on body
                document.body.style.overflow = 'auto';
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightboxModal.style.display === 'block') {
                if (e.key === 'Escape') {
                    lightboxModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowRight') {
                    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                    lightboxImg.src = galleryImages[currentImageIndex].src;
                    lightboxCaption.textContent = galleryImages[currentImageIndex].title;
                } else if (e.key === 'ArrowLeft') {
                    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                    lightboxImg.src = galleryImages[currentImageIndex].src;
                    lightboxCaption.textContent = galleryImages[currentImageIndex].title;
                }
            }
        });
    }

    // Pricing toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const dailyPrices = document.querySelectorAll('.daily-price');
    const weeklyPrices = document.querySelectorAll('.weekly-price');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                dailyPrices.forEach(price => price.style.display = 'none');
                weeklyPrices.forEach(price => price.style.display = 'block');
            } else {
                dailyPrices.forEach(price => price.style.display = 'block');
                weeklyPrices.forEach(price => price.style.display = 'none');
            }
        });
    }

    // Services tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Google Map
    const loadMapBtn = document.getElementById('load-map-btn');
    const mapOverlay = document.querySelector('.map-overlay');

    if (loadMapBtn && mapOverlay) {
        loadMapBtn.addEventListener('click', function() {
            mapOverlay.classList.add('hidden');
        });
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Form submission
    const contactForm = document.getElementById('rental-inquiry-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            
            const formData = new FormData(this);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Show success message (in a real application)
            alert('Thank you for your inquiry! We will contact you shortly.');
            
            // Reset form
            this.reset();
        });
    }

    // Scroll animation for elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);

    // Add this to the beginning of your main.js file
    document.addEventListener('DOMContentLoaded', function() {
        // Fix hero section height to ensure it doesn't cover other content
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.height = '100vh';
            heroSection.style.minHeight = '600px';
            heroSection.style.maxHeight = '800px';
        }
        
        // Ensure all sections are visible
        document.querySelectorAll('section:not(.hero-section)').forEach(section => {
            section.style.visibility = 'visible';
            section.style.display = 'block';
            section.style.opacity = '1';
        });
    });

    // Function to ensure uniform image sizes in equipment sections
    function ensureUniformImageSizes() {
        // Fix collage slider images
        const collageItems = document.querySelectorAll('.collage-item');
        collageItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                // Force image to cover the entire container
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.objectPosition = 'center';
            }
        });
        
        // Fix equipment grid images
        const equipmentImages = document.querySelectorAll('.equipment-image img');
        equipmentImages.forEach(img => {
            // Force image to cover the entire container
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center';
        });
    }

    // Run on page load
    document.addEventListener('DOMContentLoaded', function() {
        ensureUniformImageSizes();
        
        // Also run when images are loaded
        window.addEventListener('load', ensureUniformImageSizes);
        
        // Run when window is resized
        window.addEventListener('resize', ensureUniformImageSizes);
    });

    // Improved collage slider functionality
    function initCollageSlider() {
        const slides = document.querySelectorAll('.collage-slide');
        const dots = document.querySelectorAll('.collage-dot');
        const prevBtn = document.querySelector('.collage-prev');
        const nextBtn = document.querySelector('.collage-next');
        
        if (slides.length <= 1) return;
        
        let currentSlide = 0;
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.opacity = '0';
                slide.style.visibility = 'hidden';
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the current slide
            slides[index].classList.add('active');
            slides[index].style.opacity = '1';
            slides[index].style.visibility = 'visible';
            
            // Add active class to current dot
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
        
        // Function to go to next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Function to go to previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Initial setup - show first slide
        showSlide(0);
        
        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                nextSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                prevSlide();
            });
        }
        
        // Add click event to dots
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function(e) {
                    e.preventDefault();
                    currentSlide = index;
                    showSlide(currentSlide);
                });
            });
        }
        
        // Auto slide every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Pause auto slide on hover
        const collageContainer = document.querySelector('.collage-container');
        if (collageContainer) {
            collageContainer.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            collageContainer.addEventListener('mouseleave', function() {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // Initialize the slider when the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initCollageSlider();
    });

})(); 