/* ========================================
   LIMELIGHT INTERNATIONAL ACADEMY
   Landing Page Scripts
   ======================================== */

(function () {
    'use strict';

    // ============ CONFIG ============
    // Replace with your deployed Google Apps Script Web App URL
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwjtebTEcYTqLIoXq2UsDUEC546sq6X-lAOkTJXmdy9u5NwG4kXMWyI49g-c98TSucCkA/exec';
    const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/B4qFqlhtUgN9DYebvtW3YR';

    // ============ DOM ELEMENTS ============
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const registerForm = document.getElementById('registerForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const whatsappLink = document.getElementById('whatsappLink');

    // ============ NAVBAR SCROLL EFFECT ============
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ============ MOBILE MENU ============
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // ============ FADE-IN ANIMATIONS ============
    function initFadeInObserver() {
        var fadeElements = document.querySelectorAll('.fade-in');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });

            fadeElements.forEach(function (el, index) {
                el.style.transitionDelay = (index % 6) * 0.1 + 's';
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers
            fadeElements.forEach(function (el) {
                el.classList.add('visible');
            });
        }
    }

    // ============ FAQ ACCORDION ============
    function initFAQ() {
        var faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(function (item) {
            var question = item.querySelector('.faq-question');

            question.addEventListener('click', function () {
                var isActive = item.classList.contains('active');

                // Close all FAQ items
                faqItems.forEach(function (otherItem) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // ============ FORM VALIDATION ============
    function showError(inputId, message) {
        var input = document.getElementById(inputId);
        var errorEl = document.getElementById(inputId + 'Error');
        input.classList.add('error');
        if (errorEl) errorEl.textContent = message;
    }

    function clearError(inputId) {
        var input = document.getElementById(inputId);
        var errorEl = document.getElementById(inputId + 'Error');
        input.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
    }

    function clearAllErrors() {
        ['fullName', 'whatsapp', 'email', 'category'].forEach(clearError);
    }

    function validateForm() {
        clearAllErrors();
        var isValid = true;

        // Full Name
        var fullName = document.getElementById('fullName').value.trim();
        if (!fullName) {
            showError('fullName', 'Full name is required');
            isValid = false;
        } else if (fullName.length < 2) {
            showError('fullName', 'Name must be at least 2 characters');
            isValid = false;
        }

        // WhatsApp Number
        var whatsapp = document.getElementById('whatsapp').value.trim();
        if (!whatsapp) {
            showError('whatsapp', 'WhatsApp number is required');
            isValid = false;
        } else if (!/^[\d\s\-\+\(\)]{7,15}$/.test(whatsapp)) {
            showError('whatsapp', 'Please enter a valid phone number');
            isValid = false;
        }

        // Email (optional but validate format if provided)
        var email = document.getElementById('email').value.trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Category
        var category = document.getElementById('category').value;
        if (!category) {
            showError('category', 'Please select a category');
            isValid = false;
        }

        return isValid;
    }

    // Clear errors on input
    ['fullName', 'whatsapp', 'email', 'category'].forEach(function (id) {
        var el = document.getElementById(id);
        el.addEventListener('input', function () {
            clearError(id);
        });
        el.addEventListener('change', function () {
            clearError(id);
        });
    });

    // ============ FORM SUBMISSION ============
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateForm()) return;

            var formData = {
                fullName: document.getElementById('fullName').value.trim(),
                whatsapp: document.getElementById('whatsapp').value.trim(),
                email: document.getElementById('email').value.trim(),
                category: document.getElementById('category').value
            };

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(function (response) {
                    // With no-cors mode, we can't read the response
                    // Assume success and show modal
                    showSuccessModal();
                })
                .catch(function (error) {
                    console.error('Submission error:', error);
                    // Even on error with no-cors, show success since we can't read the response
                    // In production, use cors mode with proper Apps Script setup
                    showSuccessModal();
                })
                .finally(function () {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                });
        });
    }

    function showSuccessModal() {
        whatsappLink.href = WHATSAPP_GROUP_LINK;
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Auto redirect to WhatsApp after 3 seconds
        setTimeout(function () {
            window.open(WHATSAPP_GROUP_LINK, '_blank');
        }, 3000);
    }

    // Close modal
    successModal.addEventListener('click', function (e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============ SMOOTH SCROLL (for older browsers) ============
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============ ACTIVE NAV LINK ON SCROLL ============
    function updateActiveNavLink() {
        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // ============ INITIALIZE ============
    document.addEventListener('DOMContentLoaded', function () {
        initFadeInObserver();
        initFAQ();
    });
})();
