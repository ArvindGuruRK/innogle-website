// Modern mobile menu toggle with animation
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    const button = this;

    menu.classList.toggle("hidden");

    if (!menu.classList.contains("hidden")) {
      // Animate menu in
      menu.style.opacity = "0";
      menu.style.transform = "translateY(-20px)";
      setTimeout(() => {
        menu.style.transition = "all 0.3s ease-out";
        menu.style.opacity = "1";
        menu.style.transform = "translateY(0)";
      }, 10);

      // Animate hamburger to X
      const spans = button.querySelectorAll("span");
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      // Animate menu out
      menu.style.transition = "all 0.3s ease-in";
      menu.style.opacity = "0";
      menu.style.transform = "translateY(-20px)";

      // Reset hamburger
      const spans = button.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

// Modern navbar scroll effect with transparent to gradient transition
let lastScrollY = window.scrollY;
window.addEventListener("scroll", function () {
  const nav = document.getElementById("mainNav");
  const navBackground = document.getElementById("navBackground");
  const currentScrollY = window.scrollY;

  // Calculate scroll progress (0 to 1)
  const scrollProgress = Math.min(currentScrollY / 100, 1);

  if (currentScrollY > 50) {
    // Apply gradient background with scroll-based opacity
    navBackground.style.background = `linear-gradient(to right, 
    rgba(10, 25, 47, ${0.8 + scrollProgress * 0.2}) 0%,   /* dark blue */
    rgba(0, 128, 128, ${0.8 + scrollProgress * 0.2}) 100% /* teal */
  )`;
    navBackground.style.backdropFilter = "blur(20px)";
    navBackground.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)";
    navBackground.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
  } else {
    // Transparent background on hero section
    navBackground.style.background =
      "linear-gradient(to right, rgba(10, 25, 47, 0) 0%, rgba(0, 128, 128, 0) 100%)";
    navBackground.style.backdropFilter = "blur(0px)";
    navBackground.style.borderBottom = "1px solid transparent";
    navBackground.style.boxShadow = "none";
  }

  lastScrollY = currentScrollY;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Highlight active nav link on scroll
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("text-teal-300");
      if (item.getAttribute("href").includes(current)) {
        item.classList.add("text-teal-300");
        item.querySelector("span").classList.add("w-full");
      }
    });
  });
});

// Initialize AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.remove("opacity-0", "invisible");
    scrollToTopBtn.classList.add("opacity-100", "visible");
  } else {
    scrollToTopBtn.classList.add("opacity-0", "invisible");
    scrollToTopBtn.classList.remove("opacity-100", "visible");
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Enhanced Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  const speed = 100;
  const animationDuration = 2000;

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const start = 0;
    const increment = target / (animationDuration / speed);
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.innerText = Math.ceil(current);
        setTimeout(updateCounter, speed);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counter);
  });
}

document.addEventListener("DOMContentLoaded", animateCounters);

// Feather icons
feather.replace();

// Awards Slider Functionality
let currentAwardSlide = 0;
const totalAwardSlides = 10;
const awardsSlider = document.getElementById("awardsSlider");
const prevAwardBtn = document.getElementById("prevAward");
const nextAwardBtn = document.getElementById("nextAward");
const awardDotsContainer = document.getElementById("awardDots");

// Generate dots
for (let i = 0; i < totalAwardSlides; i++) {
  const dot = document.createElement("button");
  dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
    i === 0 ? "bg-cyan-500" : "bg-gray-400"
  }`;
  dot.addEventListener("click", () => goToAwardSlide(i));
  awardDotsContainer.appendChild(dot);
}

function updateAwardSlider() {
  const translateX = -currentAwardSlide * 100;
  awardsSlider.style.transform = `translateX(${translateX}%)`;

  // Update dots
  const dots = awardDotsContainer.querySelectorAll("button");
  dots.forEach((dot, index) => {
    dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
      index === currentAwardSlide ? "bg-cyan-500" : "bg-gray-400"
    }`;
  });
}

function goToAwardSlide(slideIndex) {
  currentAwardSlide = slideIndex;
  updateAwardSlider();
}

function nextAwardSlide() {
  currentAwardSlide = (currentAwardSlide + 1) % totalAwardSlides;
  updateAwardSlider();
}

function prevAwardSlide() {
  currentAwardSlide =
    (currentAwardSlide - 1 + totalAwardSlides) % totalAwardSlides;
  updateAwardSlider();
}

// Event listeners
nextAwardBtn.addEventListener("click", nextAwardSlide);
prevAwardBtn.addEventListener("click", prevAwardSlide);

// Auto-play slider
setInterval(nextAwardSlide, 5000);

// Pause on hover
const awardsSliderContainer = document.querySelector(
  ".awards-slider-container"
);
awardsSliderContainer.addEventListener("mouseenter", () => {
  clearInterval(awardsSliderContainer.autoPlay);
});

awardsSliderContainer.addEventListener("mouseleave", () => {
  awardsSliderContainer.autoPlay = setInterval(nextAwardSlide, 5000);
});

// Pause partner slider animation on hover for better UX
const slider = document.querySelector(".partner-slider");
if (slider) {
  slider.addEventListener("mouseenter", () => {
    slider.style.animationPlayState = "paused";
  });
  slider.addEventListener("mouseleave", () => {
    slider.style.animationPlayState = "running";
  });
}
