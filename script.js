// Dashboard JavaScript - All functionality

// Generic Accordion functionality
function toggleAccordion(header) {
  header.classList.toggle("active");
  const content = header.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function closeAccordion(header) {
  header.classList.remove("active");
  const content = header.nextElementSibling;
  if (content) {
    content.style.maxHeight = null;
  }
}

function closeAllAccordions(container) {
  const accordions = container.querySelectorAll(".accordion-header");
  accordions.forEach(header => {
    closeAccordion(header);
  });
}

// Initialize accordion listeners
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    toggleAccordion(header);
  });
});

// Show row details function
function showRowDetails(rowId) {
  const detailPanel = document.getElementById("table-item-detail");
  const overlay = document.getElementById("detail-overlay");
  

  // Atualizar o Call ID
  const callIdElement = detailPanel.querySelector("#call-id");
  if (callIdElement) {
    callIdElement.textContent = rowId;
  }

  // Mostrar o painel
  detailPanel.classList.add("show");
  overlay.classList.add("show");

  console.log("Mostrando detalhes para Row ID:", rowId);
}

// Close detail panel function
function closeDetailPanel() {
  const detailPanel = document.getElementById("table-item-detail");
  const overlay = document.getElementById("detail-overlay");

  detailPanel.classList.remove("show");
  overlay.classList.remove("show");
  closeAllAccordions(detailPanel);
}

// Event listeners
document.getElementById("back-button").addEventListener("click", closeDetailPanel);
document.getElementById("detail-overlay").addEventListener("click", closeDetailPanel);

// Escape key handler
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDetailPanel();
  }
});

// Fullscreen functionality
document.querySelector(".fullscreen-btn").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// === Vanilla JS Datepicker ===
const startInput = document.querySelector('#startDate');
const endInput = document.querySelector('#endDate');

const startPicker = new Datepicker(startInput, {
  autohide: true,
  format: 'mm/dd/yyyy',
  todayHighlight: true,
});

const endPicker = new Datepicker(endInput, {
  autohide: true,
  format: 'mm/dd/yyyy',
  todayHighlight: true,
});

// Sincronizar datas (end date não pode ser antes da start)
startInput.addEventListener('changeDate', (e) => {
  const startDate = e.detail.date;
  endPicker.setOptions({
    minDate: startDate,
  });
});
