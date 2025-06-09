const checkboxes = document.querySelectorAll('.courses-form input[type="checkbox"]');
const subscribeSection = document.querySelector('.subscribe');

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

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

  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

function updateButtonVisibility() {
  console.log('updateButtonVisibility')
  const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
  subscribeSection.style.display = anyChecked ? 'block' : 'none';
}

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateButtonVisibility);
});


document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.testimonial-card');

  cards.forEach(card => {
    const delay = card.getAttribute('data-delay') || '0s';
    card.style.animationDelay = delay;
  });
});

// Fetching courses from API
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://bright-code-backend.onrender.com/courses')
    .then(res => res.json())
    .then(courses => {
      const grid = document.querySelector('.courses-grid');
      grid.innerHTML = '';

      courses.forEach(course => {
        const label = document.createElement('label');
        label.classList.add('course-card');

        label.innerHTML = `
            <input type="checkbox" name="courses[]" value="${course._id}">
            <div class="icon">${course.icon || '🎓'}</div>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
          `;
        grid.appendChild(label);
      });

      // To control the visibilty of 'subscribe' section
      const subscribeSection = document.querySelector('.subscribe');
      grid.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const anyChecked = grid.querySelectorAll('input[type="checkbox"]:checked').length > 0;
          subscribeSection.style.display = anyChecked ? 'block' : 'none';

          if (checkbox.checked) {
            subscribeSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    })
    .catch(err => console.error('Error fetching courses:', err));
});

// Submitting a subscription
document.addEventListener('DOMContentLoaded', () => {
  const subscriptionForm = document.querySelector('.subscribe-form');

  subscriptionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;

    const checkedBoxes = document.querySelectorAll('.courses-form input[type="checkbox"]:checked');
    const selectedCourses = Array.from(checkedBoxes).map(cb => cb.value);

    if (!selectedCourses.length) {
      alert('يرجى اختيار دورة واحدة على الأقل!');
      return;
    }

    const payload = { fullName, address, email, whatsapp, selectedCourses };
    console.log('payload:', payload)

    try {
      const response = await fetch('https://bright-code-backend.onrender.com/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        alert('تم استلام طلب الاشتراك بنجاح!\nانتظر رسالتنا على واتس أب.');
        subscriptionForm.reset();
      } else {
        alert('خطأ في الإرسال: ' + data.error);
      }
    } catch (err) {
      console.log('Subscription error:', err);
      alert('حدث خطأ في الإرسال.');
    }
  });
});

// Submitting a contact message
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contact .contact-form form');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const whatsapp = document.getElementById('contactWhatsApp').value;
    const message = document.getElementById('contactMessage').value;

    const payload = { fullName, email, whatsapp, message };

    try {
      const response = await fetch('https://bright-code-backend.onrender.com/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        alert('تم استلام رسالتك، شكرًا لتواصلك معنا!\nانتظر رسالتنا على واتس أب.');
        contactForm.reset();
      } else {
        alert('خطأ في الإرسال: ' + data.error);
      }
    } catch (err) {
      console.error('Contact error:', err);
      alert('حدث خطأ في الإرسال.');
    }
  });
});