# Portfolio Website

A **React-based frontend application** where users can register and create their portfolios, which are then displayed on the **Speakers Page**. Built using modern tools and practices including **React, Redux Toolkit, React Hook Form, Tailwind CSS, ShadCN**, and a **feature-based folder structure**.

---

## 🚀 Features

- **Home Page**
  - Landing page with hero section and other content sections.
  - Responsive design with Tailwind CSS.
- **Speakers Page**
  - Displays all registered speaker portfolios.
  - Dynamic grid/list layout with cards.
- **Portfolio Registration**
  - Users can register and create their portfolios.
  - Form built with **React Hook Form** and validation.
- **State Management**
  - Uses **Redux Toolkit** to manage global state for speakers.
- **Reusable UI Components**
  - Built with **ShadCN** and Tailwind CSS for consistent styling.
- **Feature-Based Architecture**
  - Organized by features for scalability and maintainability.
  - Example:
    ```
    src/
      features/
        speakers/
          components/
          redux/
          pages/
        portfolio/
          components/
          redux/
          pages/
      common/
        components/
        utils/
        constants/
    ```

---

## 🛠️ Technologies Used

- **Frontend Framework:** React (with Hooks & Functional Components)
- **State Management:** Redux Toolkit
- **Form Handling:** React Hook Form
- **Styling:** Tailwind CSS, ShadCN components
- **JavaScript:** ES6+
- **Routing:** React Router DOM

---

## ⚡ Project Structure (Feature-Based)



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 🌿 Git Workflow Instructions

### 1. **Sync with `dev` branch**

Before starting work:

```bash
git checkout dev
git pull origin dev
```

### 2. **Create a new feature branch**

```bash
git switch -c ft/corporate-banking-001
```

> ✅ corporate keyword is only for repository that starts with corporate, If repo name starts with "user", branch name should be ft/user-banking-001

### 3. **Make your changes**

Work on your task as described above.

### 4. **Add and commit your changes**

Use `git commit` to create a conventional commit message:

```bash
git add . or git add file1 flle2
git commit -m "your commit-message"
```

> ✅ Write the appropriate commit message with your changes

### 5. **Push your branch**

```bash
git push origin ft/corporate-banking-001
```

### ✅ Once done

Open a Pull Request to `dev` and request a review.
