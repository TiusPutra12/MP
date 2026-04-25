document.addEventListener('DOMContentLoaded', () => {
    // ===== REVEAL ON SCROLL =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ===== ANIMATED COUNTERS =====
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            if (el.dataset.counted) return;
            el.dataset.counted = 'true';
            const target = parseInt(el.dataset.target);
            const duration = 1800;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                let value = Math.floor(eased * target);
                if (target >= 1000) {
                    el.textContent = (value / 1000).toFixed(value >= target ? 0 : 1) + 'k+';
                } else {
                    el.textContent = value + '+';
                }
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target >= 1000 ? (target / 1000) + 'k+' : target + '+';
            }
            requestAnimationFrame(update);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Scroll progress
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        document.getElementById('scrollProgress').style.width = progress + '%';

        lastScroll = scrollTop;
    }, { passive: true });

    // ===== CURSOR GLOW =====
    const glow = document.getElementById('cursorGlow');
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== PROJECT DETAIL EXPAND/COLLAPSE =====
    document.querySelectorAll('.project-card[data-project]').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't toggle if clicking a link
            if (e.target.closest('a')) return;

            const detail = card.querySelector('.project-detail');
            const isOpen = card.classList.contains('expanded');

            // Close all other open cards first
            document.querySelectorAll('.project-card.expanded').forEach(openCard => {
                if (openCard !== card) {
                    openCard.classList.remove('expanded');
                    openCard.querySelector('.project-detail').classList.remove('open');
                }
            });

            // Toggle current card
            card.classList.toggle('expanded', !isOpen);
            detail.classList.toggle('open', !isOpen);

            // Smooth scroll to show the detail
            if (!isOpen) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });
});
