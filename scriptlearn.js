document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeIcon = document.getElementById("theme-icon")
  const body = document.body

  themeIcon.addEventListener("click", () => {
    body.classList.toggle("light-theme")

    if (body.classList.contains("light-theme")) {
      themeIcon.classList.remove("fa-moon")
      themeIcon.classList.add("fa-sun")
      localStorage.setItem("theme", "light")
    } else {
      themeIcon.classList.remove("fa-sun")
      themeIcon.classList.add("fa-moon")
      localStorage.setItem("theme", "dark")
    }
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    body.classList.add("light-theme")
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.getElementById("prev-testimonial")
  const nextBtn = document.getElementById("next-testimonial")
  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active")
    })

    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    testimonials[index].classList.add("active")
    dots[index].classList.add("active")
  }

  // Initialize first testimonial
  showTestimonial(currentTestimonial)

  // Previous button click
  prevBtn.addEventListener("click", () => {
    currentTestimonial--
    if (currentTestimonial < 0) {
      currentTestimonial = testimonials.length - 1
    }
    showTestimonial(currentTestimonial)
  })

  // Next button click
  nextBtn.addEventListener("click", () => {
    currentTestimonial++
    if (currentTestimonial >= testimonials.length) {
      currentTestimonial = 0
    }
    showTestimonial(currentTestimonial)
  })

  // Dot click
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentTestimonial = index
      showTestimonial(currentTestimonial)
    })
  })

  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonial++
    if (currentTestimonial >= testimonials.length) {
      currentTestimonial = 0
    }
    showTestimonial(currentTestimonial)
  }, 8000)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(".feature-card, .about-card, .cta-container")

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial styles for animation
  animateElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  })

  // Check elements on load
  checkScroll()

  // Check elements on scroll
  window.addEventListener("scroll", checkScroll)

  // Particle animation
  const particles = document.querySelectorAll(".particle")

  particles.forEach((particle) => {
    const randomX = Math.random() * 100
    const randomY = Math.random() * 100
    const randomDelay = Math.random() * 10
    const randomSize = Math.random() * 5 + 3

    particle.style.left = `${randomX}%`
    particle.style.top = `${randomY}%`
    particle.style.animationDelay = `${randomDelay}s`
    particle.style.width = `${randomSize}px`
    particle.style.height = `${randomSize}px`
  })

  // Feature hover effects
  const featureCards = document.querySelectorAll(".feature-card")

  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".feature-icon i")
      icon.style.transform = "scale(1.2) rotate(10deg)"
      icon.style.transition = "transform 0.3s ease"
    })

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".feature-icon i")
      icon.style.transform = "scale(1) rotate(0)"
    })
  })
})
