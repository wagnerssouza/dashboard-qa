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
  const detailPanel = document.querySelector(".detail-panel");
  const overlay = document.querySelector(".detail-overlay");
  
  // Se painel já está visível, esconde primeiro para resetar accordions
  if (detailPanel.classList.contains("show")) {
    detailPanel.classList.remove("show");
    overlay.classList.remove("show");
    
    requestAnimationFrame(() => {
      processRowDetails(rowId, detailPanel, overlay);
    });
  } else {
    processRowDetails(rowId, detailPanel, overlay);
  }
}

function processRowDetails(rowId, detailPanel, overlay) {
  // Fechar todos os accordions do painel de detalhes
  closeAllAccordions(detailPanel);

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
  const detailPanel = document.querySelector(".detail-panel");
  const overlay = document.querySelector(".detail-overlay");

  detailPanel.classList.remove("show");
  overlay.classList.remove("show");
  closeAllAccordions(detailPanel);
}

// Event listeners
document.getElementById("back-button").addEventListener("click", closeDetailPanel);
document.querySelector(".detail-overlay").addEventListener("click", closeDetailPanel);

// Escape key handler
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDetailPanel();
  }
});

// Fullscreen functionality
document.querySelector(".btn-fullscreen").addEventListener("click", () => {
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

// === US Phone: máscara + validação ===
const usPhoneInput = document.getElementById("usPhone");
const usPhoneError = document.getElementById("usPhoneError");

const im = new Inputmask({
  mask: "+1 999 999 9999",
  placeholder: " ",
  showMaskOnHover: false,
  showMaskOnFocus: true,
  clearIncomplete: false,
  onBeforePaste: (pasted) => (pasted || "").replace(/[^\d+ ]/g, "")
});
im.mask(usPhoneInput);

usPhoneInput.addEventListener("input", () => {
  usPhoneError.style.display = "none";
  usPhoneInput.style.borderColor = "#ccc";
});

usPhoneInput.addEventListener("blur", () => {
  const raw = usPhoneInput.value.trim();
  
  if (!raw || raw === "+1 ") {
    usPhoneInput.style.borderColor = "#ccc";
    return;
  }

  try {
    const number = libphonenumber.parsePhoneNumberFromString(raw, "US");

    const isValidUS = number && number.isValid() && number.country === "US";

    if (isValidUS) {
      usPhoneInput.value = number.formatInternational();
      usPhoneInput.style.borderColor = "#ccc";
    } else {
      usPhoneInput.style.borderColor = "#c00";
    }
  } catch (error) {
    usPhoneInput.style.borderColor = "#c00";
  }
});

