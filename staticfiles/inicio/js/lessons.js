document.addEventListener("DOMContentLoaded", () => {
  let currentWeekIndex = weeks.findIndex(w => w.texto === document.getElementById("current-week").textContent.trim());
  const bookingModal = document.getElementById("booking-modal");
  const bookBtns = document.querySelectorAll(".book-btn, .reservar-btn");
  const closeModalBtn = document.querySelector(".close-modal");
  const cancelBtn = document.querySelector(".cancel-btn");
  const bookingForm = document.getElementById("booking-form");

  const weeks = [
  { texto: "6 - 12 Mayo, 2025", inicio: new Date("2025-05-06") },
  { texto: "13 - 19 Mayo, 2025", inicio: new Date("2025-05-13") },
  { texto: "20 - 26 Mayo, 2025", inicio: new Date("2025-05-20") },
  { texto: "27 Mayo - 2 Junio, 2025", inicio: new Date("2025-05-27") }
];

  // Utilidad: obtener CSRF desde las cookies
  function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

bookBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!userIsAuthenticated) {
      alert("Debes iniciar sesión para hacer una reserva.");
      window.location.href = "/login/";
      return;
    }

    const classCell = this.closest(".class-cell");
    const className = classCell.querySelector("h4").textContent.trim();
    const instructor = classCell.querySelector("p").textContent.trim();
    const time = this.closest("tr").querySelector(".time-column").textContent.trim();
    const dayIndex = this.closest("td").cellIndex;
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const day = days[dayIndex - 1] || "Lunes";

    const currentWeek = weeks[currentWeekIndex];
    const fechaInicio = new Date(currentWeek.inicio);

    const diaSemana = dayIndex - 1;
    fechaInicio.setDate(fechaInicio.getDate() + diaSemana);

    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const diaNombre = dias[fechaInicio.getDay()];
    const fechaCompleta = `${diaNombre}, ${fechaInicio.getDate()} ${meses[fechaInicio.getMonth()]}, ${fechaInicio.getFullYear()}`;

    document.getElementById("booking-class").textContent = className;
    document.getElementById("booking-instructor").textContent = instructor;
    document.getElementById("booking-date").textContent = fechaCompleta;
    document.getElementById("booking-time").textContent = time;

    document.getElementById("booking-class-hidden").value = className;
    document.getElementById("booking-instructor-hidden").value = instructor;
    document.getElementById("booking-date-hidden").value = fechaCompleta;
    document.getElementById("booking-time-hidden").value = time;

    bookingModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

  // Cerrar modal
  function closeModalFunc() {
    bookingModal.style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("booking-name").focus();
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModalFunc);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModalFunc);

  window.addEventListener("click", (event) => {
    if (event.target === bookingModal) closeModalFunc();
  });

  // Enviar reserva al backend
  if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const csrfToken = getCookie("csrftoken");

    const data = {
      nombre: document.getElementById("booking-class-hidden").value,
      nombre_usuario: document.getElementById("booking-name").value,
      email: document.getElementById("booking-email").value,
      telefono: document.getElementById("booking-phone").value,
      notas: document.getElementById("booking-notes").value,
      fecha: document.getElementById("booking-date-hidden").value, // formato: "2025-06-10"
      hora: document.getElementById("booking-time-hidden").value   // formato: "18:00"
    };

    try {
      const response = await fetch("/reservar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.mensaje || "Reserva exitosa.");
        closeModalFunc();
        bookingForm.reset();
      } else {
        const error = await response.json();
        alert(error.error || "Error al hacer la reserva.");
      }
    } catch (err) {
      console.error("Error al enviar la reserva:", err);
      alert("Ocurrió un error en la solicitud.");
    }
  });
  }
});
