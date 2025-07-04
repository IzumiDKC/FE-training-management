# Training Management System

This project is a basic implementation of a training management system with React and various backend functionalities.

## Features Implemented

- **Basic Home Page UI**: A simple and clean user interface for the homepage.
- **User Authentication**: 
  - Register, Login, Logout functionalities.
  - Confirm Register flow.
- **CRUD API**:
  - Manage `ChuongTrinhDaoTao` (Training Program).
  - Manage `KhoaHoc` (Courses).
- **Basic User Information Retrieval**: Fetch and display basic user information.
- **Updated Routing for Index Pages**: Improved how routes are displayed for index pages to make navigation smoother.
- **New API Endpoints**:
  - **LoaiLopAPI**: Added API for managing course types.
  - **LopAPI**: Handles class management, including adding additional students to existing lists.
- **Study Hours Calculation**: Created a page that automatically calculates the number of study hours based on specific date conditions.
- **App Routing Update**: Reorganized and updated the routing system for better maintainability.
- **Navbar Update**: Improved the way the navbar is displayed to enhance UI consistency.
- **Footer Added**: Added a footer for better user interface consistency.

## API & Configuration Updates

- **ChiTietLopAPI**: Introduced the **ChiTietLopAPI** for managing detailed class information.
- **API Optimization**: Optimized the configuration for API requests to improve performance and maintainability.
- **Page Interface Changes**: Made changes to the interface of some pages for a more user-friendly experience.
- **Route Configuration for ChiTietLop**: Configured routes for **ChiTietLop** within the app for better routing organization.

## Folder Structure Update

- **Folder Structure Update**: 
  - Renamed folder `config` to `api`.
  - Added new configuration folders to better organize the project.
  - Updated routing to navigate more efficiently, rather than having all routes within **App**.

- **New Route Added**: 
  - **DiemDanh** route is being added (not fully completed yet).
  - Added functionality to view students in **Lop/Detail**.
  - **DiemDanh** page is now viewable with enhanced data handling.

## DiemDanh Updates

- **DiemDanh Page**: 
  - After scanning the QR code, the frontend portal (running on port 3000) is now returned.
  - The list of **HocVien** (students) for a **Lop** is now displayed correctly.
  - Display of information is now corrected based on **LopId** and **ChiTietLopId** parameters (previously displayed incorrectly due to missing parameters).
  - **Confirmation Page** of attendance after scanning the QR code.
  - Added functionality to send headers with token values when permission is required (not yet optimized).
  - Updated interface for better usability.
  - Updated **Routes** related to **DiemDanh**.

- **DiemDanh API**:
  - Updated according to backend changes to ensure proper functionality.
  - Configured **ChiTietLop** to accept **LopId** parameters for better data handling.
  - Token is now saved to **localStorage** after login to ensure secure session management.
  - **Profile** page can now only be accessed if the token is valid.

## SSL Configuration

- **SSL Configuration**:
  - SSL configuration file is prepared and configured, but currently, the frontend is running on the HTTP port.
  - If you need to switch to SSL, rename the package file (ssl) as required.
  - **SSL** content is configured according to backend specifications.

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
