/**
 * PRODUCTION-READY PORTFOLIO JAVASCRIPT
 * Features: Smooth scrolling, scroll animations, form validation, dark mode, mobile menu
 * Author: Generated for Auxano Institute Portfolio
 * Version: 1.0.0
 */

// ============================================
// 1. INITIALIZATION
// ============================================

/**
 * Wait for DOM to be fully loaded before executing any scripts
 * This ensures all HTML elements are ready to be accessed
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ DOM Content Loaded - Initializing all features');
    
    // Initialize all features in order
    initializeDarkMode();
    initializeScrollEffects();
    initializeNavigation();
    initializeFormValidation();
    initializeScrollToTop();
    setupIntersectionObserver();
    setupSectionHighlight();
    updateFooterDate();
    
    console.log('✓ All features initialized successfully');
});

// ============================================
// 2. DARK MODE TOGGLE WITH LOCALSTORAGE
// ============================================

/**
 * Initialize dark mode functionality
 * - Checks for saved preference in localStorage
 * - Applies dark mode class if user previously selected it
 * - Sets up toggle button click handler
 */
function initializeDarkMode() {
    console.log('🌙 Initializing dark mode...');
    
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    
    // Check if user has saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // Apply saved preference when page loads
    if (isDarkMode) {
        htmlElement.classList.add('dark-mode');
        console.log('✓ Dark mode enabled from saved preference');
    } else {
        console.log('✓ Light mode enabled (default)');
    }
    
    // Handle dark mode toggle button click
    darkModeToggle.addEventListener('click', function() {
        htmlElement.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDarkModeNow = htmlElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkModeNow ? 'enabled' : 'disabled');
        
        console.log('🌙 Dark mode toggled:', isDarkModeNow ? 'ON' : 'OFF');
    });
}

// ============================================
// 3. SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

/**
 * Enable smooth scrolling for all anchor links
 * HTML5 scroll-behavior: smooth is used, with JavaScript fallback
 * Works with all navigation links that point to sections (#home, #about, etc.)
 */
function initializeScrollEffects() {
    console.log('📜 Initializing scroll effects...');
    
    // Get all anchor links that point to sections
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for valid section links
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                const offsetTop = targetElement.offsetTop - 80; // Offset for sticky header
                
                // Smooth scroll to target
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                console.log(`📍 Scrolled to section: ${href}`);
            }
        });
    });
}

// ============================================
// 4. MOBILE HAMBURGER MENU TOGGLE
// ============================================

/**
 * Initialize mobile hamburger menu
 * - Toggle menu visibility on button click
 * - Close menu when a link is clicked
 * - Handle responsive behavior
 */
function initializeNavigation() {
    console.log('☰ Initializing mobile menu...');
    
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu visibility when hamburger is clicked
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        console.log('☰ Mobile menu toggled');
    });
    
    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            console.log(`📌 Menu closed - navigated to: ${this.textContent}`);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnHamburger = hamburgerMenu.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// 5. SCROLL-TO-TOP BUTTON
// ============================================

/**
 * Initialize scroll-to-top button
 * - Show button when user scrolls down 300px
 * - Hide button when at top of page
 * - Smooth scroll to top when clicked
 */
function initializeScrollToTop() {
    console.log('⬆️ Initializing scroll-to-top button...');
    
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const scrollThreshold = 300; // Show button after 300px scroll
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        console.log('⬆️ Scrolled to top');
    });
}

// ============================================
// 6. SCROLL ANIMATIONS WITH INTERSECTIONOBSERVER
// ============================================

/**
 * Setup Intersection Observer for scroll animations
 * - Detects when elements come into view
 * - Applies fade-in or slide-up animations
 * - IntersectionObserver is more performant than scroll event listeners
 */
function setupIntersectionObserver() {
    console.log('👀 Setting up Intersection Observer for animations...');
    
    // Create observer with options
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is in view
    };
    
    // Callback function called when element enters viewport
    const observerCallback = function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animate');
                
                // Apply appropriate animation class
                if (animationType === 'fade-in') {
                    element.classList.add('fade-in');
                } else if (animationType === 'slide-up') {
                    element.classList.add('slide-up');
                }
                
                // Stop observing this element (animation only happens once)
                observer.unobserve(element);
                
                console.log(`✨ Animation applied: ${animationType}`);
            }
        });
    };
    
    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Find all elements with data-animate attribute and observe them
    const animatedElements = document.querySelectorAll('[data-animate]');
    console.log(`📊 Found ${animatedElements.length} elements to animate`);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// 7. FORM VALIDATION
// ============================================

/**
 * Initialize contact form validation
 * Validates:
 * - Name: Required, minimum 2 characters
 * - Email: Required, valid email format
 * - Message: Required, minimum 10 characters
 */
function initializeFormValidation() {
    console.log('✉️ Initializing form validation...');
    
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Form submit event
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('📝 Form submitted - validating...');
        
        // Validate all fields
        const isNameValid = validateName(nameInput);
        const isEmailValid = validateEmail(emailInput);
        const isMessageValid = validateMessage(messageInput);
        
        // If all fields are valid, show success message
        if (isNameValid && isEmailValid && isMessageValid) {
            showFormSuccess();
            
            // Reset form after successful submission
            contactForm.reset();
            
            // Clear error messages
            clearErrors();
            
            console.log('✓ Form submitted successfully');
        } else {
            console.log('✗ Form validation failed');
        }
    });
    
    // Real-time validation on input change
    nameInput.addEventListener('blur', () => validateName(nameInput));
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    messageInput.addEventListener('blur', () => validateMessage(messageInput));
}

/**
 * Validate name field
 * Requirements: Not empty, at least 2 characters
 * @param {HTMLElement} input - The name input element
 * @returns {boolean} - True if valid, false otherwise
 */
function validateName(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('name-error');
    
    if (value === '') {
        showError(input, errorElement, 'Name is required');
        return false;
    }
    
    if (value.length < 2) {
        showError(input, errorElement, 'Name must be at least 2 characters');
        return false;
    }
    
    clearError(input, errorElement);
    return true;
}

/**
 * Validate email field
 * Requirements: Not empty, valid email format
 * Uses regex for email validation
 * @param {HTMLElement} input - The email input element
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('email-error');
    
    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        showError(input, errorElement, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(value)) {
        showError(input, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    clearError(input, errorElement);
    return true;
}

/**
 * Validate message field
 * Requirements: Not empty, at least 10 characters
 * @param {HTMLElement} input - The message textarea element
 * @returns {boolean} - True if valid, false otherwise
 */
function validateMessage(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('message-error');
    
    if (value === '') {
        showError(input, errorElement, 'Message is required');
        return false;
    }
    
    if (value.length < 10) {
        showError(input, errorElement, 'Message must be at least 10 characters');
        return false;
    }
    
    clearError(input, errorElement);
    return true;
}

/**
 * Display error message for a form field
 * Adds error class to input and shows error message
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorElement - The error message display element
 * @param {string} message - The error message to display
 */
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    console.log(`⚠️ Validation error: ${message}`);
}

/**
 * Clear error message for a form field
 * Removes error class from input and clears error message
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorElement - The error message display element
 */
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

/**
 * Clear all form error states
 */
function clearErrors() {
    const formInputs = document.querySelectorAll('.form-input, .form-textarea');
    formInputs.forEach(input => {
        input.classList.remove('error');
    });
}

/**
 * Show success message after form submission
 * Message appears for 5 seconds then auto-hides
 */
function showFormSuccess() {
    const successMessage = document.getElementById('success-message');
    successMessage.classList.add('show');
    
    console.log('✓ Success message displayed');
    
    // Auto-hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

// ============================================
// 8. HEADER SCROLL EFFECT
// ============================================

/**
 * Add shadow to header when user scrolls down
 * Creates visual feedback showing page scroll position
 */
document.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// 9. ACTIVE NAV LINK HIGHLIGHTING
// ============================================

/**
 * Highlight the active navigation link based on scroll position
 * Uses Intersection Observer to detect which section is in view
 */
function setupSectionHighlight() {
    console.log('📌 Setting up active nav link highlighting...');
    
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightOptions = {
        threshold: 0.5
    };
    
    const highlightCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };
    
    const highlighter = new IntersectionObserver(highlightCallback, highlightOptions);
    sections.forEach(section => highlighter.observe(section));
}

// ============================================
// 10. UPDATE FOOTER WITH CURRENT DATE
// ============================================

/**
 * Update footer with current date
 * Displays when the page was last updated
 */
function updateFooterDate() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        lastUpdatedElement.textContent = formattedDate;
        console.log(`📅 Footer updated with date: ${formattedDate}`);
    }
}

// ============================================
// 11. DEBUGGING & CONSOLE LOGGING
// ============================================

/**
 * Log user interaction data for debugging
 * Uncomment setupDebugLogging() call below to enable
 */
function setupDebugLogging() {
    console.log('%c🔍 Debug Mode Enabled', 'font-size: 14px; color: blue; font-weight: bold;');
    
    // Log click events
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn, button, a')) {
            console.log('🖱️ Clicked:', e.target.textContent.trim());
        }
    });
    
    // Log form inputs
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('form-input') || e.target.classList.contains('form-textarea')) {
            console.log('✏️ Form input changed:', e.target.name);
        }
    });
}

// Uncomment the line below to enable debug logging
// setupDebugLogging();

// ============================================
// 12. PERFORMANCE MONITORING
// ============================================

/**
 * Log performance metrics
 * Helps identify slow elements and bottlenecks
 */
window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('%c⚡ Performance Metrics', 'font-size: 12px; color: green;');
    console.log('Page Load Time:', pageLoadTime + 'ms');
    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.navigationStart + 'ms');
    console.log('First Paint:', perfData.responseEnd - perfData.navigationStart + 'ms');
});

// ============================================
// 13. ERROR HANDLING
// ============================================

/**
 * Global error handler for uncaught errors
 */
window.addEventListener('error', function(event) {
    console.error('❌ Error caught:', event.error);
    console.error('Stack:', event.error?.stack);
});

/**
 * Handler for unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
});

// ============================================
// 14. FEATURE DETECTION
// ============================================

/**
 * Check if browser supports required features
 */
(function checkFeatureSupport() {
    const features = {
        'IntersectionObserver': typeof IntersectionObserver !== 'undefined',
        'localStorage': typeof localStorage !== 'undefined',
        'CSS Grid': CSS.supports('display', 'grid'),
        'CSS Flexbox': CSS.supports('display', 'flex'),
        'Smooth Scroll': CSS.supports('scroll-behavior', 'smooth')
    };
    
    console.log('%c✓ Browser Feature Support', 'font-size: 12px; color: purple;');
    Object.entries(features).forEach(([feature, supported]) => {
        console.log(`${supported ? '✓' : '✗'} ${feature}`);
    });
})();

// ============================================
// END OF SCRIPT
// ============================================

console.log('%c✓ All scripts loaded successfully!', 'font-size: 14px; color: green; font-weight: bold;');
