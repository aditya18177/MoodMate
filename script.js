document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle")
  const navLinks = document.getElementById("navLinks")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // Animate hamburger to X
      const spans = menuToggle.querySelectorAll("span")
      spans.forEach((span) => span.classList.toggle("active"))

      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })

    // Close mobile menu when clicking on a link
    const navItems = navLinks.querySelectorAll("a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active")

        const spans = menuToggle.querySelectorAll("span")
        spans.forEach((span) => span.classList.remove("active"))
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      })
    })
  }

  // Testimonial Slider
  const testimonialSlider = document.getElementById("testimonialSlider")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const dots = document.querySelectorAll(".dot")

  if (testimonialSlider && prevBtn && nextBtn) {
    let currentSlide = 0
    const testimonials = testimonialSlider.querySelectorAll(".testimonial")
    const totalSlides = testimonials.length

    // Initialize slider
    updateSlider()

    // Previous button click
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      updateSlider()
    })

    // Next button click
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides
      updateSlider()
    })

    // Dot click
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        updateSlider()
      })
    })

    // Update slider position and active dot
    function updateSlider() {
      // Hide all testimonials
      testimonials.forEach((testimonial) => {
        testimonial.style.display = "none"
      })

      // Show current testimonial
      testimonials[currentSlide].style.display = "block"

      // Update active dot
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add("active")
        } else {
          dot.classList.remove("active")
        }
      })
    }

    // Auto slide
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides
      updateSlider()
    }, 5000)
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })

  // Form validation
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      if (!name || !email || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // If validation passes, you would normally send the form data to a server
      // For this demo, we'll just show a success message
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()
    })
  }

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(
    ".feature-card, .step, .testimonial, .resource-category, .team-member",
  )

  function revealOnScroll() {
    const windowHeight = window.innerHeight

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial styles for animation
  revealElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Add scroll event listener
  window.addEventListener("scroll", revealOnScroll)

  // Trigger once on load
  revealOnScroll()
})

