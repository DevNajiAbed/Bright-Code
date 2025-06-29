document.getElementById('current-year').textContent = new Date().getFullYear();

const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.course-card');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('btn-primary'));
        btn.classList.add('btn-primary');

        const cat = btn.getAttribute('data-cat');
        cards.forEach(card => {
            if (cat === 'all' || card.dataset.category === cat) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    const links = document.querySelectorAll('.nav-links a');
    const logo = document.querySelector('.header-inner .logo')

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
            }
        });
    });

    logo.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
            nav.classList.remove('open');
        }
    })

    document.querySelectorAll('.category-header').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.toggle('open');
        });
    });
});