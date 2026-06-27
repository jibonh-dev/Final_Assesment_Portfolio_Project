/* ===== LIVE DATE & TIME IN FOOTER ===== */
function updateDateTime() {
  const el = document.getElementById('live-datetime');
  if (!el) return;
  const now = new Date();
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit' };
  el.textContent = now.toLocaleString('en-US', options);
}
updateDateTime();
setInterval(updateDateTime, 1000);

/* ===== CONTACT FORM VALIDATION ===== */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const fields = ['name', 'email', 'phone', 'address', 'message'];
    fields.forEach(function (id) {
      const input = document.getElementById(id);
      if (!input) return;
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        valid = false;
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });

    // Email format check
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        valid = false;
      } else {
        document.getElementById('emailError').textContent = 'Email is required.';
      }
    }

    // Phone format check
    const phoneInput = document.getElementById('phone');
    if (phoneInput && phoneInput.value.trim()) {
      const phonePattern = /^[0-9+\-\s]{7,15}$/;
      if (!phonePattern.test(phoneInput.value.trim())) {
        phoneInput.classList.remove('is-valid');
        phoneInput.classList.add('is-invalid');
        valid = false;
      }
    }

    if (valid) {
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) successMsg.classList.remove('d-none');
      form.reset();
      form.querySelectorAll('.is-valid').forEach(function (el) {
        el.classList.remove('is-valid');
      });
    }
  });

  // Remove invalid state on input
  form.querySelectorAll('input, textarea').forEach(function (input) {
    input.addEventListener('input', function () {
      if (this.value.trim()) {
        this.classList.remove('is-invalid');
      }
    });
  });
})();
