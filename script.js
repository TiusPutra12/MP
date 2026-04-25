document.addEventListener('DOMContentLoaded', () => {
    // Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Vanilla JS Parallax Effect
    const rellaxElements = document.querySelectorAll('.rellax');
    const parallaxCards = document.querySelectorAll('.parallax-card');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Hero Parallax
        rellaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed');
            const yPos = -(scrolled * speed * 0.1);
            el.style.transform = `translateY(${yPos}px)`;
        });

        // Projects Parallax
        parallaxCards.forEach(card => {
            const visual = card.querySelector('.project-visual');
            const rect = card.getBoundingClientRect();
            
            // Check if card is in viewport
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
                const shift = centerOffset * 0.1;
                
                if(visual) {
                    visual.style.transform = `translateY(${-shift}px) scale(1.05)`;
                }
            }
        });
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
