      // Mobile Navigation
      const hamburger = document.querySelector(".hamburger");
      const navLinks = document.querySelector(".nav-links");
      const navItems = document.querySelectorAll(".nav-links li");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
      });

      navItems.forEach((item) => {
        item.addEventListener("click", () => {
          navLinks.classList.remove("active");
          hamburger.classList.remove("active");
        });
      });

      // Sticky Header
      const header = document.getElementById("header");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });

      // Back to Top Button
      const backToTop = document.querySelector(".back-to-top");
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          backToTop.classList.add("active");
        } else {
          backToTop.classList.remove("active");
        }
      });

      // Portfolio Filter
      const filterBtns = document.querySelectorAll(".filter-btn");
      const portfolioItems = document.querySelectorAll(".portfolio-item");

      filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all buttons
          filterBtns.forEach((btn) => btn.classList.remove("active"));
          // Add active class to clicked button
          btn.classList.add("active");

          const filter = btn.getAttribute("data-filter");

          portfolioItems.forEach((item) => {
            if (
              filter === "all" ||
              item.getAttribute("data-category") === filter
            ) {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        });
      });

      // Testimonial Slider
      const testimonialItems = document.querySelectorAll(".testimonial-item");
      const sliderDots = document.querySelectorAll(".slider-dot");
      let currentSlide = 0;

      function showSlide(index) {
        testimonialItems.forEach((item) => item.classList.remove("active"));
        sliderDots.forEach((dot) => dot.classList.remove("active"));

        testimonialItems[index].classList.add("active");
        sliderDots[index].classList.add("active");
        currentSlide = index;
      }

      sliderDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);
        });
      });

      // Auto slide change
      setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        showSlide(currentSlide);
      }, 5000);

      // Form Submission
      const form = document.getElementById("form");
      const formStatus = document.getElementById("form-status");

      form.addEventListener("submit", function (e) {
        // Optional: Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Optional: You can add form validation here

        // The form will submit to FormSubmit.co automatically
        // You can add a success message if you want
        formStatus.textContent = "Sending your message...";
        formStatus.style.color = "var(--primary-color)";
        setTimeout(() => {
          formStatus.textContent = "Message sent successfully!";
          formStatus.style.color = "green";
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Send Message";
        }, 2000);
      });

      // Optional: Add input validation styling
      const inputs = document.querySelectorAll(".form-control");
      inputs.forEach((input) => {
        input.addEventListener("invalid", () => {
          input.classList.add("error");
        });
        input.addEventListener("input", () => {
          if (input.validity.valid) {
            input.classList.remove("error");
          }
        });
      });

      // Animate skills on scroll
      const skillProgresses = document.querySelectorAll(".skill-progress");

      function animateSkills() {
        skillProgresses.forEach((progress) => {
          const width = progress.style.width;
          progress.style.width = "0";
          setTimeout(() => {
            progress.style.width = width;
          }, 100);
        });
      }

      // Intersection Observer for scroll animations
      const observerOptions = {
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "about") {
              animateSkills();
            }
            entry.target.classList.add("animated");
          }
        });
      }, observerOptions);

      document.querySelectorAll("section").forEach((section) => {
        observer.observe(section);
      });

      // Dark Mode Toggle
      const darkModeToggle = document.querySelector(".dark-mode-toggle");
      const body = document.body;

      // Check for saved user preference
      if (localStorage.getItem("darkMode") === "enabled") {
        enableDarkMode();
      }

      // Toggle dark mode
      darkModeToggle.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
          disableDarkMode();
        } else {
          enableDarkMode();
        }
      });

      function enableDarkMode() {
        body.classList.add("dark-mode");
        darkModeToggle.innerHTML =
          '<i class="fas fa-sun"></i><span>Light Mode</span>';
        localStorage.setItem("darkMode", "enabled");
      }

      function disableDarkMode() {
        body.classList.remove("dark-mode");
        darkModeToggle.innerHTML =
          '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        localStorage.setItem("darkMode", "disabled");
      }
