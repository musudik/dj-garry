/**
 * DJ Garry - Equipment Rental Website
 * Animations JavaScript File
 */

(function() {
    'use strict';

    // Hero section animations
    function initHeroAnimations() {
        const heroSection = document.querySelector('.hero-section');
        
        if (!heroSection) return;
        
        // Create digital lightning effects
        const digitalLightning = document.createElement('div');
        digitalLightning.className = 'digital-lightning';
        heroSection.appendChild(digitalLightning);
        
        // Create multiple lightning bolts
        for (let i = 0; i < 15; i++) {
            createLightningBolt(digitalLightning);
        }
        
        // Create light beams
        const lightingEffect = document.createElement('div');
        lightingEffect.className = 'lighting-effect';
        heroSection.appendChild(lightingEffect);
        
        // Create multiple light beams
        for (let i = 0; i < 8; i++) {
            createLightBeam(lightingEffect);
        }
        
        // Create speaker pulse effects
        for (let i = 0; i < 4; i++) {
            createSpeakerPulse(heroSection);
        }
    }
    
    // Create lightning bolt element
    function createLightningBolt(container) {
        const bolt = document.createElement('div');
        bolt.className = 'lightning-bolt';
        
        // Random position
        bolt.style.left = `${Math.random() * 100}%`;
        bolt.style.top = `${Math.random() * 50}%`;
        
        // Random rotation
        bolt.style.transform = `rotate(${Math.random() * 180 - 90}deg)`;
        
        // Random delay
        bolt.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(bolt);
    }
    
    // Create light beam element
    function createLightBeam(container) {
        const beam = document.createElement('div');
        beam.className = 'light-beam';
        
        // Random position
        beam.style.left = `${Math.random() * 100}%`;
        beam.style.top = '0';
        
        // Random color
        const colors = ['rgba(255, 0, 102, 0.8)', 'rgba(0, 198, 255, 0.8)', 'rgba(255, 255, 0, 0.8)'];
        beam.style.background = `linear-gradient(to bottom, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
        
        // Random delay
        beam.style.animationDelay = `${Math.random() * 8}s`;
        
        container.appendChild(beam);
    }
    
    // Create speaker pulse effect
    function createSpeakerPulse(container) {
        const pulse = document.createElement('div');
        pulse.className = 'speaker-pulse';
        
        // Random position
        pulse.style.left = `${Math.random() * 80 + 10}%`;
        pulse.style.bottom = `${Math.random() * 30 + 10}%`;
        
        // Random size
        const size = Math.random() * 60 + 40;
        pulse.style.width = `${size}px`;
        pulse.style.height = `${size}px`;
        
        // Random delay
        pulse.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(pulse);
    }
    
    // Initialize hero slider
    function initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        
        if (slides.length <= 1) return;
        
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Change slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Initialize equipment collage slider
    function initCollageSlider() {
        const slides = document.querySelectorAll('.collage-slide');
        const dots = document.querySelectorAll('.collage-dot');
        const prevBtn = document.querySelector('.collage-prev');
        const nextBtn = document.querySelector('.collage-next');
        
        if (slides.length <= 1) return;
        
        let currentSlide = 0;
        
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
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Initial setup - show first slide
        showSlide(0);
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
            });
        }
        
        // Add click event to dots
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
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
    
    // Initialize glitch text effect
    function initGlitchEffect() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(element => {
            const text = element.textContent;
            element.setAttribute('data-text', text);
        });
    }
    
    // Initialize testimonials slider
    function initTestimonialsSlider() {
        const testimonials = document.querySelectorAll('.testimonial-item');
        
        if (testimonials.length <= 1) return;
        
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateX(50px)';
            });
            
            testimonials[index].style.opacity = '1';
            testimonials[index].style.transform = 'translateX(0)';
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        // Initial setup
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.opacity = '0';
                testimonial.style.transform = 'translateX(50px)';
            }
            testimonial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            testimonial.style.position = 'absolute';
            testimonial.style.width = '100%';
        });
        
        testimonials[0].style.opacity = '1';
        testimonials[0].style.transform = 'translateX(0)';
        
        // Change testimonial every 4 seconds
        setInterval(nextTestimonial, 4000);
    }
    
    // Add continuous wow effects
    function addContinuousEffects() {
        // Add random color flashes to equipment items
        const equipmentItems = document.querySelectorAll('.equipment-item');
        
        equipmentItems.forEach(item => {
            setInterval(() => {
                const overlay = item.querySelector('.equipment-overlay');
                if (overlay && Math.random() > 0.7) {
                    overlay.style.opacity = '0.3';
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                    }, 200);
                }
            }, 2000);
        });
        
        // Add random light flashes to the service icons
        const serviceIcons = document.querySelectorAll('.service-icon, .pricing-icon, .contact-icon');
        
        serviceIcons.forEach(icon => {
            setInterval(() => {
                if (Math.random() > 0.7) {
                    icon.style.boxShadow = '0 0 20px var(--primary-color)';
                    setTimeout(() => {
                        icon.style.boxShadow = 'none';
                    }, 300);
                }
            }, 3000);
        });
        
        // Add pulsing effect to gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            setInterval(() => {
                if (Math.random() > 0.8) {
                    item.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                    }, 300);
                }
            }, 4000);
        });
    }
    
    // Initialize all animations
    function initAllAnimations() {
        initHeroAnimations();
        initHeroSlider();
        initGlitchEffect();
        initTestimonialsSlider();
        initCollageSlider();
        addContinuousEffects();
        
        // Make sure all sections are visible
        document.querySelectorAll('section').forEach(section => {
            section.style.visibility = 'visible';
            section.style.opacity = '1';
            section.style.display = 'block';
            
            // Remove any potential transform that might be hiding the section
            section.style.transform = 'none';
        });
        
        // Ensure content after hero is visible by setting appropriate z-index
        document.querySelectorAll('section:not(.hero-section)').forEach(section => {
            section.style.position = 'relative';
            section.style.zIndex = '2';
            section.style.backgroundColor = 'var(--dark-color)';
        });
    }
    
    // Add this function to ensure visibility on page load
    function ensureContentVisibility() {
        // Force all sections to be visible
        document.querySelectorAll('section').forEach(section => {
            if (!section.classList.contains('hero-section')) {
                section.style.visibility = 'visible';
                section.style.opacity = '1';
                section.style.display = 'block';
                section.style.position = 'relative';
                section.style.zIndex = '2';
                section.style.backgroundColor = 'var(--dark-color)';
            }
        });
    }
    
    // Call this function immediately and also on window load
    ensureContentVisibility();
    window.addEventListener('load', ensureContentVisibility);

    // Enhanced Hero Animations

    // Optimized function to create digital lightning
    function createDigitalLightning(container) {
        // Remove any existing lightning to prevent multiplication
        const existingLightning = container.querySelector('.digital-lightning');
        if (existingLightning) {
            existingLightning.remove();
        }
        
        const digitalLightning = document.createElement('div');
        digitalLightning.className = 'digital-lightning';
        container.appendChild(digitalLightning);
        
        // Determine number of bolts based on screen size
        const isMobile = window.innerWidth <= 768;
        const numberOfBolts = isMobile ? 5 : 15;
        
        // Create lightning bolts
        for (let i = 0; i < numberOfBolts; i++) {
            const bolt = document.createElement('div');
            bolt.className = 'lightning-bolt';
            
            // Random position
            bolt.style.left = `${Math.random() * 100}%`;
            bolt.style.top = `${Math.random() * 50}%`;
            
            // Random rotation
            bolt.style.transform = `rotate(${Math.random() * 180 - 90}deg)`;
            
            // Random delay with larger gaps to prevent overwhelming effect
            bolt.style.animationDelay = `${Math.random() * 10}s`;
            
            // Random color
            const colors = ['rgba(0, 198, 255, 0.8)', 'rgba(255, 0, 102, 0.8)', 'rgba(255, 255, 0, 0.8)'];
            bolt.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            digitalLightning.appendChild(bolt);
        }
    }

    // Add searchlight effect
    function createSearchlight(container) {
        // Remove any existing searchlight
        const existingSearchlight = container.querySelector('.searchlight');
        if (existingSearchlight) {
            existingSearchlight.remove();
        }
        
        const searchlight = document.createElement('div');
        searchlight.className = 'searchlight';
        container.appendChild(searchlight);
        
        const beam = document.createElement('div');
        beam.className = 'searchlight-beam';
        searchlight.appendChild(beam);
    }

    // Modified function to enhance hero animations with better control
    function enhanceHeroAnimations() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Clear any existing animations to prevent duplication
        const existingEffects = heroSection.querySelectorAll('.digital-lightning, .lighting-effect, .speaker-vibration, .equalizer-container, .equalizer-reflection, .particles-container, .searchlight');
        existingEffects.forEach(effect => effect.remove());
        
        // Add digital lightning effect with controlled number
        createDigitalLightning(heroSection);
        
        // Add light beam effects
        createLightBeams(heroSection);
        
        // Add speaker vibration effect
        createSpeakerVibration(heroSection);
        
        // Add equalizer effect
        createEqualizerEffect(heroSection);
        
        // Add searchlight effect
        //createSearchlight(heroSection);
        
        // Add particle effects - reduced for mobile
        createParticleEffect(heroSection);
        
        // Add glowing text effect
        addGlowingTextEffect();
    }

    // Create light beam effects
    function createLightBeams(container) {
        const lightingEffect = document.createElement('div');
        lightingEffect.className = 'lighting-effect';
        container.appendChild(lightingEffect);
        
        // Create multiple light beams
        for (let i = 0; i < 8; i++) {
            const beam = document.createElement('div');
            beam.className = 'light-beam';
            
            // Random position
            beam.style.left = `${Math.random() * 100}%`;
            beam.style.top = '0';
            
            // Random color
            const colors = ['rgba(255, 0, 102, 0.8)', 'rgba(0, 198, 255, 0.8)', 'rgba(255, 255, 0, 0.8)'];
            beam.style.background = `linear-gradient(to bottom, ${colors[Math.floor(Math.random() * colors.length)]}, transparent)`;
            
            // Random delay
            beam.style.animationDelay = `${Math.random() * 8}s`;
            
            lightingEffect.appendChild(beam);
        }
    }

    // Create speaker vibration effect
    function createSpeakerVibration(container) {
        const speakerVibration = document.createElement('div');
        speakerVibration.className = 'speaker-vibration';
        container.appendChild(speakerVibration);
        
        // Create speakers
        for (let i = 0; i < 2; i++) {
            const speaker = document.createElement('div');
            speaker.className = 'speaker';
            
            // Add speaker rings
            for (let j = 0; j < 2; j++) {
                const ring = document.createElement('div');
                ring.className = 'speaker-ring';
                ring.style.animationDelay = `${j * 0.3}s`;
                speaker.appendChild(ring);
            }
            
            speakerVibration.appendChild(speaker);
        }
    }

    // Function to create a more digital equalizer effect matching the image
    function createEqualizerEffect(container) {
        // Remove any existing equalizer
        const existingEqualizer = container.querySelector('.equalizer-container');
        const existingReflection = container.querySelector('.equalizer-reflection');
        if (existingEqualizer) existingEqualizer.remove();
        if (existingReflection) existingReflection.remove();
        
        // Get hero content to position equalizer properly
        const heroContent = container.querySelector('.hero-content');
        if (!heroContent) return;
        
        // Adjust hero content margin to make space for equalizer
        heroContent.style.marginTop = '200px';
        
        // Create equalizer container
        const equalizerContainer = document.createElement('div');
        equalizerContainer.className = 'equalizer-container';
        
        // Create equalizer bars - exactly 20 to match the image
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'equalizer-bar';
            
            // Digital stepped heights (more variation)
            const heightSteps = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
            const height = heightSteps[Math.floor(Math.random() * heightSteps.length)];
            bar.style.height = `${height}px`;
            
            // Faster animation
            bar.style.animationDuration = '0.5s';
            
            equalizerContainer.appendChild(bar);
        }
        
        // Insert equalizer before hero content to position it above
        container.insertBefore(equalizerContainer, heroContent);
        
        // Create reflection
        const reflection = document.createElement('div');
        reflection.className = 'equalizer-reflection';
        
        // Clone the bars for the reflection
        equalizerContainer.childNodes.forEach(bar => {
            const reflectionBar = bar.cloneNode(true);
            reflection.appendChild(reflectionBar);
        });
        
        // Insert reflection after equalizer but before hero content
        container.insertBefore(reflection, heroContent);
    }

    // Create particle effect
    function createParticleEffect(container) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        container.appendChild(particlesContainer);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.bottom = '0';
            
            // Random color
            const colors = ['rgba(255, 0, 102, 0.8)', 'rgba(0, 198, 255, 0.8)', 'rgba(255, 255, 255, 0.8)'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random animation duration and delay
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 10;
            particle.style.animation = `particleFloat ${duration}s infinite linear ${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Add glowing text effect
    function addGlowingTextEffect() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        const heading = heroContent.querySelector('h1');
        if (heading) {
            heading.classList.add('glowing-text');
        }
    }

    // Initialize animations with window size check
    document.addEventListener('DOMContentLoaded', function() {
        enhanceHeroAnimations();
        
        // Reinitialize on resize with debounce to prevent excessive calls
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                enhanceHeroAnimations();
            }, 250);
        });
    });

})(); 