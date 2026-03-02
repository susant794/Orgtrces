// initialize EmailJS (replace with your actual user ID)
emailjs.init('YOUR_USER_ID');

// utilities
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4500);
}

function handleNavbarScroll() {
  document.getElementById('navbar').style.background =
    window.scrollY > 50 ? 'rgba(6,12,26,.98)' : 'rgba(6,12,26,.88)';
}

async function submitForm(e) {
  e.preventDefault();
  const btn = document.querySelector('#trialForm button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Submitting...';

  const formData = {
    full_name: document.getElementById('f-name').value.trim(),
    email: document.getElementById('f-email').value.trim(),
    company: document.getElementById('f-company').value.trim(),
    employee_count: parseInt(document.getElementById('f-users').value, 10) || 0,
    role: document.getElementById('f-role').value,
    plan_interest: document.getElementById('f-plan').value,
    deploy_pref: document.getElementById('f-deploy').value
  };

  try {
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
    showToast();
    document.getElementById('trialForm').reset();
  } catch (err) {
    console.error('EmailJS error', err);
    showToast();
  } finally {
    btn.disabled = false;
    btn.textContent = '🚀 Get My Free 7-Day Trial';
  }
}

// attach listeners once DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('trialForm').addEventListener('submit', submitForm);
  window.addEventListener('scroll', handleNavbarScroll);
});