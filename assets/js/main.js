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
    
    if (localStorage.getItem('dir') === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            if (currentDir === 'rtl') {
                document.documentElement.setAttribute('dir', 'ltr');
                localStorage.setItem('dir', 'ltr');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
            }
        });
    }

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('translate-x-full');
            // Animate hamburger lines
            const lines = mobileMenuBtn.querySelectorAll('span');
            if(lines.length === 3) {
                lines[0].classList.toggle('rotate-45');
                lines[0].classList.toggle('translate-y-2.5');
                lines[1].classList.toggle('opacity-0');
                lines[2].classList.toggle('-rotate-45');
                lines[2].classList.toggle('-translate-y-2.5');
            }
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
});
