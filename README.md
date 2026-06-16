# Todo Application

## Description

A responsive React Todo Application that allows users to manage their tasks efficiently. Users can create, update, complete, filter, and sort todos through an intuitive interface. The application includes authentication, protected routes, and responsive design for both desktop and mobile devices.

## Live Demo

Deployed application link here: https://todo-list-by-yikalo.netlify.app/login


## Watch Demo Vedio

**Watch Demo:** ./src/demo/demo.mp4


---

## Features

* User authentication (login/logout)
* Protected routes for authenticated users
* Create new todos
* Edit existing todos
* Mark todos as completed
* Filter todos by status:

  * All
  * Active
  * Completed
* Search todos by title
* Sort todos by:

  * Creation date
  * Title
* Ascending and descending sort order
* Responsive design for desktop, tablet, and mobile devices
* Optimistic UI updates for a smooth user experience
* Profile page with todo statistics

---

## Technologies Used

### Frontend

* React
* React Router v7
* JavaScript (ES6+)
* HTML5
* CSS3

### React Features

* Context API
* Custom Hooks
* useReducer
* useEffect
* useMemo
* useState
* useRef

### Development Tools

* Vite
* npm
* Git
* GitHub

---

## Screenshots

### Desktop View

```md
![Desktop View]   (./src/screenshots/desktop-view.png)

```

### Mobile View

```md
![Mobile View]   (./src/screenshots/mobile-view.png)
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js (v18 or higher recommended)
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/yikalo-yebio/Todo-List
```

Navigate to the project directory:

```bash
cd Todo-List
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```
---

## Available Scripts

### Run Development Server

```bash
npm run dev
```

Starts the Vite development server.

### Build for Production

```bash
npm run build
```

Creates an optimized production build.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

### Run Linter

```bash
npm run lint
```

Checks the code for linting issues.

---

## Design Decisions

The application uses a component-based architecture to improve maintainability and reusability.

Key design decisions include:

* Context API for global authentication state management.
* Custom hooks to encapsulate reusable logic.
* useReducer for managing complex todo state.
* Responsive CSS layout using Flexbox.
* Separation of concerns through reusable components.
* Protected routes to secure authenticated pages.
* Optimistic UI updates to improve perceived performance.

---

## Future Improvements

With additional development time, the following features could be added:

* Dark mode support
* User registration
* Password reset functionality
* Drag-and-drop todo reordering
* Todo categories and tags
* Due dates and reminders
* Pagination for large todo lists
* Improved accessibility features
* Unit and integration testing
* Persistent theme preferences


---

## Contact

GitHub: https://github.com/yikalo-yebio
https://www.linkedin.com/in/yikalo-yebio-gebregzabiher/

