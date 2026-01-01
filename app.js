document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the clicked element is NOT the theme toggle or language switcher
            // This prevents the menu from closing when switching theme/language on mobile if that's preferred,
            // but the user seemingly wants it to behave like a normal menu. 
            // However, the request specifically mentions theme selection button is gone if pressed.
            // This implies the menu closes immediately and maybe rerenders or just hides.

            // Actually, for standard navigation links, closing is standard behavior.
            // For theme toggle, we might want to keep it open or close it. 
            // If the theme toggle is inside a li.nav-item, it might be bubbling up.

            // Let's check if the click target is the theme toggle or language switch
            if (link.getAttribute('href') === '#' || link.getAttribute('href').includes('javascript')) return;

            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Navbar & Announcement Bar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const announcementBar = document.getElementById('announcement-bar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar shadow effect
        if (scrollTop > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }

        // Smart Announcement Bar
        if (announcementBar) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down & past top
                announcementBar.classList.add('hidden');
            } else {
                // Scrolling up
                announcementBar.classList.remove('hidden');
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    // Elements to animate
    const animatedElements = document.querySelectorAll('.animate-up, .animate-left, .animate-right, .listing-card, .service-card, .about-content, .contact-wrapper');

    animatedElements.forEach(el => {
        el.style.opacity = '0';

        if (el.classList.contains('animate-left')) {
            el.style.transform = 'translateX(-100px)';
        } else if (el.classList.contains('animate-right')) {
            el.style.transform = 'translateX(100px)';
        } else {
            // Default vertical animation
            el.style.transform = 'translateY(30px)';
        }

        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .show {
            opacity: 1 !important;
            transform: translate(0, 0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeToggle) {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
            themeToggle.style.color = '#fff'; // Bright sun for dark mode
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');

            if (currentTheme === 'dark') {
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.classList.remove('fa-sun');
                themeToggle.classList.add('fa-moon');
                themeToggle.style.color = 'var(--secondary)'; // Reset color
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.classList.remove('fa-moon');
                themeToggle.classList.add('fa-sun');
                themeToggle.style.color = '#fff';
            }
        });
    }
});
