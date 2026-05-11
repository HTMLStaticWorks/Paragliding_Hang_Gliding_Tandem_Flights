document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            // Save preference
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 2. RTL Toggle
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const rtlToggleBtnMobile = document.getElementById('rtl-toggle-mobile');
    
    function updateRtlButtons(dir) {
        const text = dir === 'rtl' ? 'LTR' : 'RTL';
        if (rtlToggleBtn) {
            rtlToggleBtn.querySelector('span').textContent = text;
        }
        if (rtlToggleBtnMobile) {
            rtlToggleBtnMobile.textContent = text;
        }
    }

    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateRtlButtons(savedDir);

    const toggleDir = () => {
        const currentDir = document.documentElement.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
        updateRtlButtons(newDir);
    };

    if (rtlToggleBtn) rtlToggleBtn.addEventListener('click', toggleDir);
    if (rtlToggleBtnMobile) rtlToggleBtnMobile.addEventListener('click', toggleDir);

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        const toggleMenu = () => {
            mobileMenu.classList.toggle('translate-x-full');
            
            // Toggle icons
            const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
            const closeIcon = mobileMenuBtn.querySelector('.close-icon');
            if (menuIcon && closeIcon) {
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close button inside the menu
        const mobileMenuClose = document.getElementById('mobile-menu-close');
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
                const closeIcon = mobileMenuBtn.querySelector('.close-icon');
                if (menuIcon && closeIcon) {
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            });
        });
    }

    // 4. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // 5. Initialize Swiper instances
    // Testimonial Swiper
    if (document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 6. Sticky Header
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg', 'glass');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('shadow-lg', 'glass');
                header.classList.add('bg-transparent');
            }
        });
    }

    // 7. Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('nav a, #mobile-menu a');
    
    allNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === './')) {
            link.classList.add('text-primary');
            link.classList.remove('text-black', 'text-slate-800', 'dark:text-white', 'dark:text-slate-100');
            
            // Mobile specific highlight
            if (link.closest('#mobile-menu')) {
                link.classList.add('border-primary');
                link.classList.remove('border-slate-100', 'dark:border-slate-800');
            }
        }
    });

    // 8. Scroll to Top
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

