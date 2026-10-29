// =============================================================================
// Student Expense Tracker - script.js
// Features: Form Submit, Validation, Delete, Running Total, localStorage, & Dark/Light Theme
// =============================================================================

// -----------------------------------------------------------------------------
// STEP 1: Select HTML Elements from the DOM
// -----------------------------------------------------------------------------
const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const dateInput = document.getElementById("expense-date");

const errorMessage = document.getElementById("error-message");
const totalAmountDisplay = document.getElementById("total-amount");
const expenseList = document.getElementById("expense-list");
const emptyState = document.getElementById("empty-state");
const expenseCount = document.getElementById("expense-count");

// Theme Toggle Elements
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

// -----------------------------------------------------------------------------
// STEP 2: Theme Management (Dark Mode / Light Mode with localStorage)
// -----------------------------------------------------------------------------
// Initialize theme based on user's saved preference or OS system preference
function initTheme() {
  const savedTheme = localStorage.getItem("student_theme");
  
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Detect system preference (defaults to dark if user's OS is in dark mode)
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
}

// Apply the given theme ('light' or 'dark') to the document and button
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) themeIcon.textContent = "☀️";
    if (themeLabel) themeLabel.textContent = "Light Mode";
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (themeIcon) themeIcon.textContent = "🌙";
    if (themeLabel) themeLabel.textContent = "Dark Mode";
  }
}

// Toggle between light and dark when the button is clicked
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    
    applyTheme(newTheme);
    localStorage.setItem("student_theme", newTheme);
  });
}

// Run theme setup immediately
initTheme();

// -----------------------------------------------------------------------------
// STEP 3: Load Data from localStorage (State Initialization)
// -----------------------------------------------------------------------------
let expenses = JSON.parse(localStorage.getItem("student_expenses")) || [];

// Set today's date as default in the date input
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

// Render all saved expenses immediately when the page loads
renderAllExpenses();

// -----------------------------------------------------------------------------
// STEP 4: Handle Form Submission (Add New Expense)
// -----------------------------------------------------------------------------
expenseForm.addEventListener("submit", function (event) {
  // Prevent page refresh on submit
  event.preventDefault();

  // Extract input values
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;
  const date = dateInput.value;

  // Validation: Check for empty name
  if (!name) {
    showError("Please enter an expense name.");
    nameInput.focus();
    return;
  }

  // Validation: Check for valid positive amount
  if (isNaN(amount) || amount <= 0) {
    showError("Please enter a valid positive amount in rupees (greater than ₹0).");
    amountInput.focus();
    return;
  }

  // Validation: Check category selection
  if (!category) {
    showError("Please select a category (Food, Travel, Books, Fun, or Other).");
    categorySelect.focus();
    return;
  }

  // Validation: Check date
  if (!date) {
    showError("Please pick a valid date.");
    dateInput.focus();
    return;
  }

  // Hide any previous errors
  hideError();

  // Create new expense object
  const newExpense = {
    id: Date.now().toString(), // Unique ID using timestamp
    name: name,
    amount: amount,
    category: category,
    date: date,
  };

  // Add the new item to the beginning of the array
  expenses.unshift(newExpense);

  // Save the updated array to localStorage
  saveExpensesToStorage();

  // Update UI list and total
  renderAllExpenses();

  // Reset form inputs for next entry
  expenseForm.reset();
  dateInput.value = today;
  nameInput.focus();
});

// -----------------------------------------------------------------------------
// STEP 5: Render Expenses to the Screen
// -----------------------------------------------------------------------------
function renderAllExpenses() {
  expenseList.innerHTML = "";

  // Show empty state placeholder if no expenses exist
  if (expenses.length === 0) {
    emptyState.style.display = "block";
    expenseCount.textContent = "0 items";
    updateTotalAmount();
    return;
  }

  // Hide empty state and show count
  emptyState.style.display = "none";
  expenseCount.textContent = `${expenses.length} ${expenses.length === 1 ? "item" : "items"}`;

  // Build <li> for each expense item
  expenses.forEach(function (expense) {
    const li = document.createElement("li");
    li.className = "expense-item";

    const formattedDate = formatDate(expense.date);

    li.innerHTML = `
      <div class="expense-details">
        <span class="expense-title-text">${escapeHTML(expense.name)}</span>
        <div class="expense-meta-info">
          <span class="category-badge cat-${expense.category}">${expense.category}</span>
          <span>·</span>
          <span>${formattedDate}</span>
        </div>
      </div>
      <div class="expense-actions">
        <span class="expense-item-amount">₹${expense.amount.toFixed(2)}</span>
        <button 
          type="button" 
          class="delete-btn" 
          data-id="${expense.id}" 
          title="Delete expense"
          aria-label="Delete ${escapeHTML(expense.name)}"
        >✕</button>
      </div>
    `;

    expenseList.appendChild(li);
  });

  // Always update running total
  updateTotalAmount();
}

// -----------------------------------------------------------------------------
// STEP 6: Event Delegation for Deleting an Expense
// -----------------------------------------------------------------------------
expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const idToDelete = event.target.getAttribute("data-id");
    deleteExpense(idToDelete);
  }
});

function deleteExpense(id) {
  // Remove expense from the array
  expenses = expenses.filter(function (item) {
    return item.id !== id;
  });

  // Save changes to localStorage
  saveExpensesToStorage();

  // Refresh UI
  renderAllExpenses();
}

// -----------------------------------------------------------------------------
// STEP 7: Calculate and Update Total Spent
// -----------------------------------------------------------------------------
function updateTotalAmount() {
  const total = expenses.reduce(function (sum, item) {
    return sum + item.amount;
  }, 0);

  totalAmountDisplay.textContent = total.toFixed(2);
}

// -----------------------------------------------------------------------------
// STEP 8: Save to Browser localStorage
// -----------------------------------------------------------------------------
function saveExpensesToStorage() {
  localStorage.setItem("student_expenses", JSON.stringify(expenses));
}

// -----------------------------------------------------------------------------
// STEP 9: Helper Functions (Errors, Formatting, Security)
// -----------------------------------------------------------------------------
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

function formatDate(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;

  const year = parts[0];
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[month]} ${day}, ${year}`;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, function (tag) {
    const lookup = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
    return lookup[tag] || tag;
  });
}
