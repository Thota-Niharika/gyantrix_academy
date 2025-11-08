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

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".feature-card");
  const contents = document.querySelectorAll(".feature-content");

  function deactivateAll() {
    cards.forEach(c => c.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active", "mobile-active"));
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-content");
      const content = document.getElementById(id);
      const isMobile = window.innerWidth <= 768;

      deactivateAll();
      card.classList.add("active");

      if (isMobile) {
        // Move content below the clicked card
        content.classList.add("mobile-active");
        card.insertAdjacentElement("afterend", content);

        // ✅ Adjusted smooth scroll with offset (for fixed header)
        setTimeout(() => {
          const headerHeight =
            (document.querySelector(".navbar")?.offsetHeight || 0) +
            (document.querySelector(".top-bar")?.offsetHeight || 0) +
            20; // small padding

          const contentTop =
            content.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: contentTop,
            behavior: "smooth"
          });
        }, 200);
      } else {
        content.classList.add("active");
      }
    });
  });

  // Reset on resize (when returning to desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      contents.forEach(c => c.classList.remove("mobile-active"));
      document.querySelector(".feature-content.active")?.classList.add("active");
    }
  });
});


const topBar = document.getElementById("topBar");
const mainNav = document.getElementById("mainNav");

if (topBar && mainNav) {
  const topBarHeight = topBar.offsetHeight;
  let lastScrollTop = 0;
  let isTopHidden = false;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && !isTopHidden) {
      // scrolling down → hide top bar
      topBar.style.transform = `translateY(-${topBarHeight}px)`;
      isTopHidden = true;
    } else if (scrollTop < lastScrollTop && isTopHidden) {
      // scrolling up → show top bar
      topBar.style.transform = "translateY(0)";
      isTopHidden = false;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

 


// document.addEventListener("DOMContentLoaded", function() {
//   // --- 1. Set source for universal form from URL ---
//   const urlParams = new URLSearchParams(window.location.search);
//   const sourceParam = urlParams.get("source");
//   const universalForm = document.getElementById("universalForm");

//   if (sourceParam && universalForm) {
//     const hiddenSource = universalForm.querySelector('input[name="source"]');
//     hiddenSource.value = sourceParam;
//     console.log("Universal form source set to:", sourceParam);
//   }

//   // --- 2. Handle submissions for all forms ---
//   const forms = document.querySelectorAll(".lead-table");
//   forms.forEach(form => {
//     form.addEventListener("submit", async function(e) {
//       e.preventDefault();

//       const formData = new FormData(form);
//       const data = Object.fromEntries(formData.entries());

//       // Validate source
//       if (!data.source) {
//         alert("Please choose a source before submitting the form.");
//         return;
//       }

//       try {
//         const response = await fetch("http://192.168.0.166:8090/api/leads", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data)
//         });

//         if (response.ok) {
//           alert("Lead added successfully!");
//           form.reset();
//         } else {
//           const err = await response.text();
//           console.error("Error:", err);
//           alert("Failed to add lead.");
//         }
//       } catch (error) {
//         console.error("Request failed:", error);
//         alert("Server error!");
//       }
//     });
//   });
// });
document.addEventListener("DOMContentLoaded", function () {
  // --- 1️⃣ Handle optional "source" from URL for universal form ---
  const urlParams = new URLSearchParams(window.location.search);
  const sourceParam = urlParams.get("source");
  const universalForm = document.getElementById("universalForm");

  if (sourceParam && universalForm) {
    const hiddenSource = universalForm.querySelector('input[name="source"]');
    if (hiddenSource) hiddenSource.value = sourceParam;
    document.querySelector(".connectform-container").style.display = "block";
    console.log("✅ Universal form source set to:", sourceParam);
  }

  // --- 2️⃣ Attach submit handler to ALL lead forms ---
  const allForms = document.querySelectorAll(".lead-table");

  allForms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Convert form inputs into JSON object
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // --- 3️⃣ Validate essential fields ---
      if (!data.name || !data.email || !data.mobileNumber) {
        alert("⚠ Please fill all required fields before submitting!");
        return;
      }

      // Optional: Default value if 'source' field empty
      if (!data.source) {
        data.source = "unknown";
      }

      try {
        // --- 4️⃣ Send data to backend ---
        const response = await fetch("http://192.168.0.168:8090/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("✅ Lead saved successfully:", result);
          alert("✅ Your details were submitted successfully!");
          form.reset();
        } else {
          const errorText = await response.text();
          console.error("❌ Server error:", errorText);
          alert("❌ Failed to submit your details. Please try again later.");
        }
      } catch (error) {
        console.error("🚨 Network error:", error);
        alert("⚠ Unable to connect to the server. Please check your backend or network connection.");
      }
    });
  });
});





const section = document.querySelector(".career-services");
const slides = document.querySelectorAll(".image-slide");
const headings = document.querySelectorAll(".heading-item");

let currentSlide = 0;
let isScrolling = false;

// --- Intersection Observer to sync headings ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(slides).indexOf(entry.target);

        headings.forEach((h) => h.classList.remove("active-heading"));
        if (index >= 0) headings[index].classList.add("active-heading");

        currentSlide = index;
      }
    });
  },
  { threshold: 0.5 }
);
slides.forEach((slide) => observer.observe(slide));

// --- Heading click to scroll ---
headings.forEach((heading, index) => {
  heading.addEventListener("click", () => {
    currentSlide = index;
    slides[index].scrollIntoView({ behavior: "smooth", block: "center" });
    headings.forEach((h) => h.classList.remove("active-heading"));
    heading.classList.add("active-heading");
  });
});

// --- Scroll one full slide per wheel gesture ---
// --- Scroll one full slide per wheel gesture ---
section.addEventListener(
  "wheel",
  (e) => {
    const rect = section.getBoundingClientRect();

    // Only act if the section is visible on screen
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      e.preventDefault(); // Necessary to control scroll manually

      if (isScrolling) return;
      isScrolling = true;

      // Scroll down
      if (e.deltaY > 0 && currentSlide < slides.length - 1) {
        currentSlide++;
        slides[currentSlide].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      // Scroll up
      else if (e.deltaY < 0 && currentSlide > 0) {
        currentSlide--;
        slides[currentSlide].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      // Next section
      else if (e.deltaY > 0 && currentSlide === slides.length - 1) {
        section.nextElementSibling?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Previous section
      else if (e.deltaY < 0 && currentSlide === 0) {
        section.previousElementSibling?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setTimeout(() => (isScrolling = false), 800);
    }
  },
  { passive: false } // 👈 This fixes the Chrome warning
);



// section.addEventListener("wheel", (e) => {
//   const rect = section.getBoundingClientRect();

//   if (rect.top < window.innerHeight && rect.bottom > 0) {
//     e.preventDefault();

//     if (isScrolling) return;
//     isScrolling = true;

//     if (e.deltaY > 0 && currentSlide < slides.length - 1) {
//       currentSlide++;
//       slides[currentSlide].scrollIntoView({ behavior: "smooth", block: "center" });
//     } else if (e.deltaY < 0 && currentSlide > 0) {
//       currentSlide--;
//       slides[currentSlide].scrollIntoView({ behavior: "smooth", block: "center" });
//     } else if (e.deltaY > 0 && currentSlide === slides.length - 1) {
//       section.nextElementSibling?.scrollIntoView({ behavior: "smooth", block: "start" });
//     } else if (e.deltaY < 0 && currentSlide === 0) {
//       section.previousElementSibling?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }

//     setTimeout(() => (isScrolling = false), 800);
//   }
// });

