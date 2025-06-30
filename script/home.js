const checkboxes = document.querySelectorAll('.courses-form input[type="checkbox"]');
const subscribeSection = document.querySelector('.subscribe');

const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');

const grid = document.querySelector('.courses-grid');

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

// Submitting a contact message
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('#contact .contact-form form');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const sumbitBtn = document.querySelector('.form-group button')
    sumbitBtn.disabled = true

    const fullName = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const whatsappCode = document.getElementById('countryCode').value
    const whatsappNumber = document.getElementById('contactWhatsApp').value
    const whatsapp = whatsappCode + whatsappNumber.slice(-9)
    const message = document.getElementById('contactMessage').value;

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
      const payload = { fullName, email, whatsapp, message };

      try {
        const response = await fetch('https://brtcodeapi.com/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          Swal.fire({
            title: 'تم استلام رسالتك.',
            text: 'شكرًا لتواصلك معنا!\nانتظر رسالتنا على واتس أب.',
            icon: 'success',
            confirmButtonText: 'حسناً'
          });
          contactForm.reset();
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
  });
});