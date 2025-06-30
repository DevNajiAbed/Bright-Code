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

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const courseId = params.get('course_id')
var coursePublished = false;

// Fetching course details
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.querySelector('.loading-spinner')
    const enrollContent = document.querySelector('.enroll-content')
    const footer = document.querySelector('footer')

    loader.style.display = 'block'
    enrollContent.style.display = 'none'
    footer.style.display = 'none'

    fetch(`https://brtcodeapi.com/courses/${courseId}`)
        .then(res => res.json())
        .then(course => {
            coursePublished = course.published

            const categoryId = course.categoryId
            fetch(`https://brtcodeapi.com/categories/${categoryId}`)
                .then(res => res.json())
                .then(category => {
                    const courseCard = document.querySelector('.course-card')
                    courseCard.innerHTML = `
                        <img src="images/${category.imageRef}" alt="${course.title}">
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                    `

                    loader.style.display = 'none'
                    enrollContent.style.display = 'flex'
                    footer.style.display = 'block'
                })
        })
})

// Submitting subscription
document.addEventListener('DOMContentLoaded', function () {
    const enrollForm = document.querySelector('.enroll-form')
    enrollForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const sumbitBtn = document.querySelector('.form-group button')
        sumbitBtn.disabled = true

        const fullName = document.getElementById('enrollName').value
        const address = document.getElementById('enrollAddress').value
        const email = document.getElementById('enrollEmail').value
        const whatsappCode = document.getElementById('countryCode').value
        const whatsappNumber = document.getElementById('enrollWhatsApp').value
        const whatsapp = whatsappCode + whatsappNumber.slice(-9)

        if (whatsappNumber.length < 9) {
            Swal.fire({
                title: 'خطأ!',
                text: 'يرجى إدخال رقم واتساب صحيح.',
                icon: 'warning',
                confirmButtonColor: '#FFC300',
                confirmButtonText: 'حسنًا',
            })
                .then(result => {
                    sumbitBtn.disabled = false
                })
        } else {
            const payload = { fullName, address, email, whatsapp, selectedCourse: courseId }

            try {
                const response = await fetch('https://brtcodeapi.com/subscriptions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    const title = coursePublished ? "تمت العملية بنجاح!" : "تم حجز مقعدك!"
                    const text = coursePublished ? "لقد تم التسجيل في الدورة." : "جاري العمل على الدورة في الوقت الحالي وسيتم إطلاقها خلال الأيام القلية القادمة. سنقوم بإبلاغك فور توفر الدورة."
                    Swal.fire({
                        title: title,
                        text: text,
                        icon: 'success',
                        confirmButtonText: 'حسناً'
                    }).then(result => {
                        window.location.href = 'index.html';
                    });
                } else {
                    Swal.fire({
                        title: 'خطأ في الإرسال!',
                        icon: 'warning',
                        confirmButtonColor: '#FFC300',
                        confirmButtonText: 'حسنًا',
                    })
                }
            } catch (err) {
                Swal.fire({
                    title: 'حدث خطأ في الإرسال!',
                    icon: 'warning',
                    confirmButtonColor: '#FFC300',
                    confirmButtonText: 'حسنًا',
                })
            }
        }
    })
})