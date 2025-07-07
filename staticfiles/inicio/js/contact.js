function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validate form data
      if (!name || !email || !subject || !message) {
        alert("Por favor, completa todos los campos");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, introduce un email válido");
        return;
      }

      // Create FormData and send it with fetch
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("message", message);

      fetch("/contacto/enviar/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "X-Requested-With": "XMLHttpRequest"  // Para que Django lo reconozca como AJAX
        },
        body: formData
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Respuesta del servidor no fue exitosa.");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        if (data.success) {
          contactForm.reset();
        }
      })
      .catch((error) => {
        alert("Error al enviar el mensaje. Intenta nuevamente.");
        console.error("Error:", error);
      });
    });
  }

  // FAQ accordion functionality
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const header = item.querySelector(".accordion-header");
      header.addEventListener("click", function () {
        item.classList.toggle("active");
        const icon = this.querySelector(".accordion-icon i");
        if (item.classList.contains("active")) {
          icon.classList.remove("fa-plus");
          icon.classList.add("fa-minus");
        } else {
          icon.classList.remove("fa-minus");
          icon.classList.add("fa-plus");
        }
      });
    });
  }

  // Google Maps integration (placeholder)
  const mapPlaceholder = document.querySelector(".map-placeholder");
  if (mapPlaceholder) {
    mapPlaceholder.addEventListener("click", () => {
      alert("En una aplicación real, aquí se cargaría un mapa interactivo de Google Maps");
    });
  }
});
