const buttons = document.querySelectorAll(".cert-btn");
    const certContent = document.getElementById("cert-content");

    const certificates = {
      gyantrix: {
        title: "Master Certification in Full-Stack Development",
        desc: "Receive the Full Stack Developer Certification validating your end-to-end web development capabilities. Earn progress badges in Frontend Engineering, Backend Development, and Cloud Deployment.",
        img: "https://images.besttemplates.com/3698/Custom-made-Certificate-Design-for-Completion-of-Course.jpg"
      },
      intern: {
        title: "Internship Certification in Cloud and AI",
        desc: "Gain real-world experience through an industry-recognized internship, validating your hands-on skills and expertise in cloud computing and artificial intelligence.",
        img: "https://course.learnbay.co/_next/image?url=https:%2F%2Fd32and0ii3b8oy.cloudfront.net%2Fweb%2Fs3_main%2FlearnbayMain%2Fibm-min.webp&w=3840&q=100"
      },
      module: {
        title: "Earn Module-Wise Certifications on Your Path to Mastery",
        desc: "Earn a recognized certificate after completing each module, showcasing your progress and skill mastery step by step throughout the program.",
        img: "https://udyogsuvidhakendra.in/dist/img/nsdc/certificate.webp"
      }
    };

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelector(".cert-btn.active").classList.remove("active");
        btn.classList.add("active");
        const data = certificates[btn.dataset.cert];

        certContent.innerHTML = `
          <div class="cert-text">
            <h3>${data.title}</h3>
            <p>${data.desc}</p>
            <a href="#" class="cert-btn-cta">Inquire Now →</a>
          </div>
          <div class="cert-image">
            <img src="${data.img}" alt="Certificate">
          </div>
        `;
      });
    });

    const modules = document.querySelectorAll('.module');

  modules.forEach(module => {
    module.querySelector('.module-header').addEventListener('click', () => {
      module.classList.toggle('active');
    });
  });

//   const faqs = document.querySelectorAll(".faq-item");
// faqs.forEach(faq => {
//   faq.querySelector(".faq-question").addEventListener("click", () => {
//     faq.classList.toggle("active");
//   });
// });

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');

  question.addEventListener('click', () => {
    // Close all other items
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });

    // Toggle current item
    item.classList.toggle('active');
  });
});