# Logistics Management System - Frontend

This is the frontend for the Logistics Management System, a full web application built with React. It provides an intuitive user interface to interact with backend microservices, enabling smooth management of users, inventory, orders, and real-time delivery tracking.

---

## Technologies

- **Framework:** React 19 with Vite for a fast development experience.
- **State Management:** Redux Toolkit with `redux-persist` to retain state across sessions.
- **Routing:** React Router v7 for declarative and protected routing.
- **HTTP Client:** Axios for making requests to the backend API Gateway.
- **Maps and Geolocation:** Google Maps API, integrated via `@react-google-maps/api`, to display maps and draw routes.
- **Real-Time Communication:** Socket.IO Client to receive live location updates from the `geo-service`.
- **UI Components:** Combination of custom components and icons from `react-icons` and `antd`.
- **Notifications:** `react-toastify` for friendly, non-intrusive alerts.
- **Authentication:** Client-side handling of JWT (JSON Web Tokens) for secure session management.

---

## Features

### 1. Authentication

- **Login and Registration:** Secure flows for user sign-up and sign-in.
- **Two-Factor Authentication (2FA):** Support for receiving verification codes via Email or SMS.
- **Email Verification:** A flow to confirm the user's email after registration.
- **Password Management:**
    - Securely reset a forgotten password via email code.
    - Change the current password from the user profile.
- **Protected Routes:** Access to various parts of the app is restricted based on authentication status and assigned user permissions.

### 2. Main Dashboards

- **Home Page:** A welcome screen with tracking code search and quick access to login/register.
- **Dashboard:** A central panel where users access various management modules based on roles and permissions.
- **User Profile:** A dedicated page where users can view account info and log out.

### 3. Management Modules (CRUD)

The app includes full management panels for all main system entities, allowing authorized users to Create, Read, Update, and Delete records:
- User Management
- Roles and Permissions Management
- Categories, Products, and Suppliers
- States and Cities
- Warehouses and Inventory (Product-Warehouse stock)
- Orders and Delivery Personnel

### 4. Geolocation and Tracking

- **Real-Time Tracking:** A map view showing a courier’s live location, updated via WebSockets.
- **Global View Map:** An administrative view displaying all active deliveries, warehouses, and pending orders on one map.
- **Route Information:** The tracking map shows the estimated distance and travel time between courier and destination.

### 5. Reports

- **Download Reports:** Authorized users can download delivery reports in **PDF** and **Excel** formats directly from the management panel.

---

## How to Run the Frontend

### Prerequisites

- Docker
- Docker Compose

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Cruz1122/logistics-frontend.git
    cd logistics-frontend
    ```

2. **Configure Environment Variables:**
    Create a `.env` file at the project root by copying from `.env.example`. Fill in the necessary values, especially the backend API Gateway URL.

3. **Build and run the services:**
    ```bash
    docker-compose up --build
    ```
    This command builds the Docker image for the frontend and starts it. The app will be available at `http://localhost:5173`.
