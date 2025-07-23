# 🎓 Training Management System – Frontend (React)

This is the frontend of a full-stack Training Management System built with **React**. It integrates with a backend (ASP.NET Core) and provides a dynamic interface for managing courses, classes, users, registrations, attendance, and evaluations.

---

## ✅ Core Features

### 🧑‍💼 User Authentication & Management
- Register, Login, Logout.
- Email confirmation flow: `ConfirmEmail`, `ForgotPassword`, `ResetPassword`, `ResendEmailConfirmation`.
- Token-based login with **JWT** stored in `localStorage`.
- Role-based navigation and protection (`HocVien`, `GiangVien`, `Admin`).
- View all users (admin): includes pagination and role-switching (HocVien ↔ GiangVien).
- Role authorization via custom `Hooks` and centralized `AuthContext`.

### 🧭 Routing & Authorization
- Protected routes with `PrivateRoute` and `RoleRoute`.
- Page-level authorization based on backend roles.
- 404, 401, 403, 500 error pages with `ErrorBoundary` support.
- Centralized and optimized `Route` management.

---

## 📚 Course & Class Management

### 📘 Training Program (`ChuongTrinhDaoTao`)
- CRUD operations.
- Role-based access for admin.

### 🏫 Course (`KhoaHoc`)
- Manage courses with interface updates.
- Integrated with `KhoaHocAPI` and `Dto` models.
- Permission checks and validation.
  
### 🏷️ Class (`Lop` / `ChiTietLop`)
- View, create, and update class info.
- Assign students dynamically.
- Split logic for `LopCreate` using utility file (`timeUtils.js`).

### 📝 Course Registration (`DangKyKhoaHoc`)
- Register via form with validation.
- Admin view of all registrations.
- `DangKyRequestDto` and `DangKyKhoaHocDto` used for clean API communication.

---

## 📅 Attendance (DiemDanh)

- QR code-based check-in (integrated with backend).
- View list of students in class with `LopId`, `ChiTietLopId`.
- Confirm check-in page post scan.
- Token passed via headers for auth.
- `ResetCheckIn/Out` with updated route param usage.
- `DiemDanh` routes, pages, and permissions fully configured.

---

## 📊 Statistics & Visualization

- Integrated `recharts` for interactive charts.
- Statistical dashboard includes:
  - Account creation metrics.
  - Most popular class/program.
  - Attendance trends.
- Separate route, page, and API for statistics (admin only).

---

## 🧪 Evaluation Management

- `DanhGia` & `DanhGiaTheoNam` modules:
  - Index & Create pages.
  - Basic form interface and API integration.
  - Sidebar access.
  - Authorization by role.
- Renamed `DanhGiaTheoNam` → `DanhGiaChiTietTheoNam` across codebase.

---

## 🧱 UI/UX & Component System

- Redesigned UI using **GSAP** / **anime.js** for transitions.
- Responsive layout for all devices.
- Sidebar:
  - Interactive hover effect.
  - Auto-adjusts layout to prevent overlapping.
  - Dynamic content based on roles.
  - Includes direct links to registration, evaluation, statistics, etc.
- Navbar & Footer consistency across all pages.
- Common error interface for smoother user experience.

---

## 🔧 Utilities & Optimization

- Centralized `api` configuration (was `config`).
- `formatTime` utility for timestamps.
- `AuthContext` handles login state, logout resets token/role/user.
- `useRole` hook to authorize UI components without duplication.
- Navigation via `navigate()` (replaces `window.location.href`).
- Basic public pages for unauthenticated users.
- Updated layout structure & CSS for maintainability.

---

## 🔐 SSL & Environment

- SSL-ready: configured with `.pem` files and `openssl`.
- Frontend currently runs on **HTTP** for flexibility during development.
- Supports both HTTP and HTTPS.

---

## 🚀 Coming Soon / In Progress

- Full integration of evaluation summary flows.
- Enhanced user feedback on submission & errors.
- Additional statistics metrics for admin.


---

## Repository Link

This project is a part of the [training-management-internship repository](https://github.com/IzumiDKC/training-management-internship), where you can find more details and the codebase related to this system.

## Getting Started

To get this project up and running locally, follow the steps below:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IzumiDKC/training-management-internship.git
   ```
2. **Navigate to the project folder:**
   ```bash
   cd frontend
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the app:**
   ```bash
   npm start
   ```

The application will be running on [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production.

### `npm run eject`

If you are not satisfied with the build configuration, you can eject.
