document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle")
  const mainNav = document.getElementById("main-nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const navList = mainNav.querySelector("ul")
      navList.classList.toggle("active")

      // Toggle hamburger menu animation
      const bars = menuToggle.querySelectorAll(".bar")
      bars[0].classList.toggle("rotate-45")
      bars[0].classList.toggle("translate-y-2")
      bars[1].classList.toggle("opacity-0")
      bars[2].classList.toggle("-rotate-45")
      bars[2].classList.toggle("-translate-y-2")
    })
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
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Auth tabs (if on login page)
  const authTabs = document.querySelectorAll(".auth-tab")
  if (authTabs.length > 0) {
    authTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        authTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Hide all forms
        document.querySelectorAll(".auth-form").forEach((form) => {
          form.classList.remove("active")
        })

        // Show the selected form
        const formId = this.getAttribute("data-tab") + "-form"
        document.getElementById(formId).classList.add("active")
      })
    })

    // Ocultar automáticamente los mensajes flash después de 5 segundos
  const flashMessages = document.getElementById("messages");
  if (flashMessages) {
    setTimeout(() => {
      flashMessages.style.transition = "opacity 0.5s ease-out";
      flashMessages.style.opacity = 0;

      setTimeout(() => {
        flashMessages.remove();
      }, 500);
    }, 5000);
  }
  }

  // FAQ accordion (if on contact page)
  const accordionItems = document.querySelectorAll(".accordion-item")
  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header")
      header.addEventListener("click", function () {
        // Toggle active class
        item.classList.toggle("active")

        // Toggle icon
        const icon = this.querySelector(".accordion-icon i")
        if (item.classList.contains("active")) {
          icon.classList.remove("fa-plus")
          icon.classList.add("fa-minus")
        } else {
          icon.classList.remove("fa-minus")
          icon.classList.add("fa-plus")
        }
      })
    })
  }
})
