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

// Fetching Categories with their Courses
document.addEventListener('DOMContentLoaded', async function () {
    const loader = document.getElementById('loading');
    const coursesContainer = document.querySelector('.container.courses')
    coursesContainer.style.display = 'none'
    loader.style.display = 'block';

    await fetch('https://brtcodeapi.com/categories')
        .then(res => res.json())
        .then(async (categories) => {
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i]
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category')

                await fetch(`https://brtcodeapi.com/courses/by-category-id/${category._id}`)
                    .then(res => res.json())
                    .then((courses) => {
                        const categoryBtn = document.createElement('button')
                        categoryBtn.classList.add('category-header')
                        categoryBtn.innerHTML = `
                            <button class="category-header">
                                <span>${category.name}</span>
                                <span class="arrow">▶</span>
                            </button>
                        `
                        categoryDiv.appendChild(categoryBtn)
                        courses.forEach(course => {
                            const categoryContent = document.createElement('div')
                            categoryContent.classList.add('category-content')

                            const courseCard = document.createElement('div')
                            courseCard.classList.add('course-card')
                            courseCard.innerHTML = `
                                <img src="../images/${category.imageRef}" alt="${course.title}">
                                <h3>${course.title}</h3>
                                <p>${course.description}</p>
                            `
                            const copyBtn = document.createElement('button')
                            copyBtn.classList.add('btn-primary')
                            copyBtn.classList.add('btn-copy')
                            copyBtn.textContent = 'نسخ رابط التسجيل'
                            copyBtn.addEventListener('click', async () => {
                                const registrationLink = `https://www.brtcode.com/enroll.html?course_id=${course._id}`
                                try {
                                    await navigator.clipboard.writeText(registrationLink);
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'تم النسخ!',
                                        text: 'رابط التسجيل تم نسخه إلى الحافظة.',
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                } catch (err) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'خطأ',
                                        text: 'لم نتمكن من نسخ الرابط. حاول مرة أخرى.'
                                    });
                                }
                            })
                            courseCard.appendChild(copyBtn)
                            categoryContent.appendChild(courseCard)
                            categoryDiv.appendChild(categoryContent)
                        })
                        coursesContainer.appendChild(categoryDiv)

                        if (i === courses.length - 1) {
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