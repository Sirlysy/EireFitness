/* 
  Eire Fitness - JavaScript 
  This code is used to provide small interactive features for grading:
  - Mobile navigation toggle
  - Class table filtering
  - Client-side form validation for Join and Contact pages
*/

/* 1) Mobile navigation  — Shared (all)
   This part makes the top menu open and close on mobile when you tap the hamburger button. */

/*  2) Classes page filter  — Kateryna
   This part filters the class schedule table by category (HIIT, Yoga, etc.). */

/* 3) Form validation helpers  — Shared (all)
   This part contains helper functions that check if form fields are filled in correctly. */

/* 4) Join form  — Dawid
   This part checks the Join Now form for name, email, phone, and selected plan before allowing submit. */

/* 5) Contact form  — Xabier
   This part checks that the Contact form fields (name, email, message) are correctly filled before submit. */


document.addEventListener('DOMContentLoaded', () => {
  /*  1) Mobile navigation 
     This code is used to open/close the mobile menu by toggling a class. */
  const btn = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('is-open'));
    // This code is used to close the menu after clicking a link
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('is-open')));
  }

  /* 2) Classes page filter 
     This code is used to filter table rows by category using data attributes. */
  const filterBar = document.querySelector('[data-filter-bar]');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      if (e.target.matches('button[data-filter]')) {
        const filter = e.target.getAttribute('data-filter');
        // This code is used to update button states
        filterBar.querySelectorAll('button').forEach(b => b.classList.remove('btn--active'));
        e.target.classList.add('btn--active');
        // This code is used to show/hide rows
        document.querySelectorAll('[data-class-row]').forEach(row => {
          const cat = row.getAttribute('data-class-row');
          row.classList.toggle('hidden', !(filter === 'all' || filter === cat));
        });
      }
    });
    // This code is used to set default button on page load
    const allBtn = filterBar.querySelector('button[data-filter="all"]');
    if (allBtn) allBtn.click();
  }

  /*  3) Form validation helpers 
     This code is used to provide simple reusable validators. */
  function showError(input, span) {
    input.classList.add('input--invalid');
    if (span) span.classList.add('is-visible');
  }
  function clearErrors(form) {
    form.querySelectorAll('.input--invalid').forEach(el => el.classList.remove('input--invalid'));
    form.querySelectorAll('.error.is-visible').forEach(el => el.classList.remove('is-visible'));
  }
  function required(input) {
    return input.value.trim().length > 0;
  }
  function email(input) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
  }
  function pattern(input, regex) {
    return regex.test(input.value);
  }
  function radioChecked(nodeList) {
    return Array.from(nodeList).some(r => r.checked);
  }

  /*  4) Join form 
     This code is used to validate the join form before submission. */
  const join = document.querySelector('#join-form');
  if (join) {
    join.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors(join);
      let ok = true;

      const fullName = join.querySelector('#fullName');
      const emailInput = join.querySelector('#email');
      const phone = join.querySelector('#phone');
      const radios = join.querySelectorAll('input[name="membershipType"]');
      const terms = join.querySelector('#terms');

      if (!required(fullName)) { showError(fullName, fullName.nextElementSibling); ok = false; }
      if (!email(emailInput)) { showError(emailInput, emailInput.nextElementSibling); ok = false; }
      if (!pattern(phone, /^\d{9}$/)) { showError(phone, phone.nextElementSibling); ok = false; }

      const membershipError = join.querySelector('#membership-error');
      if (!radioChecked(radios)) { if (membershipError) membershipError.classList.add('is-visible'); ok = false; }

      // Checkbox error span is after label
      if (!terms.checked) {
        terms.classList.add('input--invalid');
        const chkSpan = terms.closest('.form-check').querySelector('.error');
        if (chkSpan) chkSpan.classList.add('is-visible');
        ok = false;
      }

      if (ok) {
        alert('Thank you for joining Eire Fitness!');
        join.reset();
        clearErrors(join);
      }
    });
  }

  /* 5) Contact form 
     This code is used to validate the contact form before submission. */
  const contact = document.querySelector('#contact-form');
  if (contact) {
    contact.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors(contact);
      let ok = true;

      const name = contact.querySelector('#contactName');
      const emailInput = contact.querySelector('#contactEmail');
      const message = contact.querySelector('#contactMessage');

      if (!required(name)) { showError(name, name.nextElementSibling); ok = false; }
      if (!email(emailInput)) { showError(emailInput, emailInput.nextElementSibling); ok = false; }
      if (!required(message)) { showError(message, message.nextElementSibling); ok = false; }

      if (ok) {
        alert('Thank you for your message!');
        contact.reset();
        clearErrors(contact);
      }
    });
  }
});
