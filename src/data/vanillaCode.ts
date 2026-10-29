export const VANILLA_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CampusPenny - College Student Expense Tracker</title>
  <!-- Link to our stylesheet -->
  <link rel="stylesheet" href="style.css">
  <!-- Google Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

  <!-- Top Navigation Bar -->
  <header class="app-header">
    <div class="header-container">
      <div class="brand">
        <span class="brand-icon">🎓</span>
        <h1 class="brand-title">CampusPenny</h1>
      </div>
      <p class="brand-tagline">Student Budget & Expense Tracker</p>
    </div>
  </header>

  <main class="main-container">
    
    <!-- Section 1: Budget & Allowance Overview -->
    <section class="budget-card">
      <div class="budget-header">
        <div>
          <span class="section-label">Monthly Allowance</span>
          <div class="budget-amount-row">
            <span class="currency-symbol">$</span>
            <input type="number" id="monthly-budget-input" value="350" min="0" step="10">
          </div>
        </div>
        <div class="status-badge" id="budget-status">On Track</div>
      </div>

      <!-- Visual Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar" id="budget-progress-bar"></div>
      </div>

      <!-- Quick Metrics Summary -->
      <div class="stats-grid">
        <div class="stat-box">
          <span class="stat-label">Total Spent</span>
          <span class="stat-value text-spent" id="total-spent">$0.00</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Remaining Balance</span>
          <span class="stat-value text-balance" id="remaining-balance">$350.00</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Daily Safe Spend</span>
          <span class="stat-value" id="daily-spend-rate">$11.60 / day</span>
        </div>
      </div>
    </section>

    <!-- 2-Column Responsive Workspace -->
    <div class="tracker-layout">

      <!-- Left Column: Add New Expense Form -->
      <section class="form-card">
        <h2 class="card-title">Add Student Expense</h2>
        
        <form id="expense-form">
          <!-- Item Title / Description -->
          <div class="form-group">
            <label for="expense-title">Expense Title</label>
            <input type="text" id="expense-title" placeholder="e.g. Canteen Lunch, Used Calculus Book" required>
          </div>

          <!-- Amount & Date (2 columns) -->
          <div class="form-row">
            <div class="form-group">
              <label for="expense-amount">Amount ($)</label>
              <input type="number" id="expense-amount" placeholder="0.00" min="0.01" step="0.01" required>
            </div>

            <div class="form-group">
              <label for="expense-date">Date</label>
              <input type="date" id="expense-date" required>
            </div>
          </div>

          <!-- Category & Payment Method -->
          <div class="form-row">
            <div class="form-group">
              <label for="expense-category">Category</label>
              <select id="expense-category" required>
                <option value="Food & Dining">🍔 Food & Dining</option>
                <option value="Books & Supplies">📚 Books & Supplies</option>
                <option value="Housing & Dorm">🏠 Housing & Dorm</option>
                <option value="Transit & Commute">🚌 Transit & Commute</option>
                <option value="Social & Leisure">☕ Social & Leisure</option>
                <option value="Subscriptions">📱 Subscriptions</option>
              </select>
            </div>

            <div class="form-group">
              <label for="expense-payment">Paid Via</label>
              <select id="expense-payment">
                <option value="Debit Card">Debit Card</option>
                <option value="Campus Card">Campus Card / Meal Plan</option>
                <option value="Cash">Cash</option>
                <option value="UPI / Wallet">UPI / Digital Wallet</option>
              </select>
            </div>
          </div>

          <!-- Student Presets (1-Click Fillers) -->
          <div class="presets-section">
            <span class="presets-label">Quick Student Presets:</span>
            <div class="preset-buttons">
              <button type="button" class="preset-btn" data-title="Iced Coffee" data-amount="4.50" data-cat="Food & Dining">☕ Coffee $4.50</button>
              <button type="button" class="preset-btn" data-title="Campus Meal" data-amount="11.00" data-cat="Food & Dining">🍱 Lunch $11</button>
              <button type="button" class="preset-btn" data-title="Notebooks & Pens" data-amount="8.50" data-cat="Books & Supplies">📝 Supplies $8.50</button>
              <button type="button" class="preset-btn" data-title="Bus Pass" data-amount="20.00" data-cat="Transit & Commute">🚌 Bus $20</button>
            </div>
          </div>

          <button type="submit" class="submit-btn">+ Log Expense</button>
        </form>
      </section>

      <!-- Right Column: Expense History & Filters -->
      <section class="ledger-card">
        <div class="ledger-header">
          <h2 class="card-title">Recent Expenses (<span id="expense-count">0</span>)</h2>
          
          <button type="button" id="clear-all-btn" class="text-btn">Clear All</button>
        </div>

        <!-- Filter bar -->
        <div class="filter-bar">
          <input type="text" id="search-input" placeholder="Search by name..." class="search-input">
          <select id="category-filter" class="filter-select">
            <option value="ALL">All Categories</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Books & Supplies">Books & Supplies</option>
            <option value="Housing & Dorm">Housing & Dorm</option>
            <option value="Transit & Commute">Transit & Commute</option>
            <option value="Social & Leisure">Social & Leisure</option>
            <option value="Subscriptions">Subscriptions</option>
          </select>
        </div>

        <!-- Transactions Container -->
        <div id="expense-list-container" class="expense-list">
          <!-- Populated by script.js -->
        </div>

        <!-- Empty State (shown when no items match) -->
        <div id="empty-state" class="empty-state">
          <div class="empty-icon">🎒</div>
          <p class="empty-title">No expenses logged yet</p>
          <p class="empty-subtext">Add your first campus coffee, textbook, or meal above.</p>
        </div>
      </section>

    </div>
  </main>

  <!-- Connect JavaScript at the bottom of the body -->
  <script src="script.js"></script>
</body>
</html>`;

export const VANILLA_CSS_CODE = `/* ========================================================
   CampusPenny - College Student Expense Tracker Stylesheet
   Pure CSS without external frameworks
   ======================================================== */

:root {
  --bg-canvas: #f8fafc;
  --bg-card: #ffffff;
  --border-color: #e2e8f0;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --success: #16a34a;
  --warning: #d97706;
  --danger: #dc2626;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  background-color: var(--bg-canvas);
  color: var(--text-main);
  line-height: 1.5;
  padding-bottom: 60px;
}

/* Header */
.app-header {
  background: #ffffff;
  border-bottom: 1px solid var(--border-color);
  padding: 16px 24px;
}

.header-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  font-size: 24px;
}

.brand-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.brand-tagline {
  font-size: 13px;
  color: var(--text-muted);
}

/* Main Layout */
.main-container {
  max-width: 1100px;
  margin: 28px auto;
  padding: 0 20px;
}

/* Budget Card */
.budget-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 24px;
}

.budget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.budget-amount-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}

.currency-symbol {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main);
}

#monthly-budget-input {
  font-size: 24px;
  font-weight: 700;
  font-family: inherit;
  color: var(--text-main);
  border: 1px dashed var(--border-color);
  padding: 2px 8px;
  width: 130px;
  border-radius: var(--radius-sm);
  background: #f8fafc;
}

.status-badge {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
  background: #ecfdf5;
  color: #065f46;
}

.progress-container {
  height: 10px;
  background: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 20px;
}

.progress-bar {
  height: 100%;
  width: 0%;
  background: var(--success);
  transition: width 0.3s ease, background-color 0.3s ease;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-box {
  background: #f8fafc;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.text-spent { color: var(--danger); }
.text-balance { color: var(--success); }

/* 2-Column Grid */
.tracker-layout {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 24px;
  align-items: start;
}

@media (max-width: 840px) {
  .tracker-layout {
    grid-template-columns: 1fr;
  }
}

/* Card Styling */
.form-card, .ledger-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.card-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 18px;
}

/* Form Styles */
.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 6px;
}

input[type="text"],
input[type="number"],
input[type="date"],
select {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: #ffffff;
  color: var(--text-main);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

/* Quick Presets */
.presets-section {
  margin: 16px 0 20px 0;
  padding: 12px;
  background: #f8fafc;
  border-radius: var(--radius-md);
  border: 1px dashed var(--border-color);
}

.presets-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.preset-btn {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.preset-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

/* Buttons */
.submit-btn {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.submit-btn:hover {
  background: var(--primary-hover);
}

.text-btn {
  background: none;
  border: none;
  color: var(--danger);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.text-btn:hover {
  text-decoration: underline;
}

/* Ledger List & Filters */
.ledger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
}

.filter-select {
  width: 170px;
}

/* Expense Items */
.expense-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 480px;
  overflow-y: auto;
}

.expense-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: background-color 0.15s ease;
}

.expense-row:hover {
  background-color: #f8fafc;
}

.expense-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon-box {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.expense-info {
  display: flex;
  flex-direction: column;
}

.expense-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
}

.expense-meta {
  font-size: 12px;
  color: var(--text-muted);
}

.expense-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.expense-amount {
  font-size: 15px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
}

.delete-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.delete-btn:hover {
  color: var(--danger);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  display: none;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.empty-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 4px;
}

.empty-subtext {
  font-size: 13px;
  color: var(--text-muted);
}
`;

export const VANILLA_JS_CODE = `/* ========================================================
   CampusPenny - College Student Expense Tracker (Vanilla JS)
   Concepts used:
   - Data Structures (Arrays & Objects)
   - LocalStorage API for persistence
   - DOM Event Listeners & Event Delegation
   - Dynamic HTML rendering & Math calculations
   ======================================================== */

// 1. DATA STORAGE KEYS
const STORAGE_KEY_EXPENSES = "campuspenny_expenses";
const STORAGE_KEY_BUDGET = "campuspenny_budget";

// 2. DEFAULT STARTER DATA (for beginners when opening the app)
const DEFAULT_EXPENSES = [
  {
    id: "exp-1",
    title: "Intro to Algorithms Textbook",
    amount: 38.50,
    category: "Books & Supplies",
    paymentMethod: "Debit Card",
    date: new Date().toISOString().split("T")[0]
  },
  {
    id: "exp-2",
    title: "Campus Canteen Lunch Meal",
    amount: 11.25,
    category: "Food & Dining",
    paymentMethod: "Campus Card",
    date: new Date().toISOString().split("T")[0]
  },
  {
    id: "exp-3",
    title: "Study Session Iced Coffee",
    amount: 4.50,
    category: "Food & Dining",
    paymentMethod: "UPI / Wallet",
    date: new Date().toISOString().split("T")[0]
  }
];

// 3. APPLICATION STATE
// Load saved expenses from localStorage, or use DEFAULT_EXPENSES
let expenses = JSON.parse(localStorage.getItem(STORAGE_KEY_EXPENSES)) || DEFAULT_EXPENSES;
let monthlyBudget = parseFloat(localStorage.getItem(STORAGE_KEY_BUDGET)) || 350;

// Category icons map
const categoryIcons = {
  "Food & Dining": "🍔",
  "Books & Supplies": "📚",
  "Housing & Dorm": "🏠",
  "Transit & Commute": "🚌",
  "Social & Leisure": "☕",
  "Subscriptions": "📱"
};

// 4. DOM ELEMENT REFERENCES
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("expense-title");
const amountInput = document.getElementById("expense-amount");
const dateInput = document.getElementById("expense-date");
const categoryInput = document.getElementById("expense-category");
const paymentInput = document.getElementById("expense-payment");

const budgetInput = document.getElementById("monthly-budget-input");
const totalSpentEl = document.getElementById("total-spent");
const remainingBalanceEl = document.getElementById("remaining-balance");
const dailySpendRateEl = document.getElementById("daily-spend-rate");
const budgetStatusEl = document.getElementById("budget-status");
const progressBarEl = document.getElementById("budget-progress-bar");

const expenseListContainer = document.getElementById("expense-list-container");
const emptyStateEl = document.getElementById("empty-state");
const expenseCountEl = document.getElementById("expense-count");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const clearAllBtn = document.getElementById("clear-all-btn");

// 5. INITIAL SETUP
function init() {
  // Set today's date as default in form
  dateInput.value = new Date().toISOString().split("T")[0];
  budgetInput.value = monthlyBudget;

  // Render initial UI
  renderExpenses();
  updateBudgetSummary();

  // Attach event listeners
  setupEventListeners();
}

// 6. EVENT LISTENERS
function setupEventListeners() {
  // Form submission: Add new expense
  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevents page reload
    addExpense();
  });

  // Monthly budget input change
  budgetInput.addEventListener("input", function(e) {
    monthlyBudget = Math.max(0, parseFloat(e.target.value) || 0);
    localStorage.setItem(STORAGE_KEY_BUDGET, monthlyBudget);
    updateBudgetSummary();
  });

  // Filter & Search input changes
  searchInput.addEventListener("input", renderExpenses);
  categoryFilter.addEventListener("change", renderExpenses);

  // Clear all button
  clearAllBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to clear all logged expenses?")) {
      expenses = [];
      saveAndSync();
    }
  });

  // Quick preset buttons
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      titleInput.value = this.dataset.title;
      amountInput.value = this.dataset.amount;
      categoryInput.value = this.dataset.cat;
    });
  });

  // Event Delegation for delete buttons
  expenseListContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
      const idToDelete = e.target.dataset.id;
      deleteExpense(idToDelete);
    }
  });
}

// 7. CORE FUNCTIONS

// Add a new expense object to the array
function addExpense() {
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;
  const category = categoryInput.value;
  const paymentMethod = paymentInput.value;

  if (!title || isNaN(amount) || amount <= 0 || !date) {
    alert("Please fill in valid details.");
    return;
  }

  // Create standard student expense object
  const newExpense = {
    id: "exp-" + Date.now(), // Unique ID using timestamp
    title: title,
    amount: amount,
    category: category,
    paymentMethod: paymentMethod,
    date: date
  };

  // Add to beginning of array (newest first)
  expenses.unshift(newExpense);

  // Save to LocalStorage and update UI
  saveAndSync();

  // Reset form inputs
  form.reset();
  dateInput.value = new Date().toISOString().split("T")[0];
}

// Delete an expense by ID
function deleteExpense(id) {
  expenses = expenses.filter(item => item.id !== id);
  saveAndSync();
}

// Save to browser LocalStorage & refresh calculations
function saveAndSync() {
  localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
  renderExpenses();
  updateBudgetSummary();
}

// Update Budget metrics, progress bar, and daily safe spend
function updateBudgetSummary() {
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = monthlyBudget - totalSpent;

  totalSpentEl.textContent = "$" + totalSpent.toFixed(2);
  remainingBalanceEl.textContent = "$" + remaining.toFixed(2);

  // Calculate percentage used
  const percentUsed = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 100;
  progressBarEl.style.width = Math.min(100, Math.max(0, percentUsed)) + "%";

  // Daily safe spending rate calculation
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = Math.max(1, daysInMonth - today.getDate() + 1);
  const safeDaily = remaining > 0 ? (remaining / daysRemaining) : 0;
  dailySpendRateEl.textContent = "$" + safeDaily.toFixed(2) + " / day";

  // Visual status indicators
  if (remaining < 0) {
    budgetStatusEl.textContent = "Over Budget!";
    budgetStatusEl.style.background = "#fee2e2";
    budgetStatusEl.style.color = "#991b1b";
    progressBarEl.style.backgroundColor = "var(--danger)";
    remainingBalanceEl.className = "stat-value text-spent";
  } else if (percentUsed > 80) {
    budgetStatusEl.textContent = "Almost Out!";
    budgetStatusEl.style.background = "#fef3c7";
    budgetStatusEl.style.color = "#92400e";
    progressBarEl.style.backgroundColor = "var(--warning)";
    remainingBalanceEl.className = "stat-value text-spent";
  } else {
    budgetStatusEl.textContent = "On Track";
    budgetStatusEl.style.background = "#ecfdf5";
    budgetStatusEl.style.color = "#065f46";
    progressBarEl.style.backgroundColor = "var(--success)";
    remainingBalanceEl.className = "stat-value text-balance";
  }
}

// Render the filtered expense list into the DOM
function renderExpenses() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  // Filter items
  const filtered = expenses.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  expenseCountEl.textContent = filtered.length;

  // Check if empty
  if (filtered.length === 0) {
    expenseListContainer.innerHTML = "";
    emptyStateEl.style.display = "block";
    return;
  }

  emptyStateEl.style.display = "none";

  // Build HTML string
  let html = "";
  filtered.forEach(item => {
    const icon = categoryIcons[item.category] || "💸";
    html += \`
      <div class="expense-row">
        <div class="expense-left">
          <div class="category-icon-box">\${icon}</div>
          <div class="expense-info">
            <span class="expense-title">\${escapeHTML(item.title)}</span>
            <span class="expense-meta">\${item.category} · \${item.paymentMethod} · \${item.date}</span>
          </div>
        </div>
        <div class="expense-right">
          <span class="expense-amount">-\$\${item.amount.toFixed(2)}</span>
          <button type="button" class="delete-btn" data-id="\${item.id}" title="Delete expense">&times;</button>
        </div>
      </div>
    \`;
  });

  expenseListContainer.innerHTML = html;
}

// Helper to prevent XSS attacks when displaying user inputs
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Run init on page load
init();
`;
