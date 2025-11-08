function renderCourseReviews(courseName, reviews) {
  document.querySelector("h2").textContent = `${courseName} – Student Reviews`;
  const container = document.getElementById("reviews-container");
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  let visibleCount = 3;

  function renderReviews() {
    container.innerHTML = "";
    reviews.slice(0, visibleCount).forEach(r => {
      const div = document.createElement("div");
      div.classList.add("review-item");
      div.innerHTML = `
        <div class="review-avatar">${r.name.split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase()}</div>
        <div class="review-content">
          <h4>${r.name}</h4>
          <div class="stars">${r.stars}</div>
          <p>${r.text}</p>
        </div>`;
      container.appendChild(div);
    });
    if (visibleCount >= reviews.length) viewMoreBtn.style.display = "none";
  }

  viewMoreBtn.addEventListener("click", () => {
    visibleCount += 6;
    renderReviews();
  });

  document.getElementById("postBtn").addEventListener("click", function() {
    // Replace with your real lead form link
    window.open("https://your-lead-form-link.com", "_blank");
  });

  renderReviews();
}
