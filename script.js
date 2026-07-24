// ===== DOM Elements =====
const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuTabs = document.querySelectorAll('.menu__tab');
const menuCategories = document.querySelectorAll('.menu__category');
const contactForm = document.getElementById('contactForm');
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// ===== Header Scroll Effect =====
let lastScroll = 0;
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for header styling
    if (currentScroll > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Menu Tabs Functionality =====
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('menu__tab--active'));
        
        // Add active class to clicked tab
        tab.classList.add('menu__tab--active');
        
        // Get target category
        const targetId = tab.getAttribute('data-tab');
        
        // Hide all categories
        menuCategories.forEach(category => {
            category.classList.remove('menu__category--active');
        });
        
        // Show target category
        const targetCategory = document.getElementById(targetId);
        if (targetCategory) {
            targetCategory.classList.add('menu__category--active');
        }
    });
});

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animate-on-scroll class to sections and observe them
document.querySelectorAll('section').forEach((section, index) => {
    if (!section.classList.contains('hero')) {
        section.classList.add('animate-on-scroll');
        section.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(section);
    }
});

// Also animate individual elements within sections
document.querySelectorAll('.about__feature, .menu__item, .testimonials__card, .moments__card, .press__card, .team__member').forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Contact Form - WhatsApp Submission =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;
        
        // Format the date for display
        const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('es-AR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Build WhatsApp message
        let whatsappMessage = `Hola! Soy ${name}.\n\n`;
        whatsappMessage += `Me gustaria hacer una reserva en Laurita:\n\n`;
        whatsappMessage += `📅 Fecha: ${formattedDate}\n`;
        whatsappMessage += `🕐 Horario: ${time}\n`;
        whatsappMessage += `👥 Personas: ${guests}\n`;
        
        if (message) {
            whatsappMessage += `\n💬 ${message}\n`;
        }
        
        whatsappMessage += `\nMi telefono de contacto: ${phone}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // WhatsApp number (formatted without spaces or dashes)
        const whatsappNumber = '5491130174185';
        
        // Open WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        
        // Optional: Reset form after submission
        contactForm.reset();
        
        // Show success feedback
        const submitBtn = contactForm.querySelector('.contact__form-button');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>¡Mensaje enviado!</span>';
        submitBtn.style.background = '#128C7E';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// ===== Parallax Effect on Hero =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.hero__image');
            
            if (heroImage && scrolled < window.innerHeight) {
                heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Gallery Hover Effect Enhancement =====
document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '';
    });
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Current Time in Hero (Dynamic Element) =====
function updateTimeElement() {
    const timeElements = document.querySelectorAll('[data-current-time]');
    timeElements.forEach(el => {
        const now = new Date();
        el.textContent = now.toLocaleTimeString('es-AR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    });
}

// Update time every minute
setInterval(updateTimeElement, 60000);
updateTimeElement();

// ===== WhatsApp Button Pulse Animation on Scroll =====
const whatsappFloat = document.querySelector('.whatsapp-float');
let whatsappPulseTimeout;

window.addEventListener('scroll', () => {
    if (whatsappFloat) {
        whatsappFloat.style.animation = 'none';
        clearTimeout(whatsappPulseTimeout);
        
        whatsappPulseTimeout = setTimeout(() => {
            whatsappFloat.style.animation = 'pulse 2s ease infinite';
        }, 1000);
    }
});

// ===== Preloader (Optional - Add if needed) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Console Welcome Message =====
console.log('%c☕ Laurita Cafe de Especialidad & Panaderia', 
    'font-size: 20px; font-weight: bold; color: #D22B2B;');
console.log('%cDesarrollado por tuweben3dias.com', 
    'font-size: 12px; color: #787878;');