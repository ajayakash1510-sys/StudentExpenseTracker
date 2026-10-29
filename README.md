# Student Expense Tracker 🎓💸

A lightweight, beginner-friendly web application designed for college students to track daily spending, categorize campus costs, and keep an accurate running balance in Indian Rupees (₹).

---

## 📌 Description

Managing student budgets—between canteen meals, bus passes, photocopies, and course textbooks—can be challenging. **Student Expense Tracker** offers a minimal, intuitive interface built with vanilla web technologies. It stores all transactions locally inside the browser using `localStorage`, ensuring data remains safe without requiring any backend servers, accounts, or databases.

---

## 🚀 Features

- **Quick Expense Logging**: Add items with a title, amount in Rupees (₹), category, and date.
- **Dark & Light Mode Switcher**:
  - **Nocturnal Dark Mode**: Deep obsidian slate surface (`#121826`) on midnight abyss with luminous glowing category tags and high-contrast typography.
  - **Crisp Light Mode**: Soft porcelain slate background (`#f6f8fc`) with vibrant royal indigo accents.
  - Remembers your chosen theme in `localStorage` and automatically detects your operating system's dark/light preferences.
- **Student-Specific Categories**:
  - 🍔 **Food**: Canteen meals, snacks, groceries, coffee
  - 🚌 **Travel**: Metro cards, bus passes, auto/cab rides
  - 📚 **Books**: Textbooks, stationery, printing, lab supplies
  - ☕ **Fun**: Outings, movies, hangouts with roommates
  - 📱 **Other**: Subscriptions, laundry, personal essentials
- **Real-Time Total Calculation**: Running total spent updates immediately as expenses are added or removed.
- **Robust Input Validation**:
  - Prevents blank submissions.
  - Rejects zero, negative, or invalid amounts.
  - Ensures a category and date are selected with user-friendly error banners.
- **One-Click Item Deletion**: Delete any recorded expense with an instant recalculation of total spending.
- **Offline & Persistent Storage**: Powered by the browser's `localStorage` API—your data survives page reloads, browser closes, and system restarts.
- **Responsive & Accessible Design**: Works smoothly on mobile screens, tablets, and desktop monitors.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic document layout (`<header>`, `<form>`, `<section>`, `<ul>`, `<li>`, `<select>`).
- **CSS3**: Modern CSS variables, flexbox layout, and custom category badges.
- **JavaScript (ES6+)**: DOM manipulation, event listeners, array methods (`reduce`, `filter`, `unshift`), JSON serialization, and the `localStorage` API.

---

## 💻 How to Run It Locally

Since this project uses pure HTML, CSS, and JavaScript with no build steps or package managers required, running it is simple:

### Option 1: Direct File Opening (Easiest)
1. Download or clone this repository to your computer.
2. Locate the project folder containing `index.html`, `style.css`, and `script.js`.
3. Double-click **`index.html`** or right-click and choose **Open With > Google Chrome** (or any browser).

### Option 2: Using VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey) if you haven't already.
3. Right-click `index.html` in the file explorer and click **"Open with Live Server"**.
4. The site will automatically open at `http://127.0.0.1:5500/`.

---

## 🌐 Publishing to GitHub Pages

You can host this project online for free using GitHub Pages:

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and click **New Repository**.
   - Name it (e.g., `student-expense-tracker`) and keep it **Public**.

2. **Push Your Code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Student Expense Tracker"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/student-expense-tracker.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your GitHub repository, click the **Settings** tab.
   - On the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.

4. **Visit Your Live App**:
   - After 1–2 minutes, GitHub will generate your live URL:
     `https://YOUR_USERNAME.github.io/student-expense-tracker/`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
