document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  let basePath = "";
  let imagePrefix = "";

  // detect depth for header/footer loading
  if (path.includes("/courses/")) {
    basePath = "../headerfooter/";
    imagePrefix = "../../public/";
  } else {
    basePath = "./headerfooter/";
    imagePrefix = "../public/";
  }

  fetch(basePath + "header.html")
  .then((res) => res.text())
  .then((data) => {
    const header = document.getElementById("header");
    header.innerHTML = data;

    fixHeaderPaths(path);
    initHeaderScroll();

    // ✅ Wait for header to fully render before initializing navbar
    setTimeout(() => {
      initNavbarInteractions();
    }, 100);
  })
  .catch((err) => console.error("Header load error:", err));


  // Load Footer
  fetch(basePath + "footer.html")
    .then((res) => res.text())
    .then((data) => {
      const footer = document.getElementById("footer");
      footer.innerHTML = data;
      fixFooterPaths(path);
    })
    .catch((err) => console.error("Footer load error:", err));
});

// --- Fix relative links automatically ---
function fixHeaderPaths(path) {
  const header = document.querySelector(".site-header");
  if (!header) return;

  header.querySelectorAll("a[href$='.html']").forEach((a) => {
    const href = a.getAttribute("href");
    if (href.startsWith("http")) return;

    // if we are inside /src/courses/ or another subfolder
    if (path.includes("/courses/") || path.split("/").length > 3) {
      a.setAttribute("href", "../" + href.replace("../", ""));
    } else {
      a.setAttribute("href", "./" + href.replace("../", ""));
    }
  });

  // Fix logo image
  header.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && !src.startsWith("http")) {
      if (path.includes("/courses/")) img.src = "../" + src;
      else img.src = src;
    }
  });
}

function fixFooterPaths(path) {
  const footer = document.querySelector("footer");
  if (!footer) return;

  footer.querySelectorAll("a[href$='.html']").forEach((a) => {
    const href = a.getAttribute("href");
    if (href.startsWith("http")) return;

    if (path.includes("/courses/") || path.split("/").length > 3) {
      a.setAttribute("href", "../" + href.replace("../", ""));
    } else {
      a.setAttribute("href", "./" + href.replace("../", ""));
    }
  });
}

// --- Navbar dropdown & hamburger logic ---
function initNavbarInteractions() {
  document.querySelectorAll(".drop-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = btn.parentElement;
      const isOpen = dropdown.classList.contains("open");

      document.querySelectorAll(".dropdown").forEach((d) =>
        d.classList.remove("open")
      );

      if (!isOpen) dropdown.classList.add("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown").forEach((d) =>
        d.classList.remove("open")
      );
    }
  });

  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".navbar nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
}


function initHeaderScroll() {
  const topBar = document.getElementById("topBar");
  const mainNav = document.getElementById("mainNav");
  let lastScroll = 0;

  function updateNavPosition() {
    const topBarHeight = topBar ? topBar.offsetHeight : 0;
    if (mainNav) mainNav.style.top = `${topBarHeight}px`;
  }

  // Run once on load
  updateNavPosition();

  // Update on resize
  window.addEventListener("resize", updateNavPosition);

  // Scroll behavior
  window.addEventListener("scroll", () => {
    const current = window.pageYOffset || document.documentElement.scrollTop;
    const topBarHeight = topBar ? topBar.offsetHeight : 0;

    if (current > lastScroll && current > 100) {
      // Scrolling down → hide top bar, move navbar to top
      if (topBar) topBar.style.top = `-${topBarHeight}px`;
      if (mainNav) mainNav.style.top = "0";
    } else {
      // Scrolling up → restore both
      if (topBar) topBar.style.top = "0";
      if (mainNav) mainNav.style.top = `${topBarHeight}px`;
    }

    lastScroll = current <= 0 ? 0 : current;
  });
}
