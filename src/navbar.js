document.addEventListener('DOMContentLoaded', () => {

  // Toggle dropdowns
  document.querySelectorAll('.drop-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = button.parentElement;

      // Close other dropdowns
      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });

      // Toggle current dropdown
      dropdown.classList.toggle('open');
    });
  });

  // Close dropdowns if click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    }
  });

});


document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('.navbar nav');

  if (!hamburger || !nav) {
    console.warn("⚠️ Navbar or hamburger element not found in the DOM.");
    return; // Stop execution if not present
  }

  hamburger.addEventListener('click', () => {
    // Toggle the navigation menu visibility
    nav.classList.toggle('active');

    // Adjust layout to prevent content from being hidden
    const nextSection =
      document.querySelector('.journey-section') ||
      document.querySelector('main') ||
      document.querySelector('section');

    if (nextSection) {
      if (nav.classList.contains('active')) {
        nextSection.style.marginTop = `${nav.scrollHeight}px`;
      } else {
        nextSection.style.marginTop = '0';
      }
    }
  });
});


// const hamburger = document.getElementById('hamburger');
//   const nav = document.querySelector('.navbar nav');

//   hamburger.addEventListener('click', () => {
//     // Toggle nav visibility
//     nav.classList.toggle('active');

//     // Adjust page layout dynamically
//     const nextSection = document.querySelector('.journey-section') || document.querySelector('main');
//     if (nextSection) {
//       if (nav.classList.contains('active')) {
//         nextSection.style.marginTop = nav.scrollHeight + 'px';
//       } else {
//         nextSection.style.marginTop = '0';
//       }
//     }
//   });
