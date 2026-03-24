// script.js

document.addEventListener('DOMContentLoaded', function () {

    // Nav toggle mobile
    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');
    var navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Lien actif dans la nav
    var sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var hauteur = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + hauteur) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Theme sombre / clair
    var themeBtn = document.getElementById('theme-toggle');
    var theme = localStorage.getItem('theme');

    if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            document.body.classList.toggle('light-theme');
            var isLight = document.body.classList.contains('light-theme');
            themeBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Animation au scroll (fade in)
    var elements = document.querySelectorAll('.card, .timeline-card, .section-title');
    elements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(function (el) {
        observer.observe(el);
    });

    // Barres de compétences
    var bars = document.querySelectorAll('.skill-fill');
    var barObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var w = entry.target.getAttribute('data-width');
                entry.target.style.width = w + '%';
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    bars.forEach(function (bar) {
        barObserver.observe(bar);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var cible = document.querySelector(this.getAttribute('href'));
            if (cible) {
                cible.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
