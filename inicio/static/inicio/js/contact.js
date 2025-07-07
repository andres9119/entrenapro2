document.addEventListener("DOMContentLoaded", function() {
  // Obtener el CSRF token
  const csrftoken = getCookie('csrftoken');

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Obtener los valores del formulario
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validar datos del formulario
      if (!name || !email || !subject || !message) {
        alert("Por favor, completa todos los campos");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, introduce un email válido");
        return;
      }

      // Crear FormData y enviarlo con fetch
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("message", message);

      fetch("/contacto/enviar/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "X-Requested-With": "XMLHttpRequest" // Para que Django lo reconozca como AJAX
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
 document.addEventListener("DOMContentLoaded", function() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const icon = item.querySelector('.accordion-icon');
    const content = item.querySelector('.accordion-content');

    // Inicializar acordeón cerrado
    content.style.display = 'none';

    header.addEventListener('click', function() {
      // Alternar la clase "active" para abrir/cerrar
      item.classList.toggle('active');

      // Alternar el icono de "+" a "-" al abrir/cerrar
      if (item.classList.contains('active')) {
        icon.innerHTML = '<i class="fas fa-minus"></i>';
        content.style.display = 'block';  // Mostrar el contenido
      } else {
        icon.innerHTML = '<i class="fas fa-plus"></i>';
        content.style.display = 'none';  // Ocultar el contenido
      }
    });
  });
});

  

  // Google Maps integration (placeholder)
  const mapPlaceholder = document.querySelector(".map-placeholder");
  if (mapPlaceholder) {
    mapPlaceholder.addEventListener("click", () => {
      alert("En una aplicación real, aquí se cargaría un mapa interactivo de Google Maps");
    });
  }
});

// Función para obtener el valor de una cookie
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
