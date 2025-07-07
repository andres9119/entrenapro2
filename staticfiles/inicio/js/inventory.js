document.addEventListener("DOMContentLoaded", () => {
  // Modal functionality
  const modal = document.getElementById("item-modal")
  const addItemBtn = document.getElementById("add-item-btn")
  const closeModal = document.querySelector(".close-modal")
  const cancelBtn = document.querySelector(".cancel-btn")
  const itemForm = document.getElementById("item-form")

  // Open modal when Add Item button is clicked
  if (addItemBtn) {
    addItemBtn.addEventListener("click", () => {
      modal.style.display = "block"
      document.body.style.overflow = "hidden" // Prevent scrolling

      // Reset form
      itemForm.reset()
      document.querySelector(".modal-header h2").textContent = "Añadir Equipo"
    })
  }

  // Close modal functions
  function closeModalFunc() {
    modal.style.display = "none"
    document.body.style.overflow = "auto" // Enable scrolling
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunc)
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModalFunc)
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModalFunc()
    }
  })

  // Edit button functionality
  const editBtns = document.querySelectorAll(".edit-btn")
  editBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      modal.style.display = "block"
      document.body.style.overflow = "hidden"

      // Change modal title
      document.querySelector(".modal-header h2").textContent = "Editar Equipo"

      // Get the row data
      const row = this.closest("tr")
      const id = row.cells[0].textContent
      const name = row.cells[1].textContent
      const category = row.cells[2].textContent
      const location = row.cells[3].textContent
      const status = row.cells[4].querySelector(".status").textContent
      const lastCheck = row.cells[5].textContent

      // Fill the form with the data
      document.getElementById("item-name").value = name

      // Set category
      const categorySelect = document.getElementById("item-category")
      for (let i = 0; i < categorySelect.options.length; i++) {
        if (categorySelect.options[i].text === category) {
          categorySelect.selectedIndex = i
          break
        }
      }

      document.getElementById("item-location").value = location

      // Set status
      const statusSelect = document.getElementById("item-status")
      for (let i = 0; i < statusSelect.options.length; i++) {
        if (statusSelect.options[i].text === status) {
          statusSelect.selectedIndex = i
          break
        }
      }

      // Convert date format if needed
      const dateParts = lastCheck.split("/")
      if (dateParts.length === 3) {
        const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(2, "0")}`
        document.getElementById("item-last-check").value = formattedDate
      }
    })
  })

  // Delete button functionality
  const deleteBtns = document.querySelectorAll(".delete-btn")
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (confirm("¿Estás seguro de que deseas eliminar este equipo?")) {
        // In a real application, you would send a request to the server
        // For now, just remove the row from the table
        const row = this.closest("tr")
        row.remove()
      }
    })
  })

  // Form submission
  if (itemForm) {
    itemForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // In a real application, you would send the form data to the server
      // For now, just close the modal
      alert("Equipo guardado correctamente")
      closeModalFunc()
    })
  }

  // Search functionality
  const searchInput = document.getElementById("inventory-search")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()
      const rows = document.querySelectorAll(".inventory-table tbody tr")

      rows.forEach((row) => {
        const name = row.cells[1].textContent.toLowerCase()
        const category = row.cells[2].textContent.toLowerCase()
        const location = row.cells[3].textContent.toLowerCase()

        if (name.includes(searchTerm) || category.includes(searchTerm) || location.includes(searchTerm)) {
          row.style.display = ""
        } else {
          row.style.display = "none"
        }
      })
    })
  }

  // Filter functionality
  const categoryFilter = document.getElementById("category-filter")
  const statusFilter = document.getElementById("status-filter")

  function applyFilters() {
    const categoryValue = categoryFilter.value.toLowerCase()
    const statusValue = statusFilter.value.toLowerCase()
    const rows = document.querySelectorAll(".inventory-table tbody tr")

    rows.forEach((row) => {
      const category = row.cells[2].textContent.toLowerCase()
      const status = row.cells[4].querySelector(".status").textContent.toLowerCase()

      const categoryMatch = categoryValue === "" || category === categoryValue
      const statusMatch = statusValue === "" || status === statusValue

      if (categoryMatch && statusMatch) {
        row.style.display = ""
      } else {
        row.style.display = "none"
      }
    })
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters)
  }

  if (statusFilter) {
    statusFilter.addEventListener("change", applyFilters)
  }

  // Export functionality
  const exportBtn = document.getElementById("export-btn")
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      alert("Exportando inventario...")
      // In a real application, you would generate a CSV or Excel file
    })
  }

  // Pagination functionality
  const paginationBtns = document.querySelectorAll(".pagination-number")
  if (paginationBtns.length > 0) {
    paginationBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        paginationBtns.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // In a real application, you would fetch the corresponding page data
      })
    })
  }
})
