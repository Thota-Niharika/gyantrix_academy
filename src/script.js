// const filterButtons = document.querySelectorAll(".filter-btn");
// const courseCards = document.querySelectorAll(".course-card");

// filterButtons.forEach(button => {
//   button.addEventListener("click", () => {

//     // Remove active class from all buttons
//     filterButtons.forEach(btn => btn.classList.remove("active"));
//     button.classList.add("active");

//     const category = button.dataset.category;

//     courseCards.forEach(card => {
//       const cardCategories = card.dataset.category.split(" ");

//       if (category === "popular" || cardCategories.includes(category)) {
//         card.style.display = "block";
//         // Optional: smooth fade-in
//         card.style.opacity = "1";
//         card.style.transform = "scale(1)";
//       } else {
//         card.style.display = "none";
//       }
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const filterButtons = document.querySelectorAll(".filter-btn");
//   const courseCards = document.querySelectorAll(".course-card");

//   filterButtons.forEach(button => {
//     button.addEventListener("click", () => {
//       // Remove active class from all buttons
//       filterButtons.forEach(btn => btn.classList.remove("active"));
//       button.classList.add("active");

//       const category = button.dataset.category;

//       courseCards.forEach(card => {
//         // Split categories and trim spaces
//         const cardCategories = card.dataset.category.trim().split(/\s+/);

//         if (cardCategories.includes(category)) {
//           // Show card with smooth animation
//           card.style.display = "block";
//           setTimeout(() => {
//             card.style.opacity = "1";
//             card.style.transform = "scale(1)";
//           }, 10); // small timeout for transition to work
//         } else {
//           // Hide card with smooth animation
//           card.style.opacity = "0";
//           card.style.transform = "scale(0.95)";
//           setTimeout(() => {
//             card.style.display = "none";
//           }, 300); // match this with CSS transition duration
//         }
//       });
//     });
//   });
// });





document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  // ✅ Default category (you can change "popular" to anything)
  const defaultCategory = "popular";

  // ✅ Function to filter cards
  const filterCourses = (category) => {
    courseCards.forEach(card => {
      const cardCategories = card.dataset.category.trim().split(/\s+/);

      if (cardCategories.includes(category)) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  };

  // ✅ Highlight default button and filter on page load
  filterButtons.forEach(btn => {
    if (btn.dataset.category === defaultCategory) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  filterCourses(defaultCategory);

  // ✅ Add click event for buttons
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active from all
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;
      filterCourses(category);
    });
  });
});

const cards = document.querySelectorAll(".crd");

  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent outside click from firing immediately
      if (card.classList.contains("active")) {
        card.classList.remove("active"); // unzoom if same card clicked again
      } else {
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
      }
    });
  });

  // Click outside any card to reset zoom
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".crd")) {
      cards.forEach(c => c.classList.remove("active"));
    }
  });

  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        // Uncheck all others in both columns
        faqToggles.forEach(other => {
          if (other !== toggle) {
            other.checked = false;
          }
        });
      }
    });
  });



document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.feature-card');
  const contents = document.querySelectorAll('.feature-content');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active from all cards and contents
      cards.forEach(c => c.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active to clicked card
      card.classList.add('active');

      // Show corresponding content
      const contentId = card.dataset.content;
      const contentDiv = document.getElementById(contentId);
      if (contentDiv) {
        contentDiv.classList.add('active');
      } else {
        console.error("No content found for ID:", contentId);
      }
    });
  });
});


const dropBtns = document.querySelectorAll(".drop-btn");

dropBtns.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.stopPropagation();
    const dropdown = btn.parentElement;

    // Close other open dropdowns
    document.querySelectorAll(".dropdown").forEach(d => {
      if(d !== dropdown) {
        d.classList.remove("open");
      }
    });

    // Toggle current dropdown
    dropdown.classList.toggle("open");
  });
});

// Close dropdown if click outside
window.addEventListener("click", function() {
  document.querySelectorAll(".dropdown").forEach(drop => {
    drop.classList.remove("open");
  });
});

const form = document.getElementById("leadForm");
  const popup = document.getElementById("thankYouPopup");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 
    popup.style.display = "flex"; 
  });

  function closePopup() {
    popup.style.display = "none";
    form.reset();
  }