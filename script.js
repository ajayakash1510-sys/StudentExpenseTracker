// =============================================================================
// Student Expense Tracker - script.js
// A beginner-friendly JavaScript file explaining each step in plain English
// =============================================================================

// -----------------------------------------------------------------------------
// STEP 1: Select HTML Elements from the DOM
// -----------------------------------------------------------------------------
// We use document.getElementById to grab references to our HTML elements
// so JavaScript can read their values and update them on the screen.

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

// -----------------------------------------------------------------------------
// STEP 2: Application State (Data Storage)
// -----------------------------------------------------------------------------
// We store all expense objects in an array.
// We also use localStorage so expenses stay saved even if the browser is refreshed.
let expenses = JSON.parse(localStorage.getItem("student_expenses")) || [];

// Set today's date as the default value in the date input
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;

// Render any existing saved expenses on initial page load
renderAllExpenses();

// -----------------------------------------------------------------------------
// STEP 3: Listen for the Form Submit Event
// -----------------------------------------------------------------------------
expenseForm.addEventListener("submit", function (event) {
  // Prevent the browser from refreshing the page when the form is submitted
  event.preventDefault();

  // Read and clean the user inputs
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;
  const date = dateInput.value;

  // ---------------------------------------------------------------------------
  // REQUIREMENT 2: Validate the Inputs (Check for empty fields & positive amount)
  // ---------------------------------------------------------------------------
  // Check if expense name is empty
  if (!name) {
    showError("Please enter an expense name.");
    nameInput.focus();
    return;
  }

  // Check if amount is empty, not a number, or less than or equal to zero
  if (isNaN(amount) || amount <= 0) {
    showError("Please enter a valid positive amount in rupees (greater than ₹0).");
    amountInput.focus();
    return;
  }

  // Check if category is selected
  if (!category) {
    showError("Please select a category (Food, Travel, Books, Fun, or Other).");
    categorySelect.focus();
    return;
  }

  // Check if date is selected
  if (!date) {
    showError("Please pick a valid date.");
    dateInput.focus();
    return;
  }

  // If all checks pass, hide any existing error message
  hideError();

  // ---------------------------------------------------------------------------
  // REQUIREMENT 1: Create a new expense object and add it to our array
  // ---------------------------------------------------------------------------
  const newExpense = {
    id: Date.now().toString(), // Generates a unique ID using the current timestamp
    name: name,
    amount: amount,
    category: category,
    date: date,
  };

  // Add the new expense to the beginning of our array
  expenses.unshift(newExpense);

  // Save to browser localStorage
  saveExpensesToStorage();

  // Re-render the list and update the total amount
  renderAllExpenses();

  // Reset the form inputs for the next entry
  expenseForm.reset();
  dateInput.value = today; // restore today's date
  nameInput.focus();
});

// -----------------------------------------------------------------------------
// STEP 4: Render All Expenses into the <ul> List
// -----------------------------------------------------------------------------
function renderAllExpenses() {
  // Clear the existing HTML inside the <ul>
  expenseList.innerHTML = "";

  // Check if there are no expenses
  if (expenses.length === 0) {
    emptyState.style.display = "block";
    expenseCount.textContent = "0 items";
    updateTotalAmount();
    return;
  }

  // Hide the empty state message when expenses exist
  emptyState.style.display = "none";
  expenseCount.textContent = `${expenses.length} ${expenses.length === 1 ? "item" : "items"}`;

  // Loop through each expense in our array and build an <li> element
  expenses.forEach(function (expense) {
    const li = document.createElement("li");
    li.className = "expense-item";

    // Format the date to a readable string (e.g. "Oct 29, 2026")
    const formattedDate = formatDate(expense.date);

    // Build the inner HTML for the expense item
    // Note: includes REQUIREMENT 3 (Delete button with data-id)
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

    // Append the newly created <li> into the <ul>
    expenseList.appendChild(li);
  });

  // ---------------------------------------------------------------------------
  // REQUIREMENT 4: Update the total amount spent
  // ---------------------------------------------------------------------------
  updateTotalAmount();
}

// -----------------------------------------------------------------------------
// STEP 5: Event Delegation for the Delete Button (REQUIREMENT 3 & 4)
// -----------------------------------------------------------------------------
// Instead of attaching a click listener to every single button, we attach one
// listener to the parent <ul> container. This is a best practice called Event Delegation.
expenseList.addEventListener("click", function (event) {
  // Check if the clicked element has the "delete-btn" class
  if (event.target.classList.contains("delete-btn")) {
    const idToDelete = event.target.getAttribute("data-id");
    deleteExpense(idToDelete);
  }
});

// Function to delete an expense by its unique ID
function deleteExpense(id) {
  // Filter out the expense with the matching ID
  expenses = expenses.filter(function (item) {
    return item.id !== id;
  });

  // Save the updated list to localStorage
  saveExpensesToStorage();

  // Re-render the list and update the total amount
  renderAllExpenses();
}

// -----------------------------------------------------------------------------
// STEP 6: Update the Total Amount Spent (REQUIREMENT 4)
// -----------------------------------------------------------------------------
function updateTotalAmount() {
  // Use array reduce method to calculate the sum of all expense amounts
  const total = expenses.reduce(function (accumulator, currentExpense) {
    return accumulator + currentExpense.amount;
  }, 0);

  // Update the HTML text with two decimal places (e.g. ₹150.00)
  totalAmountDisplay.textContent = total.toFixed(2);
}

// -----------------------------------------------------------------------------
// STEP 7: Helper Functions (Error messages, Date formatting, Security)
// -----------------------------------------------------------------------------

// Show an error message banner
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Hide the error message banner
function hideError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

// Save the current expenses array to browser localStorage
function saveExpensesToStorage() {
  localStorage.setItem("student_expenses", JSON.stringify(expenses));
}

// Format YYYY-MM-DD string into a clean readable date
function formatDate(dateString) {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;

  const year = parts[0];
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  return `${monthNames[month]} ${day}, ${year}`;
}

// Sanitize user inputs to prevent Cross-Site Scripting (XSS)
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, function (tag) {
    const lookup = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return lookup[tag] || tag;
  });
}
