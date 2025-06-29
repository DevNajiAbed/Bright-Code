document.getElementById('current-year').textContent = new Date().getFullYear();

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

// Fetching Categories
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loading');
    const coursesContainer = document.querySelector('.container.courses')
    coursesContainer.style.display = 'none'
    loader.style.display = 'block';

    fetch('http://localhost:3131/categories')
        .then(res => res.json())
        .then(categories => {
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i]
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category')

                fetch(`http://localhost:3131/courses/by-category-id/${category._id}`)
                    .then(res => res.json())
                    .then(courses => {
                        var content = `
                            <button class="category-header">
                                <span>${category.name}</span>
                                <span class="arrow">▶</span>
                            </button>
                        `
                        courses.forEach(course => {
                            const phone = '972593617179';
                            const message = encodeURIComponent(`مرحباً، أود التسجيل في دورة ${course.title}!`);
                            const url = `https://wa.me/${phone}?text=${message}`;

                            content += `
                                <div class="category-content">
                                    <div class="course-card">
                                        <img src="images/${category.imageRef}" alt="${course.title}">
                                        <h3>${course.title}</h3>
                                        <p>${course.description}</p>
                                        <a href="${url}" target="_blank" class="btn-primary">
                                            تواصل معنا على واتساب
                                        </a>
                                    </div>
                                </div>
                            `
                        })

                        categoryDiv.innerHTML = content
                        coursesContainer.appendChild(categoryDiv)

                        if (i === categories.length - 1) {
                            coursesContainer.style.display = 'block'
                            loader.style.display = 'none';

                            document.querySelectorAll('.category-header').forEach(btn => {
                                btn.addEventListener('click', () => {
                                    btn.parentElement.classList.toggle('open');
                                });
                            });
                        }
                    })
            }
        })
});